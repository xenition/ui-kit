/**
 * The `hr` module's arithmetic and its one piece of shared vocabulary: what a
 * rating actually is, how a day's hours split, which way a payroll line points,
 * and which statuses owe the reader a reason.
 *
 * Pure — no theme, no React — so the web and native twins import the same file
 * and cannot drift. Native reaches it as `../../hr/workforce-v4`, the same way
 * `calendar/layout-v4.ts` is shared.
 *
 * ## Why this exists
 *
 * The base line computed each of these inline, twice, and the two copies
 * disagreed with the text printed beside them:
 *
 * - `ratingMax={NaN}` — an API field that parsed badly — walked through
 *   `Math.max(1, Math.floor(NaN))` unchanged and rendered the visible string
 *   "NaN/NaN" and `aria-label="Rating NaN of NaN"`.
 * - The star row used `Math.round(rated)` while the text printed `rated` raw,
 *   so `rating={4.5}` drew **five** filled stars — a perfect score — beside the
 *   words "4.5/5".
 * - `hours={2} overtimeHours={10}` rendered "2h 0m" with "+10h 0m OT" beneath
 *   it, because overtime was only ever tested for `> 0` and never against the
 *   total it is documented to be part of.
 * - `deductionsCents={-5000}` — how most payroll APIs sign a refunded
 *   deduction — rendered "−-$50.00", a literal U+2212 prepended to an
 *   already-negative `formatMoney` result.
 */
/** A rating, with what is drawn and what is printed forced to agree. */
export interface RatingParts {
    /** The rating, clamped into `0..max`. Never `NaN`. */
    value: number;
    /** The scale's top, a whole number `>= 1`. Never `NaN`. */
    max: number;
    /** Whole marks to draw filled. **Floored**, so 4.5 never draws as 5. */
    filled: number;
    /** Whether a part-mark remains after {@link filled} — draw it as a half. */
    partial: boolean;
    /** `value / max`, 0..1, for a meter. */
    ratio: number;
}
/**
 * Read a rating against its scale.
 *
 * `filled` is floored rather than rounded: a drawn mark claims a whole point,
 * and rounding up made a 4.5 look like a 5 next to the text that said 4.5.
 * Callers that want to show the remainder have {@link RatingParts.partial}.
 */
export declare function ratingParts(rating: number, max?: number): RatingParts;
/** A day's hours, with overtime kept inside the total it belongs to. */
export interface HoursParts {
    /** Total hours worked, never negative. */
    total: number;
    /** Overtime, clamped so it can never exceed {@link total}. */
    overtime: number;
    /** `total - overtime` — the ordinary hours. */
    regular: number;
    /**
     * Whether the overtime supplied was larger than the total. The component
     * should say so rather than silently drawing a corrected figure — the input
     * is wrong and someone's pay depends on it.
     */
    inconsistent: boolean;
}
/**
 * Split a day's hours.
 *
 * Overtime is documented as **included in** `hours`, so `hours={2}
 * overtimeHours={10}` is not a big overtime day — it is bad data, and the row
 * used to render it as though both numbers were true.
 */
export declare function hoursParts(hours: number, overtimeHours?: number): HoursParts;
/** Which way a payroll line moves the employee's money. */
export type AmountDirection = 'debit' | 'credit' | 'zero';
/** A payroll amount, separated into a direction and a magnitude to format. */
export interface AmountParts {
    /** `debit` is money taken, `credit` money given back, `zero` neither. */
    direction: AmountDirection;
    /** Always `>= 0`. Hand this to `formatMoney` and add the sign yourself. */
    magnitudeCents: number;
}
/**
 * Read a deduction.
 *
 * The base prepended a literal `−` to `formatMoney(cents)` and so printed
 * "−-$50.00" for a refunded deduction. Formatting the **magnitude** and taking
 * the sign from {@link AmountParts.direction} means the glyph is chosen once,
 * and a refund can read as a credit rather than as a negative debit.
 */
export declare function deductionParts(cents: number): AmountParts;
/**
 * Whether a status is one the reader is owed a reason for.
 *
 * Six components in this module carry an adverse member in their status union
 * and not one had a field to say why: a rejected $840 lodging claim rendered
 * "✕ Rejected" above the claimant's own memo, and a `blocked` onboarding task
 * could not say it was waiting on IT. A component whose status satisfies this
 * predicate must accept a `reason` and give it somewhere to show.
 */
export declare function isAdverse(status: string): boolean;
/**
 * Count a thing in English, with an escape hatch.
 *
 * `OrgChartNode` and `LeaveRequest` both pluralised by appending `'s'` with no
 * override, which is wrong in every language the kit is otherwise ready for.
 * Components should expose a `formatCount` prop and fall back to this.
 */
export declare function pluralizeCount(count: number, singular: string, plural?: string): string;
//# sourceMappingURL=workforce-v4.d.ts.map