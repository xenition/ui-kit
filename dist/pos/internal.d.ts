/**
 * Shared vocabulary for the WEB POS / retail-ops / register module — the DOM
 * parity of `native/pos/internal`. Every status is a **glyph + label + tone**
 * triple so a component conveys state by text and icon, never by color alone
 * (the accessibility half of the token contract). On web, `tone` resolves to
 * Tailwind `--xen-*` token classes (never a literal color) via the maps below,
 * so a pill, a text color, and a border all trace to one source of truth. Money
 * is carried as integer **cents** and funnelled through the shared `formatMoney`
 * for stable 2-decimal output.
 */
import { formatMoney } from '../commerce/money';
export { formatMoney };
/** Tone keys shared by the pill fill, text color, and border maps below. */
export type PosTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export interface StatusMeta {
    /** Non-color glyph carrying the meaning (emoji or unicode symbol). */
    glyph: string;
    /** Human label — the text half of the text+glyph contract. */
    label: string;
    /** Semantic tone (drives pill fill + text color). */
    tone: PosTone;
}
/** Foreground text class for a {@link PosTone} — always a `--xen-*` token class. */
export declare const TONE_TEXT: Record<PosTone, string>;
/** Soft (tinted) pill classes for a tone — mirrors the kit `Badge` philosophy. */
export declare const TONE_SOFT: Record<PosTone, string>;
/** Solid (filled) pill classes for a tone. */
export declare const TONE_SOLID: Record<PosTone, string>;
/** Border class for a tone (selection rings, accents). */
export declare const TONE_BORDER: Record<PosTone, string>;
/**
 * A light background tint for a tone used behind a selection ring. Only
 * `primary`/`accent` ship a light ramp; the rest fall back to `bg-neutral-100`,
 * with selection still carried by the ring + a `✓` glyph (never color alone).
 */
export declare const TONE_SOFT_BG: Record<PosTone, string>;
/** Deterministic neutral-ramp background class for a seeded product plate. */
export declare function rampBgClass(step: 100 | 200 | 300 | 600 | 700 | 800): string;
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
 * Deterministic ramp step from a string seed, so the same product always draws
 * the same tile tint. Uses an unsigned hash to avoid the negative-shift bug
 * that once blackened generative covers.
 */
export declare function seedRampStep(seed: string): 100 | 200 | 300 | 600 | 700 | 800;
//# sourceMappingURL=internal.d.ts.map