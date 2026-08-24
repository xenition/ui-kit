"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioSummaryV2 = PortfolioSummaryV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const money_1 = require("../commerce/money");
const format_1 = require("./internal/format");
/** Same cycled palette DonutChart uses, so the custom legend swatches match. */
const PALETTE = ['primary', 'accent', 'success', 'warn', 'danger'];
/**
 * PortfolioSummary, redesigned (v2): a **big total hero** over a donut. The total
 * sits in a filled primary hero band (rendered in the guaranteed `onPrimary`
 * slot via `formatMoney`, integer cents — no drift) with a translucent on-fill
 * change chip; below, a reused {@link DonutChart} pairs with a custom legend that
 * spells out each asset's share % (guarded against a zero total). Distinct at a
 * glance from v1's plain total + built-in legend. Same props.
 */
function PortfolioSummaryV2({ totalCents, currency = 'USD', changeCents, changePct, allocations = [], loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const onColor = colors.onPrimary;
    const subColor = (0, color_1.withAlpha)(onColor, 0.72);
    const fillTone = (0, format_1.changeToneKey)(changePct ?? changeCents ?? 0);
    const safeTotal = Number.isFinite(totalCents) ? Math.trunc(totalCents) : 0;
    const allocTotal = allocations.reduce((sum, a) => sum + Math.max(a.value, 0), 0);
    const hasChange = changeCents != null || changePct != null;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                { borderRadius: tokens.radius.lg, backgroundColor: colors.surface, ...(0, elevation_1.shadow)('md', tokens) },
                style,
            ], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading portfolio", style: { height: 220, borderRadius: tokens.radius.lg, backgroundColor: colors.border, opacity: 0.5 } }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.surface, ...(0, elevation_1.shadow)('md', tokens) },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, backgroundColor: colors.primary, gap: tokens.spacing.xs, overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                            position: 'absolute',
                            top: -60,
                            right: -40,
                            width: 180,
                            height: 180,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(onColor, 0.1),
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: subColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Total balance" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: onColor, fontSize: tokens.typography.scale['3xl'], fontWeight: '700', fontVariant: ['tabular-nums'] }, children: (0, money_1.formatMoney)(safeTotal, currency) }), hasChange ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            alignSelf: 'flex-start',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            backgroundColor: (0, color_1.withAlpha)(onColor, 0.16),
                            borderRadius: tokens.radius.full,
                            paddingVertical: 3,
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: onColor, fontSize: tokens.typography.scale.xs }, children: (0, format_1.changeGlyph)(changePct ?? changeCents ?? 0) }), changeCents != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: onColor, fontSize: tokens.typography.scale.xs, fontWeight: '600', fontVariant: ['tabular-nums'] }, children: (0, money_1.formatMoney)(Math.abs(Math.trunc(changeCents)), currency) })) : null, changePct != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct))}`, style: { color: onColor, fontSize: tokens.typography.scale.xs, fontWeight: '600', fontVariant: ['tabular-nums'] }, children: (0, format_1.formatPct)(changePct) })) : null] })) : null] }), allocations.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg, padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(charts_1.DonutChart, { data: allocations.map((a) => ({ label: a.label, value: a.value, color: a.color })), size: 116, thickness: 20, accessibilityLabel: `Allocation across ${allocations.length} assets` }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: allocations.map((a, i) => {
                            const swatch = a.color ?? PALETTE[i % PALETTE.length] ?? 'primary';
                            const pct = allocTotal > 0 ? (Math.max(a.value, 0) / allocTotal) * 100 : 0;
                            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors[swatch] } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: a.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600', fontVariant: ['tabular-nums'] }, children: `${pct.toFixed(1)}%` })] }, `${a.label}-${i}`));
                        }) })] })) : null] }));
}
//# sourceMappingURL=PortfolioSummaryV2.js.map