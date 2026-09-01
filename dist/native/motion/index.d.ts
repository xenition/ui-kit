/**
 * `@xenition/ui/native/motion` — dependency-free mount motion for React Native,
 * mirroring `@xenition/ui/motion` where it makes sense on mobile. Built on the
 * RN `Animated` API only (no animation library). Every component honors the OS
 * "Reduce Motion" setting: content renders immediately with animations off.
 *
 * On mobile the norm is a **mount** entrance, so `Reveal` animates in on mount
 * rather than on scroll, and `AnimatedCounter` counts on mount rather than on
 * scroll-into-view. `Marquee` is a scroll-independent continuous loop, so it
 * maps directly onto the RN `Animated` clock. The genuinely pointer/scroll-
 * driven pieces (`Parallax`, `TiltCard`) remain **web-only** — they depend on
 * scroll position / pointer events that have no direct React Native analogue;
 * use them from `@xenition/ui/motion` in web templates.
 */
export { Reveal } from './Reveal';
export type { RevealProps, RevealEffect } from './Reveal';
export { Stagger } from './Stagger';
export type { StaggerProps, StaggerConfig } from './Stagger';
export { Marquee } from './Marquee';
export type { MarqueeProps } from './Marquee';
export { AnimatedCounter } from './AnimatedCounter';
export type { AnimatedCounterProps } from './AnimatedCounter';
export { useReducedMotion } from '../primitives/internal/useReducedMotion';
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
//# sourceMappingURL=index.d.ts.map