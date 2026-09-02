"use strict";
/**
 * The `insurance` module's arithmetic: a deductible against its ceiling, a risk
 * score against its own scale, a premium against the lines it claims to sum,
 * and a set of beneficiary allocations against 100%.
 *
 * Pure — no theme, no React — so the web and native twins import the same file
 * and cannot drift. Native reaches it as `../../insurance/coverage-v4`.
 *
 * ## Why this exists
 *
 * Every number in this module was computed inline and then disagreed with the
 * words printed beside it:
 *
 * - **`DeductibleBar` announced an unrounded float.** It passed
 *   `value={ratio * 100}` straight to the meter, so `metCents={10000}
 *   deductibleCents={30000}` announced "33.33333333333333" while the caption
 *   said 33% and the money line said $100.00 / $300.00 — three renderings of
 *   one ratio.
 * - **A met-beyond-total was hidden.** `metCents={150000}` against a
 *   `deductibleCents={100000}` displayed "$1,000.00 / $1,000.00" and never
 *   said the extra $500 had been applied.
 * - **A zero ceiling read as satisfied.** `ratio = 1` whenever the deductible
 *   was `<= 0`, so a policy with no deductible recorded rendered a full green
 *   bar reading "Deductible met".
 * - **`RiskScore` let `tier` and `score` contradict each other.**
 *   `<RiskScore score={95} tier="low" />` rendered "95 / 100" beside a green
 *   "Low risk" pill. The 0–100 range and the 33/66 cutoffs were hard-coded, so
 *   an insurer whose model runs 300–850 could not use the component at all.
 * - **`PremiumSummary`'s TSDoc promised the total "always reconciles with the
 *   lines shown"**, then let `totalCents` win outright: three lines summing to
 *   $120.00 printed above a $99.00 Total.
 * - **`BeneficiaryRow` clamped each row independently** with no notion of the
 *   set, so three rows at 50% rendered three confident figures totalling 150%.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deductibleParts = deductibleParts;
exports.scoreParts = scoreParts;
exports.premiumParts = premiumParts;
exports.allocationParts = allocationParts;
exports.isAdverse = isAdverse;
/** Coerce anything non-finite (NaN, Infinity, undefined) to 0. */
function finite(value) {
    return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}
/**
 * Read a deductible.
 *
 * A ceiling of `0` is **no deductible recorded**, not a deductible that has
 * been met — which is what the base rendered, complete with a full green bar.
 */
function deductibleParts(metCents, deductibleCents) {
    const met = finite(metCents);
    const ceiling = finite(deductibleCents);
    if (ceiling <= 0) {
        return { met, over: 0, satisfied: false, hasCeiling: false };
    }
    const ratio = Math.min(Math.max(met / ceiling, 0), 1);
    return {
        met,
        ceiling,
        ratio,
        percent: Math.round(ratio * 100),
        over: Math.max(0, met - ceiling),
        satisfied: met >= ceiling,
        hasCeiling: true,
    };
}
/**
 * Read a score against an explicit scale.
 *
 * The base hard-coded 0–100 and the 33/66 tier cutoffs, so a model running
 * 300–850 could not be rendered. The scale is now the caller's, and a score
 * outside it is reported rather than silently clamped — `outOfRange` is how a
 * component says "this number is not on this scale" instead of drawing a full
 * bar and asserting a tier.
 */
function scoreParts(score, min = 0, max = 100) {
    const lo = finite(min);
    const hiRaw = finite(max);
    const hi = hiRaw > lo ? hiRaw : lo + 1;
    const raw = finite(score);
    const value = Math.min(Math.max(raw, lo), hi);
    return {
        value,
        min: lo,
        max: hi,
        ratio: (value - lo) / (hi - lo),
        outOfRange: raw < lo || raw > hi,
    };
}
/** Sum line items and check the caller's total against them. */
function premiumParts(lineCents, totalCents) {
    const derived = lineCents.reduce((sum, c) => sum + Math.trunc(finite(c)), 0);
    if (totalCents === undefined || !Number.isFinite(totalCents)) {
        return { derived, total: derived, reconciles: true };
    }
    const total = Math.trunc(totalCents);
    return { derived, total, reconciles: total === derived };
}
/**
 * Read beneficiary allocations as a set.
 *
 * Each row clamped itself to 0–100 independently and no component knew about
 * the others, so three rows at 50% rendered three confident figures adding to
 * 150% with no warning anywhere.
 */
function allocationParts(percents) {
    const shares = percents.map((p) => Math.min(Math.max(finite(p), 0), 100));
    const total = shares.reduce((sum, p) => sum + p, 0);
    return { shares, total, balanced: total === 100, remainder: total - 100 };
}
/**
 * Whether a policy or claim state is one the reader is owed a reason for.
 *
 * `ClaimStatusTracker` had no field for a denial reason and **invented** one:
 * it hard-coded "Reviewed after filing. Contact your agent to appeal." as the
 * body of the denial banner, so a claim denied because the damage predates
 * policy inception asserted a reason the caller never supplied and could not
 * correct. `PolicyCard`'s `lapsed` and `cancelled` had no reason, no date and
 * no next step.
 */
function isAdverse(status) {
    switch (status) {
        case 'denied':
        case 'rejected':
        case 'lapsed':
        case 'cancelled':
        case 'expired':
        case 'overdue':
        case 'voided':
            return true;
        default:
            return false;
    }
}
//# sourceMappingURL=coverage-v4.js.map