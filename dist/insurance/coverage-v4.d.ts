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
/** A deductible against its ceiling. */
export interface DeductibleParts {
    /** Applied so far, as supplied. Never clamped. */
    met: number;
    /** The ceiling, or `undefined` when none was usable. */
    ceiling?: number;
    /** `met / ceiling`, clamped 0..1 — **for drawing only**. */
    ratio?: number;
    /** {@link ratio} as a whole percent. Never a float — the caption and the meter agree. */
    percent?: number;
    /** How much was applied beyond the ceiling. `0` when not exceeded. */
    over: number;
    /** Whether the ceiling has been reached. `false` with no ceiling. */
    satisfied: boolean;
    /** Whether a usable ceiling was supplied at all. */
    hasCeiling: boolean;
}
/**
 * Read a deductible.
 *
 * A ceiling of `0` is **no deductible recorded**, not a deductible that has
 * been met — which is what the base rendered, complete with a full green bar.
 */
export declare function deductibleParts(metCents: number, deductibleCents?: number): DeductibleParts;
/** Where a score sits on its own scale. */
export interface ScoreParts {
    /** The score, clamped into `min..max`. */
    value: number;
    /** Scale floor. */
    min: number;
    /** Scale ceiling. */
    max: number;
    /** Position within the scale, 0..1. */
    ratio: number;
    /** Whether the caller's score fell outside the scale it was given. */
    outOfRange: boolean;
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
export declare function scoreParts(score: number, min?: number, max?: number): ScoreParts;
/** A premium total, and whether it agrees with the lines under it. */
export interface PremiumParts {
    /** The sum of the supplied line items. */
    derived: number;
    /** What to print: the caller's `totalCents` when given, otherwise {@link derived}. */
    total: number;
    /**
     * Whether the printed total agrees with the lines. `false` means the card is
     * about to show a total that its own itemisation contradicts, which the base
     * did silently while its TSDoc promised the opposite.
     */
    reconciles: boolean;
}
/** Sum line items and check the caller's total against them. */
export declare function premiumParts(lineCents: readonly number[], totalCents?: number): PremiumParts;
/** A set of percentage allocations, checked as a set. */
export interface AllocationParts {
    /** Each share, clamped to 0..100, in the order given. */
    shares: number[];
    /** What they add up to. */
    total: number;
    /** Whether the set adds to exactly 100. */
    balanced: boolean;
    /** `total - 100` — positive is over-allocated, negative under. */
    remainder: number;
}
/**
 * Read beneficiary allocations as a set.
 *
 * Each row clamped itself to 0–100 independently and no component knew about
 * the others, so three rows at 50% rendered three confident figures adding to
 * 150% with no warning anywhere.
 */
export declare function allocationParts(percents: readonly number[]): AllocationParts;
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
export declare function isAdverse(status: string): boolean;
//# sourceMappingURL=coverage-v4.d.ts.map