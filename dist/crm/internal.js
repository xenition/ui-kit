"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUOTE_META = exports.ACTIVITY_META = exports.TEMPERATURE_META = exports.OUTCOME_META = void 0;
exports.toneTextClass = toneTextClass;
exports.toneBadgeTone = toneBadgeTone;
exports.toneFillClass = toneFillClass;
exports.clampPct = clampPct;
exports.activate = activate;
/**
 * Resolve a {@link CrmTone} to a `text-*` token class for glyph/label color.
 * `neutral` → `text-muted`; `accent` → `text-primary` (web has no accent slot);
 * everything else is the matching `text-<tone>` token class — never a literal.
 */
function toneTextClass(tone) {
    if (tone === 'neutral')
        return 'text-muted';
    if (tone === 'accent')
        return 'text-primary';
    return `text-${tone}`;
}
/** Map a {@link CrmTone} onto the web `Badge` tone scale (accent → primary). */
function toneBadgeTone(tone) {
    return tone === 'neutral' ? 'neutral' : tone === 'accent' ? 'primary' : tone;
}
/**
 * Filled-chip classes for a selected {@link CrmTone} (background + on-color +
 * transparent border). All token classes — used by the filter bar's active chip.
 */
function toneFillClass(tone) {
    switch (tone) {
        case 'success':
            return 'bg-success text-on-success border-transparent';
        case 'warn':
            return 'bg-warn text-on-warn border-transparent';
        case 'danger':
            return 'bg-danger text-on-danger border-transparent';
        case 'neutral':
            return 'bg-neutral-100 text-on-surface border-border';
        // primary + accent
        default:
            return 'bg-primary text-on-primary border-transparent';
    }
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
/**
 * DOM props that turn a non-button element into an accessible, keyboard-driven
 * button when `handler` is set (Enter/Space activate it). Returns an empty object
 * when there's no handler, so the element stays inert. Interactive CRM cards
 * spread this onto their root `div`.
 */
function activate(handler) {
    if (!handler)
        return {};
    return {
        role: 'button',
        tabIndex: 0,
        onClick: handler,
        onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handler();
            }
        },
    };
}
//# sourceMappingURL=internal.js.map