"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CASH_MOVEMENT_META = exports.REFUND_REASON_META = exports.REFUND_STATUS_META = exports.TICKET_STATUS_META = exports.PAYMENT_METHOD_META = exports.withAlpha = exports.formatMoney = void 0;
exports.toneColor = toneColor;
exports.toneSlot = toneSlot;
exports.onToneSlot = onToneSlot;
exports.safeCents = safeCents;
exports.sumCents = sumCents;
exports.varianceMeta = varianceMeta;
exports.initials = initials;
exports.seedRampStep = seedRampStep;
const money_1 = require("../commerce/money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
const color_1 = require("../primitives/internal/color");
Object.defineProperty(exports, "withAlpha", { enumerable: true, get: function () { return color_1.withAlpha; } });
/**
 * Resolve a {@link PosTone} to a concrete token hex for text/icon color.
 * `neutral` maps to `muted`; everything else is a direct `SemanticColors` slot,
 * so the returned value is always a compiled-theme token, never a literal.
 */
function toneColor(colors, tone) {
    return tone === 'neutral' ? colors.muted : colors[tone];
}
/** Map a {@link PosTone} to a `SemanticColors` key (for `color=` props). */
function toneSlot(tone) {
    return tone === 'neutral' ? 'muted' : tone;
}
/**
 * The paired `on{Tone}` foreground slot for a solid fill of `tone`. Falls back
 * to `onSurface` for `neutral` (no contrast-guaranteed pair). Every return is a
 * `SemanticColors` key, so the resolved color is always a token.
 */
function onToneSlot(tone) {
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
 * Deterministic ramp step (100…800) from a string seed, so the same product
 * always draws the same tile tint. Uses an unsigned hash to avoid the negative
 * shift bug that once blackened generative covers.
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