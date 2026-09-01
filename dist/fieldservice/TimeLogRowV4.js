"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeLogRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const row_v4_1 = require("../dashboard/internal/row-v4");
const job_v4_1 = require("./internal/job-v4");
const format_1 = require("./internal/format");
const TIME_LOG_V4 = {
    running: { label: 'Running', glyph: '⏱', tone: 'primary' },
    stopped: { label: 'Logged', glyph: '■', tone: 'neutral' },
    approved: { label: 'Approved', glyph: '✓', tone: 'success' },
    rejected: { label: 'Rejected', glyph: '✕', tone: 'danger' },
};
/**
 * **V4 time-log row** — the web twin of the native `TimeLogRowV4`, same props
 * as {@link TimeLogRow} plus `billableLabel`.
 *
 * ## Four changes
 *
 * 1. **The money total and the billable flag are announced.** The row's name
 *    was `` `${label}, ${duration}, ${status}` `` — on a timesheet, which is
 *    read to find out what an hour is going to be billed at and whether it is
 *    billable at all.
 * 2. **The literal `$` is gone.** The chip read `$ Billable` while the total
 *    beside it was formatted by `currency`, so a EUR timesheet showed "€12.50"
 *    under a dollar sign. The chip is a word, and the word is a prop.
 * 3. **The stacked figures are tabular**, so a column of durations and totals
 *    aligns down a timesheet instead of shifting a digit at a time.
 * 4. **An interactive row is a real `<button>`** that clears 44 and answers
 *    with a state layer, and the status is announced once — the disc carried
 *    it as an accessible label and the pill carried it again.
 */
exports.TimeLogRowV4 = React.forwardRef(function TimeLogRowV4({ label, minutes, status, 
// The base destructured this as `window`, shadowing the global inside a
// browser component.
window: clockWindow, billable = false, rateCentsPerHour, currency = 'USD', formatMoney: format = format_1.formatMoney, onClick, billableLabel = 'Billable', className, style, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const sd = TIME_LOG_V4[status] ?? TIME_LOG_V4.stopped;
    const safeMinutes = Number.isFinite(minutes) ? Math.max(0, Math.trunc(minutes)) : 0;
    const duration = (0, format_1.formatDuration)(safeMinutes);
    const totalCents = rateCentsPerHour != null && Number.isFinite(rateCentsPerHour)
        ? Math.round((safeMinutes / 60) * Math.max(0, rateCentsPerHour))
        : undefined;
    const total = totalCents != null ? format(totalCents, currency) : undefined;
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(true));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)(row_v4_1.ROW_V4_LEADING_CLASS, 'rounded-[var(--xen-radius-full)]'), style: { background: (0, job_v4_1.discGround)(sd.tone) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: sd.glyph, className: (0, job_v4_1.discInkClass)(sd.tone) }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-wrap items-center gap-xs", children: [clockWindow != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', job_v4_1.TABULAR_CLASS), children: clockWindow })) : null, (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...job_v4_1.BADGE_V4, children: `${sd.glyph} ${sd.label}` }), billable ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "primary", ...job_v4_1.BADGE_V4, children: billableLabel })) : null] })] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold text-on-card', job_v4_1.TABULAR_CLASS), children: duration }), total != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', job_v4_1.TABULAR_CLASS), children: total })) : null] })] }));
    if (onClick == null) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: style, className: (0, cn_1.cn)(rowClass, className), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: style, className: (0, cn_1.cn)('w-full', className), children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, job_v4_1.spokenLine)([
                label,
                duration,
                sd.label,
                clockWindow,
                total,
                billable ? billableLabel : null,
            ]), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)(rowClass, 'rounded-[var(--xen-radius-md)]'), children: body }) }));
});
//# sourceMappingURL=TimeLogRowV4.js.map