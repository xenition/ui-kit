/**
 * The `jobs` module's native-only V4 vocabulary: the pieces that need a
 * resolved native theme, plus the wording that turns
 * {@link import('../../../jobs/hiring-v4') hiring-v4}'s arithmetic into the
 * strings a component draws and announces.
 *
 * The maths itself is **not** here. `salaryParts`, `stageParts`,
 * `relativeParts` and `isAdverse` live in `src/jobs/hiring-v4.ts`, which both
 * twins import, precisely so the two halves cannot disagree about what a
 * salary band or a pipeline position *is*. What is here is the half that
 * cannot be shared: a `ViewStyle` needs `useXenitionTheme()`, and React Native
 * has no CSS variable to read a token off.
 *
 * ## Why the wording is here too
 *
 * Twelve components drew six English strings between them — `just now`,
 * `2d ago`, `From $90k/yr`, `51–200 employees` — each spelled out at the call
 * site with no override, which is what made the module unlocalisable. Every
 * one of those is now a default *inside a helper* that takes the caller's
 * formatter first, so a component's job is to pass the prop through rather
 * than to re-derive the sentence.
 *
 * Nothing in this file is exported from the package.
 */

import type { ViewStyle } from 'react-native';
import type { XenitionNativeTheme } from '../../theme';
import {
  metaLine,
  onPair,
  skeletonFill,
  toneFill,
  toneInk,
  type ToneV4,
} from '../../primitives/internal/tone-v4';
import { relativeParts, salaryParts, type RelativeUnit } from '../../../jobs/hiring-v4';
import { formatCompactMoney } from '../format';
import type { Salary, SalaryPeriod } from '../types';

export { metaLine, onPair, skeletonFill, toneFill, toneInk };
export type { ToneV4 };

/**
 * Join the fragments of a **spoken** name.
 *
 * Commas, not {@link metaLine}'s middle dot: a screen reader either says
 * "middle dot" out loud or swallows the pause entirely, and this module's
 * whole finding is that its names were never heard in the first place. Use
 * {@link metaLine} for a *visible* meta line and this for anything that ends
 * up in an `accessibilityLabel`.
 */
export function spokenName(parts: ReadonlyArray<string | number | null | undefined>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}

/**
 * The default wording for each elapsed unit — the base's own strings, kept so
 * a caller who passes no `formatRelative` sees exactly what shipped.
 */
const RELATIVE_SUFFIX: Record<RelativeUnit, string> = {
  now: 'just now',
  minute: 'm ago',
  hour: 'h ago',
  day: 'd ago',
  month: 'mo ago',
  year: 'y ago',
};

/**
 * How long ago something happened, as a drawable string.
 *
 * `''` when the instant is missing or unparseable — the caller draws nothing
 * rather than a blank line or the literal `Invalid Date` the base's
 * `Intl.DateTimeFormat` path produced. The count comes from `relativeParts`,
 * which **floors**: the base rounded, so 25 days ago read "1mo ago" and 90
 * minutes read "2h ago", both claiming time that had not passed.
 */
export function relativeLabel(
  iso: string | undefined,
  format?: (iso: string) => string,
  now?: number
): string {
  if (!iso) return '';
  if (format) return format(iso);
  const { value, unit, valid } = relativeParts(iso, now);
  if (!valid) return '';
  return unit === 'now' ? RELATIVE_SUFFIX.now : `${value}${RELATIVE_SUFFIX[unit]}`;
}

/** The default cadence suffix per period — the base's `format.ts` wording. */
const PERIOD_SUFFIX: Record<SalaryPeriod, string> = {
  hour: '/hr',
  day: '/day',
  month: '/mo',
  year: '/yr',
};

/** How a caller re-words a salary band. */
export interface SalaryTextOptions {
  /** Render one bound. Default the module's compact money formatter. */
  formatMoney?: (amount: number, currency?: string) => string;
  /**
   * Cadence suffixes. `day` is deliberately absent — the spec's prop table
   * names three periods and both twins take that table verbatim, so a daily
   * band keeps the built-in `/day` rather than one twin growing a fourth key
   * the other does not have.
   */
  periodLabels?: { year?: string; hour?: string; month?: string };
}

/** A salary band resolved to what a component draws and says about it. */
export interface SalaryTextV4 {
  /** The band, or `null` when there is nothing usable to draw. */
  text: string | null;
  /** The caller supplied the bounds the wrong way round; they were swapped. */
  inverted: boolean;
  /**
   * Bounds were supplied and **none** survived validation — `NaN`, `Infinity`,
   * a negative wage. Distinct from "no salary given", because the two deserve
   * different sentences: one is undisclosed, the other is broken data. The
   * base could not tell them apart and rendered `From $NaN/yr`.
   */
  broken: boolean;
}

/** Read a salary band into its drawable string. */
export function salaryText(
  salary: Salary | null | undefined,
  options: SalaryTextOptions = {}
): SalaryTextV4 {
  if (!salary) return { text: null, inverted: false, broken: false };

  const supplied = salary.min !== undefined || salary.max !== undefined;
  const { min, max, valid, inverted } = salaryParts(salary.min, salary.max);
  if (!valid) return { text: null, inverted: false, broken: supplied };

  const money = options.formatMoney ?? formatCompactMoney;
  const currency = salary.currency ?? 'USD';
  const period = salary.period ?? 'year';
  const overrides = options.periodLabels ?? {};
  const suffix =
    period === 'year'
      ? (overrides.year ?? PERIOD_SUFFIX.year)
      : period === 'hour'
        ? (overrides.hour ?? PERIOD_SUFFIX.hour)
        : period === 'month'
          ? (overrides.month ?? PERIOD_SUFFIX.month)
          : PERIOD_SUFFIX.day;

  let text: string;
  if (min !== undefined && max !== undefined) {
    text = `${money(min, currency)} – ${money(max, currency)}${suffix}`;
  } else if (min !== undefined) {
    text = `From ${money(min, currency)}${suffix}`;
  } else {
    text = `Up to ${money(max as number, currency)}${suffix}`;
  }
  return { text, inverted, broken: false };
}

/**
 * A free-form headcount as a chip label.
 *
 * `Company.size` is a **string** — `'51–200'` is the documented example — so a
 * `formatEmployees(n: number)` prop can only reach it when the app happens to
 * have stored a plain number. It does then, and a range keeps the base's own
 * wording rather than being dropped or mangled into a number it is not.
 * `null` when there is nothing to say.
 */
export function headcountLabel(
  size: string | undefined,
  format?: (count: number) => string
): string | null {
  const trimmed = size?.trim();
  if (!trimmed) return null;
  const count = Number(trimmed);
  if (Number.isFinite(count)) return (format ?? ((n: number) => `${n} employees`))(count);
  return `${trimmed} employees`;
}

/**
 * The raised card every `jobs` card is drawn on.
 *
 * `card`, not `surface`: the slot exists so a raised thing reads as raised in
 * dark mode too, where the base's `surface` card was the same colour as the
 * page behind it. `border` is a hairline here and nowhere else in the module —
 * it was being used as a **fill** for skeleton blocks, the résumé file tile and
 * the default `SkillTag` ground, which is what made every loading state the
 * colour of a divider.
 */
export function cardSurfaceStyle(theme: XenitionNativeTheme): ViewStyle {
  const { colors, tokens } = theme;
  return {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
  };
}

/**
 * One placeholder block of a loading skeleton.
 *
 * The fill is {@link skeletonFill} — an **opaque** state mix against the card's
 * own ground. The module drew these in `colors.border`, so a loading job card
 * was a stack of divider-coloured bars that read as a broken table rather than
 * as content arriving.
 */
export function skeletonBarStyle(
  theme: XenitionNativeTheme,
  options: { width: ViewStyle['width']; height: number; round?: boolean }
): ViewStyle {
  return {
    width: options.width,
    height: options.height,
    borderRadius: options.round === true ? theme.tokens.radius.full : theme.tokens.radius.sm,
    backgroundColor: skeletonFill(theme),
  };
}
