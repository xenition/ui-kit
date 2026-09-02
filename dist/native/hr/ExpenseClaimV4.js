"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseClaimV4 = ExpenseClaimV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const money_1 = require("../../commerce/money");
const workforce_v4_1 = require("../../hr/workforce-v4");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 expense claim** — same props as {@link ExpenseClaim} plus
 * `decisionReason`, `approveLabel`, `rejectLabel` and `formatMoney`.
 *
 * ## Six changes
 *
 * 1. **Approve and Reject are reachable.** They were `Button`s inside the
 *    card's own `Pressable`, which is `accessible` by default and flattens its
 *    whole subtree into one leaf named "Expense Hilton, $840.00, Submitted" —
 *    so the two decisions this card exists for were not focus stops at all, and
 *    an approver using VoiceOver could open the claim and could not act on it.
 *    The card is a plain `CardV4`; the activation wraps only the
 *    merchant-and-amount region and the buttons are its siblings.
 * 2. **A rejection says why.** An $840 lodging claim rendered a red "✕
 *    Rejected" directly above the claimant's own memo, with no field anywhere
 *    in the component for the approver's reason.
 * 3. **Category stops being a verdict.** `software` was toned `success` and
 *    `meals` `accent`, so a laptop purchase rendered green next to a genuinely
 *    approved claim. A category is identity: glyph, word, neutral chip.
 * 4. **"No receipt" is inked with ink.** It was `colors.danger`, the **fill**
 *    slot, used as a text colour — measured as low as 1.32:1 in the audit that
 *    produced the `*Text` tokens.
 * 5. **Money takes a formatter.** `formatMoney` has a third `locale` argument
 *    no caller could reach, so every claim in the module printed in the
 *    runtime's default locale regardless of the employee's.
 * 6. **The card announces the whole claim** — merchant, category, date, amount,
 *    status, receipt and the rejection reason.
 *
 * `rejectLabel`'s button keeps `variant="outline" tone="danger"` on **both**
 * twins; the web base spelled the destructive action as a filled
 * `variant="danger"`, giving it more weight on one platform than the other.
 *
 * **Renders nothing without a `merchant`.**
 */
function ExpenseClaimV4({ merchant, category, amountCents, currency = 'USD', date, status, description, hasReceipt, actionable = false, variant = 'default', decisionReason, approveLabel = 'Approve', rejectLabel = 'Reject', formatMoney = money_1.formatMoney, onApprove, onReject, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!merchant)
        return null;
    const compact = variant === 'compact';
    const catMeta = tone_v4_1.EXPENSE_CATEGORY_V4[category];
    const statusMeta = tone_v4_1.EXPENSE_STATUS_V4[status];
    /*
      A status pill that sits BESIDE the activation is hidden from the reader when
      the row is interactive — the activation's own name already carries the
      status word, and hearing "Denied" twice in a row is worse than hearing it
      once. On a static row there is no activation to carry it, so the pill speaks
      for itself and the name leaves it out. Same rule on both twins.
    */
    const interactive = onPress != null;
    const showActions = actionable && status === 'submitted';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const amount = formatMoney(amountCents, currency);
    const why = (0, workforce_v4_1.isAdverse)(status) ? decisionReason : undefined;
    const receiptLabel = hasReceipt == null ? null : hasReceipt ? '📎 Receipt attached' : '⚠ No receipt';
    const spoken = (0, tone_v4_1.spokenLine)([
        merchant,
        catMeta.label,
        date,
        amount,
        interactive ? statusMeta.label : null,
        receiptLabel,
        why,
    ]);
    const identity = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
            minHeight: tap,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: merchant }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tone_v4_1.chipStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onCard", children: catMeta.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "onCard", children: (0, tone_v4_1.metaLine)([catMeta.label, date]) })] })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", numeric: "tabular", children: amount })] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "outlined", padding: compact ? 'sm' : 'md', testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1, borderRadius: tokens.radius.md }, children: ({ pressed }) => identity(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1 }, children: identity(false) })), (0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, size: "sm", decorative: interactive })] }), !compact && description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 2, children: description })) : null, receiptLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", 
                // `dangerText`, not `danger`: this is text, and `danger` is a fill.
                style: { color: hasReceipt ? colors.mutedText : colors.dangerText }, children: receiptLabel })) : null, why ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { color: colors.dangerText }, children: why })) : null, showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", tone: "success", onPress: onApprove, accessibilityLabel: approveLabel, style: { flex: 1, minHeight: tap }, children: approveLabel }), (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "outline", tone: "danger", onPress: onReject, accessibilityLabel: rejectLabel, style: { flex: 1, minHeight: tap }, children: rejectLabel })] })) : null] }));
}
//# sourceMappingURL=ExpenseClaimV4.js.map