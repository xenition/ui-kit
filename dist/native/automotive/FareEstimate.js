"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FareEstimate = FareEstimate;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const color_1 = require("../primitives/internal/color");
function formatMoney(cents, currency) {
    const sign = cents < 0 ? '-' : '';
    const abs = Math.abs(cents);
    try {
        return sign + new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(abs / 100);
    }
    catch {
        return `${sign}$${(abs / 100).toFixed(2)}`;
    }
}
/**
 * A ride fare estimate — an optional itemised breakdown (base, distance, time,
 * discounts) with an optional surge multiplier, plus distance/duration context
 * and a bold total. The total is either supplied or summed from the items (with
 * surge applied to the subtotal); a surge is spelled out in a badge, not colour
 * alone. Presentational: shaped data only, nothing fetches. Colors come from
 * semantic tokens and `withAlpha` tints — no literal colors. `variant="summary"`
 * collapses to the total. Item indexing is guarded against a missing array.
 */
function FareEstimate({ items, totalCents, currency = 'USD', surgeMultiplier, distanceLabel, durationLabel, variant = 'detailed', loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const list = Array.isArray(items) ? items : [];
    const hasSurge = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
    const subtotal = list.reduce((sum, it) => sum + (Number.isFinite(it.cents) ? it.cents : 0), 0);
    const computed = hasSurge ? Math.round(subtotal * surgeMultiplier) : subtotal;
    const total = typeof totalCents === 'number' ? totalCents : computed;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading fare estimate", style: [
                {
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    padding: tokens.spacing.lg,
                    gap: tokens.spacing.sm,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.2) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 22, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.28) } })] }));
    }
    const showBreakdown = variant === 'detailed' && list.length > 0;
    const a11y = `Estimated fare ${formatMoney(total, currency)}${hasSurge ? `, ${surgeMultiplier}x surge` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }, children: "Fare estimate" }), hasSurge ? (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "warn", variant: "soft", size: "sm", children: `${surgeMultiplier}x surge` }) : null] }), distanceLabel || durationLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [distanceLabel, durationLabel].filter(Boolean).join(' · ') })) : null, showBreakdown ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: [list.map((it, i) => {
                        const discount = it.cents < 0;
                        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: it.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: discount ? colors.success : colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: discount ? '700' : '500',
                                    }, children: formatMoney(it.cents, currency) })] }, `${it.label}-${i}`));
                    }), hasSurge ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Surge \u00D7", surgeMultiplier] }) })) : null] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTopWidth: showBreakdown ? 1 : 0,
                    borderTopColor: colors.border,
                    paddingTop: showBreakdown ? tokens.spacing.sm : 0,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Total" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: formatMoney(total, currency) })] })] }));
}
//# sourceMappingURL=FareEstimate.js.map