"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUOTE_META = exports.ACTIVITY_META = exports.TEMPERATURE_META = exports.OUTCOME_META = void 0;
exports.toneColor = toneColor;
exports.clampPct = clampPct;
/**
 * Resolve a {@link CrmTone} to a concrete token hex for text/icon color.
 * `neutral` maps to `muted`; everything else is a direct `SemanticColors` slot,
 * so the returned value is always a compiled-theme token, never a literal.
 */
function toneColor(colors, tone) {
    return tone === 'neutral' ? colors.muted : colors[tone];
}
exports.OUTCOME_META = {
    open: { glyph: '◔', label: 'Open', tone: 'primary' },
    won: { glyph: '✓', label: 'Won', tone: 'success' },
    lost: { glyph: '✕', label: 'Lost', tone: 'danger' },
    pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
};
exports.TEMPERATURE_META = {
    hot: { glyph: '🔥', label: 'Hot', tone: 'danger' },
    warm: { glyph: '☀', label: 'Warm', tone: 'warn' },
    cold: { glyph: '❄', label: 'Cold', tone: 'primary' },
};
exports.ACTIVITY_META = {
    call: { glyph: '📞', label: 'Call', tone: 'primary' },
    email: { glyph: '✉', label: 'Email', tone: 'accent' },
    meeting: { glyph: '👥', label: 'Meeting', tone: 'primary' },
    note: { glyph: '📝', label: 'Note', tone: 'neutral' },
    task: { glyph: '✔', label: 'Task', tone: 'success' },
    deal: { glyph: '💰', label: 'Deal', tone: 'success' },
};
exports.QUOTE_META = {
    draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
    sent: { glyph: '➤', label: 'Sent', tone: 'primary' },
    viewed: { glyph: '👁', label: 'Viewed', tone: 'accent' },
    accepted: { glyph: '✓', label: 'Accepted', tone: 'success' },
    rejected: { glyph: '✕', label: 'Rejected', tone: 'danger' },
    expired: { glyph: '⌛', label: 'Expired', tone: 'warn' },
};
/** Clamp a 0–100 percentage into range, tolerating undefined/NaN. */
function clampPct(value) {
    if (value == null || !Number.isFinite(value))
        return 0;
    return Math.max(0, Math.min(100, Math.round(value)));
}
//# sourceMappingURL=internal.js.map