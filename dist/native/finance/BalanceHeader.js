"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceHeader = BalanceHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const money_1 = require("../commerce/money");
/**
 * The hero balance block for an account/wallet screen: a muted label, a large
 * token-scaled figure, an optional up/down change (colored `success` /
 * `danger`), and an optional {@link Sparkline}. The balance is integer cents
 * (formatted to two decimals, no drift); the change tone derives from its sign.
 * All colors trace to tokens.
 */
function BalanceHeader({ label = 'Total balance', balanceCents, currency = 'USD', changeCents, changePct, trend, formatMoney: format = money_1.formatMoney, loading = false, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
    const up = (changeCents ?? 0) >= 0;
    // FILL-AS-TEXT: the change reads as TEXT (arrow + amount), so it uses the
    // AA-guaranteed *Text slots. The Sparkline below stays a FILL (unchanged).
    const changeColor = up ? colors.successText : colors.dangerText;
    const arrow = up ? '▲' : '▼';
    // Appearance surface FIRST; the enter transition + gap layout stay AFTER.
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityRole: "summary", style: [surface, { gap: tokens.spacing.xs }, enter, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading balance", style: {
                    height: tokens.typography.scale['3xl'],
                    width: 160,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: colors.border,
                } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale['3xl'],
                    fontWeight: '700',
                    fontVariant: ['tabular-nums'],
                }, children: format(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency) })), hasChange && !loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: changeColor, fontSize: tokens.typography.scale.xs }, children: arrow }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: changeColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [format(Math.abs(Math.trunc(changeCents)), currency), typeof changePct === 'number' ? ` (${changePct > 0 ? '+' : ''}${changePct}%)` : ''] })] })) : null, trend != null && trend.length > 0 && !loading ? ((0, jsx_runtime_1.jsx)(charts_1.Sparkline, { data: trend, color: up ? 'success' : 'danger', style: { marginTop: tokens.spacing.xs } })) : null] }));
}
//# sourceMappingURL=BalanceHeader.js.map