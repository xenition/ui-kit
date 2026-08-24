"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLICY_VARIANT = exports.CLAIM_STATUS = void 0;
exports.claimStatus = claimStatus;
exports.policyVariant = policyVariant;
exports.CLAIM_STATUS = {
    filed: { label: 'Filed', glyph: '📝', tone: 'neutral', step: 0 },
    review: { label: 'In review', glyph: '🔍', tone: 'warn', step: 1 },
    approved: { label: 'Approved', glyph: '✓', tone: 'success', step: 2 },
    denied: { label: 'Denied', glyph: '✕', tone: 'danger', step: 2 },
    paid: { label: 'Paid', glyph: '💰', tone: 'primary', step: 3 },
};
/** Safe lookup — falls back to `filed` for an unknown status. */
function claimStatus(status) {
    return exports.CLAIM_STATUS[status] ?? exports.CLAIM_STATUS.filed;
}
exports.POLICY_VARIANT = {
    auto: { label: 'Auto', glyph: '🚗' },
    home: { label: 'Home', glyph: '🏠' },
    life: { label: 'Life', glyph: '🌳' },
    health: { label: 'Health', glyph: '⚕️' },
};
/** Safe lookup — falls back to `auto` for an unknown variant. */
function policyVariant(variant) {
    return exports.POLICY_VARIANT[variant] ?? exports.POLICY_VARIANT.auto;
}
//# sourceMappingURL=status.js.map