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

/* ------------------------------------------------------------------------ *
 * The V4 line
 *
 * Six components on the shared M3 motion scale — `v4-motion.ts`'s `quick` 100
 * / `standard` 200 / `enter` 400, with easing chosen by direction of travel.
 * See `MOTION-V4-BRIEF.md`.
 *
 * The base line picked its own numbers: `Reveal` at 600 here and 500 on the
 * native twin for the same entrance, `TiltCard` at a hand-typed
 * `200ms ease-out`, distances of 24 / 32 / 0.92 / 8 typed inline. That is the
 * defect `v4-motion.ts` was created to fix, still live in the one module whose
 * whole subject is motion.
 *
 * Two components here are deliberately NOT on the duration scale, and say so
 * in their own files: a marquee's loop and a counter's count are **playback**,
 * timed by their content, not transitions between two states. Their easings
 * still come from the scale.
 * ------------------------------------------------------------------------ */

export { RevealV4 } from './RevealV4';
export type { RevealV4Props, RevealV4Effect } from './RevealV4';

export { StaggerV4, STAGGER_V4_MAX_DELAY } from './StaggerV4';
export type { StaggerV4Props } from './StaggerV4';

export { AnimatedCounterV4, COUNT_MS } from './AnimatedCounterV4';
export type { AnimatedCounterV4Props } from './AnimatedCounterV4';

export { MarqueeV4 } from './MarqueeV4';
export type { MarqueeV4Props } from './MarqueeV4';

export { ParallaxV4, PARALLAX_MAX_SPEED, clampParallaxSpeed } from './ParallaxV4';
export type { ParallaxV4Props } from './ParallaxV4';

/**
 * Web-only, and it stays that way.
 *
 * Pointer tilt maps a **hovering** pointer's position onto two rotations, and
 * touch has no hover: the finger is either absent or pressing, and while
 * pressing it covers the card it is tilting. The accelerometer substitute is a
 * different component with a different input, a peer dependency this kit does
 * not take, and its own permission story.
 *
 * `Parallax` used to be listed beside it for the same reason. That reason was
 * wrong, and `ParallaxV4` now exists on native.
 */
export { TiltCardV4 } from './TiltCardV4';
export type { TiltCardV4Props } from './TiltCardV4';
