import * as React from 'react';
import type { PointerHaloMode, PointerHaloProps } from './PointerHalo';
export type { PointerHaloMode };
/** Drop-in for {@link PointerHaloProps} — same props, the V4 "showcase" design. */
export type PointerHaloV4Props = PointerHaloProps;
/**
 * PointerHalo — **V4** "showcase" design (web only; the native twin is a
 * permanent no-op, kept for parity).
 *
 * Same technique and safety rails as the base {@link PointerHalo}: a small
 * accent halo that trails a fine (mouse) pointer via a rAF lerp written
 * straight to the element style (no re-render per move, no animation library),
 * honoring all three modes — `idle` at rest, `link` (tighten) over interactive
 * elements, and `grow` into a labelled disc over `[data-halo="grow"]` targets.
 *
 * The V4 *refines* only the look: a smoother token-tinted **radial** halo with
 * a crisper ring, a soft accent lift shadow, and a springier size transition,
 * so the cursor reads more confident while staying token-only.
 *
 * **Reduced motion + pointer:** unchanged from the base — renders `null` on the
 * server, under `prefers-reduced-motion: reduce` (same
 * `usePrefersReducedMotion` hook), and on coarse/touch pointers (runtime
 * `(pointer: fine)` check + the CSS fallback). Non-mouse pointer events are
 * ignored and the native cursor is never suppressed.
 */
export declare function PointerHaloV4({ size, linkSize, growSize, label, className, }: PointerHaloV4Props): React.ReactElement | null;
//# sourceMappingURL=PointerHaloV4.d.ts.map