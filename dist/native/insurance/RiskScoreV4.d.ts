import * as React from 'react';
import type { RiskScoreProps, RiskTier } from './RiskScore';
export interface RiskScoreV4Props extends RiskScoreProps {
    /** Floor of the caller's own scale. Default `0`. */
    min?: number;
    /** Ceiling of the caller's own scale. Default `100`. */
    max?: number;
    /** Override the three band words. */
    tierLabels?: Partial<Record<RiskTier, string>>;
    /**
     * The meter's spoken name. Defaults to
     * {@link RiskScoreProps.label} — pass it when the visible heading is a short
     * column title and the reader needs the longer form.
     */
    scoreLabel?: string;
    /** Announced when `score` falls outside `min`–`max`. Default `'Off scale'`. */
    outOfRangeLabel?: string;
}
/**
 * **V4 risk score** — same props as {@link RiskScore} plus `min`, `max`,
 * `tierLabels`, `scoreLabel` and `outOfRangeLabel`.
 *
 * ## Five changes
 *
 * 1. **A 300–850 model can be rendered at all.** The scale was hard-coded 0–100
 *    and the cutoffs hard-coded at 33 and 66, so an insurer whose underwriting
 *    model runs on any other range could not use the component: `score={720}`
 *    clamped to 100 and reported "high risk". `min` and `max` are the caller's
 *    now, the bands are thirds of *that* scale, and `scoreParts` clamps and
 *    reports rather than clamping silently.
 * 2. **The score and the tier can no longer contradict each other.**
 *    `score={95} tier="low"` rendered "95 / 100" beside a green "Low risk"
 *    pill, because an explicit `tier` overrode the number outright. The meter
 *    and the numeral always come from `score`; an explicit `tier` still chooses
 *    the *word*, because it is on the base and removing it would break
 *    callers — but with the tier no longer carrying a status colour, that word
 *    is the caller's label rather than the screen's verdict.
 * 3. **The tier stops spending the alarm palette.** `low → success`,
 *    `high → danger`, drawn as `🟢` / `🟡` / `🔴` — so a screen reader said
 *    "green circle" out loud, a colour-blind reader got three identical grey
 *    dots, and a benefits screen had already used red before anything was
 *    wrong. The band is an ordered glyph (a quarter, a half, a full disc) and a
 *    word on the neutral chip every other kind in this module wears.
 * 4. **The meter reports its value.** The base's bare `Progress` had no role,
 *    no name and no value, so the one number on the screen was invisible to a
 *    reader unless they found the numeral beside it. It is a `progressbar` on
 *    the caller's own scale, and the tier chip and the factor bullets are
 *    hidden because the meter's name already carries them.
 * 5. **A score off its own scale says so** instead of pinning the bar to an end
 *    and asserting a band.
 *
 * The factor bullets lose their `•` from the reader's path — the base drew a
 * `Text` node containing a bullet character beside every factor, and a screen
 * reader announces it.
 */
export declare function RiskScoreV4({ score, tier, label, factors, min, max, tierLabels, scoreLabel, outOfRangeLabel, style, }: RiskScoreV4Props): React.ReactElement;
//# sourceMappingURL=RiskScoreV4.d.ts.map