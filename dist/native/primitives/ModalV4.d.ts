import * as React from 'react';
import type { ModalProps } from './Modal';
export type { ModalProps as ModalV4Props };
/**
 * `Modal`, V4 — the same props, lifted off the page and given its own rhythm.
 *
 * ## What the depth is saying
 *
 * A dialog is the one layer with nothing underneath it: it floats in the middle
 * of the screen, over a page that has been pushed back. So it takes
 * `elevation.sheet` — the widest, softest of the three — and the token's
 * negative offset turns out to be exactly right here. A drop shadow implies a
 * surface below to receive it; a dialog has none, so what it wants is a halo,
 * and a large radius with a near-zero offset is a halo.
 *
 * The scrim comes from the shadow colour rather than from `onSurface`, which
 * inverts with the scheme and paints a near-WHITE veil over a dark page — the
 * bug the base `Modal` has today (it reaches for `ramps.neutral[950]`, and the
 * ramps carry the LIGHT orientation in both schemes, so in dark mode that step
 * is the lightest one there is).
 *
 * Glass is applied only when the seed asked for `depth: 'glass'` — the single
 * depth check, and a necessary one: `flatten()` neutralises gradients and
 * elevation and stops there, so glass is live even under `depth: 'flat'`.
 * Elevation is consumed unconditionally and flat falls out for free.
 *
 * ## Rhythm the caller does not have to supply
 *
 * The base modal is one padded box: a title, then whatever you passed, with any
 * structure left to you. V4 has a header and a body, separated by a hairline
 * and each carrying its own padding — so a dialog reads as a dialog whether the
 * caller wrapped its content or not. The body scrolls at 80% of the viewport
 * height, which keeps the title pinned instead of pushing it off-screen when
 * the content is long. §11: the container earns its existence by holding a
 * structure, not by drawing a box.
 *
 * ## Motion
 *
 * A dialog has no origin to fly in from — it is not a tapped card expanding
 * (§36.5) — so it scales up very slightly and fades, over 200ms, which is
 * §36.2's band for a small transition. It is deliberately not a big travel:
 * distance should be proportional to how far the thing actually moved, and this
 * moved nowhere. Under Reduce Motion the scale is dropped and only the fade
 * remains (§36.10).
 */
export declare function ModalV4({ open, onClose, title, children }: ModalProps): React.ReactElement;
//# sourceMappingURL=ModalV4.d.ts.map