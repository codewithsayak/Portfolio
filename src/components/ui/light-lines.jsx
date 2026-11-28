import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * LightLines — the hero backdrop.
 *
 * The vertical rails are static SVG rects. The 17 streaks drift with pure CSS
 * keyframes (no requestAnimationFrame loop), so the animation runs off the main
 * thread and costs nothing while the hero is scrolled out of view.
 */

const LINES = [
  { x: 1253.6, width: 4.5 },
  { x: 873.3, width: 1.8 },
  { x: 1100, width: 1.8 },
  { x: 1547.1, width: 4.5 },
  { x: 615, width: 4.5 },
  { x: 684.6, width: 1.8 },
  { x: 1369.4, width: 1.8 },
  { x: 1310.2, width: 0.9 },
  { x: 1233.4, width: 0.9 },
  { x: 124.2, width: 0.9 },
  { x: 1818.4, width: 4.5 },
  { x: 70.3, width: 4.5 },
  { x: 1618.6, width: 1.8 },
  { x: 455.9, width: 1.8 },
  { x: 328.7, width: 1.8 },
  { x: 300.8, width: 4.6 },
  { x: 1666.4, width: 0.9 },
];

const LIGHTS = [
  { d: "M619.5,298.4H615v19.5h4.5V298.4z M619.5,674.8H615v9.8h4.5V674.8z M619.5,135.1H615v5.6h4.5V135.1z M619.5,55.5H615v68.7h4.5V55.5z", dir: "up", duration: 13.5, offset: 0.00 },
  { d: "M1258.2,531.9h-4.5v8.1h4.5V531.9z M1258.2,497.9h-4.5v17.9h4.5V497.9z M1258.2,0h-4.5v25.3h4.5V0z M1258.2,252.2h-4.5v42.4h4.5V252.2z", dir: "up", duration: 22.5, offset: -3.70 },
  { d: "M875.1,123.8h-1.8v4h1.8V123.8z M875.1,289.4h-1.8v24.1h1.8V289.4z M875.1,0h-1.8v31.4h1.8V0z M875.1,50.2h-1.8v11.5h1.8V50.2z", dir: "up", duration: 9, offset: -7.40 },
  { d: "M1101.8,983.8h-1.8v8.2h1.8V983.8z M1101.8,1075.9h-1.8v4.1h1.8V1075.9z M1101.8,873.7h-1.8v4.2h1.8V873.7z M1101.8,851h-1.8v18.2h1.8V851z", dir: "down", duration: 27.5, offset: -11.10 },
  { d: "M686.4,822.7h-1.8v3.8h1.8V822.7z M686.4,928.4h-1.8v23h1.8V928.4z M686.4,1043.8h-1.8v36.2h1.8V1043.8z", dir: "down", duration: 17, offset: -14.80 },
  { d: "M1551.6,860.9h-4.4v-34.1h4.4V860.9z M1551.6,533.5h-4.4v-13.9h4.4V533.5z M1551.6,1080h-4.4v-89.1h4.4V1080z", dir: "down", duration: 11.5, offset: -7.00 },
  { d: "M1311.1,707.7h-0.9V698h0.9V707.7z M1311.1,436.8h-0.9v-58.9h0.9V436.8z M1311.1,140.7h-0.9V48h0.9V140.7z", dir: "down", duration: 25, offset: -22.20 },
  { d: "M125.1,514.5h-0.9v-9.7h0.9V514.5z M125.1,243.6h-0.9v-58.9h0.9V243.6z", dir: "down", duration: 8.5, offset: -0.40 },
  { d: "M305.4,806.7h-4.6v-42.5h4.6V806.7z M305.4,398.5h-4.6v-17.3h4.6V398.5z M305.4,1080h-4.6V968.8h4.6V1080z", dir: "up", duration: 19.5, offset: -10.10 },
  { d: "M1822.9,170.7h-4.5v13.7h4.5V170.7z M1822.9,435.1h-4.5v6.8h4.5V435.1z M1822.9,55.9h-4.5v4h4.5V55.9z M1822.9,0h-4.5v48.3h4.5V0z", dir: "up", duration: 30, offset: -3.30 },
  { d: "M1666.4,331.5h0.9v9.7h-0.9V331.5z M1666.4,602.4h0.9v58.9h-0.9V602.4z M1666.4,898.5h0.9v92.7h-0.9V898.5z", dir: "down", duration: 14.5, offset: -8.00 },
  { d: "M1620.4,200.7h-1.8v6.4h1.8V200.7z M1620.4,469.1h-1.8v39h1.8V469.1z M1620.4,0h-1.8v51h1.8V0z M1620.4,81.3h-1.8V100h1.8V81.3z", dir: "down", duration: 21, offset: -19.70 },
  { d: "M74.8,201h-4.5v16.2h4.5V201z M74.8,512.3h-4.5v8.1h4.5V512.3z M74.8,65.8h-4.5v4.6h4.5V65.8z M74.8,0h-4.5v56.8h4.5V0z", dir: "down", duration: 10.5, offset: -2.40 },
  { d: "M1371.2,655.3h-1.8v6.3h1.8V655.3z M1371.2,829.7h-1.8v37.9h1.8V829.7z M1371.2,1020.3h-1.8v59.7h1.8V1020.3z", dir: "down", duration: 24, offset: -0.10 },
  { d: "M1234.3,898.1h-0.9v-4.9h0.9V898.1z M1234.3,762.5h-0.9v-29.5h0.9V762.5z M1234.3,614.4h-0.9v-46.4h0.9V614.4z", dir: "down", duration: 16, offset: -3.80 },
  { d: "M457.7,1010.8h-1.8v-18.1h1.8V1010.8z M457.7,507.5h-1.8V398h1.8V507.5z", dir: "down", duration: 28.5, offset: -27.00 },
  { d: "M330.5,170.7h-1.8v13.7h1.8V170.7z M330.5,435.1h-1.8v6.8h1.8V435.1z M330.5,55.9h-1.8v4h1.8V55.9z M330.5,0h-1.8v48.3h1.8V0z", dir: "up", duration: 12, offset: -11.20 },
];

const VIEW_HEIGHT = 1080;

export function LightLines({
  className,
  linesOpacity = 0.05,
  lightsOpacity = 0.9,
  speedMultiplier = 1,
  gradientFrom = "#2462F6",
  gradientTo = "#5999F8",
  lightColor = "#fff",
  lineColor = "#fff",
  children,
}) {
  const containerRef = useRef(null);

  // Pause every drift while the hero is offscreen.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      container.dataset.paused = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        container.dataset.paused = entry.isIntersecting ? "false" : "true";
      },
      { threshold: 0 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const scale = speedMultiplier > 0 ? speedMultiplier : 1;

  return (
    <div
      ref={containerRef}
      data-paused="false"
      className={cn(
        "light-lines absolute inset-0 flex h-full w-full justify-center overflow-hidden",
        className,
      )}
      style={{
        background: `linear-gradient(180deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
      }}
    >
      <svg
        className="light-lines__svg absolute h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 1920 ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <g style={{ opacity: linesOpacity, fill: lineColor }}>
          {LINES.map((line) => (
            <rect
              key={`${line.x}-${line.width}`}
              x={line.x}
              width={line.width}
              height={VIEW_HEIGHT}
              className="light-lines__rail"
            />
          ))}
        </g>

        <g style={{ opacity: lightsOpacity, fill: lightColor }}>
          {LIGHTS.map((light, index) => (
            <path
              key={index}
              d={light.d}
              className={cn(
                "light-lines__light",
                light.dir === "up" ? "light-lines__light--up" : "light-lines__light--down",
              )}
              style={{
                "--light-duration": `${(light.duration / scale).toFixed(2)}s`,
                "--light-delay": `${(light.offset / scale).toFixed(2)}s`,
              }}
            />
          ))}
        </g>
      </svg>

      {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
    </div>
  );
}

export default LightLines;
