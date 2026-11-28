import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * SpotlightNavbar
 *
 * Two perf fixes over the previous version:
 *  - the pointer no longer travels through React state (it used to call
 *    `setHoverX` on every mousemove, re-rendering the nav dozens of times a
 *    frame); it writes one CSS variable instead
 *  - the "ambience" indicator slides with a composited `transform` transition
 *    instead of a JS spring animation
 */
export function SpotlightNavbar({
  items = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  className,
  onItemClick,
  defaultActiveIndex = 0,
}) {
  const navRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  // Move the ambience indicator to the active item (composited transform).
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`);
    if (!activeItem) return;
    const navRect = nav.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const center = itemRect.left - navRect.left + itemRect.width / 2;
    nav.style.setProperty("--ambience-x", `${center}px`);
  }, [activeIndex]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleMouseMove = (event) => {
      const rect = nav.getBoundingClientRect();
      nav.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    };

    const handleMouseEnter = () => {
      nav.dataset.spotlight = "on";
    };

    const handleMouseLeave = () => {
      nav.dataset.spotlight = "off";
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseenter", handleMouseEnter);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseenter", handleMouseEnter);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleItemClick = (event, item, index) => {
    setActiveIndex(index);
    onItemClick?.(item, index, event);
  };

  return (
    <div className={cn("relative flex justify-center pt-10", className)}>
      <nav
        ref={navRef}
        data-spotlight="off"
        aria-label="Section navigation"
        className={cn(
          "spotlight-nav glass-border spotlight-nav-shadow",
          "relative h-11 overflow-hidden rounded-full transition-all duration-300",
        )}
      >
        <ul className="relative z-10 flex h-full items-center gap-0 px-2">
          {items.map((item, index) => (
            <li key={item.href ?? index} className="relative flex h-full items-center justify-center">
              <a
                href={item.href}
                data-index={index}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  handleItemClick(event, item, index);
                }}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeIndex === index
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="spotlight-nav__spotlight pointer-events-none absolute inset-0 z-[1]"
        />
        <div
          aria-hidden="true"
          className="spotlight-nav__ambience pointer-events-none absolute bottom-0 left-0 z-[2] h-px w-[120px]"
        />
      </nav>
    </div>
  );
}

export default SpotlightNavbar;
