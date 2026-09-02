/**
 * The `kids` module's arithmetic: a measurement against a limit, a star count
 * against its maximum, and the awarding gesture that must never take stars
 * away by accident.
 *
 * Pure — no theme, no React — so the web and native twins import the same file
 * and cannot drift. Native reaches it as `../../kids/family-v4`.
 *
 * ## Why this exists
 *
 * This module repeated, exactly, the defect the `health` module was rebuilt to
 * fix: **it clamped the measurement rather than only what it drew.**
 *
 * - `<ScreenTimeBar used={-30} limit={120} />` rendered "0 min / 2h — 2h left"
 *   as though the data were sound. A negative reading from a broken sync was
 *   laundered into a plausible one instead of being reported.
 * - `used={NaN}` propagated all the way to the screen: the readout printed
 *   "NaNh NaNm" and the bar's width became the CSS string `"NaN%"`.
 * - `used={180} limit={120}` drew a full bar and announced `valuenow=180`
 *   against `valuemax=120` — an invalid range, read aloud as "180 of 120".
 * - `limit={0}` threw the reading away entirely: the parent was told "No
 *   screen-time limit set" and was never told the child had been on the device
 *   for four hours. That is the one screen where the number matters most.
 * - `AllowanceTracker` computed a clamped ratio and then used it **only as a
 *   truthiness gate**, drawing the meter from the raw numbers — so a balance
 *   of `-20` against a $100 goal announced `aria-valuenow="-20"` against
 *   `aria-valuemin="0"`, and the web V2/V3 lines dropped the lower clamp their
 *   native twins kept, printing "-20% saved" where native printed 0%.
 *
 * So {@link meterParts} never modifies the measurement. It returns the reading
 * as given, a `ratio` clamped **for drawing only**, the overage as its own
 * number, and `hasLimit` / `valid` so "no limit set" and "this input is
 * broken" stay distinct from "nought".
 */
/** A measurement against a limit or target. */
export interface MeterParts {
    /** The measurement exactly as supplied. Never clamped, never rounded. */
    value: number;
    /** The limit, or `undefined` when none was usable. */
    limit?: number;
    /** `value / limit`, clamped 0..1 — **for drawing only**. */
    ratio?: number;
    /** {@link ratio} as a whole percent, 0..100. */
    percent?: number;
    /** How far past the limit, in the value's own unit. `0` when not exceeded. */
    over: number;
    /** How far short of the limit. `0` once reached. */
    remaining: number;
    /** Whether the measurement has reached the limit. */
    reached: boolean;
    /** Whether a finite, positive limit was supplied. */
    hasLimit: boolean;
    /**
     * Whether the measurement itself was a usable number. `false` means the
     * caller handed us `NaN` or nothing — render an error or nothing at all,
     * never a confident "0 min".
     */
    valid: boolean;
}
/**
 * Read a measurement against a limit.
 *
 * Used for screen time against an allowance and for savings against a goal —
 * the same shape, and previously two different broken implementations.
 */
export declare function meterParts(value: number, limit?: number): MeterParts;
/** A star / sticker count against its maximum. */
export interface StarParts {
    /** Whole marks to draw filled, clamped into `0..max`. */
    filled: number;
    /** The maximum, a whole number `>= 0`. */
    max: number;
    /**
     * Whether the caller's count fell outside `0..max`. The base laundered this
     * silently: `<RewardStar value={9} max={5} />` drew and announced "5 of 5"
     * with no hint the caller was out of range.
     */
    outOfRange: boolean;
    /** Whether there is a scale to draw at all (`max > 0`). */
    hasScale: boolean;
}
/** Read a star count. */
export declare function starParts(value: number, max: number): StarParts;
/**
 * The next value an "award one more" gesture should produce.
 *
 * `RewardStarV2` wrote `onReward?.(filled >= total ? 1 : filled + 1)` — so a
 * parent at five of five stars who tapped once more silently dropped the child
 * to **one** star, with no undo and no confirmation. Awarding never takes
 * stars away: at the maximum the gesture is a no-op and returns `undefined`,
 * which is also what a scale of zero returns.
 */
export declare function nextAward(value: number, max: number): number | undefined;
/**
 * Whether a child-facing state is one that owes an explanation.
 *
 * `ChoreStatus` carried `skipped` with no reason field, and had no `missed`
 * member at all despite the card taking a `due` prop — a chore that blew its
 * deadline had nowhere to say so. Note this predicate exists to attach a
 * *neutral explanation*, not a reprimand: nothing in this module should draw a
 * child's conduct in the error colour.
 */
export declare function needsExplanation(status: string): boolean;
//# sourceMappingURL=family-v4.d.ts.map