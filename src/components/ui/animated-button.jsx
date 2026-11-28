import { cn } from "@/lib/utils";

/**
 * AnimatedButton
 *
 * Hover/press feedback used to come from framer-motion, plus an infinitely
 * repeating `--mask-x` gradient-mask animation and an animated
 * `background-position` on a second layer. Both repainted the button forever
 * (even off-screen), which showed up in Lighthouse as "non-composited
 * animations". Everything here is now CSS: a composited transform on
 * hover/press and a one-shot border shine.
 */
const AnimatedButton = ({
  children = "Browse components",
  className = "",
  as = "button",
  ...rest
}) => {
  const Component = as === "a" ? "a" : as === "span" ? "span" : "button";

  return (
    <Component
      {...(Component === "button" ? { type: rest.type || "button" } : null)}
      {...rest}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-md",
        "px-6 py-2 font-medium",
        "transition-[transform,background-color,border-color,color] duration-150 ease-out",
        "hover:scale-[1.01] active:scale-[0.97] motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "[--shine:rgba(0,0,0,.5)] dark:[--shine:rgba(255,255,255,.55)]",
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100",
            "bg-[linear-gradient(-75deg,transparent_30%,var(--shine)_50%,transparent_70%)] bg-[length:200%_100%]",
            "group-hover:animate-[shine-sweep_700ms_ease-out_1]",
          )}
        />
      </span>
      <span className="relative z-10 inline-flex items-center justify-center gap-[inherit]">
        {children}
      </span>
    </Component>
  );
};

export default AnimatedButton;
