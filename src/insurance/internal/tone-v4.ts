/**
 * The `insurance` module's own V4 vocabulary (web) — the twin of
 * `native/insurance/internal/tone-v4.ts`.
 *
 * It replaces `internal/tint.ts` without touching it, because the base, V2 and
 * V3 lines still read that file. Two things in it were wrong, and `ClaimRow` —
 * its only consumer — inherited both:
 *
 * 1. **It inks with fill slots.** `success: 'bg-success/10 text-success'` draws
 *    the glyph in `--xen-success`, the token the compiler guarantees only
 *    `on-success` against; `muted` is a decorative ramp step with no contrast
 *    promise at all. Every status disc in the module was drawn with one of
 *    them. {@link toneInkClass} resolves the same tone to its contrast-corrected
 *    `*-text` slot.
 * 2. **`neutral` and `muted` are `bg-neutral-100`.** The web neutral ramp
 *    mirrors under `[data-theme="dark"]`, so a neutral status disc was a pale
 *    plate punched into a dark page. {@link toneGroundStyle} mixes the tone 10%
 *    into the card instead — the same ground the native twin mixes, so a
 *    denied claim is one colour on two platforms.
 *
 * It also holds the four tables where this module spent a **status** colour on
 * **identity** — a coverage's inclusion, a document's kind, a risk tier and a
 * beneficiary's designation are none of them verdicts — plus the small
 * formatters the components share.
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
import type { MoneyFormatter } from './format';
import type { StatusDescriptor } from './status';
import type { BeneficiaryKind } from '../BeneficiaryRow';
import type { DocumentKind } from '../PolicyDocumentRow';
import type { PolicyStatus } from '../PolicyCard';
import type { RenewalUrgency } from '../RenewalBanner';
import type { RiskTier } from '../RiskScore';

export { clampPercent, metaLine, SKELETON_CLASS, toneGround, TONE_BG, TONE_INK, TONE_ON };
export { MIN_TAP_CLASS };
export type { ToneV4 };

/** A tone as the contrast-corrected **ink** class. Never a fill. */
export function toneInkClass(tone: ToneV4): string {
  return TONE_INK[tone];
}

/** A tone as the **fill** class — a chip, a disc, a rail. Never text. */
export function toneFillClass(tone: ToneV4): string {
  return TONE_BG[tone];
}

/** The ink guaranteed to read **on** {@link toneFillClass}'s ground. */
export function toneOnClass(tone: ToneV4): string {
  return TONE_ON[tone];
}

/**
 * A tinted status ground as an inline style.
 *
 * `color-mix()` over two custom properties cannot be said as a class bound to
 * a token, and being inline it follows `[data-theme]` with no dark rule of its
 * own — which is exactly what `bg-neutral-100` could not do.
 */
export function toneGroundStyle(tone: ToneV4): CSSProperties {
  return { background: toneGround(tone) };
}

/**
 * The one accessible name an interactive insurance row or card carries.
 *
 * Commas, not `metaLine`'s middle dot: a screen reader either says "middle
 * dot" out loud or swallows the pause, and every row in this module is a
 * decision about money — "Claim CLM-20481, Windshield replacement, Approved,
 * $840.00, 12 Aug" has to arrive as one sentence.
 */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}

/** The focus ring the whole module wears — `ring-primary-300` was a ramp step. */
export const FOCUS_RING_CLASS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/** A glyph-only control has to be 44 **wide** as well as 44 tall. */
export const MIN_TAP_SQUARE_CLASS = `${MIN_TAP_CLASS} min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]`;

/** Money, percentages and any figure that stacks in a column. */
export const TABULAR_CLASS = 'tabular-nums';

/** The state-layer pair for something drawn on a card. */
export function cardStateVars(ground = 'var(--xen-card)'): CSSProperties {
  return stateGroundVars(ground, 'var(--xen-on-card)') as CSSProperties;
}

/** The state-layer pair for something drawn straight on the page. */
export function surfaceStateVars(): CSSProperties {
  return stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as CSSProperties;
}

/**
 * Policy lifecycle, as the same descriptor shape claims already use.
 *
 * `PolicyCard` kept this table private, so nothing else in the module could
 * label a policy state and the two new components would have had to invent
 * their own words. The tones are unchanged: a lapsed policy genuinely is an
 * adverse state, and `danger` is what that means.
 */
export const POLICY_STATUS_META_V4: Record<PolicyStatus, StatusDescriptor> = {
  active: { label: 'Active', glyph: '✓', tone: 'success', step: 0 },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn', step: 0 },
  lapsed: { label: 'Lapsed', glyph: '!', tone: 'danger', step: 0 },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'danger', step: 0 },
};

/**
 * Whether a coverage is included, as a **glyph**, not a verdict.
 *
 * `included → success` / `excluded → muted` said that a policy covering water
 * damage is good news and that one excluding it is a failure. Inclusion is a
 * property of the contract; the reader is reading a list of them and half will
 * always be excluded. A page of green ticks beside red-adjacent greys teaches
 * the eye to stop reading either. The glyph — and, now, a word — is what
 * actually tells them apart.
 */
export const COVERAGE_MARK_V4: Record<'included' | 'excluded', StatusDescriptor> = {
  included: { label: 'Included', glyph: '✓', tone: 'neutral', step: 0 },
  excluded: { label: 'Not covered', glyph: '✕', tone: 'neutral', step: 0 },
};

/**
 * Risk tier as identity, not verdict.
 *
 * `low → success` / `high → danger` is the module's most confident misuse of a
 * status colour: the tier is an underwriting *classification*, the same kind of
 * thing as a credit band, and colouring it green told the applicant they had
 * passed something. Worse, an explicit `tier` overrode the score outright, so
 * `score={95} tier="low"` drew a green "Low risk" pill beside 95 / 100 and the
 * colour was the loudest thing on the screen. The ordering now lives where it
 * is checkable — the numeral, the scale it sits on and the meter — and the
 * glyph carries the tier.
 */
export const RISK_TIER_META_V4: Record<RiskTier, StatusDescriptor> = {
  low: { label: 'Low risk', glyph: '▁', tone: 'neutral', step: 0 },
  moderate: { label: 'Moderate risk', glyph: '▄', tone: 'neutral', step: 1 },
  high: { label: 'High risk', glyph: '█', tone: 'neutral', step: 2 },
};

/** Renewal urgency genuinely is a status — an overdue policy is not covered. */
export const RENEWAL_URGENCY_META_V4: Record<RenewalUrgency, StatusDescriptor> = {
  upcoming: { label: 'Renewal coming up', glyph: '🗓️', tone: 'primary', step: 0 },
  due: { label: 'Renewal due', glyph: '⏰', tone: 'warn', step: 1 },
  overdue: { label: 'Renewal overdue', glyph: '⚠️', tone: 'danger', step: 2 },
};

/**
 * Document kind — identity, and it needs a **word**, not just a glyph.
 *
 * The base built its meta line from `kind.replace('-', ' ')`, so the row read
 * "id card · 1.2 MB" in lower case whatever the locale, and the emoji was the
 * only other thing distinguishing a declaration page from an invoice.
 */
export const DOCUMENT_KIND_META_V4: Record<DocumentKind, { label: string; glyph: string }> = {
  policy: { label: 'Policy', glyph: '📄' },
  declaration: { label: 'Declarations', glyph: '📋' },
  'id-card': { label: 'ID card', glyph: '🪪' },
  invoice: { label: 'Invoice', glyph: '🧾' },
  letter: { label: 'Letter', glyph: '✉️' },
};

/** Primary vs contingent — a designation, so `neutral` both ways. */
export const BENEFICIARY_KIND_LABEL: Record<BeneficiaryKind, string> = {
  primary: 'Primary',
  contingent: 'Contingent',
};

/**
 * A percentage as a whole number and its spoken form.
 *
 * `formatPct` rounds for display and the components then announced the
 * unrounded float separately; one place, one number.
 */
export function percentText(value: number): string {
  return `${Math.round(Number.isFinite(value) ? value : 0)}%`;
}

/**
 * A money figure that is allowed to be negative.
 *
 * Every component in the module wrote `Math.max(0, Math.trunc(cents))`, so
 * `coverageCents={-1}` printed "$0.00" — indistinguishable from a policy that
 * genuinely covers nothing, and from a fetch that returned a sentinel. The
 * figure is now printed as it is (`Intl` renders `-$0.01` perfectly well) and
 * `negative` lets the caller's component say a word about it.
 */
export interface MoneyV4 {
  /** The formatted figure, never clamped. */
  text: string;
  /** Whether the caller handed us a below-zero amount. */
  negative: boolean;
}

export function moneyParts(
  cents: number | undefined,
  currency: string | undefined,
  format: MoneyFormatter
): MoneyV4 | undefined {
  if (cents == null || !Number.isFinite(cents)) return undefined;
  const value = Math.trunc(cents);
  return { text: format(value, currency), negative: value < 0 };
}

/** The word appended to a figure that cannot be an amount of money. */
export const NEGATIVE_AMOUNT_LABEL = 'Amount unavailable';

/**
 * Bytes as a human-readable size.
 *
 * The default behind `formatSize`. Base-1000 units, because that is what a
 * carrier's document portal quotes and what the caller was hand-formatting
 * into the `size` string before.
 */
export function formatBytes(bytes: number): string {
  const value = Number.isFinite(bytes) ? Math.max(0, bytes) : 0;
  const units = ['B', 'kB', 'MB', 'GB'];
  let scaled = value;
  let unit = 0;
  while (scaled >= 1000 && unit < units.length - 1) {
    scaled /= 1000;
    unit += 1;
  }
  return `${unit === 0 ? Math.round(scaled) : scaled.toFixed(1)} ${units[unit]}`;
}
