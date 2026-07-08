import * as React from 'react';
import { usePrefersReducedMotion } from './internal/reduced-motion';

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Parallax intensity. Positive values scroll slower than the page,
   * negative values faster. Clamped to ±0.5 so content never detaches.
   */
  speed?: number;
}

const clampSpeed = (speed: number): number => Math.max(-0.5, Math.min(0.5, speed));

/**
 * Subtle scroll parallax: translates its children on the Y axis via a
 * passive scroll listener + requestAnimationFrame. Disabled entirely under
 * `prefers-reduced-motion` and on the server.
 */
export const Parallax = React.forwardRef<HTMLDivElement, ParallaxProps>(function Parallax(
  { speed = 0.2, style, children, ...rest },
  forwardedRef
) {
  const localRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(forwardedRef, () => localRef.current as HTMLDivElement);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reduced || typeof window === 'undefined') return undefined;
    const el = localRef.current;
    if (el === null) return undefined;

    const factor = clampSpeed(speed);
    let frame = 0;

    const update = (): void => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const offset = (viewportCenter - elementCenter) * factor;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = (): void => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      el.style.transform = '';
    };
  }, [speed, reduced]);

  return (
    <div ref={localRef} data-xen-parallax="" style={style} {...rest}>
      {children}
    </div>
  );
});
