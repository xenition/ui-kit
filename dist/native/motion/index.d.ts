/**
 * `@xenition/ui/native/motion` — dependency-free mount motion for React Native,
 * mirroring `@xenition/ui/motion` where it makes sense on mobile. Built on the
 * RN `Animated` API only (no animation library). Every component honors the OS
 * "Reduce Motion" setting: content renders immediately with animations off.
 *
 * On mobile the norm is a **mount** entrance, so `Reveal` animates in on mount
 * rather than on scroll. The scroll/pointer-driven web pieces
 * (`Parallax`, `Marquee`, `TiltCard`) and `AnimatedCounter` are **web-only** —
 * they depend on scroll position / pointer events / `IntersectionObserver` that
 * have no direct React Native analogue; use them from `@xenition/ui/motion` in
 * web templates.
 */
export { Reveal } from './Reveal';
export type { RevealProps, RevealEffect } from './Reveal';
export { Stagger } from './Stagger';
export type { StaggerProps, StaggerConfig } from './Stagger';
export { useReducedMotion } from '../primitives/internal/useReducedMotion';
//# sourceMappingURL=index.d.ts.map