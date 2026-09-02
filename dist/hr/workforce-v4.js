"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingParts = ratingParts;
exports.hoursParts = hoursParts;
exports.deductionParts = deductionParts;
exports.isAdverse = isAdverse;
exports.pluralizeCount = pluralizeCount;
/** Coerce anything non-finite (NaN, Infinity, undefined) to a fallback. */
function finite(value, fallback = 0) {
    return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}
/**
 * Read a rating against its scale.
 *
 * `filled` is floored rather than rounded: a drawn mark claims a whole point,
 * and rounding up made a 4.5 look like a 5 next to the text that said 4.5.
 * Callers that want to show the remainder have {@link RatingParts.partial}.
 */
function ratingParts(rating, max) {
    const m = Math.max(1, Math.floor(finite(max, 5)));
    const value = Math.min(Math.max(finite(rating), 0), m);
    const filled = Math.floor(value);
    return {
        value,
        max: m,
        filled,
        partial: value - filled > 0,
        ratio: value / m,
    };
}
/**
 * Split a day's hours.
 *
 * Overtime is documented as **included in** `hours`, so `hours={2}
 * overtimeHours={10}` is not a big overtime day — it is bad data, and the row
 * used to render it as though both numbers were true.
 */
function hoursParts(hours, overtimeHours) {
    const total = Math.max(0, finite(hours));
    const raw = Math.max(0, finite(overtimeHours));
    const overtime = Math.min(raw, total);
    return {
        total,
        overtime,
        regular: total - overtime,
        inconsistent: raw > total,
    };
}
/**
 * Read a deduction.
 *
 * The base prepended a literal `−` to `formatMoney(cents)` and so printed
 * "−-$50.00" for a refunded deduction. Formatting the **magnitude** and taking
 * the sign from {@link AmountParts.direction} means the glyph is chosen once,
 * and a refund can read as a credit rather than as a negative debit.
 */
function deductionParts(cents) {
    const c = Math.round(finite(cents));
    if (c === 0)
        return { direction: 'zero', magnitudeCents: 0 };
    return { direction: c > 0 ? 'debit' : 'credit', magnitudeCents: Math.abs(c) };
}
/**
 * Whether a status is one the reader is owed a reason for.
 *
 * Six components in this module carry an adverse member in their status union
 * and not one had a field to say why: a rejected $840 lodging claim rendered
 * "✕ Rejected" above the claimant's own memo, and a `blocked` onboarding task
 * could not say it was waiting on IT. A component whose status satisfies this
 * predicate must accept a `reason` and give it somewhere to show.
 */
function isAdverse(status) {
    switch (status) {
        case 'rejected':
        case 'denied':
        case 'failed':
        case 'overdue':
        case 'blocked':
        case 'expired':
        case 'action-needed':
            return true;
        default:
            return false;
    }
}
/**
 * Count a thing in English, with an escape hatch.
 *
 * `OrgChartNode` and `LeaveRequest` both pluralised by appending `'s'` with no
 * override, which is wrong in every language the kit is otherwise ready for.
 * Components should expose a `formatCount` prop and fall back to this.
 */
function pluralizeCount(count, singular, plural) {
    const n = finite(count);
    return `${n} ${Math.abs(n) === 1 ? singular : (plural ?? `${singular}s`)}`;
}
//# sourceMappingURL=workforce-v4.js.map