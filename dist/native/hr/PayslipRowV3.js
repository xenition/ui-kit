"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayslipRowV3 = PayslipRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const internal_1 = require("./internal");
/**
 * PayslipRow, design **V3** — a dense statement line for a payroll list. Period
 * (and pay date) on the left, net pay pinned right with a leading status glyph +
 * word beneath it (never color alone). Money stays integer **cents** through
 * `formatMoney`. Same Props as {@link PayslipRow}; the gross/deductions
 * breakdown is dropped for density. Press-scales on tap; token-pure.
 */
function PayslipRowV3({ period, netCents, currency = 'USD', status, payDate, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const statusMeta = status ? internal_1.PAYSLIP_STATUS_META[status] : undefined;
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                transform: [{ scale: press.scale }],
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: period }), payDate ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Paid ", payDate] }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: (0, internal_1.formatMoney)(netCents, currency) }), statusMeta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: statusMeta.label, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, internal_1.toneColor)(colors, statusMeta.tone), fontSize: tokens.typography.scale.xs }, children: statusMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: statusMeta.label })] })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Payslip ${period}, net ${(0, internal_1.formatMoney)(netCents, currency)}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, testID: testID, children: row }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: row });
}
//# sourceMappingURL=PayslipRowV3.js.map