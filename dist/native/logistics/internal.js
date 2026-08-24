"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CARRIER_META = exports.DOCK_META = exports.SCAN_META = exports.PROOF_META = exports.STOP_META = exports.SHIPMENT_META = exports.TRACKING_META = exports.TRACKING_ORDER = void 0;
exports.toneColor = toneColor;
exports.withAlpha = withAlpha;
exports.trackingIndex = trackingIndex;
exports.clampPct = clampPct;
exports.formatWeight = formatWeight;
/**
 * Resolve a {@link LogisticsTone} to a concrete token hex for text/icon color.
 * `neutral` maps to `muted`; everything else is a direct `SemanticColors` slot,
 * so the returned value is always a compiled-theme token, never a literal.
 */
function toneColor(colors, tone) {
    return tone === 'neutral' ? colors.muted : colors[tone];
}
/**
 * Token-derived translucent tint (no literal hex; mirrors the primitive
 * `withAlpha` in `Button`/`Badge`). Input must be a `#rgb`/`#rrggbb` token hex.
 */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/** Ordered happy-path stages (drives the tracking timeline progression). */
exports.TRACKING_ORDER = [
    'picked',
    'in-transit',
    'out-for-delivery',
    'delivered',
];
exports.TRACKING_META = {
    picked: { glyph: '📦', label: 'Picked', tone: 'primary' },
    'in-transit': { glyph: '🚚', label: 'In transit', tone: 'accent' },
    'out-for-delivery': { glyph: '🛵', label: 'Out for delivery', tone: 'warn' },
    delivered: { glyph: '✓', label: 'Delivered', tone: 'success' },
    exception: { glyph: '⚠', label: 'Exception', tone: 'danger' },
};
/** Return the 0-based index of a stage in the ordered timeline (−1 if off-path). */
function trackingIndex(stage) {
    return exports.TRACKING_ORDER.indexOf(stage);
}
exports.SHIPMENT_META = {
    draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
    'label-created': { glyph: '🏷', label: 'Label created', tone: 'primary' },
    'in-transit': { glyph: '🚚', label: 'In transit', tone: 'accent' },
    'out-for-delivery': { glyph: '🛵', label: 'Out for delivery', tone: 'warn' },
    delivered: { glyph: '✓', label: 'Delivered', tone: 'success' },
    delayed: { glyph: '⏳', label: 'Delayed', tone: 'warn' },
    exception: { glyph: '⚠', label: 'Exception', tone: 'danger' },
    returned: { glyph: '↩', label: 'Returned', tone: 'danger' },
};
exports.STOP_META = {
    pending: { glyph: '○', label: 'Pending', tone: 'neutral' },
    'en-route': { glyph: '➤', label: 'En route', tone: 'accent' },
    arrived: { glyph: '📍', label: 'Arrived', tone: 'primary' },
    completed: { glyph: '✓', label: 'Completed', tone: 'success' },
    failed: { glyph: '✕', label: 'Failed', tone: 'danger' },
    skipped: { glyph: '⤳', label: 'Skipped', tone: 'warn' },
};
exports.PROOF_META = {
    signature: { glyph: '✍', label: 'Signature', tone: 'primary' },
    photo: { glyph: '📷', label: 'Photo', tone: 'accent' },
    pin: { glyph: '🔢', label: 'PIN', tone: 'primary' },
    contactless: { glyph: '📲', label: 'Contactless', tone: 'accent' },
};
exports.SCAN_META = {
    inbound: { glyph: '⬇', label: 'Inbound', tone: 'primary' },
    outbound: { glyph: '⬆', label: 'Outbound', tone: 'accent' },
    sort: { glyph: '🔀', label: 'Sort', tone: 'primary' },
    load: { glyph: '🚛', label: 'Load', tone: 'accent' },
    delivery: { glyph: '✓', label: 'Delivery', tone: 'success' },
    exception: { glyph: '⚠', label: 'Exception', tone: 'danger' },
};
exports.DOCK_META = {
    open: { glyph: '○', label: 'Open', tone: 'neutral' },
    booked: { glyph: '📅', label: 'Booked', tone: 'primary' },
    loading: { glyph: '⬆', label: 'Loading', tone: 'accent' },
    unloading: { glyph: '⬇', label: 'Unloading', tone: 'accent' },
    completed: { glyph: '✓', label: 'Completed', tone: 'success' },
    overdue: { glyph: '⚠', label: 'Overdue', tone: 'danger' },
};
exports.CARRIER_META = {
    ups: { glyph: '📦', label: 'UPS', tone: 'warn' },
    fedex: { glyph: '✈', label: 'FedEx', tone: 'accent' },
    usps: { glyph: '📮', label: 'USPS', tone: 'primary' },
    dhl: { glyph: '🚚', label: 'DHL', tone: 'warn' },
    amazon: { glyph: '📦', label: 'Amazon', tone: 'accent' },
    ontrac: { glyph: '🚐', label: 'OnTrac', tone: 'primary' },
    generic: { glyph: '🚚', label: 'Carrier', tone: 'neutral' },
};
/** Clamp a 0–100 percentage into range, tolerating undefined/NaN. */
function clampPct(value) {
    if (value == null || !Number.isFinite(value))
        return 0;
    return Math.max(0, Math.min(100, Math.round(value)));
}
/**
 * Format a weight for display. Accepts a numeric amount + unit and renders a
 * compact string; guards against undefined/NaN by returning an em dash.
 */
function formatWeight(amount, unit = 'kg') {
    if (amount == null || !Number.isFinite(amount))
        return '—';
    const rounded = Math.round(amount * 100) / 100;
    return `${rounded} ${unit}`;
}
//# sourceMappingURL=internal.js.map