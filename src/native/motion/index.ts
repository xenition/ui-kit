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

/* ------------------------------------------------------------------------ *
 * The V4 line
 *
 * Five components on the shared M3 motion scale — `motion-v4.ts`'s adapter
 * over `quick` 100 / `standard` 200 / `enter` 400, with easing chosen by
 * direction of travel. See `MOTION-V4-BRIEF.md`.
 *
 * **The web-only note above is out of date and is corrected here.** It claimed
 * `Parallax` and `TiltCard` both depend on input with "no direct React Native
 * analogue". That is true of `TiltCard` and false of `Parallax`: an
 * `Animated.ScrollView` with `onScroll` through `useNativeDriver` is the
 * canonical RN parallax and the most common scroll effect on mobile.
 * `ParallaxV4` exists below, and it takes the scroll offset as an
 * `Animated.Value` prop so the CALLER keeps ownership of the `ScrollView` — a
 * component must not try to own the scroll container it lives inside.
 *
 * `TiltCardV4` really is web-only: pointer tilt maps a **hovering** pointer
 * onto two rotations, and touch has no hover — the finger is either absent or
 * pressing, and while pressing it covers the card. The accelerometer
 * substitute is a different component with a different input, a peer
 * dependency this kit does not take, and its own permission story.
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
