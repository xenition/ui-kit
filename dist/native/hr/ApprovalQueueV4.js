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
exports.ApprovalQueueV4 = ApprovalQueueV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const workforce_v4_1 = require("../../hr/workforce-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** The empty state's next-step sentence — an empty queue still owes one. */
const EMPTY_DESCRIPTION = 'Requests that need your decision will appear here.';
/**
 * **V4 approval queue** — a new component. There is no base to extend, so the
 * props are plain `ApprovalQueueV4Props`.
 *
 * ## Why it exists
 *
 * `LeaveRequest`, `ExpenseClaim` and `TimesheetRow` are all written as one item
 * out of a list, and the module never had the list. So the three things a queue
 * owes its user had nowhere to live:
 *
 * 1. **An empty state that says something.** `ShiftSchedule` is the only
 *    component in the entire module with one. A manager who has cleared their
 *    queue currently sees a blank region, which is indistinguishable from a
 *    request that failed to load.
 * 2. **A loading state in the shape it is about to be.** Placeholder rows the
 *    size of the decision cards, opaque and mixed against the card's own ground
 *    — never a centred spinner that collapses the layout and then jumps when
 *    the real rows arrive.
 * 3. **A bulk bar.** Approving twenty timesheets one card at a time is the
 *    reason people stop using an approvals screen. The bar is a **sibling** of
 *    the rows, not a header inside a pressable list, so its buttons are real
 *    focus stops with their own names — which is the whole finding this
 *    module's pass was about.
 * 4. **The count, drawn.** How many decisions are waiting is the reason a
 *    manager opens this screen, and `formatCount` used to reach the list's
 *    accessible name only — so a sighted user had to count the cards. It now
 *    sits beside the heading too, hidden from the reader there because the
 *    list below already carries it: one fact, announced once.
 *
 * ## The selection is ids, not a count
 *
 * `selectedIds` carries the actual rows and the two bulk handlers are called
 * back with them, so a caller never has to keep a count and a list of ids in
 * step — and the queue can name what it is about to act on. A count alone made
 * `onApproveSelected` a callback with no argument, which meant the screen above
 * it had to re-derive the selection it had already computed.
 *
 * The bar appears only once something is ticked. Nothing is drawn disabled
 * waiting for a selection: an always-present bar with two dead buttons spends
 * M3's 0.38 band on a control that is not unavailable, only unneeded yet.
 *
 * `rejectLabel`'s button is `variant="outline" tone="danger"` on both twins,
 * matching the per-card decision buttons — a bulk rejection should not be the
 * heaviest thing on the screen.
 */
function ApprovalQueueV4({ title = 'Awaiting your decision', children, selectedIds, loading = false, skeletonRows = 3, onApproveSelected, onRejectSelected, onClearSelection, approveLabel = 'Approve', rejectLabel = 'Reject', clearLabel = 'Clear', formatSelected, formatCount, emptyLabel = 'Nothing to approve', emptyDescription = EMPTY_DESCRIPTION, loadingLabel = 'Loading approvals', testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const rows = React.Children.toArray(children).filter(Boolean);
    const selected = selectedIds ?? [];
    const selectedText = (formatSelected ?? ((n) => `${n} selected`))(selected.length);
    const countText = (formatCount ?? ((n) => (0, workforce_v4_1.pluralizeCount)(n, 'request')))(rows.length);
    // Only claim a number once there is one: a count over skeletons is a guess,
    // and an empty queue's own state already says there is nothing waiting.
    const showCount = !loading && rows.length > 0;
    const header = title ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "header", style: { flexShrink: 1 }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, children: title }) }), showCount ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: countText }) })) : null] })) : null;
    if (loading) {
        const placeholders = Math.max(1, Math.floor(Number.isFinite(skeletonRows) ? skeletonRows : 3));
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, accessibilityLiveRegion: "polite", style: { gap: tokens.spacing.sm }, children: Array.from({ length: placeholders }, (_, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            gap: tokens.spacing.sm,
                            padding: tokens.spacing.md,
                            borderRadius: tokens.radius.lg,
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: colors.card,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: tap,
                                            height: tap,
                                            borderRadius: tokens.radius.full,
                                            backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
                                        } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                    height: tokens.typography.scale.base,
                                                    width: '55%',
                                                    borderRadius: tokens.radius.sm,
                                                    backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
                                                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                    height: tokens.typography.scale.sm,
                                                    width: '35%',
                                                    borderRadius: tokens.radius.sm,
                                                    backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
                                                } })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            flex: 1,
                                            height: tap,
                                            borderRadius: tokens.radius.md,
                                            backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
                                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            flex: 1,
                                            height: tap,
                                            borderRadius: tokens.radius.md,
                                            backgroundColor: (0, tone_v4_1.skeletonFill)(theme),
                                        } })] })] }, i))) })] }));
    }
    if (rows.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [header, (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription })] }));
    }
    const hasBulk = selected.length > 0 && (onApproveSelected != null || onRejectSelected != null);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [header, hasBulk ? ((0, jsx_runtime_1.jsxs)(react_native_1.View
            // Deliberately NOT `accessible`: one element here would swallow the
            // two buttons that are the whole point of the bar. The live region
            // is `polite` because a selection appearing is a summary of what the
            // user just did, not an emergency.
            , { 
                // Deliberately NOT `accessible`: one element here would swallow the
                // two buttons that are the whole point of the bar. The live region
                // is `polite` because a selection appearing is a summary of what the
                // user just did, not an emergency.
                accessibilityLiveRegion: "polite", style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.selected,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "onSelected", numeric: "tabular", style: { flex: 1 }, children: selectedText }), onApproveSelected ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "primary", onPress: () => onApproveSelected(selected), accessibilityLabel: `${approveLabel}, ${selectedText}`, style: { minHeight: tap }, children: approveLabel })) : null, onRejectSelected ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "outline", tone: "danger", onPress: () => onRejectSelected(selected), accessibilityLabel: `${rejectLabel}, ${selectedText}`, style: { minHeight: tap }, children: rejectLabel })) : null, onClearSelection ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "ghost", onPress: onClearSelection, accessibilityLabel: `${clearLabel}, ${selectedText}`, style: { minHeight: tap }, children: clearLabel })) : null] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: countText, style: { gap: tokens.spacing.sm }, children: rows })] }));
}
//# sourceMappingURL=ApprovalQueueV4.js.map