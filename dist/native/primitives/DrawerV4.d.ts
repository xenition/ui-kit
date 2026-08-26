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
 * `elevation.sheet` — the same altitude as `ModalV4`, `BottomSheetV4` and
 * `MenuV4`, because all four are the same kind of object at different sizes and
 * a kit where they drift apart has four depth systems instead of one. The
 * content inside is flat: §8's "cards inside cards inside cards" is exactly
 * what a drawer becomes when every section in it gains a surface.
 *
 * The scrim is `scrimColor` — the shadow colour at a fixed alpha, shared with
 * every other V4 overlay. The base `Drawer` learned this the hard way: its
 * scrim was `colors.onSurface`, which INVERTS with the scheme (at the warm
 * seed, dark `onSurface` compiles to `#eeeded`) and painted a 50% white veil
 * over a dark page. It is fixed there now, and this keeps the fixed
 * convention rather than re-deriving it — a shadow does not invert, so a scrim
 * built from a shadow colour does not either.
 *
 * Glass applies only when the seed asked for `depth: 'glass'`, via `panelSkin`.
 * That is the one depth check in this file and it is necessary: `flatten()`
 * neutralises gradients and elevation and stops there, so glass is live even
 * under `depth: 'flat'`. Elevation is consumed unconditionally and a flat seed
 * falls out for free.
 *
 * ## Rhythm the caller does not have to supply
 *
 * The base drawer is one padded box with the title inside the scroll area, so a
 * long list scrolls its own heading off the screen. V4 splits a pinned header
 * from a scrolling body, separated by a hairline and each carrying its own
 * padding — §11: the container earns its existence by holding a structure, not
 * by drawing a box.
 *
 * The panel's measure comes off the spacing scale (`2xl × 7`) rather than the
 * base's literal 360. The point is not that 360 is wrong; it is that a number
 * written into a component cannot move when the theme's density does.
 *
 * ## Motion
 *
 * The panel travels the whole of itself, from the edge it is anchored to —
 * §36.5's spatial continuity, so the movement says where the drawer came from
 * and where dismissing it sends it back. `SURFACE_MOTION.sheet` (280ms) is
 * §36.2's band for a screen-sized transition, and the easing decelerates so the
 * sheet settles rather than stopping dead (§36.3). Under Reduce Motion the
 * travel is dropped and the scrim's fade carries the whole transition
 * (§36.10) — the panel still arrives, it simply does not slide.
 */
export declare function DrawerV4({ open, onClose, side, title, children, style, }: DrawerProps): React.ReactElement;
//# sourceMappingURL=DrawerV4.d.ts.map