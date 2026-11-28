import * as React from "react";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/**
 * GooeyTextReveal — a staggered, word-by-word reveal.
 *
 * This replaces the previous GSAP SplitText implementation, which measured
 * layout on every instance (twice: once on mount, once after the web font
 * swapped), then animated an SVG `feColorMatrix` + `blur()` filter every frame.
 * That was the single biggest source of long tasks and forced reflows here.
 *
 * Now the words are split during render (no DOM reads, no layout thrash) and
 * animated with a CSS keyframe on `opacity` + `transform` only, so the browser
 * can run the whole page on the compositor. Because the initial state is
 * rendered on the server too, the reveal starts before hydration and text is
 * never invisible when JS is unavailable (see the <noscript> rule in index.html).
 */
export function GooeyTextReveal({
  children,
  mode = "immediate",
  delay = 0,
  duration = 0.9,
  stagger = 0.06,
  // Accepted for API compatibility with the previous implementation.
  blurAmount: _blurAmount,
  ease: _ease,
  start: _start,
  end: _end,
  scroller: _scroller,
  once: _once,
  disabled = false,
  onComplete,
  className,
  style,
  ...props
}) {
  const containerRef = React.useRef(null);
  const completedRef = React.useRef(false);
  const counter = React.useMemo(() => ({ index: 0 }), [children]);

  const words = React.useMemo(
    () => (disabled ? children : splitWords(children, counter)),
    [children, counter, disabled],
  );

  // "immediate" reveals animate from the very first paint; the rest wait for
  // both the server-rendered markup and the IntersectionObserver.
  const initialReveal = mode === "immediate" || disabled ? "done" : "pending";

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    if (mode === "immediate" || disabled) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.reveal = "done";
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        el.dataset.reveal = "done";
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mode, disabled]);

  React.useEffect(() => {
    if (!onComplete || completedRef.current) return undefined;
    const totalDelay = (delay + Math.max(counter.index - 1, 0) * stagger + duration) * 1000;
    const timeout = window.setTimeout(() => {
      completedRef.current = true;
      onComplete();
    }, totalDelay);
    return () => window.clearTimeout(timeout);
  }, [onComplete, delay, stagger, duration, counter]);

  return (
    <div
      ref={containerRef}
      data-reveal={initialReveal}
      className={cn("reveal-text", className)}
      style={{
        "--reveal-duration": `${duration}s`,
        "--reveal-stagger": `${stagger}s`,
        "--reveal-delay": `${delay}s`,
        ...style,
      }}
      {...props}
    >
      {words}
    </div>
  );
}

function splitWords(children, counter) {
  return React.Children.map(children, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") return child;

    if (typeof child === "string" || typeof child === "number") {
      return splitString(String(child), counter);
    }

    if (React.isValidElement(child)) {
      if (child.type === "br") return child;

      // Gradient text is clipped per element, so keep it intact and reveal the
      // whole line as one unit (a transform *inside* it would break the clip).
      if (
        typeof child.props?.className === "string" &&
        child.props.className.includes("text-gradient")
      ) {
        return wrapAtomic(child, counter);
      }

      const nested = child.props?.children;
      if (nested === undefined || nested === null) return child;
      return React.cloneElement(child, {
        children: splitWords(nested, counter),
      });
    }

    return child;
  });
}

function wrapAtomic(child, counter) {
  const index = counter.index++;
  return React.createElement(
    "span",
    { key: `w-${index}`, className: "reveal-word", style: { "--reveal-i": index } },
    React.createElement("span", { className: "reveal-word__inner" }, child),
  );
}

function splitString(text, counter) {
  return text.split(/(\s+)/).map((part) => {
    if (!part) return null;

    if (/^\s+$/.test(part)) {
      return React.createElement(
        React.Fragment,
        { key: `s-${counter.index}-${part.length}` },
        part,
      );
    }

    const index = counter.index++;
    return React.createElement(
      "span",
      { key: `w-${index}`, className: "reveal-word", style: { "--reveal-i": index } },
      React.createElement("span", { className: "reveal-word__inner" }, part),
    );
  });
}

GooeyTextReveal.displayName = "GooeyTextReveal";

export default GooeyTextReveal;
