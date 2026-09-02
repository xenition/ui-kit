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
exports.TimesheetRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const row_v4_1 = require("../dashboard/internal/row-v4");
const StatusPillV4_1 = require("./StatusPillV4");
const workforce_v4_1 = require("./workforce-v4");
const tone_v4_1 = require("./internal/tone-v4");
const internal_1 = require("./internal");
/** Said when `overtimeHours` is larger than the total it is documented to be part of. */
const INCONSISTENT_LABEL = 'Overtime exceeds hours worked';
/**
 * **V4 timesheet row** — the web twin of the native `TimesheetRowV4`, same
 * props as {@link TimesheetRow} plus `decisionReason`, `approver` and
 * `testID`.
 *
 * ## Six changes
 *
 * 1. **"2h 0m" with "+10h OT" under it is now called what it is.** Overtime is
 *    documented as *included in* `hours`, and the row only ever tested it for
 *    `> 0` — never against the total — so `hours={2} overtimeHours={10}`
 *    rendered two impossible figures with a straight face, on a row somebody's
 *    pay is calculated from. `hoursParts()` clamps the overtime into the total
 *    and reports the contradiction, and the row says so out loud.
 * 2. **A rejection can say why, and by whom.** See `decisionReason` and
 *    `approver`.
 * 3. **The row is one accessible name carrying the status.** `Timesheet Mon
 *    Aug 24, 7h 30m` dropped the project, the overtime and — on a row whose
 *    entire purpose is approval — whether it had been rejected.
 * 4. **The status pill is a sibling of the activation.** The row was a `<div
 *    role="button">` with the pill nested inside it; interactive content
 *    inside `role="button"` is invalid ARIA whatever the pill happens to be,
 *    and it flattened the row to a single leaf.
 * 5. **Press and hover are a state layer.** `hover:bg-neutral-100` is a ramp
 *    step: it mirrors under `[data-theme="dark"]` and paints a near-white slab
 *    across a dark page.
 * 6. **It joins the shared row family** and inks the overtime flag with the
 *    `warn-text` slot rather than `text-warn`, the fill.
 */
exports.TimesheetRowV4 = React.forwardRef(function TimesheetRowV4({ date, hours, status, clockIn, clockOut, project, overtimeHours = 0, variant = 'default', onClick, decisionReason, approver, testID, className, }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    const compact = variant === 'compact';
    const clock = clockIn && clockOut ? `${clockIn} – ${clockOut}` : (clockIn ?? clockOut);
    const meta = (0, tone_v4_1.metaLine)([clock, project]);
    const parts = (0, workforce_v4_1.hoursParts)(hours, overtimeHours);
    const totalText = (0, internal_1.formatHours)(parts.total);
    const overtimeText = parts.overtime > 0 ? `+${(0, internal_1.formatHours)(parts.overtime)} OT` : undefined;
    const statusMeta = status ? internal_1.TIMESHEET_STATUS_META[status] : undefined;
    const interactive = onClick != null;
    const adverseReason = status && (0, workforce_v4_1.isAdverse)(status) ? decisionReason : undefined;
    const decidedBy = approver && (status === 'approved' || status === 'rejected')
        ? `${statusMeta?.label ?? ''} by ${approver}`.trim()
        : undefined;
    const summary = ((0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-card", children: date }), !compact ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: meta || '—' })) : null] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col rounded-[var(--xen-radius-md)] border border-border bg-card', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(!compact)), children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([
                            'Timesheet',
                            date,
                            totalText,
                            overtimeText,
                            parts.inconsistent ? INCONSISTENT_LABEL : undefined,
                            clock,
                            project,
                            statusMeta?.label,
                            decidedBy,
                            adverseReason,
                        ]), onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center", children: summary })), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold text-on-card', tone_v4_1.TABULAR_CLASS), children: totalText }), overtimeText ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', (0, tone_v4_1.toneInkClass)('warn')), children: overtimeText })) : null] }), statusMeta ? ((0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", "aria-hidden": interactive || undefined })) : null] }), parts.inconsistent ? (
            // The input is wrong and somebody's pay depends on it, so the row
            // says so rather than quietly drawing the corrected figure.
            (0, jsx_runtime_1.jsxs)("p", { className: (0, cn_1.cn)('px-md pb-sm text-xs font-semibold', (0, tone_v4_1.toneInkClass)('warn')), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u26A0 " }), INCONSISTENT_LABEL] })) : null, adverseReason ? ((0, jsx_runtime_1.jsx)("p", { className: "px-md pb-sm text-xs font-semibold text-danger-text", children: adverseReason })) : null, decidedBy && !adverseReason ? ((0, jsx_runtime_1.jsx)("p", { className: "px-md pb-sm text-xs text-muted-text", children: decidedBy })) : null] }));
});
//# sourceMappingURL=TimesheetRowV4.js.map