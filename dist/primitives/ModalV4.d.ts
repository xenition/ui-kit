import * as React from 'react';
import type { ModalProps } from './Modal';
export type { ModalProps as ModalV4Props };
/**
 * `Modal`, V4 — the same props, lifted off the page and given its own rhythm.
 *
 * ## What the depth is saying
 *
 * A dialog is the one layer with nothing underneath it: it floats in the middle
 * of the viewport, over a page that has been pushed back. So it takes
 * `--xen-elevation-sheet` — the widest, softest of the three — and the token's
 * negative offset turns out to be exactly right here. A drop shadow implies a
 * surface below to receive it; a dialog has none, so what it wants is a halo,
 * and a large radius with a near-zero offset is a halo.
 *
 * The scrim comes from `--xen-elevation-color` rather than `bg-neutral-950/50`,
 * which inverts under `[data-theme="dark"]` — the dark block re-emits the ramps
 * mirrored — and so paints a near-WHITE veil over a dark page. That is the bug
 * the base `Modal` has today.
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
 * It also portals to `<body>`, which the base does not. A dialog rendered where
 * it was written is clipped by any ancestor with `overflow: hidden` or a
 * `transform` — the two most common things to find between a page and a button
 * that opens a dialog.
 *
 * ## Motion
 *
 * A dialog has no origin to fly in from — it is not a tapped card expanding
 * (§36.5) — so it scales up very slightly and fades, over 200ms, §36.2's band
 * for a small transition. Deliberately not a big travel: distance should be
 * proportional to how far the thing actually moved, and this moved nowhere.
 * Under `prefers-reduced-motion` only the fade remains (§36.10).
 */
export declare function ModalV4({ open, onClose, title, children, className, }: ModalProps): React.ReactElement | null;
//# sourceMappingURL=ModalV4.d.ts.map