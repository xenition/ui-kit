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
exports.LeaveRequestV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const AvatarV4_1 = require("../primitives/AvatarV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const StatusPillV4_1 = require("./StatusPillV4");
const workforce_v4_1 = require("./workforce-v4");
const tone_v4_1 = require("./internal/tone-v4");
const internal_1 = require("./internal");
/**
 * **V4 leave request** — the web twin of the native `LeaveRequestV4`, same
 * props as {@link LeaveRequest} plus `decisionReason`, `approveLabel`,
 * `denyLabel`, `formatDays` and `testID`.
 *
 * ## Six changes
 *
 * 1. **A manager can approve leave from the keyboard.** This is the module's
 *    headline defect and this card is where it does the most damage. Approve
 *    and Deny were `<Button>`s inside a `<Card role="button">` carrying its own
 *    Enter/Space handler. Their *clicks* were guarded with `stopPropagation`;
 *    their *keydowns* were not. Tab to Approve, press Enter, and the card's
 *    handler catches the bubbled event, calls `preventDefault()` — which
 *    cancels the button's own activation, because Enter's default action on a
 *    button **is** that click — and fires the card's `onClick` instead. The
 *    manager is navigated to the request detail, the request is still pending,
 *    and nothing says so. A mouse user never sees it, which is why it shipped.
 *    The card is now a plain container, the activation is a real `<button>`
 *    around the employee and the dates, and the two decisions are its
 *    **siblings**. No guard, because there is nothing left to guard against.
 * 2. **`days={0}` and `days={-1}` no longer render.** The base printed
 *    "0 days" and "-1 days" — a request for a negative number of days — by
 *    interpolating whatever it was handed. The count is floored into `0…∞`
 *    and simply omitted when there is nothing to count.
 * 3. **A denial can say why.** See `decisionReason`.
 * 4. **The card is one accessible name** carrying the status. `Leave request,
 *    Vacation, Pending` replaced the subtree, so the employee, the dates and
 *    the day count were never announced.
 * 5. **Leave type stops spending a status colour.** `sick: danger` said that
 *    being ill is an error and `parental: success` that having a baby went
 *    well. The glyph already tells a holiday from a sick day.
 * 6. **Deny weighs the same on both twins.** Web filled it (`variant="danger"`)
 *    and native outlined it, so the destructive action was the loudest thing
 *    on the card on one platform and the quietest on the other. Both are now
 *    an outline at `tone="danger"` — resolved through `tone`, because
 *    `ButtonVariant` has a `danger` member on web and none on native.
 */
exports.LeaveRequestV4 = React.forwardRef(function LeaveRequestV4({ type, startDate, endDate, days, status, employeeName, employeeAvatarUrl, approver, reason, actionable = false, variant = 'default', onApprove, onDeny, onClick, decisionReason, approveLabel = 'Approve', denyLabel = 'Deny', formatDays, testID, className, }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const compact = variant === 'compact';
    const typeMeta = tone_v4_1.LEAVE_TYPE_META_V4[type];
    const statusMeta = internal_1.LEAVE_STATUS_META[status];
    const range = endDate && endDate !== startDate ? `${startDate} – ${endDate}` : startDate;
    const showActions = actionable && status === 'pending';
    const interactive = onClick != null;
    // A request cannot be for a negative number of days, and "0 days" is not a
    // request at all — the base rendered both because it interpolated the raw
    // prop.
    const dayCount = Math.max(0, Math.floor(Number.isFinite(days) ? days : 0));
    const daysText = dayCount > 0 ? (formatDays ?? ((n) => (0, workforce_v4_1.pluralizeCount)(n, 'day')))(dayCount) : undefined;
    // `denied` is the adverse member of this union; `cancelled` is a
    // withdrawal, not a refusal, and owes nobody a reason.
    const adverseReason = (0, workforce_v4_1.isAdverse)(status) ? decisionReason : undefined;
    const summary = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [employeeName ? ((0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "sm", name: employeeName, src: employeeAvatarUrl, alt: "" })) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [employeeName ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-card", children: employeeName })) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs text-sm font-semibold text-on-card", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: typeMeta.glyph }), typeMeta.label] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-card", children: range }), daysText ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: daysText })) : null] })] })] }));
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-sm", children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([
                            employeeName,
                            'Leave request',
                            typeMeta.label,
                            range,
                            daysText,
                            statusMeta.label,
                            adverseReason,
                        ]), onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-start gap-sm rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-start gap-sm", children: summary })), (0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", "aria-hidden": interactive || undefined })] }), !compact && reason ? ((0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-xs text-muted-text", children: reason })) : null, adverseReason ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-danger-text", children: adverseReason })) : null, showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-xs", children: [(0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "primary", className: (0, cn_1.cn)('flex-1', tone_v4_1.MIN_TAP_CLASS), onClick: onApprove, children: approveLabel }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "outline", tone: "danger", className: (0, cn_1.cn)('flex-1', tone_v4_1.MIN_TAP_CLASS), onClick: onDeny, children: denyLabel })] })) : approver && (status === 'approved' || status === 'denied') ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted-text", children: [status === 'approved' ? 'Approved' : 'Denied', " by ", approver] })) : null] }));
});
//# sourceMappingURL=LeaveRequestV4.js.map