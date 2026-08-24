/**
 * Shared vocabulary for the POS / retail-ops / register module: payment
 * methods, order-ticket lifecycle, refund status + reason, and the cash-drawer
 * movement kinds. Every status is expressed as a **glyph + label + tone** triple
 * so a component conveys state by text and icon — never by color alone (the
 * accessibility half of the token contract). `tone` values are
 * `SemanticColors`-compatible keys that also map 1:1 onto the `Badge` tone
 * scale, so one status drives a pill and a text color from a single source of
 * truth. Money is carried as integer **cents** and funnelled through the shared
 * `formatMoney` for stable 2-decimal output.
 */
import type { SemanticColors } from '../theme';
import { formatMoney } from '../commerce/money';
import { withAlpha } from '../primitives/internal/color';

export { formatMoney, withAlpha };

/** Tone keys shared by `Badge` and the text-color resolver below. */
export type PosTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';

export interface StatusMeta {
  /** Non-color glyph carrying the meaning (emoji or unicode symbol). */
  glyph: string;
  /** Human label — the text half of the text+glyph contract. */
  label: string;
  /** Semantic tone (drives pill fill + text color). */
  tone: PosTone;
}

/**
 * Resolve a {@link PosTone} to a concrete token hex for text/icon color.
 * `neutral` maps to `muted`; everything else is a direct `SemanticColors` slot,
 * so the returned value is always a compiled-theme token, never a literal.
 */
export function toneColor(colors: SemanticColors, tone: PosTone): string {
  return tone === 'neutral' ? colors.muted : colors[tone];
}

/** Map a {@link PosTone} to a `SemanticColors` key (for `color=` props). */
export function toneSlot(tone: PosTone): keyof SemanticColors {
  return tone === 'neutral' ? 'muted' : tone;
}

/**
 * The paired `on{Tone}` foreground slot for a solid fill of `tone`. Falls back
 * to `onSurface` for `neutral` (no contrast-guaranteed pair). Every return is a
 * `SemanticColors` key, so the resolved color is always a token.
 */
export function onToneSlot(tone: PosTone): keyof SemanticColors {
  switch (tone) {
    case 'primary':
      return 'onPrimary';
    case 'success':
      return 'onSuccess';
    case 'warn':
      return 'onWarn';
    case 'danger':
      return 'onDanger';
    case 'accent':
      return 'onAccent';
    default:
      return 'onSurface';
  }
}

// ── payment methods ─────────────────────────────────────────────────────────

/** Tender type used to settle a sale. */
export type PaymentMethod =
  | 'cash'
  | 'card'
  | 'contactless'
  | 'wallet'
  | 'giftCard'
  | 'other';

export const PAYMENT_METHOD_META: Record<PaymentMethod, StatusMeta> = {
  cash: { glyph: '💵', label: 'Cash', tone: 'success' },
  card: { glyph: '💳', label: 'Card', tone: 'primary' },
  contactless: { glyph: '📶', label: 'Tap', tone: 'accent' },
  wallet: { glyph: '📱', label: 'Wallet', tone: 'primary' },
  giftCard: { glyph: '🎁', label: 'Gift card', tone: 'accent' },
  other: { glyph: '•', label: 'Other', tone: 'neutral' },
};

// ── order ticket ────────────────────────────────────────────────────────────

/** Kitchen / fulfilment ticket lifecycle. */
export type TicketStatus = 'new' | 'preparing' | 'ready' | 'served' | 'void';

export const TICKET_STATUS_META: Record<TicketStatus, StatusMeta> = {
  new: { glyph: '●', label: 'New', tone: 'primary' },
  preparing: { glyph: '◔', label: 'Preparing', tone: 'warn' },
  ready: { glyph: '✓', label: 'Ready', tone: 'success' },
  served: { glyph: '✔', label: 'Served', tone: 'neutral' },
  void: { glyph: '✕', label: 'Void', tone: 'danger' },
};

// ── refund ──────────────────────────────────────────────────────────────────

/** Refund request lifecycle. */
export type RefundStatus = 'requested' | 'approved' | 'processed' | 'declined';

export const REFUND_STATUS_META: Record<RefundStatus, StatusMeta> = {
  requested: { glyph: '⋯', label: 'Requested', tone: 'warn' },
  approved: { glyph: '✓', label: 'Approved', tone: 'success' },
  processed: { glyph: '💵', label: 'Refunded', tone: 'accent' },
  declined: { glyph: '✕', label: 'Declined', tone: 'danger' },
};

/** Why an item is being returned. */
export type RefundReason = 'damaged' | 'wrongItem' | 'notNeeded' | 'priceMatch' | 'other';

export const REFUND_REASON_META: Record<RefundReason, StatusMeta> = {
  damaged: { glyph: '💔', label: 'Damaged', tone: 'danger' },
  wrongItem: { glyph: '🔁', label: 'Wrong item', tone: 'warn' },
  notNeeded: { glyph: '🙅', label: 'Not needed', tone: 'neutral' },
  priceMatch: { glyph: '🏷', label: 'Price match', tone: 'accent' },
  other: { glyph: '•', label: 'Other', tone: 'neutral' },
};

// ── cash drawer ─────────────────────────────────────────────────────────────

/** A single movement kind in the cash drawer / register audit. */
export type CashMovementKind =
  | 'opening'
  | 'sale'
  | 'refund'
  | 'payIn'
  | 'payOut'
  | 'expected'
  | 'counted'
  | 'variance';

export const CASH_MOVEMENT_META: Record<CashMovementKind, StatusMeta> = {
  opening: { glyph: '🏦', label: 'Opening float', tone: 'neutral' },
  sale: { glyph: '＋', label: 'Cash sales', tone: 'success' },
  refund: { glyph: '↩', label: 'Refunds', tone: 'danger' },
  payIn: { glyph: '⬇', label: 'Paid in', tone: 'primary' },
  payOut: { glyph: '⬆', label: 'Paid out', tone: 'warn' },
  expected: { glyph: '＝', label: 'Expected in drawer', tone: 'neutral' },
  counted: { glyph: '🔢', label: 'Counted', tone: 'primary' },
  variance: { glyph: '±', label: 'Variance', tone: 'neutral' },
};

// ── discount ────────────────────────────────────────────────────────────────

/** How a discount is expressed. */
export type DiscountType = 'percent' | 'amount';

// ── numeric helpers ─────────────────────────────────────────────────────────

/** Coerce to a finite integer cents value, guarding NaN/undefined → 0. */
export function safeCents(value: number | undefined): number {
  if (value == null || !Number.isFinite(value)) return 0;
  return Math.round(value);
}

/** Sum an array of cent values, tolerating gaps/NaN. */
export function sumCents(values: ReadonlyArray<number | undefined>): number {
  return values.reduce<number>((acc, v) => acc + safeCents(v), 0);
}

/**
 * Compute the cash-count variance and its tone: `over` (counted > expected) is
 * a warn, `short` a danger, exact a success. Returns the signed cents delta and
 * a {@link StatusMeta} for the glyph+word chip.
 */
export function varianceMeta(expectedCents: number, countedCents: number): {
  deltaCents: number;
  meta: StatusMeta;
} {
  const delta = safeCents(countedCents) - safeCents(expectedCents);
  if (delta === 0) return { deltaCents: 0, meta: { glyph: '✓', label: 'Balanced', tone: 'success' } };
  if (delta > 0) return { deltaCents: delta, meta: { glyph: '▲', label: 'Over', tone: 'warn' } };
  return { deltaCents: delta, meta: { glyph: '▼', label: 'Short', tone: 'danger' } };
}

/**
 * Two initials from a product/label string for the token-tinted tile fallback
 * (the kit ships no image loader; a missing image becomes a colored plate with
 * initials). Guards empty strings.
 */
export function initials(label: string): string {
  const parts = label.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '—';
  if (parts.length === 1) return (parts[0] ?? '').slice(0, 2).toUpperCase();
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}

/**
 * Deterministic ramp step (100…800) from a string seed, so the same product
 * always draws the same tile tint. Uses an unsigned hash to avoid the negative
 * shift bug that once blackened generative covers.
 */
export function seedRampStep(seed: string): 100 | 200 | 300 | 600 | 700 | 800 {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const steps: Array<100 | 200 | 300 | 600 | 700 | 800> = [100, 200, 300, 600, 700, 800];
  return steps[hash % steps.length] ?? 300;
}
