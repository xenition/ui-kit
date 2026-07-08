import * as React from 'react';
import { usePrefersReducedMotion } from './internal/reduced-motion';
import { useInView } from './internal/use-in-view';

export interface AnimatedCounterProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Final value. */
  to: number;
  /** Starting value. */
  from?: number;
  /** Count duration in ms. */
  duration?: number;
  /** Formats the current value for display. Defaults to rounded `toLocaleString()`. */
  format?: (value: number) => string;
  /** IntersectionObserver threshold. */
  threshold?: number;
}

const defaultFormat = (value: number): string => Math.round(value).toLocaleString('en-US');

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/**
 * Counts up (or down) once scrolled into view, driven by
 * requestAnimationFrame. Under `prefers-reduced-motion` — or without
 * `IntersectionObserver` — the final value renders immediately.
 */
export const AnimatedCounter = React.forwardRef<HTMLSpanElement, AnimatedCounterProps>(
  function AnimatedCounter(
    { to, from = 0, duration = 1500, format = defaultFormat, threshold = 0.5, ...rest },
    forwardedRef
  ) {
    const localRef = React.useRef<HTMLSpanElement>(null);
    React.useImperativeHandle(forwardedRef, () => localRef.current as HTMLSpanElement);

    const reduced = usePrefersReducedMotion();
    const inView = useInView(localRef, { threshold, once: true, disabled: reduced });
    const [value, setValue] = React.useState(from);

    React.useEffect(() => {
      if (!inView && !reduced) return undefined;
      if (reduced || duration <= 0) {
        setValue(to);
        return undefined;
      }

      let frame = 0;
      let start: number | null = null;

      const tick = (now: number): void => {
        if (start === null) start = now;
        const progress = Math.min((now - start) / duration, 1);
        setValue(from + (to - from) * easeOutCubic(progress));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };

      frame = window.requestAnimationFrame(tick);
      return () => window.cancelAnimationFrame(frame);
    }, [inView, reduced, from, to, duration]);

    return (
      <span ref={localRef} data-xen-counter="" {...rest}>
        {format(value)}
      </span>
    );
  }
);
