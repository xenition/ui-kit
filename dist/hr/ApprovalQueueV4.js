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
exports.ApprovalQueueV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const workforce_v4_1 = require("./workforce-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** The empty state's next-step sentence — an empty queue still owes one. */
const EMPTY_DESCRIPTION = 'Requests that need your decision will appear here.';
/**
 * **V4 approval queue** — a new component, so it has no base to extend.
 *
 * ## Why it exists
 *
 * `LeaveRequest`, `ExpenseClaim` and `TimesheetRow` all presuppose a list they
 * sit in, and the module never shipped one. `ShiftSchedule` is the only list
 * in `hr` and the only file with an empty state at all, so every screen built
 * out of the other twelve had to invent its own answers to the three questions
 * a queue always asks:
 *
 * 1. **What does nothing look like?** A manager with a clear queue is the
 *    common case and the one worth designing: a real empty state with a title
 *    and a next-step sentence, not a silent blank region.
 * 2. **What does *loading* look like?** Placeholder rows in the shape the rows
 *    are about to be, so the queue does not collapse to a spinner and then
 *    jump to full height under the manager's cursor.
 * 3. **What happens with twenty of them?** Deciding twenty expense claims one
 *    card at a time is the workflow this module exists for and the one it
 *    never addressed. The bulk bar is a `role="region"` with its own name,
 *    announced politely when a selection appears — it is a summary of what the
 *    user just did, not an emergency, and `assertive` on every tick teaches a
 *    user to ignore the live region entirely.
 * 4. **How many are waiting?** That count is the reason a manager opens this
 *    screen, and `formatCount` used to feed the list's accessible name only —
 *    so a sighted user had to count the cards. It is now drawn beside the
 *    heading as well, `aria-hidden` there because the list below already
 *    carries it: one fact, announced once.
 *
 * The bar's two buttons are siblings of the rows, never wrappers around them,
 * for the same reason every card in this module was restructured: an
 * interactive control inside another one is invalid ARIA and loses its own
 * keyboard activation to the ancestor's handler.
 */
exports.ApprovalQueueV4 = React.forwardRef(function ApprovalQueueV4({ title = 'Awaiting your decision', children, selectedIds, loading = false, skeletonRows = 3, onApproveSelected, onRejectSelected, onClearSelection, approveLabel = 'Approve', rejectLabel = 'Reject', clearLabel = 'Clear', formatSelected, formatCount, emptyLabel = 'Nothing to approve', emptyDescription = EMPTY_DESCRIPTION, loadingLabel = 'Loading approvals', testID, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const rows = React.Children.toArray(children).filter(Boolean);
    const selected = selectedIds ?? [];
    const selectedText = (formatSelected ?? ((n) => `${n} selected`))(selected.length);
    const countText = (formatCount ?? ((n) => (0, workforce_v4_1.pluralizeCount)(n, 'request')))(rows.length);
    // Only claim a number once there is one: a count over skeletons is a guess,
    // and an empty queue's own state already says there is nothing waiting.
    const showCount = !loading && rows.length > 0;
    const heading = title ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("h2", { className: "min-w-0 truncate text-sm font-bold text-on-surface", children: title }), showCount ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('shrink-0 text-xs text-muted-text', tone_v4_1.TABULAR_CLASS), children: countText })) : null] })) : null;
    if (loading) {
        const placeholders = Math.max(1, Math.floor(skeletonRows));
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [heading, Array.from({ length: placeholders }).map((_, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-card p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { style: { borderRadius: 'var(--xen-radius-full)' }, className: (0, cn_1.cn)('h-xl w-xl shrink-0', tone_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-md w-[45%]', tone_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-[65%]', tone_v4_1.PLACEHOLDER_CLASS) })] }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-md w-xl shrink-0', tone_v4_1.PLACEHOLDER_CLASS) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-xl flex-1', tone_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-xl flex-1', tone_v4_1.PLACEHOLDER_CLASS) })] })] }, index)))] }));
    }
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [heading, (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription })] }));
    }
    const hasBulk = selected.length > 0 && (onApproveSelected != null || onRejectSelected != null);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [heading, hasBulk ? ((0, jsx_runtime_1.jsxs)("div", { role: "region", "aria-label": selectedText, "aria-live": "polite", className: (0, cn_1.cn)('flex flex-wrap items-center gap-xs rounded-[var(--xen-radius-md)]', 'bg-selected px-md py-sm text-on-selected'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 text-xs font-semibold', tone_v4_1.TABULAR_CLASS), children: selectedText }), onApproveSelected ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "primary", className: (0, cn_1.cn)(tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), onClick: () => onApproveSelected(selected), children: approveLabel })) : null, onRejectSelected ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "outline", tone: "danger", className: (0, cn_1.cn)(tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), onClick: () => onRejectSelected(selected), children: rejectLabel })) : null, onClearSelection ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "ghost", className: (0, cn_1.cn)(tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), onClick: onClearSelection, children: clearLabel })) : null] })) : null, (0, jsx_runtime_1.jsx)("ul", { "aria-label": countText, className: "flex flex-col gap-sm", children: rows.map((row, index) => ((0, jsx_runtime_1.jsx)("li", { children: row }, index))) })] }));
});
//# sourceMappingURL=ApprovalQueueV4.js.map