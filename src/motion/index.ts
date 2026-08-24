/**
 * `@xenition/ui/motion` — dependency-free scroll & pointer motion for
 * marketing templates. CSS transitions + IntersectionObserver only (no
 * framer-motion). Every component is SSR-safe and honors
 * `prefers-reduced-motion` (content renders instantly, animations off).
 */

export { Reveal } from './Reveal';
export type { RevealProps, RevealEffect } from './Reveal';
export { Stagger } from './Stagger';
export type { StaggerProps } from './Stagger';
export { Parallax } from './Parallax';
export type { ParallaxProps } from './Parallax';
export { AnimatedCounter } from './AnimatedCounter';
export type { AnimatedCounterProps } from './AnimatedCounter';
export { Marquee } from './Marquee';
export type { MarqueeProps } from './Marquee';
export { TiltCard } from './TiltCard';
export type { TiltCardProps } from './TiltCard';
export { usePrefersReducedMotion } from './internal/reduced-motion';
export { useInView } from './internal/use-in-view';
export type { UseInViewOptions } from './internal/use-in-view';
