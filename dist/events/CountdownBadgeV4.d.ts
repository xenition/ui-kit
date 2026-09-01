import * as React from 'react';
import type { CountdownBadgeProps } from './CountdownBadge';
/** The words `countdownSentence` pluralises with. */
export interface CountdownUnitLabels {
    day?: string;
    days?: string;
    hour?: string;
    hours?: string;
    minute?: string;
    minutes?: string;
}
export interface CountdownBadgeV4Props extends CountdownBadgeProps {
    /** Singular and plural for each unit of the spoken countdown. */
    unitLabels?: CountdownUnitLabels;
    /** Shown when there is nothing to count down to. Default `'Date to be announced'`. */
    unknownLabel?: string;
}
/**
 * **V4 countdown badge** — the web twin of the native `CountdownBadgeV4`, same
 * props as {@link CountdownBadge} plus `unitLabels` and `unknownLabel`.
 *
 * ## Four changes
 *
 * 1. **It stops announcing "Started" about an event nobody dated.** With
 *    neither `remainingMs` nor `target` the base fell through to `ms = 0`, and
 *    a zero delta reports elapsed — so a badge that had been told nothing
 *    confidently said the event had already begun. `countdownParts` returns
 *    `known: false` for that case and the badge renders `unknownLabel`.
 * 2. **The announcement is pluralised and actually lands.** It said "1 days 1
 *    hours 1 minutes", and it said it through `aria-label` on a role-less
 *    `div`, where a label is ignored outright. `countdownSentence()` fixes the
 *    grammar; `role="timer"` gives the label somewhere to attach.
 * 3. **The elapsed chip stops pairing `on-surface` ink with a `border` fill.**
 *    A hairline colour has no contrast promise as a surface. The elapsed and
 *    unknown chips take the neutral tone's fill and the ink the shared tone
 *    table guarantees against it — a pill, not a tag, so it keeps its radius.
 * 4. **The figures are tabular and the tiles are one token wide**, so a
 *    countdown does not jitter sideways as each digit ticks over, and the two
 *    twins compose the same width instead of `3rem` and `48`. `font-extrabold`
 *    is off the kit's weight scale.
 */
export declare const CountdownBadgeV4: React.ForwardRefExoticComponent<CountdownBadgeV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CountdownBadgeV4.d.ts.map