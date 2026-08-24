"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceHeaderV2 = BalanceHeaderV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
const money_1 = require("../commerce/money");
/**
 * BalanceHeader, redesigned (v2): a **big centered hero** over a full-width
 * sparkline band. Everything is center-aligned — the caption, the oversized
 * figure, and a pill-shaped change chip (tinted with the up/down text slot) —
 * then a {@link Sparkline} spans the full width beneath as a trend "floor".
 * Distinct at a glance from v1's left-aligned stack. Same props, integer cents.
 */
function BalanceHeaderV2({ label = 'Total balance', balanceCents, currency = 'USD', changeCents, changePct, trend, formatMoney: format = money_1.formatMoney, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
    const up = (changeCents ?? 0) >= 0;
    const changeColor = up ? colors.successText : colors.dangerText;
    const arrow = up ? '▲' : '▼';
    const hasTrend = Array.isArray(trend) && trend.length > 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityRole: "summary", style: [{ alignItems: 'center', gap: tokens.spacing.sm }, enter, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading balance", style: {
                    height: tokens.typography.scale['3xl'] + 8,
                    width: 200,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: colors.border,
                } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale['3xl'] + 8,
                    fontWeight: '700',
                    textAlign: 'center',
                    fontVariant: ['tabular-nums'],
                }, children: format(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency) })), hasChange && !loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(changeColor, 0.12),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: changeColor, fontSize: tokens.typography.scale.xs }, children: arrow }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: changeColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [format(Math.abs(Math.trunc(changeCents)), currency), typeof changePct === 'number' ? ` (${changePct > 0 ? '+' : ''}${changePct}%)` : ''] })] })) : null, hasTrend && !loading ? ((0, jsx_runtime_1.jsx)(charts_1.Sparkline, { data: trend, height: 48, color: up ? 'success' : 'danger', style: { alignSelf: 'stretch', marginTop: tokens.spacing.xs } })) : null] }));
}
//# sourceMappingURL=BalanceHeaderV2.js.map