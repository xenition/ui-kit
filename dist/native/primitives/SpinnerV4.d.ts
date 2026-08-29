import * as React from 'react';
import type { SpinnerProps, SpinnerSize } from './Spinner';
export type { SpinnerProps as SpinnerV4Props, SpinnerSize };
/**
 * **V4 spinner** — same props as {@link Spinner}, a different design line.
 *
 * ## Why it stopped being an `ActivityIndicator`
 *
 * The base spinner is the platform's `ActivityIndicator`, which spins whatever
 * the user's accessibility settings say. `design.md` §36.10 asks that motion be
 * respected as a preference, and a component that cannot switch itself off is
 * not respecting anything. V4 draws its own ring — a circle with one edge in
 * the brand — so Reduce Motion can actually stop it.
 *
 * Stopped, it is still a spinner: the ring keeps its bright arc, and a ring
 * that is brighter on one side is legible as "working" without moving at all.
 * §36.10's point is that the *information* survives the loss of the animation,
 * not that the component disappears.
 *
 * ## What the motion is allowed to say
 *
 * §36.7: loading feedback exists to reduce uncertainty, and it must not
 * fabricate precision. A spinner is what you use when the wait is short and
 * **unknown**, so this one is honestly shapeless — one continuous revolution,
 * no start, no end, no percentage. It never becomes a bar, never fills, never
 * accelerates toward a finish it cannot see. The moment a component knows the
 * fraction, the right component is `ProgressV4`.
 *
 * ## Tokens all the way down
 *
 * The three sizes are `spacing.md` / `lg` / `xl` — which happen to be the very
 * 16 / 24 / 32 the base hard-coded. The point is not that those numbers were
 * wrong; it is that a number written into a component cannot move when the
 * theme's density does. The stroke is derived from the diameter, and the bright
 * arc is held to 3:1 against its own track — WCAG's bar for a meaningful
 * graphic, which is what a spinner is.
 */
export declare function SpinnerV4({ size, style }: SpinnerProps): React.ReactElement;
//# sourceMappingURL=SpinnerV4.d.ts.map