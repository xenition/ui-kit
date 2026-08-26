import * as React from 'react';
import type { SliderProps } from './Slider';
export type { SliderProps as SliderV4Props };
/**
 * **V4 slider** — the same props as {@link Slider}, a different design line.
 *
 * ## §36.4 is the whole component
 *
 * "Direct manipulation must track the finger." Not "ends up where the finger
 * was" — *tracks*. So there is **no `Animated` value anywhere in this file, and
 * no timing function at all.** The thumb's position is derived from `value` on
 * every render, and `value` is emitted from the gesture on every move. The
 * thumb is where the finger is because it is drawn there, not because something
 * is animating towards there.
 *
 * The press halo obeys the same rule: it is on or it is off, painted in the
 * same render as the position that produced it. A 120ms fade on a halo attached
 * to a dragging thumb is a halo that trails the thumb, which is worse than
 * having none.
 *
 * ## Tracking by delta, not by coordinate
 *
 * The base reads `nativeEvent.locationX` on every move. `locationX` is relative
 * to the view the touch is currently over — and once the drag starts, that view
 * is often the thumb, not the track, so the reported position is measured from
 * the wrong origin and the thumb drifts away from the finger.
 *
 * V4 grabs once and moves by delta: the tap that starts the gesture sets the
 * value from the track (so tapping the rail still jumps there, which is the
 * behaviour everyone expects), and every subsequent move adds `gestureState.dx`
 * to the value it started from. Delta is measured in screen space and cannot be
 * knocked off by which child the finger happens to be over.
 *
 * ## What it looks like
 *
 *   - **A grab strip at `tapTarget()`.** The rail is thin, but the whole 48px
 *     strip is live. A 20px-tall control is the single most common reason a
 *     slider feels like it is ignoring you.
 *   - **A rail with weight.** `spacing.sm` rather than a hairline, so the
 *     filled portion is a quantity you can read at a glance (§33 — optimise for
 *     scanning) rather than a thread.
 *   - **A thumb that looks grabbable.** `spacing.lg` across, `primary` with a
 *     `surface` collar so it reads on top of its own fill, and
 *     `elevation.card` — the one place depth is honest here, because a knob
 *     genuinely is above the track. `flatten()` has already zeroed it for a
 *     flat seed, so no depth check is needed.
 *
 * ## Keyboard and assistive tech
 *
 * `adjustable` with real increment/decrement actions, so the control is
 * operable by a screen reader's swipe gestures and not only by dragging.
 */
export declare function SliderV4({ value, min, max, step, onValueChange, onChange, disabled, style, }: SliderProps): React.ReactElement;
//# sourceMappingURL=SliderV4.d.ts.map