"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowanceTracker = AllowanceTracker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
function fmt(currency, amount) {
    return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}
/**
 * A child's allowance wallet: a headline balance, an earned/spent split, an
 * optional savings-goal progress bar, and add/withdraw actions. Renders an
 * explicit empty state when no balance is set. Every color traces to a
 * `SemanticColors` token — no literals.
 */
function AllowanceTracker({ balance, currency = '$', earned, spent, goal, loading = false, emptyLabel = 'No allowance set up yet', onAdd, onWithdraw, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const container = [
        {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading allowance", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 26, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }));
    }
    if (!Number.isFinite(balance)) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: emptyLabel, style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Allowance" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: "\uD83D\uDC37" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] })] }));
    }
    const goalPct = goal && goal.target > 0 ? Math.max(0, Math.min(100, (balance / goal.target) * 100)) : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Balance ${fmt(currency, balance)}`, style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Balance" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: fmt(currency, balance) })] }), typeof earned === 'number' || typeof spent === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xl }, children: [typeof earned === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Earned" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: `+${fmt(currency, earned)}` })] })) : null, typeof spent === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Spent" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: `−${fmt(currency, spent)}` })] })) : null] })) : null, goal && goalPct !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["\uD83C\uDFAF ", goal.label] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [fmt(currency, balance), " / ", fmt(currency, goal.target)] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: balance, max: goal.target, tone: "success" })] })) : null, onAdd || onWithdraw ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onAdd ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "soft", tone: "success", onPress: onAdd, style: { flex: 1 }, children: "Add" })) : null, onWithdraw ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", onPress: onWithdraw, style: { flex: 1 }, children: "Spend" })) : null] })) : null] }));
}
//# sourceMappingURL=AllowanceTracker.js.map