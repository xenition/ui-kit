/**
 * The health module's arithmetic, in one place: a measured value against a
 * goal, and a reading against a normal range.
 *
 * Pure — no theme, no React — so the web and native twins import the same file
 * and cannot drift. Native reaches it as `../../health/goal-v4`, the same way
 * `calendar/layout-v4.ts` is shared.
 *
 * ## Why this exists
 *
 * Five separate defects in the base line were the same defect: the module kept
 * **one** number where it needed three, and clamped the measurement itself
 * rather than clamping only what it drew.
 *
 * - `GoalCard` with `value={12400} target={10000}` showed 12400, announced
 *   "12400 of 10000, 100%", and reported `aria-valuenow={10000}` — three
 *   mutually inconsistent readings of one walk.
 * - `WaterTracker` with `count={10} goal={8}` displayed "8 / 8 · 2000 ml" and
 *   announced "goal reached" for someone who logged 10 glasses and 2500 ml.
 *   The overshoot — the interesting fact — was destroyed rather than merely
 *   not drawn.
 * - `SleepBar` and `ActivityRings` treated `goal={0}` as *nought per cent*
 *   rather than as *no goal*, so a fully-slept 7.5-hour night rendered as an
 *   empty bar and 540 burned calories announced "Move 0%".
 * - Native `MiniBar` rescales any `max` below 1 to 1, so a half-hour
 *   meditation against a half-hour target drew a half-full bar under the words
 *   "Goal met". Handing it {@link GoalParts.ratio} — already a 0..1 fraction —
 *   removes the second opinion.
 *
 * So {@link goalParts} never modifies `value`. It returns the measurement as
 * given, a separate `ratio` that is clamped **for drawing only**, and the
 * overshoot as its own number. A caller that wants the old behaviour still has
 * it; a caller that wants the truth can now reach it.
 */
/** A value measured against a goal, with drawing and reporting kept apart. */
export interface GoalParts {
    /** The measurement exactly as supplied. Never clamped, never rounded. */
    value: number;
    /** The target, or `undefined` when none was usable. */
    target?: number;
    /**
     * `value / target`, clamped to 0..1 — **for drawing only**. `undefined` when
     * there is no goal, so a track can render its own "unset" treatment instead
     * of a bar that reads as zero progress.
     */
    ratio?: number;
    /** {@link ratio} as a whole percent, 0..100. `undefined` when there is no goal. */
    percent?: number;
    /** Whether the measurement has reached the target. `false` when there is no goal. */
    met: boolean;
    /** How far past the target, in the value's own unit. `0` when not exceeded. */
    over: number;
    /** Whether a finite, positive target was supplied at all. */
    hasGoal: boolean;
}
/**
 * Read a measurement against a goal.
 *
 * A target that is missing, non-finite or `<= 0` is **no goal** rather than a
 * goal of nought: `hasGoal` is false and both `ratio` and `percent` are
 * `undefined`, which is what lets a caller print "No goal set" instead of
 * drawing an empty track over a real measurement.
 */
export declare function goalParts(value: number, target?: number): GoalParts;
/** Where a reading sits against its normal band. */
export type RangeVerdict = 'low' | 'in-range' | 'high';
/** A normal band. Either bound may be omitted for a one-sided range. */
export interface HealthRange {
    /** Below this is {@link RangeVerdict} `'low'`. */
    low?: number;
    /** Above this is {@link RangeVerdict} `'high'`. */
    high?: number;
}
/**
 * Classify a reading against its normal band.
 *
 * The base line had no way to say this at all: `VitalStat` fixed its tone by
 * `variant`, so a fasting glucose of 260 mg/dL rendered identically to 95, and
 * a dangerous 190 bpm drew in the same permanent red as a resting 58. Returns
 * `undefined` when no usable band was supplied, so "we do not know" stays
 * distinct from "in range" and never borrows a status colour.
 */
export declare function rangeVerdict(value: number, range?: HealthRange): RangeVerdict | undefined;
/**
 * Pluralise a unit for a count.
 *
 * The base `StreakCounter` appended `'s'` unconditionally, so `unit="día"`
 * rendered "díass" and every non-English unit was wrong. Passing `plural`
 * makes the caller's language the caller's business; the `'s'` default only
 * applies when they have not said otherwise.
 */
export declare function pluralizeUnit(count: number, unit: string, plural?: string): string;
//# sourceMappingURL=goal-v4.d.ts.map