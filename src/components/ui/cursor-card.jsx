import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/**
 * CursorCard — an inline link that shows a floating preview under the pointer.
 *
 * The preview used to be a framer-motion spring driven by two motion values
 * (a React render + spring solve per hover frame). Now the card is positioned
 * with a single `transform` write per frame, which is composited and keeps the
 * pointer path off React's render loop entirely.
 */
export function CursorCard({ children, image, description, href = "#", className }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasPreviewed, setHasPreviewed] = useState(false);
  const cardRef = useRef(null);
  const frameRef = useRef(0);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const applyPosition = useCallback(() => {
    frameRef.current = 0;
    const node = cardRef.current;
    if (!node) return;
    const { x, y } = positionRef.current;
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      positionRef.current = { x: event.clientX - 120, y: event.clientY + 20 };
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(applyPosition);
    },
    [applyPosition],
  );

  const handleEnter = useCallback(
    (event) => {
      const rect = event.currentTarget?.getBoundingClientRect?.();
      if (typeof event.clientX === "number" && typeof event.clientY === "number" && event.clientX > 0) {
        positionRef.current = { x: event.clientX - 120, y: event.clientY + 20 };
      } else if (rect) {
        // Keyboard focus: park the preview beside the link.
        positionRef.current = { x: rect.left, y: rect.bottom + 12 };
      }
      setHasPreviewed(true);
      setIsHovered(true);
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(applyPosition);
    },
    [applyPosition],
  );

  return (
    <>
      <a
        href={href}
        className={cn(
          "relative inline-block rounded px-1 -mx-1 font-bold text-neutral-900 transition-colors",
          "hover:bg-primary/10 dark:text-neutral-100",
          className,
        )}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={handleEnter}
        onBlur={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </a>

      {mounted && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={cardRef}
              aria-hidden="true"
              className={cn(
                "pointer-events-none fixed left-0 top-0 z-50 w-[240px] rounded-xl border border-border",
                "bg-card p-3 shadow-2xl transition-[opacity,scale] duration-150 ease-out",
                isHovered ? "scale-100 opacity-100" : "scale-90 opacity-0",
              )}
              style={{ transform: "translate3d(0, 0, 0)" }}
            >
              {hasPreviewed ? (
                <>
                  <img
                    src={image}
                    alt=""
                    width="216"
                    height="122"
                    loading="lazy"
                    decoding="async"
                    className="mb-3 h-auto w-full rounded-md object-cover"
                  />
                  <p className="m-0 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </>
              ) : null}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

export default CursorCard;
