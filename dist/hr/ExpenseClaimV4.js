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
exports.ExpenseClaimV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const ButtonV4_1 = require("../primitives/ButtonV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const money_1 = require("../commerce/money");
const StatusPillV4_1 = require("./StatusPillV4");
const workforce_v4_1 = require("./workforce-v4");
const tone_v4_1 = require("./internal/tone-v4");
const internal_1 = require("./internal");
/**
 * **V4 expense claim** — the web twin of the native `ExpenseClaimV4`, same
 * props as {@link ExpenseClaim} plus `decisionReason`, `approveLabel`,
 * `rejectLabel`, `formatMoney` and `testID`.
 *
 * ## Six changes
 *
 * 1. **An approver can approve from the keyboard.** Approve and Reject were
 *    `<Button>`s inside a `<Card role="button">` with its own Enter/Space
 *    handler. Their clicks were guarded with `stopPropagation`, their keydowns
 *    were not, and the card's `preventDefault()` on the bubbled Enter cancels
 *    the button's own activation — Enter's default action on a button *is*
 *    that click. So Enter on Approve opened the claim and approved nothing.
 *    The card is a plain container now, the activation wraps only the merchant
 *    and the amount, and the decisions are its **siblings**.
 * 2. **A rejection can say why.** See `decisionReason`.
 * 3. **The card is one accessible name.** `Expense Hilton, $840.00, Rejected`
 *    dropped the category, the date and the missing receipt; all of them now
 *    join the name.
 * 4. **Expense category stops spending a status colour.** `software: success`
 *    made a laptop purchase read as good news and `meals: accent` competed
 *    with the status pill for the eye. The glyph carries the category.
 * 5. **Money is overridable and inked correctly.** `formatMoney`'s third
 *    `locale` argument was unreachable, so the amount rendered in the browser
 *    default whatever the app's locale was; and "⚠ No receipt" was drawn in
 *    `text-danger`, a fill token, rather than the `danger-text` ink slot.
 * 6. **Reject weighs the same on both twins**, an outline at `tone="danger"` —
 *    web filled it and native outlined it, so the destructive action was the
 *    loudest thing on the card on one platform and the quietest on the other.
 */
exports.ExpenseClaimV4 = React.forwardRef(function ExpenseClaimV4({ merchant, category, amountCents, currency = 'USD', date, status, description, hasReceipt, actionable = false, variant = 'default', onApprove, onReject, onClick, decisionReason, approveLabel = 'Approve', rejectLabel = 'Reject', formatMoney = money_1.formatMoney, testID, className, }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    // A claim with no merchant is a bordered box around an amount nobody can
    // place.
    if (!merchant)
        return null;
    const compact = variant === 'compact';
    const catMeta = tone_v4_1.EXPENSE_CATEGORY_META_V4[category];
    const statusMeta = internal_1.EXPENSE_STATUS_META[status];
    const showActions = actionable && status === 'submitted';
    const interactive = onClick != null;
    const amount = formatMoney(amountCents, currency);
    const receiptWord = hasReceipt == null ? undefined : hasReceipt ? 'Receipt attached' : 'No receipt';
    const adverseReason = (0, workforce_v4_1.isAdverse)(status) ? decisionReason : undefined;
    const summary = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-card", children: merchant }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: catMeta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: (0, tone_v4_1.metaLine)([catMeta.label, date]) })] })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-lg font-bold text-on-card', tone_v4_1.TABULAR_CLASS), children: amount })] }));
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-sm", children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([
                            'Expense',
                            merchant,
                            amount,
                            catMeta.label,
                            date,
                            statusMeta.label,
                            receiptWord,
                            adverseReason,
                        ]), onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-start gap-sm rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-start gap-sm", children: summary })), (0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, variant: "inline", size: "sm", "aria-hidden": interactive || undefined })] }), !compact && description ? ((0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-xs text-muted-text", children: description })) : null, receiptWord ? ((0, jsx_runtime_1.jsxs)("p", { className: (0, cn_1.cn)('text-xs font-semibold', hasReceipt ? 'text-muted-text' : 'text-danger-text'), "aria-hidden": interactive || undefined, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: hasReceipt ? '📎 ' : '⚠ ' }), receiptWord] })) : null, adverseReason ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-danger-text", children: adverseReason })) : null, showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-xs", children: [(0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "primary", className: (0, cn_1.cn)('flex-1', tone_v4_1.MIN_TAP_CLASS), onClick: onApprove, children: approveLabel }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "outline", tone: "danger", className: (0, cn_1.cn)('flex-1', tone_v4_1.MIN_TAP_CLASS), onClick: onReject, children: rejectLabel })] })) : null] }));
});
//# sourceMappingURL=ExpenseClaimV4.js.map