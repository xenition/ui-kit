/**
 * The `jobs` module's arithmetic: what a salary band actually says, where an
 * application sits in its pipeline, and how long ago something happened.
 *
 * Pure — no theme, no React — so the web and native twins import the same file
 * and cannot drift. Native reaches it as `../../jobs/hiring-v4`.
 *
 * ## Why this exists
 *
 * `format.ts` and `types.ts` are duplicated verbatim in `src/jobs/` and
 * `src/native/jobs/`, differing only in a doc comment. The bodies have not
 * drifted yet — but their *consumers* already have: an unrecognised
 * application stage falls back to the label `'Applied'` on web
 * (`StatusPipeline.tsx:34`) and to the raw union member `'applied'` on native
 * (`native/jobs/StatusPipeline.tsx:42`), so the same input announces two
 * different things. Anything the V4 line needs from those helpers goes here
 * instead, in one file both twins import.
 *
 * The three findings this module encodes:
 *
 * - **`formatSalary` validated nothing.** It tested only `typeof min ===
 *   'number'`, which `NaN` passes. `{min: 120000, max: 90000}` rendered
 *   "$120K – $90K/yr" — a band that runs backwards — and `{min: NaN}` rendered
 *   "From $NaN/yr", with the `aria-label` repeating the same broken string.
 * - **An unknown stage was reported as stage 1.** `Math.max(0,
 *   indexOf(stage))` turns "not found" (`-1`) into the first stage, so a
 *   withdrawn application announced "Stage 1 of 5: Applied" with total
 *   confidence.
 * - **`formatRelative` rounded where it had to floor.** `Math.round(days / 30)`
 *   reports 25 days ago as "1mo ago", and `Math.round(mins / 60)` reports 90
 *   minutes as "2h ago". Elapsed time has happened or it has not; rounding up
 *   claims time that has not passed.
 */

/** Coerce anything non-finite (NaN, Infinity, undefined) to `undefined`. */
function finiteOrUndefined(value: number | undefined): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

/** A salary band, with the bad inputs separated from the good ones. */
export interface SalaryParts {
  /** The lower bound, or `undefined` when none was usable. */
  min?: number;
  /** The upper bound, or `undefined` when none was usable. */
  max?: number;
  /** Whether there is anything at all worth rendering. */
  valid: boolean;
  /**
   * Whether the caller supplied the bounds the wrong way round. They are
   * swapped in {@link min} / {@link max} so the band always reads forwards,
   * but the flag is exposed because it means the caller's data is wrong and a
   * component may want to say so rather than quietly correct it.
   */
  inverted: boolean;
}

/**
 * Read a salary band.
 *
 * A negative bound is dropped rather than rendered: nobody is paid "-$5K", and
 * the base printed exactly that. A band with one usable bound is still valid —
 * that is the "From $90K" case — and a band with none is not.
 */
export function salaryParts(min?: number, max?: number): SalaryParts {
  let lo = finiteOrUndefined(min);
  let hi = finiteOrUndefined(max);
  if (lo !== undefined && lo < 0) lo = undefined;
  if (hi !== undefined && hi < 0) hi = undefined;

  let inverted = false;
  if (lo !== undefined && hi !== undefined && lo > hi) {
    inverted = true;
    [lo, hi] = [hi, lo];
  }
  return { min: lo, max: hi, valid: lo !== undefined || hi !== undefined, inverted };
}

/** Where something sits in an ordered pipeline. */
export interface StageParts<T extends string> {
  /** The resolved stage. Falls back to the first when unknown. */
  stage: T;
  /** Zero-based position, clamped into the list. */
  index: number;
  /** How many stages there are. */
  total: number;
  /**
   * Whether the stage given was actually in the list. `false` means the
   * position is a guess, and a component must not announce "Stage 1 of 5" as
   * though it knew — which is exactly what the base did for a withdrawn
   * application.
   */
  known: boolean;
}

/**
 * Locate a stage in its pipeline.
 *
 * Both twins wrote `Math.max(0, stages.indexOf(stage))` inline and then
 * disagreed about what to render for the not-found case. Here the miss is
 * reported rather than disguised.
 */
export function stageParts<T extends string>(stage: T, stages: readonly T[]): StageParts<T> {
  const total = stages.length;
  const found = stages.indexOf(stage);
  const known = found >= 0;
  const index = known ? found : 0;
  return { stage: known ? stage : ((stages[0] ?? stage) as T), index, total, known };
}

/** The coarse unit an elapsed span is best said in. */
export type RelativeUnit = 'now' | 'minute' | 'hour' | 'day' | 'month' | 'year';

/** An elapsed span, as a number and a unit the caller words itself. */
export interface RelativeParts {
  /** How many {@link unit}s have fully elapsed. `0` when the unit is `'now'`. */
  value: number;
  /** The unit to say it in. */
  unit: RelativeUnit;
  /** Whether the instant parsed at all. `false` means render nothing. */
  valid: boolean;
}

/**
 * Split an elapsed span into a count and a unit.
 *
 * Floored, never rounded: 25 days ago is "25 days", not "1 month", and 90
 * minutes ago is "1 hour", not "2 hours". Returning the parts rather than a
 * string is what lets a component take a `formatRelative` prop and localise —
 * the base hard-coded English in six components with no override.
 */
export function relativeParts(iso?: string, now: number = Date.now()): RelativeParts {
  if (!iso) return { value: 0, unit: 'now', valid: false };
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return { value: 0, unit: 'now', valid: false };

  const secs = Math.max(0, Math.floor((now - then) / 1000));
  if (secs < 60) return { value: 0, unit: 'now', valid: true };
  const mins = Math.floor(secs / 60);
  if (mins < 60) return { value: mins, unit: 'minute', valid: true };
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return { value: hrs, unit: 'hour', valid: true };
  const days = Math.floor(hrs / 24);
  if (days < 30) return { value: days, unit: 'day', valid: true };
  const months = Math.floor(days / 30);
  if (months < 12) return { value: months, unit: 'month', valid: true };
  return { value: Math.floor(months / 12), unit: 'year', valid: true };
}

/**
 * Whether a hiring state is one the reader is owed a reason for.
 *
 * `Application.rejected` was a bare boolean with no `rejectedAt`, no reason and
 * no stage-of-rejection; `Interview` had no status field at all, so an
 * interview cancelled by the employer could only be expressed by passing
 * `disabled`, which renders as "unavailable, dimmed" with no word explaining
 * why. A component whose state satisfies this predicate must accept a reason.
 */
export function isAdverse(state: string): boolean {
  switch (state) {
    case 'rejected':
    case 'withdrawn':
    case 'declined':
    case 'cancelled':
    case 'expired':
    case 'closed':
      return true;
    default:
      return false;
  }
}
