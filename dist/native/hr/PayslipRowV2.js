"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayslipRowV2 = PayslipRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * PayslipRow, design **V2** — an expanded pay-statement card. A hero net figure
 * sits above a gross → deductions → net breakdown, with a take-home meter
 * showing net as a share of gross. Money stays integer **cents** through
 * `formatMoney`; payment status is a glyph + word pill (never color alone).
 * Same Props as {@link PayslipRow}. Elevated + mount-fade, token-pure.
 */
function PayslipRowV2({ period, netCents, grossCents, deductionsCents, currency = 'USD', status, payDate, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    // Take-home share of gross, guarded against a missing/zero gross.
    const takeHomePct = grossCents != null && grossCents > 0
        ? Math.max(0, Math.min(100, Math.round((netCents / grossCents) * 100)))
        : null;
    const card = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                opacity: enter.opacity,
                transform: enter.transform,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: period }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: (0, internal_1.formatMoney)(netCents, currency) }), payDate ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Paid ", payDate] }) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PAYSLIP_STATUS_META[status], size: "sm" }) : null] }), grossCents != null || deductionsCents != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, padding: tokens.spacing.sm, borderRadius: tokens.radius.md, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.04) }, children: [grossCents != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Gross" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: (0, internal_1.formatMoney)(grossCents, currency) })] })) : null, deductionsCents != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Deductions" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.dangerText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["\u2212", (0, internal_1.formatMoney)(deductionsCents, currency)] })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border, marginVertical: tokens.spacing.xs / 2 } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "Net" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: (0, internal_1.formatMoney)(netCents, currency) })] }), takeHomePct != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2, marginTop: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: takeHomePct }, style: { height: 6, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1), overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${takeHomePct}%`, height: '100%', backgroundColor: colors.success } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Take-home ", takeHomePct, "% of gross"] })] })) : null] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Payslip ${period}, net ${(0, internal_1.formatMoney)(netCents, currency)}`, onPress: onPress, testID: testID, children: card }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: card });
}
//# sourceMappingURL=PayslipRowV2.js.map