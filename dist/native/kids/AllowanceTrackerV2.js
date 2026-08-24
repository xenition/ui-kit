"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowanceTrackerV2 = AllowanceTrackerV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
function fmt(currency, amount) {
    return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}
/**
 * AllowanceTracker, redesigned (v2): a **wallet hero card**. A big centered
 * balance leads; the savings goal renders as a circular ring medallion showing
 * the percent to target; earned and spent sit in two tinted stat pills below.
 * Add/Spend anchor the card. Lifted with a shadow and a mount-fade. Distinct
 * from v1's left-aligned figure + linear bar. Same props, same empty state.
 */
function AllowanceTrackerV2({ balance, currency = '$', earned, spent, goal, loading = false, emptyLabel = 'No allowance set up yet', onAdd, onWithdraw, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const container = [
        {
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading allowance", style: container, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '30%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 28, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }) }));
    }
    if (!Number.isFinite(balance)) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: emptyLabel, style: container, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: "\uD83D\uDC37" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }) }));
    }
    const goalPct = goal && goal.target > 0 ? Math.max(0, Math.min(100, Math.round((balance / goal.target) * 100))) : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityLabel: `Balance ${fmt(currency, balance)}`, style: [container, { opacity: enter.opacity, transform: enter.transform }], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textTransform: 'uppercase', letterSpacing: 1 }, children: "Balance" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: fmt(currency, balance) })] }), goal && goalPct !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            width: 96,
                            height: 96,
                            borderRadius: tokens.radius.full,
                            borderWidth: 8,
                            borderColor: (0, color_1.withAlpha)(colors.success, 0.35),
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, color_1.withAlpha)(colors.success, 0.06),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.successText, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: `${goalPct}%` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "to goal" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["\uD83C\uDFAF ", goal.label, " \u00B7 ", fmt(currency, goal.target)] })] })) : null, typeof earned === 'number' || typeof spent === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [typeof earned === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2, borderRadius: tokens.radius.md, padding: tokens.spacing.md, backgroundColor: (0, color_1.withAlpha)(colors.success, 0.1) }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Earned" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.successText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: `+${fmt(currency, earned)}` })] })) : null, typeof spent === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2, borderRadius: tokens.radius.md, padding: tokens.spacing.md, backgroundColor: (0, color_1.withAlpha)(colors.danger, 0.1) }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Spent" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.dangerText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: `−${fmt(currency, spent)}` })] })) : null] })) : null, onAdd || onWithdraw ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onAdd ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", tone: "success", onPress: onAdd, style: { flex: 1 }, children: "Add" })) : null, onWithdraw ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "outline", onPress: onWithdraw, style: { flex: 1 }, children: "Spend" })) : null] })) : null] }));
}
//# sourceMappingURL=AllowanceTrackerV2.js.map