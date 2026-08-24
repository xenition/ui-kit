"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISCLAIMER_META = exports.EVIDENCE_STATUS_META = exports.EVIDENCE_KIND_META = exports.SIGNATURE_STATUS_META = exports.RETAINER_STATUS_META = exports.COURT_URGENCY_META = exports.COURT_EVENT_META = exports.CONFLICT_CHECK_META = exports.INTAKE_STATUS_META = exports.BILLABLE_STATUS_META = exports.APPOINTMENT_STATUS_META = exports.APPOINTMENT_TYPE_META = exports.CLAUSE_RISK_META = exports.CLAUSE_STATUS_META = exports.DOCUMENT_KIND_META = exports.DOCUMENT_STATUS_META = exports.MATTER_STAGE_ORDER = exports.MATTER_STAGE_META = exports.CASE_PRIORITY_META = exports.PRACTICE_AREA_META = exports.CASE_STATUS_META = exports.formatMoney = void 0;
exports.toneColor = toneColor;
exports.toneSlot = toneSlot;
exports.onToneSlot = onToneSlot;
exports.clampPct = clampPct;
exports.formatHours = formatHours;
exports.billableCents = billableCents;
const money_1 = require("../commerce/money");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return money_1.formatMoney; } });
/**
 * Resolve a {@link LegalTone} to a concrete token hex for text/icon color.
 * `neutral` maps to `muted`; everything else is a direct `SemanticColors` slot,
 * so the returned value is always a compiled-theme token, never a literal.
 */
function toneColor(colors, tone) {
    return tone === 'neutral' ? colors.muted : colors[tone];
}
/** Map a {@link LegalTone} to a `SemanticColors` key (for `color=` props). */
function toneSlot(tone) {
    return tone === 'neutral' ? 'muted' : tone;
}
/** Resolve the paired `onX` token for a solid tone fill (falls back to onSurface). */
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
exports.CASE_STATUS_META = {
    open: { glyph: '●', label: 'Open', tone: 'success' },
    pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
    onHold: { glyph: '⏸', label: 'On hold', tone: 'accent' },
    closed: { glyph: '✓', label: 'Closed', tone: 'neutral' },
    appealed: { glyph: '⚖', label: 'Appealed', tone: 'primary' },
};
exports.PRACTICE_AREA_META = {
    litigation: { glyph: '⚖', label: 'Litigation', tone: 'primary' },
    corporate: { glyph: '🏢', label: 'Corporate', tone: 'accent' },
    family: { glyph: '👪', label: 'Family', tone: 'success' },
    criminal: { glyph: '🚨', label: 'Criminal', tone: 'danger' },
    realEstate: { glyph: '🏠', label: 'Real estate', tone: 'primary' },
    ip: { glyph: '💡', label: 'IP', tone: 'accent' },
    employment: { glyph: '💼', label: 'Employment', tone: 'neutral' },
    other: { glyph: '•', label: 'Other', tone: 'neutral' },
};
exports.CASE_PRIORITY_META = {
    low: { glyph: '▽', label: 'Low', tone: 'neutral' },
    normal: { glyph: '◆', label: 'Normal', tone: 'primary' },
    high: { glyph: '▲', label: 'High', tone: 'warn' },
    urgent: { glyph: '‼', label: 'Urgent', tone: 'danger' },
};
exports.MATTER_STAGE_META = {
    intake: { glyph: '○', label: 'Intake', tone: 'neutral' },
    active: { glyph: '◔', label: 'Active', tone: 'primary' },
    discovery: { glyph: '🔍', label: 'Discovery', tone: 'accent' },
    trial: { glyph: '⚖', label: 'Trial', tone: 'warn' },
    settlement: { glyph: '🤝', label: 'Settlement', tone: 'success' },
    closed: { glyph: '✓', label: 'Closed', tone: 'neutral' },
};
/** Ordered matter stages for a progress meter. */
exports.MATTER_STAGE_ORDER = [
    'intake',
    'active',
    'discovery',
    'trial',
    'settlement',
    'closed',
];
exports.DOCUMENT_STATUS_META = {
    draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
    review: { glyph: '◔', label: 'In review', tone: 'primary' },
    final: { glyph: '●', label: 'Final', tone: 'accent' },
    signed: { glyph: '✓', label: 'Signed', tone: 'success' },
    filed: { glyph: '🗄', label: 'Filed', tone: 'success' },
    expired: { glyph: '✕', label: 'Expired', tone: 'danger' },
};
exports.DOCUMENT_KIND_META = {
    contract: { glyph: '📄', label: 'Contract', tone: 'primary' },
    brief: { glyph: '📑', label: 'Brief', tone: 'accent' },
    motion: { glyph: '📝', label: 'Motion', tone: 'primary' },
    pleading: { glyph: '📋', label: 'Pleading', tone: 'accent' },
    correspondence: { glyph: '✉', label: 'Letter', tone: 'neutral' },
    exhibit: { glyph: '📎', label: 'Exhibit', tone: 'warn' },
    other: { glyph: '📁', label: 'Document', tone: 'neutral' },
};
exports.CLAUSE_STATUS_META = {
    standard: { glyph: '○', label: 'Standard', tone: 'neutral' },
    review: { glyph: '◔', label: 'Under review', tone: 'primary' },
    negotiate: { glyph: '⇄', label: 'In negotiation', tone: 'warn' },
    flagged: { glyph: '⚠', label: 'Flagged', tone: 'danger' },
    agreed: { glyph: '✓', label: 'Agreed', tone: 'success' },
};
exports.CLAUSE_RISK_META = {
    low: { glyph: '▽', label: 'Low risk', tone: 'success' },
    medium: { glyph: '◆', label: 'Medium risk', tone: 'warn' },
    high: { glyph: '▲', label: 'High risk', tone: 'danger' },
};
exports.APPOINTMENT_TYPE_META = {
    consultation: { glyph: '💬', label: 'Consultation', tone: 'primary' },
    deposition: { glyph: '🎙', label: 'Deposition', tone: 'accent' },
    mediation: { glyph: '🤝', label: 'Mediation', tone: 'success' },
    hearing: { glyph: '⚖', label: 'Hearing', tone: 'warn' },
    meeting: { glyph: '📅', label: 'Meeting', tone: 'primary' },
    call: { glyph: '📞', label: 'Call', tone: 'neutral' },
};
exports.APPOINTMENT_STATUS_META = {
    scheduled: { glyph: '○', label: 'Scheduled', tone: 'primary' },
    confirmed: { glyph: '✓', label: 'Confirmed', tone: 'success' },
    completed: { glyph: '●', label: 'Completed', tone: 'neutral' },
    cancelled: { glyph: '✕', label: 'Cancelled', tone: 'danger' },
};
exports.BILLABLE_STATUS_META = {
    draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
    unbilled: { glyph: '⋯', label: 'Unbilled', tone: 'warn' },
    billed: { glyph: '✓', label: 'Billed', tone: 'success' },
    writtenOff: { glyph: '✕', label: 'Written off', tone: 'danger' },
};
exports.INTAKE_STATUS_META = {
    new: { glyph: '✦', label: 'New', tone: 'primary' },
    contacted: { glyph: '◔', label: 'Contacted', tone: 'accent' },
    qualified: { glyph: '●', label: 'Qualified', tone: 'warn' },
    retained: { glyph: '✓', label: 'Retained', tone: 'success' },
    declined: { glyph: '✕', label: 'Declined', tone: 'neutral' },
};
exports.CONFLICT_CHECK_META = {
    clear: { glyph: '✓', label: 'Conflict clear', tone: 'success' },
    pending: { glyph: '⋯', label: 'Conflict pending', tone: 'warn' },
    conflict: { glyph: '⛔', label: 'Conflict found', tone: 'danger' },
};
exports.COURT_EVENT_META = {
    hearing: { glyph: '⚖', label: 'Hearing', tone: 'primary' },
    trial: { glyph: '🏛', label: 'Trial', tone: 'warn' },
    filing: { glyph: '🗄', label: 'Filing', tone: 'accent' },
    deadline: { glyph: '⏰', label: 'Deadline', tone: 'danger' },
    conference: { glyph: '👥', label: 'Conference', tone: 'primary' },
};
exports.COURT_URGENCY_META = {
    past: { glyph: '✓', label: 'Past', tone: 'neutral' },
    today: { glyph: '‼', label: 'Today', tone: 'danger' },
    soon: { glyph: '⚠', label: 'Soon', tone: 'warn' },
    upcoming: { glyph: '○', label: 'Upcoming', tone: 'primary' },
};
exports.RETAINER_STATUS_META = {
    healthy: { glyph: '✓', label: 'Healthy', tone: 'success' },
    low: { glyph: '⚠', label: 'Running low', tone: 'warn' },
    depleted: { glyph: '⛔', label: 'Depleted', tone: 'danger' },
    replenished: { glyph: '↑', label: 'Replenished', tone: 'primary' },
};
exports.SIGNATURE_STATUS_META = {
    draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
    sent: { glyph: '➤', label: 'Awaiting signature', tone: 'warn' },
    viewed: { glyph: '👁', label: 'Viewed', tone: 'primary' },
    signed: { glyph: '✓', label: 'Signed', tone: 'success' },
    declined: { glyph: '✕', label: 'Declined', tone: 'danger' },
    expired: { glyph: '⏳', label: 'Expired', tone: 'neutral' },
};
exports.EVIDENCE_KIND_META = {
    document: { glyph: '📄', label: 'Document', tone: 'primary' },
    photo: { glyph: '📷', label: 'Photo', tone: 'accent' },
    video: { glyph: '🎞', label: 'Video', tone: 'accent' },
    audio: { glyph: '🔊', label: 'Audio', tone: 'primary' },
    testimony: { glyph: '🗣', label: 'Testimony', tone: 'neutral' },
    physical: { glyph: '📦', label: 'Physical', tone: 'warn' },
};
exports.EVIDENCE_STATUS_META = {
    admitted: { glyph: '✓', label: 'Admitted', tone: 'success' },
    pending: { glyph: '⋯', label: 'Pending ruling', tone: 'warn' },
    objected: { glyph: '⚠', label: 'Objected', tone: 'danger' },
    excluded: { glyph: '✕', label: 'Excluded', tone: 'neutral' },
};
exports.DISCLAIMER_META = {
    info: { glyph: 'ℹ', label: 'Notice', tone: 'primary' },
    notice: { glyph: '§', label: 'Legal notice', tone: 'accent' },
    warning: { glyph: '⚠', label: 'Warning', tone: 'warn' },
    critical: { glyph: '⛔', label: 'Important', tone: 'danger' },
};
// ── numeric helpers ─────────────────────────────────────────────────────────
/** Clamp a 0–100 percentage into range, tolerating undefined/NaN. */
function clampPct(value) {
    if (value == null || !Number.isFinite(value))
        return 0;
    return Math.max(0, Math.min(100, Math.round(value)));
}
/**
 * Format decimal hours as a stable `Hh Mm` string (e.g. `1.5` → `1h 30m`).
 * Guards NaN/negatives to `0h 0m`; used by the billable time row.
 */
function formatHours(hours) {
    const h = hours == null || !Number.isFinite(hours) || hours < 0 ? 0 : hours;
    const whole = Math.floor(h);
    const mins = Math.round((h - whole) * 60);
    if (mins === 60)
        return `${whole + 1}h 0m`;
    return `${whole}h ${mins}m`;
}
/**
 * Compute a billable amount in integer **cents** from decimal hours and an
 * hourly rate (also in cents). Rounds to the nearest cent and guards bad input
 * to `0`, so downstream `formatMoney` always gets a clean integer.
 */
function billableCents(hours, rateCents) {
    const h = hours == null || !Number.isFinite(hours) || hours < 0 ? 0 : hours;
    const r = rateCents == null || !Number.isFinite(rateCents) || rateCents < 0 ? 0 : rateCents;
    return Math.round(h * r);
}
//# sourceMappingURL=internal.js.map