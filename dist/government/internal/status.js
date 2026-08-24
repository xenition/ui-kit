"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORM_STATUS = exports.PERMIT_STAGES = exports.PERMIT_STATUS = void 0;
exports.permitStatus = permitStatus;
exports.formStatus = formStatus;
exports.PERMIT_STATUS = {
    submitted: { label: 'Submitted', glyph: '📨', tone: 'neutral', step: 0 },
    review: { label: 'Under review', glyph: '🔍', tone: 'warn', step: 1 },
    approved: { label: 'Approved', glyph: '✓', tone: 'success', step: 2 },
    issued: { label: 'Issued', glyph: '🏛️', tone: 'success', step: 3 },
    denied: { label: 'Denied', glyph: '✕', tone: 'danger', step: 2 },
};
/** Safe lookup — falls back to `submitted` for an unknown status. */
function permitStatus(status) {
    return exports.PERMIT_STATUS[status] ?? exports.PERMIT_STATUS.submitted;
}
/** The ordered happy-path stages a permit passes through. */
exports.PERMIT_STAGES = ['submitted', 'review', 'approved', 'issued'];
exports.FORM_STATUS = {
    draft: { label: 'Draft', glyph: '✎', tone: 'neutral', step: 0 },
    submitted: { label: 'Submitted', glyph: '📨', tone: 'primary', step: 1 },
    processing: { label: 'Processing', glyph: '⋯', tone: 'warn', step: 2 },
    'action-needed': { label: 'Action needed', glyph: '!', tone: 'danger', step: 2 },
    complete: { label: 'Complete', glyph: '✓', tone: 'success', step: 3 },
    rejected: { label: 'Rejected', glyph: '✕', tone: 'danger', step: 3 },
};
/** Safe lookup — falls back to `draft` for an unknown status. */
function formStatus(status) {
    return exports.FORM_STATUS[status] ?? exports.FORM_STATUS.draft;
}
//# sourceMappingURL=status.js.map