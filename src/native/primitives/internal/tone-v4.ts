/**
 * The tone vocabulary shared by every **V4 vertical** (native): a domain
 * status resolved to the ink it takes, the `on` colour it pairs with when it
 * is a fill, and the skeleton it loads behind.
 *
 * ## Why this is here and not in a module
 *
 * `agriculture/internal/farm-v4.ts` wrote this first, for ten status enums.
 * `automotive` has five more and `beauty` five more again — twenty enums
 * across three modules, each independently deciding that `color: 'muted'` or
 * `color: 'success'` was a *text* colour. It is not: `muted` is a ramp step
 * with no contrast promise, and `success` is a **fill** slot the compiler
 * guarantees only `onSuccess` against.
 *
 * Three modules needing one table is where a module-local helper stops being
 * local. `farm-v4` now delegates here.
 *
 * Nothing in this file is exported from the package.
 */

import type { XenitionNativeTheme } from '../../theme';
import { stateMix } from '../../../primitives/internal/v4-state';
import type { BadgeTone } from '../Badge';

/**
 * The tones a vertical's status enum resolves to. Identical to `BadgeTone`, so
 * a status's badge and its ink can never disagree about which tone it is.
 */
export type ToneV4 = BadgeTone;

/**
 * The **ink** a tone takes on a surface.
 *
 * Every one of these is the contrast-corrected slot. `primary` as text
 * measured as low as 1.32:1 on a pale seed in the rendered audit that produced
 * the `*Text` tokens, and `muted` carries no promise at all.
 */
export function toneInk(theme: XenitionNativeTheme, tone: ToneV4): string {
  const { colors } = theme;
  switch (tone) {
    case 'primary':
      return colors.primaryText;
    case 'accent':
      return colors.accentText;
    case 'success':
      return colors.successText;
    case 'warn':
      return colors.warnText;
    case 'danger':
      return colors.dangerText;
    case 'neutral':
    default:
      return colors.mutedText;
  }
}

/** The **fill** a tone paints with, when it is a chip, a disc or a rail. */
export function toneFill(theme: XenitionNativeTheme, tone: ToneV4): string {
  const { colors } = theme;
  switch (tone) {
    case 'primary':
      return colors.primary;
    case 'accent':
      return colors.accent;
    case 'success':
      return colors.success;
    case 'warn':
      return colors.warn;
    case 'danger':
      return colors.danger;
    case 'neutral':
    default:
      return colors.muted;
  }
}

/**
 * The ink that goes **on** {@link toneFill} — the compiler's paired slot.
 *
 * This exists because of a defect, not for symmetry. `automotive/TripRoute`
 * drew its route markers as
 *
 * ```tsx
 * backgroundColor: colors[tone],   // 'primary' | 'success' | 'accent'
 * color: colors.onPrimary,         // …always onPrimary
 * ```
 *
 * The compiler guarantees `onSuccess` against `success` and `onAccent`
 * against `accent`, and guarantees **nothing** about `onPrimary` on either. So
 * the destination marker was a green disc wearing the brand's ink and whether
 * it was readable depended on the seed. Both sides being `string` means no
 * type can catch it; a function can.
 */
export function onPair(theme: XenitionNativeTheme, tone: ToneV4): string {
  const { colors } = theme;
  switch (tone) {
    case 'primary':
      return colors.onPrimary;
    case 'accent':
      return colors.onAccent;
    case 'success':
      return colors.onSuccess;
    case 'warn':
      return colors.onWarn;
    case 'danger':
      return colors.onDanger;
    case 'neutral':
    default:
      return colors.onSurface;
  }
}

/**
 * The fill a loading skeleton takes.
 *
 * **Opaque, and mixed against the card's own ground.** Six components across
 * these modules used `withAlpha(colors.muted, 0.25)` — a translucent wash of a
 * ramp step, which borrows whatever is behind it, so the same skeleton is a
 * different colour on a card, on a tinted band and over an image.
 */
export function skeletonFill(theme: XenitionNativeTheme): string {
  return stateMix(theme.colors.card, theme.colors.onCard, 'focus', theme.state);
}

/**
 * Clamp a percentage into 0–100, or `undefined` when there is nothing to show.
 *
 * Written inline in a dozen components across the verticals; one of them
 * forgot the non-number guard and rendered `NaN%`.
 */
export function clampPercent(value: number | undefined): number | undefined {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.max(0, Math.min(100, value))
    : undefined;
}

/**
 * Join the optional caption fragments a row shows under its title, dropping
 * the empty ones.
 */
export function metaLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((p): p is string | number => p != null && p !== '')
    .map(String)
    .join(' · ');
}

/**
 * A star rating as its three renderable parts.
 *
 * `DriverRatingRow`, `StylistCard`, `ReviewCard` and `ProductRecommendation`
 * all drew five glyphs and stopped. The **numeral** is what a low-vision user
 * reads, what a colour-blind user reads, and what everyone actually compares —
 * five glyphs at `sm` is not a number. This returns the filled count for the
 * glyphs, the formatted value for the numeral, and one spoken name for the
 * group, so a screen reader gets "4.9 out of 5, 128 reviews" instead of five
 * loose stars.
 */
export interface RatingV4 {
  /** How many glyphs are filled. */
  filled: number;
  /** Total glyphs. */
  total: number;
  /** The value, formatted — `'4.9'`. `null` when there is nothing to show. */
  text: string | null;
  /** The group's accessible name. */
  label: string;
}

export function ratingParts(options: {
  value?: number;
  max?: number;
  count?: number;
  /** Default `'4.9 out of 5'` / `', 128 reviews'`. */
  format?: (value: number, max: number, count?: number) => string;
  /** How many decimals the numeral shows. Default `1`. */
  decimals?: number;
}): RatingV4 {
  const total = Math.max(1, Math.floor(Number.isFinite(options.max ?? 5) ? (options.max ?? 5) : 5));
  const raw = Number.isFinite(options.value) ? (options.value as number) : null;
  const value = raw === null ? null : Math.max(0, Math.min(total, raw));
  const filled = value === null ? 0 : Math.round(value);
  const text = value === null ? null : value.toFixed(options.decimals ?? 1);
  const format =
    options.format ??
    ((v: number, m: number, c?: number) =>
      `${v.toFixed(options.decimals ?? 1)} out of ${m}${c != null ? `, ${c} reviews` : ''}`);
  return {
    filled,
    total,
    text,
    label: value === null ? 'Not rated' : format(value, total, options.count),
  };
}
