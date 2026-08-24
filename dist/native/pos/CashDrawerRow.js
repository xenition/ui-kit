"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashDrawerRow = CashDrawerRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
const SIGN = {
    sale: '+',
    payIn: '+',
    refund: '-',
    payOut: '-',
};
/**
 * One row of a cash-drawer count / register audit: opening float, cash sales,
 * pay-ins/outs, expected, counted, and the variance. Money is integer **cents**
 * via `formatMoney`, with in/out movements signed. For `kind="variance"`, pass
 * `expectedCents` and the counted `amountCents` to draw an over/short/balanced
 * **glyph + word** pill and a signed delta — state by text, never color alone.
 * Token-only.
 */
function CashDrawerRow({ kind, label, amountCents, currency = 'USD', expectedCents, detail, onPress, variant = 'default', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.CASH_MOVEMENT_META[kind];
    const isTotal = variant === 'total';
    const isVariance = kind === 'variance' && typeof expectedCents === 'number';
    const variance = isVariance ? (0, internal_1.varianceMeta)((0, internal_1.safeCents)(expectedCents), (0, internal_1.safeCents)(amountCents)) : null;
    const sign = SIGN[kind];
    const displayCents = variance ? variance.deltaCents : (0, internal_1.safeCents)(amountCents);
    const amountTone = variance ? variance.meta.tone : 'neutral';
    const amountColor = variance ? (0, internal_1.toneColor)(colors, amountTone) : colors.onSurface;
    const prefix = variance
        ? variance.deltaCents > 0
            ? '+'
            : variance.deltaCents < 0
                ? '−'
                : ''
        : sign === '+'
            ? '+'
            : sign === '-'
                ? '−'
                : '';
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                borderTopWidth: isTotal ? 1 : 0,
                borderTopColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: isTotal ? '700' : '500',
                                }, children: label ?? meta.label }), variance ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: variance.meta, variant: "inline", size: "sm" }) : null] }), detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: detail })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                    color: amountColor,
                    fontSize: isTotal ? tokens.typography.scale.base : tokens.typography.scale.sm,
                    fontWeight: isTotal || variance ? '700' : '500',
                }, children: [prefix, (0, internal_1.formatMoney)(Math.abs(displayCents), currency)] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label ?? meta.label}, ${(0, internal_1.formatMoney)(Math.abs(displayCents), currency)}`, onPress: onPress, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=CashDrawerRow.js.map