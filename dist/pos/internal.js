"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CASH_MOVEMENT_META = exports.REFUND_REASON_META = exports.REFUND_STATUS_META = exports.TICKET_STATUS_META = exports.PAYMENT_METHOD_META = exports.TONE_SOFT_BG = exports.TONE_BORDER = exports.TONE_SOLID = exports.TONE_SOFT = exports.TONE_TEXT = exports.formatMoney = void 0;
exports.rampBgClass = rampBgClass;
exports.safeCents = safeCents;
exports.sumCents = sumCents;
exports.varianceMeta = varianceMeta;
exports.initials = initials;
exports.seedRampStep = seedRampStep;
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
const money_1 = require("../commerce/money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
// ── token-class resolvers (web parity of the native hex resolvers) ───────────
/** Foreground text class for a {@link PosTone} — always a `--xen-*` token class. */
exports.TONE_TEXT = {
    neutral: 'text-muted',
    primary: 'text-primary',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
    accent: 'text-accent',
};
/** Soft (tinted) pill classes for a tone — mirrors the kit `Badge` philosophy. */
exports.TONE_SOFT = {
    neutral: 'bg-neutral-100 text-on-surface',
    primary: 'bg-primary-50 text-primary',
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
    accent: 'bg-accent-50 text-accent',
};
/** Solid (filled) pill classes for a tone. */
exports.TONE_SOLID = {
    neutral: 'bg-neutral-200 text-on-surface',
    primary: 'bg-primary text-on-primary',
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
    accent: 'bg-accent text-on-accent',
};
/** Border class for a tone (selection rings, accents). */
exports.TONE_BORDER = {
    neutral: 'border-border',
    primary: 'border-primary',
    success: 'border-success',
    warn: 'border-warn',
    danger: 'border-danger',
    accent: 'border-accent',
};
/**
 * A light background tint for a tone used behind a selection ring. Only
 * `primary`/`accent` ship a light ramp; the rest fall back to `bg-neutral-100`,
 * with selection still carried by the ring + a `✓` glyph (never color alone).
 */
exports.TONE_SOFT_BG = {
    neutral: 'bg-neutral-100',
    primary: 'bg-primary-50',
    success: 'bg-neutral-100',
    warn: 'bg-neutral-100',
    danger: 'bg-neutral-100',
    accent: 'bg-accent-50',
};
const RAMP_BG = {
    100: 'bg-neutral-100',
    200: 'bg-neutral-200',
    300: 'bg-neutral-300',
    600: 'bg-neutral-600',
    700: 'bg-neutral-700',
    800: 'bg-neutral-800',
};
/** Deterministic neutral-ramp background class for a seeded product plate. */
function rampBgClass(step) {
    return RAMP_BG[step] ?? 'bg-neutral-300';
}
exports.PAYMENT_METHOD_META = {
    cash: { glyph: '💵', label: 'Cash', tone: 'success' },
    card: { glyph: '💳', label: 'Card', tone: 'primary' },
    contactless: { glyph: '📶', label: 'Tap', tone: 'accent' },
    wallet: { glyph: '📱', label: 'Wallet', tone: 'primary' },
    giftCard: { glyph: '🎁', label: 'Gift card', tone: 'accent' },
    other: { glyph: '•', label: 'Other', tone: 'neutral' },
};
exports.TICKET_STATUS_META = {
    new: { glyph: '●', label: 'New', tone: 'primary' },
    preparing: { glyph: '◔', label: 'Preparing', tone: 'warn' },
    ready: { glyph: '✓', label: 'Ready', tone: 'success' },
    served: { glyph: '✔', label: 'Served', tone: 'neutral' },
    void: { glyph: '✕', label: 'Void', tone: 'danger' },
};
exports.REFUND_STATUS_META = {
    requested: { glyph: '⋯', label: 'Requested', tone: 'warn' },
    approved: { glyph: '✓', label: 'Approved', tone: 'success' },
    processed: { glyph: '💵', label: 'Refunded', tone: 'accent' },
    declined: { glyph: '✕', label: 'Declined', tone: 'danger' },
};
exports.REFUND_REASON_META = {
    damaged: { glyph: '💔', label: 'Damaged', tone: 'danger' },
    wrongItem: { glyph: '🔁', label: 'Wrong item', tone: 'warn' },
    notNeeded: { glyph: '🙅', label: 'Not needed', tone: 'neutral' },
    priceMatch: { glyph: '🏷', label: 'Price match', tone: 'accent' },
    other: { glyph: '•', label: 'Other', tone: 'neutral' },
};
exports.CASH_MOVEMENT_META = {
    opening: { glyph: '🏦', label: 'Opening float', tone: 'neutral' },
    sale: { glyph: '＋', label: 'Cash sales', tone: 'success' },
    refund: { glyph: '↩', label: 'Refunds', tone: 'danger' },
    payIn: { glyph: '⬇', label: 'Paid in', tone: 'primary' },
    payOut: { glyph: '⬆', label: 'Paid out', tone: 'warn' },
    expected: { glyph: '＝', label: 'Expected in drawer', tone: 'neutral' },
    counted: { glyph: '🔢', label: 'Counted', tone: 'primary' },
    variance: { glyph: '±', label: 'Variance', tone: 'neutral' },
};
// ── numeric helpers ─────────────────────────────────────────────────────────
/** Coerce to a finite integer cents value, guarding NaN/undefined → 0. */
function safeCents(value) {
    if (value == null || !Number.isFinite(value))
        return 0;
    return Math.round(value);
}
/** Sum an array of cent values, tolerating gaps/NaN. */
function sumCents(values) {
    return values.reduce((acc, v) => acc + safeCents(v), 0);
}
/**
 * Compute the cash-count variance and its tone: `over` (counted > expected) is
 * a warn, `short` a danger, exact a success. Returns the signed cents delta and
 * a {@link StatusMeta} for the glyph+word chip.
 */
function varianceMeta(expectedCents, countedCents) {
    const delta = safeCents(countedCents) - safeCents(expectedCents);
    if (delta === 0)
        return { deltaCents: 0, meta: { glyph: '✓', label: 'Balanced', tone: 'success' } };
    if (delta > 0)
        return { deltaCents: delta, meta: { glyph: '▲', label: 'Over', tone: 'warn' } };
    return { deltaCents: delta, meta: { glyph: '▼', label: 'Short', tone: 'danger' } };
}
/**
 * Two initials from a product/label string for the token-tinted tile fallback
 * (the kit ships no image loader; a missing image becomes a colored plate with
 * initials). Guards empty strings.
 */
function initials(label) {
    const parts = label.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0)
        return '—';
    if (parts.length === 1)
        return (parts[0] ?? '').slice(0, 2).toUpperCase();
    return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}
/**
 * Deterministic ramp step from a string seed, so the same product always draws
 * the same tile tint. Uses an unsigned hash to avoid the negative-shift bug
 * that once blackened generative covers.
 */
function seedRampStep(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
        hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const steps = [100, 200, 300, 600, 700, 800];
    return steps[hash % steps.length] ?? 300;
}
//# sourceMappingURL=internal.js.map