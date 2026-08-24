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
export declare function toneColor(colors: SemanticColors, tone: PosTone): string;
/** Map a {@link PosTone} to a `SemanticColors` key (for `color=` props). */
export declare function toneSlot(tone: PosTone): keyof SemanticColors;
/**
 * The paired `on{Tone}` foreground slot for a solid fill of `tone`. Falls back
 * to `onSurface` for `neutral` (no contrast-guaranteed pair). Every return is a
 * `SemanticColors` key, so the resolved color is always a token.
 */
export declare function onToneSlot(tone: PosTone): keyof SemanticColors;
/** Tender type used to settle a sale. */
export type PaymentMethod = 'cash' | 'card' | 'contactless' | 'wallet' | 'giftCard' | 'other';
export declare const PAYMENT_METHOD_META: Record<PaymentMethod, StatusMeta>;
/** Kitchen / fulfilment ticket lifecycle. */
export type TicketStatus = 'new' | 'preparing' | 'ready' | 'served' | 'void';
export declare const TICKET_STATUS_META: Record<TicketStatus, StatusMeta>;
/** Refund request lifecycle. */
export type RefundStatus = 'requested' | 'approved' | 'processed' | 'declined';
export declare const REFUND_STATUS_META: Record<RefundStatus, StatusMeta>;
/** Why an item is being returned. */
export type RefundReason = 'damaged' | 'wrongItem' | 'notNeeded' | 'priceMatch' | 'other';
export declare const REFUND_REASON_META: Record<RefundReason, StatusMeta>;
/** A single movement kind in the cash drawer / register audit. */
export type CashMovementKind = 'opening' | 'sale' | 'refund' | 'payIn' | 'payOut' | 'expected' | 'counted' | 'variance';
export declare const CASH_MOVEMENT_META: Record<CashMovementKind, StatusMeta>;
/** How a discount is expressed. */
export type DiscountType = 'percent' | 'amount';
/** Coerce to a finite integer cents value, guarding NaN/undefined → 0. */
export declare function safeCents(value: number | undefined): number;
/** Sum an array of cent values, tolerating gaps/NaN. */
export declare function sumCents(values: ReadonlyArray<number | undefined>): number;
/**
 * Compute the cash-count variance and its tone: `over` (counted > expected) is
 * a warn, `short` a danger, exact a success. Returns the signed cents delta and
 * a {@link StatusMeta} for the glyph+word chip.
 */
export declare function varianceMeta(expectedCents: number, countedCents: number): {
    deltaCents: number;
    meta: StatusMeta;
};
/**
 * Two initials from a product/label string for the token-tinted tile fallback
 * (the kit ships no image loader; a missing image becomes a colored plate with
 * initials). Guards empty strings.
 */
export declare function initials(label: string): string;
/**
 * Deterministic ramp step (100…800) from a string seed, so the same product
 * always draws the same tile tint. Uses an unsigned hash to avoid the negative
 * shift bug that once blackened generative covers.
 */
export declare function seedRampStep(seed: string): 100 | 200 | 300 | 600 | 700 | 800;
//# sourceMappingURL=internal.d.ts.map