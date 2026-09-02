/**
 * The `jobs` module's own V4 vocabulary (web) — the twin of
 * `native/jobs/internal/tone-v4.ts`.
 *
 * `hiring-v4.ts` holds the module's *arithmetic* and is shared by both
 * platforms verbatim. This file holds the half that cannot be shared: classes,
 * custom properties and the English words the web twin says by default. It
 * corrects three things every one of the twelve base components inherited.
 *
 * ## What is corrected
 *
 * 1. **`muted` is used to ink text in roughly thirty places.** `text-muted` is
 *    the **fill** slot — a decorative ramp step the compiler makes no contrast
 *    promise about — and it is what every secondary line in this module was
 *    drawn with: a company name, a location, a posted age, a file size, a
 *    result count. {@link TONE_INK} resolves the same idea to `muted-text`,
 *    the slot that is actually corrected for reading.
 * 2. **Employment TYPE spends a status colour.** `contract → warn` and
 *    `remote → success` are in `JobCard` and `SavedJobRow` both. A contract
 *    role is not a warning and a remote role is not good news; they are two
 *    of four arrangements, which is identity. By the time a job seeker has
 *    scrolled past nine amber "Contract" chips the colour has stopped meaning
 *    anything, and the amber that *should* mean something — a deadline, a
 *    cancelled interview — has nowhere left to stand. {@link EMPLOYMENT_TONE_V4}
 *    takes all four to `neutral`; the word already tells them apart.
 * 3. **A multi-part row was announced as four stops, or not at all.** See
 *    {@link spokenLine}.
 *
 * Nothing here is exported from the package.
 */

import type { CSSProperties } from 'react';
import { MIN_TAP_CLASS } from '../../primitives/internal/chrome-v4';
import { stateGroundVars } from '../../primitives/internal/v4-state';
import {
  clampPercent,
  metaLine,
  SKELETON_CLASS,
  toneGround,
  TONE_BG,
  TONE_INK,
  TONE_ON,
  type ToneV4,
} from '../../primitives/internal/tone-v4';
import { formatCompactMoney } from '../format';
import { relativeParts, salaryParts, stageParts, type RelativeUnit } from '../hiring-v4';
import type { ApplicationStage, EmploymentType, Salary, SalaryPeriod } from '../types';
import { APPLICATION_STAGES, STAGE_LABEL } from '../types';

export { clampPercent, metaLine, MIN_TAP_CLASS, SKELETON_CLASS, toneGround, TONE_BG, TONE_INK, TONE_ON };
export type { ToneV4 };

/**
 * The focus ring the whole module wears.
 *
 * `--xen-ring` is `primary` already corrected to 3:1 against the page, which
 * `ring-primary` — what all twelve base components used — is not.
 */
export const FOCUS_RING_CLASS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/**
 * A glyph-only control has to be 44 **wide** as well as 44 tall.
 *
 * The save star, the bookmark and the download arrow are all a single
 * character wide in the base — roughly 18 CSS pixels of hit area on the most
 * commonly tapped control in a job list.
 */
export const MIN_TAP_SQUARE_CLASS = `${MIN_TAP_CLASS} min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]`;

/** Money, and any figure that stacks in a column. */
export const TABULAR_CLASS = 'tabular-nums';

/** The ground behind a skeleton block — opaque, never a translucent wash. */
export const PLACEHOLDER_CLASS = SKELETON_CLASS;

/** The state-layer pair for something drawn on a card. */
export function cardStateVars(
  ground = 'var(--xen-card)',
  ink = 'var(--xen-on-card)'
): CSSProperties {
  return stateGroundVars(ground, ink) as CSSProperties;
}

/** The state-layer pair for something drawn straight on the page. */
export function surfaceStateVars(): CSSProperties {
  return stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as CSSProperties;
}

/**
 * Build the one accessible name a row or card carries.
 *
 * Commas, not `metaLine`'s middle dot: a screen reader either says "middle
 * dot" out loud or swallows the pause entirely, and these rows are decisions —
 * "Staff Engineer, Acme, applied 3 days ago, Stage 3 of 5: Interview" has to
 * arrive as one sentence rather than as four separate tab stops.
 */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}

/**
 * Employment **arrangement** is identity, not status.
 *
 * See the module note. `full-time` keeps a brand tone in neither twin; all
 * four are neutral, and the label carries the meaning.
 */
export const EMPLOYMENT_TONE_V4: Record<EmploymentType, ToneV4> = {
  'full-time': 'neutral',
  'part-time': 'neutral',
  contract: 'neutral',
  remote: 'neutral',
};

/** The default English wording for each elapsed-time unit. */
const RELATIVE_WORD: Record<RelativeUnit, (value: number) => string> = {
  now: () => 'just now',
  minute: (value) => `${value}m ago`,
  hour: (value) => `${value}h ago`,
  day: (value) => `${value}d ago`,
  month: (value) => `${value}mo ago`,
  year: (value) => `${value}y ago`,
};

/**
 * An elapsed age as a string, or `undefined` when there is nothing to say.
 *
 * `undefined` and not `''`: six components wrote
 * `{age ? <span>{age}</span> : null}` around `formatRelative`'s empty string,
 * and the one that forgot rendered an empty element that still paid its gap.
 * Returning nothing at all makes the omission the caller's default.
 *
 * Floored through {@link relativeParts}, so 25 days ago is "25d ago" and not
 * the base's "1mo ago", and 90 minutes is "1h ago" and not "2h ago".
 */
export function relativeLabel(
  iso: string | undefined,
  format?: (iso: string) => string,
  now?: number
): string | undefined {
  if (!iso) return undefined;
  if (format) return format(iso) || undefined;
  const parts = relativeParts(iso, now);
  if (!parts.valid) return undefined;
  return RELATIVE_WORD[parts.unit](parts.value);
}

/** The default suffix per pay cadence — `'/yr'`, `'/hr'`, … */
const PERIOD_SUFFIX_V4: Record<SalaryPeriod, string> = {
  hour: '/hr',
  day: '/day',
  month: '/mo',
  year: '/yr',
};

/** A salary band, resolved to the strings a component draws. */
export interface SalaryLabelV4 {
  /** The band, or `undefined` when nothing usable was disclosed. */
  text?: string;
  /**
   * The caller handed the bounds the wrong way round; they were swapped, so
   * {@link text} reads forwards. **Not** an error state — the band renders.
   */
  inverted: boolean;
  /**
   * Bounds were supplied and **none** survived validation — `NaN`, `Infinity`,
   * a negative wage. Distinct from "no salary given", because the two deserve
   * different sentences: one is undisclosed, the other is broken data. Without
   * this flag a caller cannot tell the two apart, since both arrive as an
   * absent {@link text}, and the broken case falls through to whatever the
   * undisclosed case says. The native twin's `salaryText` reports the same
   * thing under the same name.
   */
  broken: boolean;
}

/**
 * Render a salary band, with the bad inputs handled rather than interpolated.
 *
 * `formatSalary` in `format.ts` tested only `typeof min === 'number'`, which
 * `NaN` passes — so `{min: NaN}` printed "From $NaN/yr" and the `aria-label`
 * repeated it word for word. {@link salaryParts} drops the non-finite and the
 * negative bounds and swaps an inverted band rather than printing one that
 * runs backwards.
 *
 * Two absences come back, and they are not the same absence: `broken` is
 * bounds that were offered and all failed, `!broken` with no `text` is a
 * posting that named no pay at all. See {@link SalaryLabelV4}.
 */
export function salaryLabelV4(
  salary: Salary | null | undefined,
  options: {
    formatMoney?: (amount: number, currency?: string) => string;
    periodLabels?: { year?: string; hour?: string; month?: string };
  } = {}
): SalaryLabelV4 {
  if (!salary) return { text: undefined, inverted: false, broken: false };

  const { currency = 'USD', period = 'year' } = salary;
  // "Bounds were offered" and "a bound survived" are different questions, and
  // only the pair of them separates a broken posting from an undisclosed one.
  const supplied = salary.min !== undefined || salary.max !== undefined;
  const parts = salaryParts(salary.min, salary.max);
  if (!parts.valid) return { text: undefined, inverted: false, broken: supplied };

  const money = options.formatMoney ?? ((amount: number, code?: string) =>
    formatCompactMoney(amount, code));
  const suffix =
    (period === 'year' || period === 'hour' || period === 'month'
      ? options.periodLabels?.[period]
      : undefined) ?? PERIOD_SUFFIX_V4[period] ?? '';

  const { min, max } = parts;
  let text: string;
  if (min !== undefined && max !== undefined) {
    text = `${money(min, currency)} – ${money(max, currency)}${suffix}`;
  } else if (min !== undefined) {
    text = `From ${money(min, currency)}${suffix}`;
  } else {
    text = `Up to ${money(max as number, currency)}${suffix}`;
  }
  return { text, inverted: parts.inverted, broken: false };
}

/** Where an application sits, resolved to the strings a component draws. */
export interface StageSummaryV4 {
  /** The stage's own word — `'Interview'`, or the unknown wording. */
  label: string;
  /** `'3 of 5'`, or `undefined` when the stage was not in the pipeline. */
  position?: string;
  /** The whole thing as one sentence, for an accessible name. */
  summary: string;
  /** Whether the stage was actually found. */
  known: boolean;
  /** Zero-based position; meaningless unless {@link known}. */
  index: number;
  /** How many stages there are. */
  total: number;
}

/**
 * Resolve a pipeline stage into label, position and one spoken sentence.
 *
 * The base wrote `Math.max(0, indexOf(stage))` inline and then announced
 * "Stage 1 of 5: Applied" for a stage it had never heard of — a withdrawn
 * application read as freshly submitted, with total confidence and in the
 * loudest place on the row. {@link stageParts} reports the miss and this
 * function says so out loud instead.
 */
export function stageSummaryV4(
  stage: ApplicationStage,
  options: {
    stageLabels?: Partial<Record<ApplicationStage, string>>;
    formatPosition?: (index: number, total: number) => string;
    unknownStageLabel?: string;
    rejected?: boolean;
  } = {}
): StageSummaryV4 {
  const { index, total, known } = stageParts(stage, APPLICATION_STAGES);
  const unknown = options.unknownStageLabel ?? 'Stage unknown';
  const label = known ? (options.stageLabels?.[stage] ?? STAGE_LABEL[stage]) : unknown;
  const position = known
    ? (options.formatPosition ?? ((i: number, n: number) => `${i + 1} of ${n}`))(index, total)
    : undefined;

  const summary = known
    ? options.rejected
      ? `Rejected at stage ${position}: ${label}`
      : `Stage ${position}: ${label}`
    : options.rejected
      ? `Rejected, ${unknown}`
      : unknown;

  return { label, position, summary, known, index, total };
}
