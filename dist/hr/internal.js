"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLICY_STATUS_META = exports.EXPENSE_CATEGORY_META = exports.EXPENSE_STATUS_META = exports.SHIFT_STATUS_META = exports.BENEFIT_TYPE_META = exports.BENEFIT_STATUS_META = exports.TASK_STATUS_META = exports.REVIEW_STATUS_META = exports.TIMESHEET_STATUS_META = exports.PAYSLIP_STATUS_META = exports.LEAVE_TYPE_META = exports.LEAVE_STATUS_META = exports.PRESENCE_META = exports.EMPLOYEE_STATUS_META = exports.EMPLOYMENT_META = exports.TONE_TEXT_CLASS = exports.formatMoney = void 0;
exports.toneTextClass = toneTextClass;
exports.clampPct = clampPct;
exports.clampRating = clampRating;
exports.formatHours = formatHours;
/**
 * Shared vocabulary for the **web** HR / people-ops module — the DOM parity of
 * `native/hr/internal.ts`. Every status is expressed as a **glyph + label +
 * tone** triple so a component conveys state by text and icon, never by color
 * alone (the accessibility half of the token contract). `tone` values map 1:1
 * onto a `text-*` token class via {@link toneTextClass} / {@link TONE_TEXT_CLASS},
 * so one status drives a token-bound text color from a single source of truth —
 * no literal colors. Money is carried as integer **cents** and funnelled through
 * the shared {@link formatMoney} for stable 2-decimal output.
 */
const commerce_1 = require("../commerce");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return commerce_1.formatMoney; } });
/** Map an {@link HrTone} to a token-bound `text-*` class (never a literal). */
exports.TONE_TEXT_CLASS = {
    neutral: 'text-muted',
    primary: 'text-primary',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
    accent: 'text-accent',
};
/** Resolve an {@link HrTone} to its token `text-*` class. */
function toneTextClass(tone) {
    return exports.TONE_TEXT_CLASS[tone];
}
exports.EMPLOYMENT_META = {
    fullTime: { glyph: '●', label: 'Full-time', tone: 'primary' },
    partTime: { glyph: '◐', label: 'Part-time', tone: 'accent' },
    contractor: { glyph: '◇', label: 'Contractor', tone: 'warn' },
    intern: { glyph: '○', label: 'Intern', tone: 'neutral' },
};
exports.EMPLOYEE_STATUS_META = {
    active: { glyph: '✓', label: 'Active', tone: 'success' },
    onLeave: { glyph: '⏸', label: 'On leave', tone: 'warn' },
    terminated: { glyph: '✕', label: 'Terminated', tone: 'danger' },
    probation: { glyph: '◔', label: 'Probation', tone: 'primary' },
};
exports.PRESENCE_META = {
    online: { glyph: '●', label: 'Online', tone: 'success' },
    away: { glyph: '◐', label: 'Away', tone: 'warn' },
    busy: { glyph: '⊘', label: 'Busy', tone: 'danger' },
    offline: { glyph: '○', label: 'Offline', tone: 'neutral' },
};
exports.LEAVE_STATUS_META = {
    pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
    approved: { glyph: '✓', label: 'Approved', tone: 'success' },
    denied: { glyph: '✕', label: 'Denied', tone: 'danger' },
    cancelled: { glyph: '⊘', label: 'Cancelled', tone: 'neutral' },
};
exports.LEAVE_TYPE_META = {
    vacation: { glyph: '🏖', label: 'Vacation', tone: 'primary' },
    sick: { glyph: '🤒', label: 'Sick', tone: 'danger' },
    personal: { glyph: '🙂', label: 'Personal', tone: 'accent' },
    parental: { glyph: '👶', label: 'Parental', tone: 'success' },
    unpaid: { glyph: '💤', label: 'Unpaid', tone: 'neutral' },
};
exports.PAYSLIP_STATUS_META = {
    paid: { glyph: '✓', label: 'Paid', tone: 'success' },
    processing: { glyph: '◔', label: 'Processing', tone: 'primary' },
    pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
    failed: { glyph: '✕', label: 'Failed', tone: 'danger' },
};
exports.TIMESHEET_STATUS_META = {
    draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
    submitted: { glyph: '➤', label: 'Submitted', tone: 'primary' },
    approved: { glyph: '✓', label: 'Approved', tone: 'success' },
    rejected: { glyph: '✕', label: 'Rejected', tone: 'danger' },
};
exports.REVIEW_STATUS_META = {
    notStarted: { glyph: '○', label: 'Not started', tone: 'neutral' },
    inProgress: { glyph: '◔', label: 'In progress', tone: 'primary' },
    submitted: { glyph: '➤', label: 'Submitted', tone: 'accent' },
    completed: { glyph: '✓', label: 'Completed', tone: 'success' },
};
exports.TASK_STATUS_META = {
    todo: { glyph: '○', label: 'To do', tone: 'neutral' },
    inProgress: { glyph: '◔', label: 'In progress', tone: 'primary' },
    done: { glyph: '✓', label: 'Done', tone: 'success' },
    blocked: { glyph: '⛔', label: 'Blocked', tone: 'danger' },
};
exports.BENEFIT_STATUS_META = {
    enrolled: { glyph: '✓', label: 'Enrolled', tone: 'success' },
    eligible: { glyph: '●', label: 'Eligible', tone: 'primary' },
    pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
    waived: { glyph: '✕', label: 'Waived', tone: 'neutral' },
};
exports.BENEFIT_TYPE_META = {
    health: { glyph: '🩺', label: 'Health', tone: 'primary' },
    dental: { glyph: '🦷', label: 'Dental', tone: 'accent' },
    vision: { glyph: '👓', label: 'Vision', tone: 'primary' },
    retirement: { glyph: '🏦', label: 'Retirement', tone: 'success' },
    life: { glyph: '🛡', label: 'Life', tone: 'neutral' },
};
exports.SHIFT_STATUS_META = {
    open: { glyph: '○', label: 'Open', tone: 'warn' },
    scheduled: { glyph: '●', label: 'Scheduled', tone: 'primary' },
    confirmed: { glyph: '✓', label: 'Confirmed', tone: 'success' },
    swapRequested: { glyph: '⇄', label: 'Swap requested', tone: 'accent' },
};
exports.EXPENSE_STATUS_META = {
    draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
    submitted: { glyph: '➤', label: 'Submitted', tone: 'primary' },
    approved: { glyph: '✓', label: 'Approved', tone: 'success' },
    reimbursed: { glyph: '💵', label: 'Reimbursed', tone: 'accent' },
    rejected: { glyph: '✕', label: 'Rejected', tone: 'danger' },
};
exports.EXPENSE_CATEGORY_META = {
    travel: { glyph: '✈', label: 'Travel', tone: 'primary' },
    meals: { glyph: '🍽', label: 'Meals', tone: 'accent' },
    lodging: { glyph: '🏨', label: 'Lodging', tone: 'primary' },
    supplies: { glyph: '📦', label: 'Supplies', tone: 'neutral' },
    software: { glyph: '💻', label: 'Software', tone: 'success' },
    other: { glyph: '•', label: 'Other', tone: 'neutral' },
};
exports.POLICY_STATUS_META = {
    acknowledged: { glyph: '✓', label: 'Acknowledged', tone: 'success' },
    pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
    overdue: { glyph: '⚠', label: 'Overdue', tone: 'danger' },
};
// ── numeric helpers ─────────────────────────────────────────────────────
/** Clamp a 0–100 percentage into range, tolerating undefined/NaN. */
function clampPct(value) {
    if (value == null || !Number.isFinite(value))
        return 0;
    return Math.max(0, Math.min(100, Math.round(value)));
}
/**
 * Clamp a 0…max rating into range (default max 5), tolerating undefined/NaN.
 * Used by the performance review star meter.
 */
function clampRating(value, max = 5) {
    if (value == null || !Number.isFinite(value))
        return 0;
    return Math.max(0, Math.min(max, value));
}
/**
 * Format decimal hours as a stable `Hh Mm` string (e.g. `7.5` → `7h 30m`).
 * Guards NaN/negatives to `0h 0m`; used by timesheet + shift rows.
 */
function formatHours(hours) {
    const h = hours == null || !Number.isFinite(hours) || hours < 0 ? 0 : hours;
    const whole = Math.floor(h);
    const mins = Math.round((h - whole) * 60);
    if (mins === 60)
        return `${whole + 1}h 0m`;
    return `${whole}h ${mins}m`;
}
//# sourceMappingURL=internal.js.map