"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OUTAGE_STATE = exports.REQUEST_STATE = exports.PAYMENT_STATE = exports.SERVICE_STATE = exports.BILL_STATUS = exports.UTILITY_KIND = void 0;
exports.utilityKind = utilityKind;
exports.billStatus = billStatus;
exports.serviceState = serviceState;
exports.paymentState = paymentState;
exports.requestState = requestState;
exports.outageState = outageState;
exports.UTILITY_KIND = {
    electric: { label: 'Electric', glyph: '⚡', unit: 'kWh' },
    water: { label: 'Water', glyph: '💧', unit: 'gal' },
    gas: { label: 'Gas', glyph: '🔥', unit: 'therm' },
    internet: { label: 'Internet', glyph: '📶', unit: 'GB' },
    waste: { label: 'Waste', glyph: '🗑️', unit: 'lb' },
    solar: { label: 'Solar', glyph: '☀️', unit: 'kWh' },
};
/** Safe lookup — falls back to `electric` for an unknown kind. */
function utilityKind(kind) {
    return exports.UTILITY_KIND[kind] ?? exports.UTILITY_KIND.electric;
}
exports.BILL_STATUS = {
    due: { label: 'Due', glyph: '📄', tone: 'warn' },
    paid: { label: 'Paid', glyph: '✓', tone: 'success' },
    overdue: { label: 'Overdue', glyph: '⚠️', tone: 'danger' },
    pending: { label: 'Pending', glyph: '⋯', tone: 'neutral' },
    scheduled: { label: 'Scheduled', glyph: '🗓️', tone: 'primary' },
};
/** Safe lookup — falls back to `due` for an unknown status. */
function billStatus(status) {
    return exports.BILL_STATUS[status] ?? exports.BILL_STATUS.due;
}
exports.SERVICE_STATE = {
    active: { label: 'Active', glyph: '✓', tone: 'success' },
    outage: { label: 'Outage', glyph: '⚠️', tone: 'danger' },
    maintenance: { label: 'Maintenance', glyph: '🛠️', tone: 'warn' },
    degraded: { label: 'Degraded', glyph: '⚠', tone: 'warn' },
};
/** Safe lookup — falls back to `active` for an unknown state. */
function serviceState(state) {
    return exports.SERVICE_STATE[state] ?? exports.SERVICE_STATE.active;
}
exports.PAYMENT_STATE = {
    paid: { label: 'Paid', glyph: '✓', tone: 'success' },
    pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
    failed: { label: 'Failed', glyph: '✕', tone: 'danger' },
    refunded: { label: 'Refunded', glyph: '↩', tone: 'neutral' },
};
/** Safe lookup — falls back to `pending` for an unknown state. */
function paymentState(state) {
    return exports.PAYMENT_STATE[state] ?? exports.PAYMENT_STATE.pending;
}
exports.REQUEST_STATE = {
    open: { label: 'Open', glyph: '📥', tone: 'primary' },
    scheduled: { label: 'Scheduled', glyph: '🗓️', tone: 'warn' },
    'in-progress': { label: 'In progress', glyph: '🔧', tone: 'warn' },
    completed: { label: 'Completed', glyph: '✓', tone: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};
/** Safe lookup — falls back to `open` for an unknown state. */
function requestState(state) {
    return exports.REQUEST_STATE[state] ?? exports.REQUEST_STATE.open;
}
exports.OUTAGE_STATE = {
    active: { label: 'Active', glyph: '⚠️', tone: 'danger', heading: 'Service outage', color: 'danger' },
    scheduled: { label: 'Scheduled', glyph: '🗓️', tone: 'warn', heading: 'Planned maintenance', color: 'warn' },
    resolved: { label: 'Resolved', glyph: '✓', tone: 'success', heading: 'Outage resolved', color: 'success' },
};
/** Safe lookup — falls back to `active` for an unknown state. */
function outageState(state) {
    return exports.OUTAGE_STATE[state] ?? exports.OUTAGE_STATE.active;
}
//# sourceMappingURL=status.js.map