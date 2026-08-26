/**
 * Motion for the **V4 design line**, on Material Design 3's named scale.
 *
 * The line was built against `design.md` §36.2, which sets *bands* — micro
 * feedback 100–180ms, small state transitions 160–240ms, sheets 220–320ms —
 * and a band is not a scale. Each file picked a number inside its band and
 * they all picked differently: a sweep of the 74 pairs found `120`, `140`,
 * `160`, `180`, `200`, `280` and `300` in use, seven durations for four ideas,
 * plus three easings for one — `ease`, `ease-out`, and a hand-tuned
 * `cubic-bezier(0.16, 1, 0.3, 1)`.
 *
 * The numbers here are M3's, verbatim, from `material-components/material-web`,
 * `tokens/versions/v0_192/_md-sys-motion.scss` (fetched 2026-08-26): durations
 * step 50/100/150/200/250/300/350/400…, standard easing is
 * `cubic-bezier(0.2, 0, 0, 1)`, emphasized-decelerate is
 * `cubic-bezier(0.05, 0.7, 0.1, 1)` and standard-accelerate is
 * `cubic-bezier(0.3, 0, 1, 1)`. They reach the kit as `theme.motion`; this
 * module is the compile-time half, for the `<style>` sheets that are injected
 * once per document and so cannot read a theme.
 *
 * The rule the whole line now follows, so the next component does not have to
 * pick again:
 *
 *   - **micro-feedback** — a glyph turning, a ring lighting, a swatch
 *     acknowledging a tap → {@link V4_MOTION.quick} (100ms).
 *   - **a control changing state** — a checkbox filling, a switch throwing, an
 *     accordion opening, a dialog scaling in → `standard` (200ms).
 *   - **something crossing the screen** — a bottom sheet, a drawer →
 *     `enter` (400ms), with {@link EASE_ENTER}.
 *
 * Easing follows the direction of travel, which is what §36.3 asks for and
 * what M3 spells out: `EASE_STANDARD` for a state change that starts and ends
 * in place, `EASE_ENTER` for something arriving, `EASE_EXIT` for something
 * leaving.
 *
 * Nothing here touches reduced motion. Every sheet that animates keeps its own
 * `@media (prefers-reduced-motion: reduce)` block, and those are untouched —
 * a scale decides how long a movement takes, not whether it happens.
 */

import { MOTION } from '../../theme/compile';

/**
 * The M3 motion scale, for the places that cannot reach a compiled theme.
 * Identical to `useXenitionTheme().motion` — durations and easings are
 * seed-independent, which is the point of an industry scale.
 */
export const V4_MOTION = MOTION;

/** An M3 easing quadruple as a CSS `cubic-bezier()`. */
export function easingCss(easing: readonly [number, number, number, number]): string {
  return `cubic-bezier(${easing.join(', ')})`;
}

/** `cubic-bezier(0.2, 0, 0, 1)` — a state change that starts and ends in place. */
export const EASE_STANDARD = easingCss(V4_MOTION.easingStandard);

/** `cubic-bezier(0.05, 0.7, 0.1, 1)` — M3 emphasized-decelerate. Arrivals. */
export const EASE_ENTER = easingCss(V4_MOTION.easingEnter);

/** `cubic-bezier(0.3, 0, 1, 1)` — M3 standard-accelerate. Departures. */
export const EASE_EXIT = easingCss(V4_MOTION.easingExit);

/**
 * A `transition` value for one or more properties at one duration and easing.
 *
 * `transitionCss(['border-color', 'box-shadow'], V4_MOTION.standard)` rather
 * than the same string typed out twice with the second one 20ms adrift.
 */
export function transitionCss(
  properties: readonly string[],
  duration: number = V4_MOTION.standard,
  easing: string = EASE_STANDARD
): string {
  return properties.map((p) => `${p} ${duration}ms ${easing}`).join(', ');
}
