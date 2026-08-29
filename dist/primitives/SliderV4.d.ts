import * as React from 'react';
import type { SliderProps } from './Slider';
export type { SliderProps as SliderV4Props };
/**
 * **V4 slider** — the web twin of `SliderV4`, the same props as
 * {@link Slider}, a different design line.
 *
 * ## It stays an `<input type="range">`, and that is the §36.4 answer
 *
 * "Direct manipulation must track the finger." The browser's own range input
 * already does that perfectly — the thumb is under the pointer for the whole
 * drag, with the platform's touch tuning — and it brings arrow keys, Home/End,
 * page-step and the `slider` role with it. Rebuilding it on a `div` with
 * pointer events would mean re-earning all of that and getting the touch
 * behaviour subtly wrong. So the element stays and only its skin changes.
 *
 * What the base does is the opposite trade: it keeps the element and paints it
 * with `accent-primary`, which hands the entire look to the browser. The result
 * is a different control in Safari, Chrome and Firefox, and the one part of the
 * kit that is not the kit. V4 turns the appearance off and redraws the track
 * and the thumb from tokens, so the slider is the same object everywhere — and
 * the same object as its React Native twin.
 *
 * **There is no transition on the thumb**, deliberately. A transition is
 * exactly the "disconnected canned animation" §36.4 rules out: the thumb would
 * lag the pointer by however long the easing ran.
 *
 * ## What changes
 *
 *   - **A grab strip at the tap-target floor.** The input is
 *     `--xen-space-2xl` tall even though the rail is `sm`, so the whole strip
 *     is live. A 20px-tall control is the commonest reason a slider feels like
 *     it is ignoring you.
 *   - **A rail with weight,** so the filled portion is a quantity you can read
 *     at a glance (§33) rather than a thread. The fill is painted by the track
 *     itself — a two-stop gradient with both stops at the value — so there is
 *     no second element to fall out of sync.
 *   - **A thumb that looks grabbable:** `primary` with a `surface` collar so it
 *     reads on top of its own fill, and `--xen-elevation-card`, which the
 *     compiler has already zeroed for a flat seed.
 *   - **The same focus halo `InputV4` arms,** so a slider in a form rings like
 *     its neighbours.
 */
export declare function SliderV4({ value, min, max, step, onChange, disabled, className, }: SliderProps): React.ReactElement;
//# sourceMappingURL=SliderV4.d.ts.map