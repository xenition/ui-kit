"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceHeaderV3 = BalanceHeaderV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
const money_1 = require("../commerce/money");
/**
 * BalanceHeader, redesigned (v3): a **left-aligned compact** row. The caption
 * sits small above, then the figure and an inline soft change chip share one
 * baseline-aligned row — no sparkline, no oversized type. Built to sit tight in
 * a card header or toolbar. Distinct at a glance from v1's stacked hero and v2's
 * centered hero. Same props, integer-cents money, token-pure.
 */
function BalanceHeaderV3({ label = 'Total balance', balanceCents, currency = 'USD', changeCents, changePct, formatMoney: format = money_1.formatMoney, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
    const up = (changeCents ?? 0) >= 0;
    const changeColor = up ? colors.successText : colors.dangerText;
    const arrow = up ? '▲' : '▼';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityRole: "summary", style: [{ gap: 2 }, enter, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading balance", style: {
                            height: tokens.typography.scale['2xl'],
                            width: 120,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: colors.border,
                        } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '700',
                            fontVariant: ['tabular-nums'],
                        }, children: format(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency) })), hasChange && !loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingVertical: 1,
                            paddingHorizontal: tokens.spacing.xs,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: (0, color_1.withAlpha)(changeColor, 0.12),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: changeColor, fontSize: tokens.typography.scale.xs }, children: arrow }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: changeColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: typeof changePct === 'number'
                                    ? `${changePct > 0 ? '+' : ''}${changePct}%`
                                    : format(Math.abs(Math.trunc(changeCents)), currency) })] })) : null] })] }));
}
//# sourceMappingURL=BalanceHeaderV3.js.map