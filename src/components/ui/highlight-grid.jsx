import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_COLORS = [
  "#E24E1B",
  "#4381C1",
  "#F79824",
  "#04A777",
  "#5B8C5A",
  "#2176FF",
  "#818D92",
  "#22AAA1",
];

const DEFAULT_ROWS = [
  [{ label: "html" }, { label: "css" }, { label: "javascript" }],
  [{ label: "gsap" }, { label: "scrolltrigger" }, { label: "react" }, { label: "next.js" }, { label: "three.js" }],
];

export function HighlightGrid({
  rows = DEFAULT_ROWS,
  colors = DEFAULT_COLORS,
  transitionDuration = 250,
  highlightFirst = true,
  className
}) {
  const gridRef = useRef(null);
  const highlightRef = useRef(null);
  const cellRefs = useRef(new Map());
  const activeRef = useRef(null);
  const [active, setActive] = useState(highlightFirst ? 0 : null);

  // Flatten rows into cells with a running global index + resolved colour.
  const gridRows = useMemo(() => {
    let gi = 0;
    return rows.map((row) =>
      row.map((item) => {
        const idx = gi++;
        return { label: item.label, color: item.color ?? colors[idx % colors.length], gi: idx };
      }),
    );
  }, [rows, colors]);

  const moveTo = useCallback((gi, color) => {
    // The highlight lives inside the grid, so offsets are relative to the grid.
    const grid = gridRef.current;
    const highlight = highlightRef.current;
    const el = cellRefs.current.get(gi);
    if (!grid || !highlight || !el) return;

    const rect = el.getBoundingClientRect();
    const crect = grid.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    highlight.style.opacity = "1";
    highlight.style.transform = `translate(${rect.left - crect.left}px, ${rect.top - crect.top}px)`;
    highlight.style.width = `${rect.width}px`;
    highlight.style.height = `${rect.height}px`;
    highlight.style.backgroundColor = color;
    activeRef.current = { gi, color };
  }, []);

  // Park on the first cell initially, and keep the highlight aligned on resize.
  useEffect(() => {
    let rafId;
    const updatePosition = () => {
      if (activeRef.current) {
        moveTo(activeRef.current.gi, activeRef.current.color);
      } else if (highlightFirst && gridRows[0]?.[0]) {
        const first = gridRows[0][0];
        const h = highlightRef.current;
        if (h) {
          h.style.transitionDuration = "0s";
          moveTo(first.gi, first.color);
          rafId = requestAnimationFrame(() => {
            if (h) h.style.transitionDuration = `${transitionDuration}ms`;
          });
        }
      }
    };

    rafId = requestAnimationFrame(updatePosition);

    let resizeRaf;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        if (activeRef.current) moveTo(activeRef.current.gi, activeRef.current.color);
      });
    };

    const grid = gridRef.current;
    const ro =
      grid && typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    if (grid && ro) ro.observe(grid);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(resizeRaf);
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [gridRows, highlightFirst, moveTo, transitionDuration]);

  return (
    <div
      className={cn(
        "relative flex min-h-[360px] w-full items-center justify-start overflow-x-auto overflow-y-hidden lg:justify-center",
        className,
      )}
    >
      <div
        ref={gridRef}
        className="relative mx-auto flex h-[280px] w-[92%] min-w-[760px] max-w-[940px] shrink-0 flex-col border border-black/15 dark:border-white/20 sm:h-[340px]"
      >
        {/* Sliding highlight — solid accent (which fades between cells) with a
            fixed radiant gradient sheen layered over it. */}
        <div
          ref={highlightRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-0 opacity-0"
          style={{
            backgroundImage:
              "radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.28), rgba(255,255,255,0) 52%), linear-gradient(180deg, rgba(255,255,255,0) 55%, rgba(0,0,0,0.22))",
            transitionProperty: "transform, width, height, background-color, opacity",
            transitionDuration: `${transitionDuration}ms`,
            transitionTimingFunction: "ease",
          }}
        />

        {gridRows.map((row, r) => (
          <div
            key={r}
            className={cn(
              "flex flex-1",
              r < gridRows.length - 1 && "border-b border-black/15 dark:border-white/20",
            )}
          >
            {row.map((cell, c) => {
              const isActive = active === cell.gi;
              return (
                <div
                  key={cell.gi}
                  ref={(el) => {
                    if (el) cellRefs.current.set(cell.gi, el);
                    else cellRefs.current.delete(cell.gi);
                  }}
                  onMouseEnter={() => {
                    setActive(cell.gi);
                    moveTo(cell.gi, cell.color);
                  }}
                  className={cn(
                    "flex h-full flex-1 items-center justify-center p-2 text-center",
                    c < row.length - 1 && "border-r border-black/15 dark:border-white/20",
                  )}
                >
                  <p
                    className={cn(
                      "relative z-[2] whitespace-nowrap font-mono text-[13px] font-medium uppercase transition-colors duration-200 select-none",
                      isActive ? "text-white" : "text-neutral-600 dark:text-white/70",
                    )}
                  >
                    ( {cell.label} )
                  </p>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighlightGrid;
