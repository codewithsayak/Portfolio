import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";
import { mirrorVisibility } from "@/lib/motion";

/**
 * MorphText — rotating word stack.
 *
 * The previous version held a live SVG `feColorMatrix` filter on the container
 * and animated `filter: blur()` across a huge type size forever, which forced a
 * full re-filter + repaint of the hero on every frame. Now it only animates
 * `opacity` and `transform`, and the CSS animation pauses whenever the
 * component leaves the viewport.
 */
export function MorphText({
  words = ["CREATE", "DESIGN", "DEVELOP"],
  interval = 3000,
  subtext,
  fontSize = "clamp(3rem, 15vw, 10rem)",
  fontFamily = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  className,
  textClassName,
  subtextClassName,
}) {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef(null);

  const totalDuration = (interval / 1000) * words.length;
  const wordDuration = interval / 1000;

  useEffect(() => mirrorVisibility(rootRef.current), []);

  return (
    <div
      ref={rootRef}
      data-paused="false"
      className={cn("morph-text-root relative flex flex-col items-center", className)}
    >
      <div
        className={cn("morph-text-container relative select-none", textClassName)}
        style={{ fontSize, fontWeight: 700, fontFamily }}
      >
        <div
          className="morph-word-rotator relative flex items-center justify-center"
          style={{ height: "1.2em", minWidth: "14ch" }}
        >
          {words.map((word, index) => (
            <span
              key={`${word}-${uid}-${index}`}
              className="morph-word absolute"
              style={{
                left: "50%",
                top: "50%",
                whiteSpace: "nowrap",
                opacity: 0,
                animationName: "morph-word-rotate",
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                animationDelay: `${index * wordDuration}s`,
                animationDuration: `${totalDuration}s`,
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {subtext ? (
        <p
          className={cn(
            "morph-subtext mt-8 uppercase tracking-[0.2em] text-muted-foreground",
            subtextClassName,
          )}
          style={{ fontSize: "1.05rem", fontFamily }}
        >
          {subtext}
        </p>
      ) : null}
    </div>
  );
}

export default MorphText;
