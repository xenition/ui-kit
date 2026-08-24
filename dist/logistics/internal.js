"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CARRIER_META = exports.DOCK_META = exports.SCAN_META = exports.PROOF_META = exports.STOP_META = exports.SHIPMENT_META = exports.TRACKING_META = exports.TRACKING_ORDER = exports.TONE_BORDER = exports.TONE_SOFT_STRONG_BG = exports.TONE_SOFT_BG = exports.TONE_ON_TEXT = exports.TONE_BG = exports.TONE_TEXT = void 0;
exports.trackingIndex = trackingIndex;
exports.clampPct = clampPct;
exports.formatWeight = formatWeight;
exports.pressableProps = pressableProps;
/** `text-*` token class per tone (`neutral` reads as muted). */
exports.TONE_TEXT = {
    neutral: 'text-muted',
    primary: 'text-primary',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
    accent: 'text-accent',
};
/** Solid `bg-*` fill per tone (for filled markers / nodes). */
exports.TONE_BG = {
    neutral: 'bg-neutral-300',
    primary: 'bg-primary',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    accent: 'bg-accent',
};
/** Readable `text-*` for content sitting on a {@link TONE_BG} solid fill. */
exports.TONE_ON_TEXT = {
    neutral: 'text-on-surface',
    primary: 'text-on-primary',
    success: 'text-on-success',
    warn: 'text-on-warn',
    danger: 'text-on-danger',
    accent: 'text-on-accent',
};
/** Soft translucent tint per tone (the token-pure analog of `withAlpha`). */
exports.TONE_SOFT_BG = {
    neutral: 'bg-neutral-100',
    primary: 'bg-primary/10',
    success: 'bg-success/10',
    warn: 'bg-warn/10',
    danger: 'bg-danger/10',
    accent: 'bg-accent/10',
};
/** Stronger translucent tint per tone (for status pills). */
exports.TONE_SOFT_STRONG_BG = {
    neutral: 'bg-neutral-100',
    primary: 'bg-primary/20',
    success: 'bg-success/20',
    warn: 'bg-warn/20',
    danger: 'bg-danger/20',
    accent: 'bg-accent/20',
};
/** `border-*` token class per tone. */
exports.TONE_BORDER = {
    neutral: 'border-border',
    primary: 'border-primary',
    success: 'border-success',
    warn: 'border-warn',
    danger: 'border-danger',
    accent: 'border-accent',
};
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
/**
 * The web analog of a native `Pressable` wrapper: given an optional `onClick`,
 * returns the props that turn a plain element into a keyboard-operable button
 * (click + Enter/Space), or `undefined` when the element is non-interactive.
 */
function pressableProps(onClick) {
    if (!onClick)
        return undefined;
    return {
        role: 'button',
        tabIndex: 0,
        onClick,
        onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick();
            }
        },
    };
}
//# sourceMappingURL=internal.js.map