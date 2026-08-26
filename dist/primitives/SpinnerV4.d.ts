import * as React from 'react';
import type { SpinnerProps, SpinnerSize } from './Spinner';
export type { SpinnerProps as SpinnerV4Props, SpinnerSize };
/**
 * **V4 spinner** — the web twin of the native `SpinnerV4`, same props as
 * {@link Spinner}, a different design line.
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
 * Linear easing, for the same reason: a revolution has no beginning to ease
 * out of, and easing one would imply a rhythm the wait does not have (§36.3).
 *
 * ## The ring is one object
 *
 * The base painted `border-neutral-300` with a `border-t-primary` notch — a
 * grey hoop with a coloured chip on it, which the eye separates into two things
 * before it reads the rotation at all. V4 mixes a fifth of `primary` into
 * `surface` for the track, so the whole ring is one hue family and what moves
 * is a bright arc around a quiet one.
 *
 * `border-neutral-300` was also a ramp step, and the ramps carry the LIGHT
 * orientation in both schemes — so the base's track was a pale hoop on a dark
 * page. `color-mix` over two scheme-aware tokens follows the scheme instead.
 */
export declare const SpinnerV4: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=SpinnerV4.d.ts.map