"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowanceTrackerV3 = AllowanceTrackerV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
function fmt(currency, amount) {
    return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}
/**
 * AllowanceTracker, redesigned (v3): a **compact balance row**. A piggy glyph, a
 * tiny "Balance" caption over the figure, an optional goal-percent chip, and a
 * small Add/Spend pair — all on one dense line for embedding in a list. The
 * opposite of v2's tall hero card. Same props, same empty state.
 */
function AllowanceTrackerV3({ balance, currency = '$', goal, loading = false, emptyLabel = 'No allowance set up yet', onAdd, onWithdraw, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const container = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading allowance", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 28, height: 28, borderRadius: tokens.radius.full, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 9, width: '25%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }));
    }
    if (!Number.isFinite(balance)) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: emptyLabel, style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: "\uD83D\uDC37" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }));
    }
    const goalPct = goal && goal.target > 0 ? Math.max(0, Math.min(100, Math.round((balance / goal.target) * 100))) : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Balance ${fmt(currency, balance)}`, style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 32,
                    height: 32,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(colors.success, 0.12),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: "\uD83D\uDC37" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Balance" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: fmt(currency, balance) })] }), goalPct !== undefined ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", variant: "soft", size: "sm", children: `🎯 ${goalPct}%` })) : null, onAdd ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "soft", tone: "success", onPress: onAdd, children: "Add" })) : null, onWithdraw ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", onPress: onWithdraw, children: "Spend" })) : null] }));
}
//# sourceMappingURL=AllowanceTrackerV3.js.map