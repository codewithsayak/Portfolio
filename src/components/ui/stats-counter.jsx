import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { easeOutCubic, onFirstVisible, prefersReducedMotion } from "@/lib/motion";

/**
 * StatsCounter
 *
 * Previously driven by framer-motion's `useSpring` + React state, which meant a
 * `setState` on every animation frame (60 renders per counter, per second). It
 * now tweens with `requestAnimationFrame` and writes straight to the DOM node —
 * no React work while the numbers run.
 */
export default function StatsCounter({
  value,
  duration = 1.5,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const render = (current) => {
      node.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
    };

    if (prefersReducedMotion()) {
      render(value);
      return undefined;
    }

    render(0);
    let frame = 0;
    let start = 0;

    const step = (time) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / (duration * 1000), 1);
      render(value * easeOutCubic(progress));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const cancel = onFirstVisible(node, () => {
      frame = requestAnimationFrame(step);
    }, { rootMargin: "0px 0px -10% 0px" });

    return () => {
      cancel();
      cancelAnimationFrame(frame);
    };
  }, [value, duration, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)} aria-label={`${prefix}${value}${suffix}`}>
      {`${prefix}${(0).toFixed(decimals)}${suffix}`}
    </span>
  );
}
