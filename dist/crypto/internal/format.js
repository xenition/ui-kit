"use strict";
/**
 * Display-formatting helpers for the web crypto module. Every value is formatted
 * deterministically (fixed fraction digits via `Intl.NumberFormat`) so a token
 * amount, price, or percentage never shows float drift on screen. Hashes and
 * addresses are truncated with guarded slicing — a short or non-string input can
 * never throw. Web parity of the native crypto `internal/format`; tone resolves
 * to a `text-*` token class (never a literal color).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateHash = truncateHash;
exports.formatToken = formatToken;
exports.formatPrice = formatPrice;
exports.formatPct = formatPct;
exports.changeToneKey = changeToneKey;
exports.changeGlyph = changeGlyph;
exports.changeToneClass = changeToneClass;
/** Unicode minus (U+2212) — matches the finance module's negative sign. */
const MINUS = '−';
/**
 * Truncate a long hex hash/address to `lead…tail` (e.g. `0x1234…cdef`).
 * Returns the input unchanged when it is already short, and `''` for a
 * non-string. Never indexes past the bounds.
 */
function truncateHash(hash, lead = 6, tail = 4) {
    if (typeof hash !== 'string')
        return '';
    const h = hash.trim();
    const safeLead = Math.max(0, lead);
    const safeTail = Math.max(0, tail);
    if (h.length <= safeLead + safeTail + 1)
        return h;
    return `${h.slice(0, safeLead)}…${h.slice(h.length - safeTail)}`;
}
/**
 * Format a token quantity with a stable number of fraction digits. Non-finite
 * input falls back to `0`; `decimals` is clamped to `0…18`. The optional
 * `symbol` is appended (`1,234.5 ETH`).
 */
function formatToken(amount, opts = {}) {
    const { decimals = 4, symbol } = opts;
    const safe = Number.isFinite(amount) ? amount : 0;
    const maxFrac = Math.max(0, Math.min(Math.trunc(decimals), 18));
    const body = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: maxFrac,
    }).format(safe);
    return symbol ? `${body} ${symbol}` : body;
}
/**
 * Format a fiat/crypto price with a fixed 2-decimal (configurable) precision
 * and a currency symbol prefix. Stable — the printed value never drifts.
 */
function formatPrice(price, opts = {}) {
    const { symbol = '$', decimals = 2 } = opts;
    const safe = Number.isFinite(price) ? price : 0;
    const frac = Math.max(0, Math.min(Math.trunc(decimals), 18));
    const body = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: frac,
        maximumFractionDigits: frac,
    }).format(safe);
    return `${symbol}${body}`;
}
/**
 * Format a signed percentage as `+1.23%` / `−1.23%` / `0.00%`. Uses the
 * unicode minus so it lines up with the rest of the kit.
 */
function formatPct(pct, decimals = 2) {
    const safe = Number.isFinite(pct) ? pct : 0;
    const frac = Math.max(0, Math.min(Math.trunc(decimals), 6));
    const sign = safe > 0 ? '+' : safe < 0 ? MINUS : '';
    const body = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: frac,
        maximumFractionDigits: frac,
    }).format(Math.abs(safe));
    return `${sign}${body}%`;
}
/**
 * Resolve a signed change to a semantic tone slot: gains read `success`,
 * losses read `danger`, and a flat/zero change reads `muted`. Never color a
 * status by hue alone — pair this with a glyph or label at the call site.
 */
function changeToneKey(delta) {
    const safe = Number.isFinite(delta) ? delta : 0;
    if (safe > 0)
        return 'success';
    if (safe < 0)
        return 'danger';
    return 'muted';
}
/** Directional glyph for a signed change (▲ / ▼ / •) — a non-color status cue. */
function changeGlyph(delta) {
    const safe = Number.isFinite(delta) ? delta : 0;
    if (safe > 0)
        return '▲';
    if (safe < 0)
        return '▼';
    return '•';
}
/** Map a change tone slot to its `text-*` token class (no literal colors). */
const TONE_TEXT = {
    success: 'text-success',
    danger: 'text-danger',
    muted: 'text-muted',
};
/** `text-*` token class for a change tone slot — success/danger/muted only. */
function changeToneClass(tone) {
    return TONE_TEXT[tone];
}
//# sourceMappingURL=format.js.map