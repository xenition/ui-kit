import * as React from 'react';
import type { RangeSliderProps } from './RangeSlider';
export type { RangeSliderProps as RangeSliderV4Props };
/**
 * **V4 two-thumb slider** — the same props as {@link RangeSlider}, a different
 * design line.
 *
 * ## Same §36.4 rule as `SliderV4`, twice over
 *
 * No `Animated` value, no timing function: both thumbs are drawn where their
 * values are, on every render, and the values are emitted from the gesture on
 * every move. A range slider is the control where a canned animation is most
 * obviously wrong — you are usually adjusting one end while watching the span
 * between them change.
 *
 * ## Grab the nearer thumb, then move by delta
 *
 * The base picks the nearer thumb at grant (right) and then reads
 * `nativeEvent.locationX` on every move (wrong): `locationX` is relative to the
 * view under the touch, which once the drag begins is usually a thumb rather
 * than the track, so the value is measured from the wrong origin and the thumb
 * slides away from the finger.
 *
 * V4 keeps the nearer-thumb rule and switches the tracking to
 * `gestureState.dx` on top of the value that thumb was grabbed at. Delta is
 * screen-space and cannot be knocked off by which child the finger is over.
 *
 * ## The two thumbs stay distinguishable
 *
 * Each carries its own `adjustable` role, its own label, and its own
 * increment/decrement actions, so a screen-reader user can move either end —
 * the base exposes the pair with no way to operate them at all. The low thumb
 * can never pass the high one, and vice versa, so a crossed range is not
 * representable.
 *
 * Everything visual is `SliderV4`'s: the grab strip at `tapTarget()`, a rail
 * with weight so the span reads as a quantity (§33), thumbs at `spacing.lg`
 * with a `surface` collar and `elevation.card` — the one honest use of depth
 * here, already zeroed by the compiler for a flat seed.
 */
export declare function RangeSliderV4({ value, min, max, step, onChange, disabled, style, }: RangeSliderProps): React.ReactElement;
//# sourceMappingURL=RangeSliderV4.d.ts.map