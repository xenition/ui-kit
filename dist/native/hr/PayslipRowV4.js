"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayslipRowV4 = PayslipRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../../commerce/money");
const workforce_v4_1 = require("../../hr/workforce-v4");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
/*
  Only `paid` may say "Paid". The other three describe a date that has not
  happened, or one on which nothing landed, and the base used one word for all
  four — which is how a failed payment came to render "Paid 15 Aug".
*/
const DATE_WORD = {
    paid: 'Paid',
    processing: 'Expected',
    pending: 'Expected',
    failed: 'Attempted',
};
/**
 * **V4 payslip row** — same props as {@link PayslipRow} plus `failureReason`,
 * `dateLabels`, `formatMoney`, `grossLabel` and `deductionsLabel`.
 *
 * ## Five changes
 *
 * 1. **A failed payment does not say "Paid".** The base printed the literal
 *    word `Paid ` before `payDate` regardless of `status`, so a failed run
 *    rendered **"Paid 15 Aug"** directly above a red "✕ Failed" pill — the row
 *    told the employee their money had arrived and, an inch away, that it had
 *    not. The caption is now chosen by status through `dateLabels`, which is
 *    also where a caller replaces the English.
 * 2. **A failure says why.** `failed` was one of six adverse statuses in the
 *    module with nowhere to put a reason, and it is the one where the employee
 *    can do something about it — a closed account, a stale sort code.
 * 3. **A refunded deduction reads as a credit.** The base prepended a literal
 *    `−` to `formatMoney(deductionsCents)`, so `deductionsCents={-5000}` — how
 *    most payroll APIs sign a refund — rendered **"−-$50.00"**.
 *    `deductionParts()` formats the magnitude and picks the sign from the
 *    direction, so a refund is `+$50.00` and reads as money coming back.
 * 4. **Money takes a formatter**, and the captions are props: `formatMoney`'s
 *    third `locale` argument was unreachable, and "Gross" and "Deductions" were
 *    hard-coded English in a payroll component.
 * 5. **The row announces its whole state** — period, net, status, date, gross,
 *    deductions and the failure reason. The base named itself "Payslip Aug
 *    1–15, net $3,200.00" and dropped the status, so a reader was told the
 *    money arrived when it had not.
 *
 * **Renders nothing without a `period`.**
 */
function PayslipRowV4({ period, netCents, grossCents, deductionsCents, currency = 'USD', status, payDate, variant = 'default', failureReason, dateLabels, formatMoney = money_1.formatMoney, grossLabel = 'Gross', deductionsLabel = 'Deductions', onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!period)
        return null;
    const compact = variant === 'compact';
    const statusMeta = status ? tone_v4_1.PAYSLIP_STATUS_V4[status] : undefined;
    const net = formatMoney(netCents, currency);
    const dateWord = status ? (dateLabels?.[status] ?? DATE_WORD[status]) : null;
    const dateLine = payDate ? (dateWord ? `${dateWord} ${payDate}` : payDate) : null;
    const why = status && (0, workforce_v4_1.isAdverse)(status) ? failureReason : undefined;
    const deduction = deductionsCents == null ? null : (0, workforce_v4_1.deductionParts)(deductionsCents);
    const deductionText = deduction == null
        ? null
        : deduction.direction === 'credit'
            ? `+${formatMoney(deduction.magnitudeCents, currency)}`
            : deduction.direction === 'debit'
                ? `−${formatMoney(deduction.magnitudeCents, currency)}`
                : formatMoney(0, currency);
    const showBreakdown = !compact && (grossCents != null || deductionText != null);
    const spoken = (0, tone_v4_1.spokenLine)([
        period,
        net,
        statusMeta?.label,
        dateLine,
        grossCents != null ? `${grossLabel} ${formatMoney(grossCents, currency)}` : null,
        deductionText != null ? `${deductionsLabel} ${deductionText}` : null,
        why,
    ]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.md,
            backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }),
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "onCard", numberOfLines: 1, children: period }), dateLine ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: dateLine })) : null, why ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numberOfLines: 2, style: { color: colors.dangerText }, children: why })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", numeric: "tabular", children: net }), statusMeta ? ((0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: statusMeta, variant: "inline", size: "sm", decorative: true })) : null] })] }), showBreakdown ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    gap: tokens.spacing.lg,
                    paddingHorizontal: tokens.spacing.md,
                    paddingBottom: tokens.spacing.sm,
                }, children: [grossCents != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: grossLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numeric: "tabular", children: formatMoney(grossCents, currency) })] })) : null, deductionText != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: deductionsLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numeric: "tabular", children: deductionText })] })) : null] })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, testID: testID, style: style, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, testID: testID, style: [{ borderRadius: tokens.radius.md }, style], children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=PayslipRowV4.js.map