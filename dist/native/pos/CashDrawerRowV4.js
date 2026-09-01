"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashDrawerRowV4 = CashDrawerRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/** Signed money movements — in (+) versus out (−). */
const SIGN = {
    sale: '+',
    payIn: '+',
    refund: '-',
    payOut: '-',
};
/**
 * CashDrawerRow — **V4** "register" design. The tactile checkout take on a
 * cash-movement row: the kind glyph rides in a **soft-tint disc**, the label +
 * optional detail sit beside it, and the **signed amount is big and bold** in
 * tabular numerals — money in reads `success`, money out reads `danger` by sign,
 * always shown with `+`/`−`. For `kind="variance"`, pass `expectedCents` +
 * counted `amountCents` for an over/short/balanced **glyph + word** pill and a
 * signed delta (state by text, never color alone). Same props/behavior as
 * {@link CashDrawerRowProps}; token-only tints via `useXenitionTheme()`.
 */
function CashDrawerRowV4({ kind, label, amountCents, currency = 'USD', expectedCents, detail, onPress, variant = 'default', testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.CASH_MOVEMENT_META[kind];
    const isTotal = variant === 'total';
    const isVariance = kind === 'variance' && typeof expectedCents === 'number';
    const variance = isVariance ? (0, internal_1.varianceMeta)((0, internal_1.safeCents)(expectedCents), (0, internal_1.safeCents)(amountCents)) : null;
    const sign = SIGN[kind];
    const displayCents = variance ? variance.deltaCents : (0, internal_1.safeCents)(amountCents);
    // Amount color: variance → its tone; signed in → success, out → danger.
    const amountTone = variance
        ? variance.meta.tone
        : sign === '+'
            ? 'success'
            : sign === '-'
                ? 'danger'
                : 'neutral';
    const amountColor = amountTone === 'neutral' ? colors.onSurface : (0, internal_1.toneColor)(colors, amountTone);
    // Disc tint follows the movement's own tone.
    const discTint = (0, internal_1.toneColor)(colors, meta.tone);
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
                borderRadius: tokens.radius.md,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderTopWidth: isTotal ? 1 : 0,
                borderTopColor: colors.border,
                marginTop: isTotal ? tokens.spacing.xs : 0,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, internal_1.withAlpha)(discTint, 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: discTint, fontSize: tokens.typography.scale.base }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                            color: colors.onSurface,
                                            fontSize: tokens.typography.scale.sm,
                                            fontWeight: isTotal ? '700' : '600',
                                        }, children: label ?? meta.label }), variance ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: variance.meta, variant: "inline", size: "sm" }) : null] }), detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: detail })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                    color: amountColor,
                    fontSize: isTotal ? tokens.typography.scale.lg : tokens.typography.scale.base,
                    fontWeight: '800',
                }, children: [prefix, (0, internal_1.formatMoney)(Math.abs(displayCents), currency)] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label ?? meta.label}, ${(0, internal_1.formatMoney)(Math.abs(displayCents), currency)}`, onPress: onPress, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=CashDrawerRowV4.js.map