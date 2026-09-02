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
exports.PayslipRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../commerce/money");
const StatusPillV4_1 = require("./StatusPillV4");
const workforce_v4_1 = require("./workforce-v4");
const tone_v4_1 = require("./internal/tone-v4");
const internal_1 = require("./internal");
/**
 * **V4 payslip row** — the web twin of the native `PayslipRowV4`, same props as
 * {@link PayslipRow} plus `failureReason`, `dateLabels`, `formatMoney`,
 * `grossLabel`, `deductionsLabel` and `testID`.
 *
 * ## Six changes
 *
 * 1. **A failed payment no longer says "Paid 15 Aug".** The row printed the
 *    literal word `Paid ` before `payDate` whatever the status was, so a
 *    failed payroll run rendered "Paid 15 Aug" one line above a "✕ Failed"
 *    pill and the employee had two contradictory facts and no way to tell
 *    which was true. Only `paid` claims the money moved; see `dateLabels`.
 * 2. **A failure can say why.** See `failureReason`.
 * 3. **A refunded deduction no longer renders "−-$50.00".** The row prepended
 *    a literal U+2212 to `formatMoney(deductionsCents)`, and most payroll APIs
 *    sign a refunded deduction negative. `deductionParts()` formats the
 *    **magnitude** and the sign comes from the direction, so a refund reads as
 *    a credit instead of as a double negative.
 * 4. **The row is one accessible name carrying the status.** `Payslip Aug
 *    1–15, net $3,200.00` told the reader the money had arrived when it had
 *    not — the pill saying otherwise was never announced.
 * 5. **Press and hover are a state layer**, not `hover:bg-neutral-100` — a
 *    ramp step, which mirrors under `[data-theme="dark"]` and paints a
 *    near-white slab across a dark page.
 * 6. **Money is overridable and column-aligned.** `formatMoney`'s third
 *    `locale` argument was unreachable from any prop, and figures that stack
 *    in a column now use tabular figures so they line up. "Gross" and
 *    "Deductions" were hard-coded English in a payroll component; they are
 *    `grossLabel` and `deductionsLabel`.
 */
exports.PayslipRowV4 = React.forwardRef(function PayslipRowV4({ period, netCents, grossCents, deductionsCents, currency = 'USD', status, payDate, variant = 'default', onClick, failureReason, dateLabels, formatMoney = money_1.formatMoney, grossLabel = 'Gross', deductionsLabel = 'Deductions', testID, className, }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    const compact = variant === 'compact';
    const interactive = onClick != null;
    const statusMeta = status ? internal_1.PAYSLIP_STATUS_META[status] : undefined;
    const net = formatMoney(netCents, currency);
    // With no status the row cannot know the money arrived, so it takes the
    // neutral word rather than the base's unconditional "Paid".
    const dateKey = status ?? 'pending';
    const dateWord = dateLabels?.[dateKey] ?? tone_v4_1.PAYSLIP_DATE_LABELS[dateKey];
    const dateLine = payDate ? `${dateWord} ${payDate}` : undefined;
    const deduction = deductionsCents != null ? (0, workforce_v4_1.deductionParts)(deductionsCents) : undefined;
    const deductionText = deduction
        ? `${deduction.direction === 'debit' ? '−' : deduction.direction === 'credit' ? '+' : ''}${formatMoney(deduction.magnitudeCents, currency)}`
        : undefined;
    const showBreakdown = !compact && (grossCents != null || deductionText != null);
    const reason = status === 'failed' ? failureReason : undefined;
    const summary = ((0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-card", children: period }), dateLine ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: dateLine }) : null] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col rounded-[var(--xen-radius-md)] border border-border bg-card', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(dateLine != null)), children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([
                            'Payslip',
                            period,
                            `net ${net}`,
                            statusMeta?.label,
                            dateLine,
                            reason,
                        ]), onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center", children: summary })), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-bold text-on-card', tone_v4_1.TABULAR_CLASS), children: net }), statusMeta ? ((0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, variant: "inline", size: "sm", "aria-hidden": interactive || undefined })) : null] })] }), reason ? ((0, jsx_runtime_1.jsx)("p", { className: "px-md pb-sm text-xs font-semibold text-danger-text", children: reason })) : null, showBreakdown ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-lg px-md pb-sm", children: [grossCents != null ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: grossLabel }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm font-semibold text-on-card', tone_v4_1.TABULAR_CLASS), children: formatMoney(grossCents, currency) })] })) : null, deductionText != null ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text", children: deductionsLabel }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-sm font-semibold text-on-card', tone_v4_1.TABULAR_CLASS), children: deductionText })] })) : null] })) : null] }));
});
//# sourceMappingURL=PayslipRowV4.js.map