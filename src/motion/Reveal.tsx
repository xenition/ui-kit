import * as React from 'react';
import { StaggerConfigContext, StaggerIndexContext } from './Stagger';
import { usePrefersReducedMotion } from './internal/reduced-motion';
import { useInView } from './internal/use-in-view';

export type RevealEffect =
  | 'fade-up'
  | 'fade'
  | 'slide-left'
  | 'slide-right'
  | 'zoom'
  | 'blur-in';

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Entrance effect. */
  effect?: RevealEffect;
  /** Transition delay in ms (added to any surrounding `Stagger` delay). */
  delay?: number;
  /** Transition duration in ms. */
  duration?: number;
  /** Animate only on the first intersection (default) or every time. */
  once?: boolean;
  /** IntersectionObserver threshold. */
  threshold?: number;
}

interface HiddenStyle {
  transform?: string;
  filter?: string;
}

const HIDDEN_STYLES: Record<RevealEffect, HiddenStyle> = {
  'fade-up': { transform: 'translate3d(0, 24px, 0)' },
  fade: {},
  'slide-left': { transform: 'translate3d(-32px, 0, 0)' },
  'slide-right': { transform: 'translate3d(32px, 0, 0)' },
  zoom: { transform: 'scale(0.92)' },
  'blur-in': { filter: 'blur(8px)' },
};

/**
 * Scroll-triggered entrance wrapper (no animation library — CSS transitions
 * plus one IntersectionObserver). Under `prefers-reduced-motion` — or when
 * `IntersectionObserver` is unavailable — children render instantly in their
 * final state.
 */
export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  {
    effect = 'fade-up',
    delay = 0,
    duration = 600,
    once = true,
    threshold = 0.15,
    style,
    children,
    ...rest
  },
  forwardedRef
) {
  const localRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(forwardedRef, () => localRef.current as HTMLDivElement);

  const reduced = usePrefersReducedMotion();
  const inView = useInView(localRef, { threshold, once, disabled: reduced });
  const visible = reduced || inView;

  const staggerConfig = React.useContext(StaggerConfigContext);
  const staggerIndex = React.useContext(StaggerIndexContext);
  const totalDelay =
    delay + (staggerConfig !== null ? staggerConfig.delay + staggerIndex * staggerConfig.interval : 0);

  const hidden = HIDDEN_STYLES[effect];
  const motionStyle: React.CSSProperties = reduced
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : hidden.transform,
        filter: visible ? undefined : hidden.filter,
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease, filter ${duration}ms ease`,
        transitionDelay: `${totalDelay}ms`,
        willChange: visible ? undefined : 'opacity, transform',
      };

  return (
    <div
      ref={localRef}
      data-xen-reveal={effect}
      data-state={visible ? 'visible' : 'hidden'}
      style={{ ...motionStyle, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
});
