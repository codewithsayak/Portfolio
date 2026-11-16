import { useEffect, useRef } from 'react';
import { gsap } from './gsap';
import { scheduleRefresh } from './refresh';

/**
 * Count-up numbers that trigger when they scroll into view.
 * <span data-count="120" data-suffix="+" />
 */
export function useCounters(deps = []) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll('span[data-count]').forEach((el) => {
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const obj = { value: 0 };
        el.textContent = (0).toFixed(decimals);

        gsap.to(obj, {
          value: target,
          duration: 1.9,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = obj.value.toFixed(decimals);
          },
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });
    });
    scheduleRefresh();
    return () => {
      ctx.revert();
      scheduleRefresh();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
