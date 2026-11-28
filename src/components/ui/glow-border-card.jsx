import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { mirrorVisibility } from "@/lib/motion";

// Preset gradient colors (10 colors each for smooth transitions)
const colorPresets = {
  nature: ["#669900", "#88bb22", "#99cc33", "#aaddaa", "#ccee66", "#006699", "#228888", "#3399cc", "#55aacc", "#669900"],
  ocean: ["#006699", "#1177aa", "#2288bb", "#3399cc", "#44aadd", "#55bbee", "#66ccff", "#44bbee", "#2299cc", "#006699"],
  sunset: ["#ff6600", "#ff7711", "#ff8822", "#ff9900", "#ffaa22", "#ffbb44", "#ffcc00", "#ff9933", "#ff7722", "#ff6600"],
  aurora: ["#00ff87", "#22ffaa", "#44ffcc", "#60efff", "#88ddff", "#bb99ff", "#dd77ee", "#ff68f0", "#ff55cc", "#00ff87"],
  custom: ["#669900", "#99cc33", "#ccee66", "#006699", "#3399cc", "#990066", "#cc3399", "#ff6600", "#ff9900", "#ffcc00"],
};

/**
 * GlowBorderCard - a soft aurora glow around the card edges.
 *
 * The gradient used to be *rotated* every frame by animating an `@property`
 * custom angle, which re-rasterised a 10-stop conic gradient and its blur on
 * every animation tick — for every card on the page, forever. The gradient is
 * now static (rasterised once) and only its opacity breathes, which the
 * compositor can run on its own; the animation also pauses offscreen.
 */
export const GlowBorderCard = React.forwardRef(
  (
    {
      children,
      className,
      width = "320px",
      height,
      aspectRatio = "1",
      borderRadius = "0.75rem",
      animationDuration = 4,
      gradientColors,
      borderWidth = "1.25em",
      blurAmount = "0.75em",
      inset = "-1em",
      colorPreset = "custom",
      paused = false,
      style,
      ...props
    },
    ref,
  ) => {
    const colors = gradientColors || colorPresets[colorPreset] || colorPresets.custom;
    const cardRef = useRef(null);

    const colorVars = {};
    for (let i = 0; i < 10; i++) {
      colorVars[`--glow-color-${i + 1}`] = colors[i % colors.length];
    }

    useEffect(() => {
      if (paused) return undefined;
      return mirrorVisibility(cardRef.current, { rootMargin: "200px" });
    }, [paused]);

    return (
      <div
        ref={(node) => {
          cardRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        data-paused={paused ? "true" : "false"}
        className={cn(
          "glow-card relative isolate grid place-content-center overflow-hidden",
          "bg-zinc-50/50 dark:bg-neutral-900/60 backdrop-blur-md",
          className,
        )}
        style={{
          width,
          height: height || "auto",
          aspectRatio: height ? "unset" : aspectRatio,
          borderRadius,
          "--glow-animation-duration": `${animationDuration}s`,
          ...colorVars,
          ...style,
        }}
        {...props}
      >
        <div
          aria-hidden="true"
          className="glow-card__glow pointer-events-none absolute -z-10"
          style={{
            inset,
            borderWidth,
            borderStyle: "solid",
            borderColor: "transparent",
            borderRadius: "inherit",
            filter: `blur(${blurAmount})`,
          }}
        />

        <div className="relative z-10 flex h-full w-full items-center justify-center bg-transparent p-4">
          {children}
        </div>
      </div>
    );
  },
);

GlowBorderCard.displayName = "GlowBorderCard";

export default GlowBorderCard;
