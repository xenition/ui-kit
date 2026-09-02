import * as React from 'react';
import type { RiskScoreProps, RiskTier } from './RiskScore';
export interface RiskScoreV4Props extends RiskScoreProps {
    /** Scale floor. Default `0`. */
    min?: number;
    /** Scale ceiling. Default `100`. */
    max?: number;
    /** Rename a tier. Defaults `'Low risk'`, `'Moderate risk'`, `'High risk'`. */
    tierLabels?: Partial<Record<RiskTier, string>>;
    /** The meter's own name. Default: `label`. */
    scoreLabel?: string;
    /** Said when the score falls outside `min`–`max`. Default `'Off scale'`. */
    outOfRangeLabel?: string;
}
/**
 * **V4 risk score** — same props as {@link RiskScore} plus `min`, `max`,
 * `tierLabels` and `scoreLabel`.
 *
 * ## Five changes
 *
 * 1. **A 300–850 model can be rendered.** The scale was hard-coded 0–100 with
 *    33/66 cutoffs, so an insurer whose underwriting model runs on any other
 *    range could not use the component at all — a 720 clamped to 100 and
 *    reported "High risk". `min` and `max` are the caller's, and a score
 *    outside them is said out loud rather than silently clamped to the edge.
 * 2. **`score={95} tier="low"` no longer renders a green "Low risk".** An
 *    explicit `tier` overrode the score outright, and the pill was the loudest
 *    thing on the card, so the applicant read the colour and not the number.
 *    The numeral, its scale and the meter are always drawn from `score`; the
 *    tier is a word beside them, and when the caller's tier contradicts where
 *    the score actually sits, both are shown rather than one quietly winning.
 * 3. **The tier stops spending a status colour.** `low → success`,
 *    `high → danger` told an applicant they had passed or failed something. A
 *    tier is an underwriting classification, the same kind of thing as a credit
 *    band; the ordering lives in the numeral and the meter, where it is
 *    checkable, and the glyph carries the tier at a glance.
 * 4. **The meter is exposed.** The bar was decorative — `Progress` with no
 *    name — so a screen-reader user got the numeral and nothing about where it
 *    sits on the range. It is a named `progressbar` with the score, its floor
 *    and its ceiling.
 * 5. **The score was announced by a label that replaced it.** `aria-label` on
 *    the `<span>` holding the numeral meant the "/ 100" beside it was never
 *    read; the name now carries the whole reading, and every word is a prop.
 */
export declare const RiskScoreV4: React.ForwardRefExoticComponent<RiskScoreV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RiskScoreV4.d.ts.map