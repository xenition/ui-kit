/**
 * The tone vocabulary shared by every **V4 vertical** (web) — the twin of
 * `native/primitives/internal/tone-v4.ts`, as classes and custom properties
 * rather than resolved hexes.
 *
 * Same reasoning: twenty status enums across `agriculture`, `automotive` and
 * `beauty`, each independently deciding that `muted` or `success` was a *text*
 * colour. It is not — `muted` is a ramp step with no contrast promise, and
 * `success` is a **fill** slot the compiler guarantees only `on-success`
 * against. `agriculture/internal/farm-v4.ts` wrote this table first; three
 * modules needing it is where it stops being module-local.
 *
 * Nothing in this file is exported from the package.
 */

import type { BadgeTone } from '../Badge';

/**
 * The tones a vertical's status enum resolves to. Identical to `BadgeTone`, so
 * a status's badge and its ink can never disagree about which tone it is.
 */
export type ToneV4 = BadgeTone;

/** The **ink** class a tone takes. Every one is the contrast-corrected slot. */
export const TONE_INK: Record<ToneV4, string> = {
  // `muted` and `neutral` both mean "no status" and resolve to the same ink.
  muted: 'text-muted-text',
  neutral: 'text-muted-text',
  primary: 'text-primary-text',
  accent: 'text-accent-text',
  success: 'text-success-text',
  warn: 'text-warn-text',
  danger: 'text-danger-text',
};

/** The **fill** class a tone paints with, when it is a chip, a disc or a rail. */
export const TONE_BG: Record<ToneV4, string> = {
  muted: 'bg-muted',
  neutral: 'bg-muted',
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

/**
 * The ink that goes **on** {@link TONE_BG} — the compiler's paired slot.
 *
 * This exists because of a defect, not for symmetry: `automotive/TripRoute`
 * painted its markers `bg-[tone]` and their glyphs `text-on-primary`
 * regardless, so a `success` marker wore the brand's ink and whether it was
 * readable depended on the seed. Both sides being strings means no type can
 * catch it; a table can.
 */
export const TONE_ON: Record<ToneV4, string> = {
  muted: 'text-on-surface',
  neutral: 'text-on-surface',
  primary: 'text-on-primary',
  accent: 'text-on-accent',
  success: 'text-on-success',
  warn: 'text-on-warn',
  danger: 'text-on-danger',
};

/** The tone's fill as a custom property, for a `color-mix()` tint. */
export const TONE_VAR: Record<ToneV4, string> = {
  muted: 'var(--xen-muted)',
  neutral: 'var(--xen-muted)',
  primary: 'var(--xen-primary)',
  accent: 'var(--xen-accent)',
  success: 'var(--xen-success)',
  warn: 'var(--xen-warn)',
  danger: 'var(--xen-danger)',
};

/**
 * How far a status ground travels from the card toward its tone. 10%: enough
 * to read as "this one is different", not enough to compete with the copy on
 * it. The same number the native twin mixes.
 */
export const GROUND_TINT = 10;

/** A tinted ground for a status container, as an inline background value. */
export function toneGround(tone: ToneV4): string {
  return `color-mix(in srgb, ${TONE_VAR[tone]} ${GROUND_TINT}%, var(--xen-card))`;
}

/**
 * The class a loading skeleton takes.
 *
 * **Opaque, and mixed against the card's own ground.** Six components across
 * these modules used a translucent wash of `muted`, which borrows whatever is
 * behind it — so the same skeleton was a different colour on a card, on a
 * tinted band and over an image.
 */
export const SKELETON_CLASS =
  'rounded-[var(--xen-radius-sm)] bg-[color-mix(in_srgb,var(--xen-on-card)_12%,var(--xen-card))]';

/**
 * Clamp a percentage into 0–100, or `undefined` when there is nothing to show.
 */
export function clampPercent(value: number | undefined): number | undefined {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.max(0, Math.min(100, value))
    : undefined;
}

/** Join a row's optional caption fragments, dropping the empty ones. */
export function metaLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((p): p is string | number => p != null && p !== '')
    .map(String)
    .join(' · ');
}

/**
 * A star rating as its three renderable parts.
 *
 * Four components across these modules drew five glyphs and stopped. The
 * **numeral** is what a low-vision user reads, what a colour-blind user reads,
 * and what everyone actually compares.
 */
export interface RatingV4 {
  filled: number;
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
  format?: (value: number, max: number, count?: number) => string;
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
