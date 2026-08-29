import * as React from 'react';
import type { BottomNavItem, BottomNavProps } from './BottomNav';
export type { BottomNavProps as BottomNavV4Props, BottomNavItem };
/**
 * **V4 bottom navigation** — same props as {@link BottomNav}, a different
 * design line.
 *
 * ## The selected state is a shape, not just a colour
 *
 * The base bar said "you are here" with one channel: the label went from
 * `muted` to `primary`. That is the weakest possible answer to §29's question,
 * and it fails twice over — `colors.primary` is a FILL slot with no contrast
 * promise as text, and a colour-only signal is invisible to a good share of
 * readers.
 *
 * V4 says it three ways. A **contained fill** sits behind the active icon —
 * `primary` composited OPAQUELY into `surface` at 14%, so it is a real colour
 * rather than a translucent one borrowing whatever is behind the bar. The
 * label moves to `primaryText`, the compiler's brand hue walked until it
 * clears AA. And the weight goes to 600. Any one of the three read on its own
 * is enough to answer the question (§32).
 *
 * The fill is the one place this component is allowed a capsule. §8 bans
 * *excessive* pill-shaped controls; here the pill is the smallest shape that
 * can hold an icon without looking like a button, and it defers to the seed —
 * `radius.full` is 0 on a `sharp` brand, so a sharp app gets a sharp indicator.
 *
 * ## Why the bar has a shadow, and why it points up
 *
 * A bottom bar genuinely floats above scrolling content, so `elevation.sheet`
 * is layer order made visible rather than decoration. Its `offsetY` is
 * NEGATIVE — the compiler built it for a sheet rising from the bottom edge —
 * which is exactly the direction a bottom bar's shadow has to fall: onto the
 * content passing underneath it, not onto the home indicator below. A
 * `depth: 'flat'` seed zeroes it with no branch in this file, and the top
 * hairline still separates the bar from the page.
 *
 * Glass is the one thing that must be asked for, because the compiler never
 * neutralises it: at `depth: 'glass'` the bar becomes translucent and its
 * hairline switches to the glass edge, which is the only treatment where
 * content scrolling under a nav bar is a feature rather than a smear.
 *
 * ## Reach and safe areas
 *
 * Every cell clears 44pt above the inset, composed from the spacing scale, and
 * the device's bottom inset is added on top so the bar clears the home
 * indicator rather than sitting under it (§30).
 */
export declare function BottomNavV4({ items, active, onChange, style, }: BottomNavProps): React.ReactElement;
//# sourceMappingURL=BottomNavV4.d.ts.map