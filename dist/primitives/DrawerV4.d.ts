import * as React from 'react';
import type { DrawerProps, DrawerSide } from './Drawer';
export type { DrawerProps as DrawerV4Props, DrawerSide };
/**
 * `Drawer`, V4 — the same props, given the depth and the rhythm of a real
 * layer.
 *
 * ## What the depth is saying
 *
 * A side sheet is above the page and nothing is above it, so it takes
 * `--xen-elevation-sheet` — the same altitude as `ModalV4`, `BottomSheetV4` and
 * `MenuV4`, because all four are the same kind of object at different sizes and
 * a kit where they drift apart has four depth systems instead of one. The
 * content inside is flat: §8's "cards inside cards inside cards" is exactly
 * what a drawer becomes when every section in it gains a surface. The base's
 * `shadow-xl` is dropped with it — a Tailwind shadow is a fixed black at a
 * fixed alpha and knows nothing about the scheme it is falling in.
 *
 * The scrim is `--xen-elevation-color`, shared with every other V4 overlay. The
 * base's `bg-neutral-950/50` is the bug this fixes: the dark block re-emits the
 * ramps mirrored, so that class paints a near-WHITE veil over a dark page. The
 * native twin had the same defect and was fixed to black-at-a-fixed-alpha; this
 * is the same convention, spelled in CSS. A shadow does not invert, so a scrim
 * built from a shadow colour does not either.
 *
 * Glass applies only when the seed asked for `depth: 'glass'`. That is the one
 * depth check here and it is necessary: `flatten()` neutralises gradients and
 * elevation and stops there, so glass is live even under `depth: 'flat'`.
 *
 * ## Rhythm the caller does not have to supply
 *
 * The base drawer is one padded box with the title inside the scroll area, so a
 * long list scrolls its own heading off the screen. V4 splits a pinned header
 * from a scrolling body, separated by a hairline and each carrying its own
 * padding — §11: the container earns its existence by holding a structure, not
 * by drawing a box.
 *
 * ## Motion
 *
 * The panel travels the whole of itself, from the edge it is anchored to —
 * §36.5's spatial continuity, so the movement says where the drawer came from
 * and where dismissing it sends it back. 280ms is §36.2's band for a
 * screen-sized transition, and the easing decelerates so the sheet settles
 * rather than stopping dead (§36.3). Under `prefers-reduced-motion` the travel
 * becomes a fade rather than nothing at all, because an overlay that appears
 * with no transition reads as a glitch (§36.10).
 */
export declare function DrawerV4({ open, onClose, side, title, children, className, }: DrawerProps): React.ReactElement | null;
//# sourceMappingURL=DrawerV4.d.ts.map