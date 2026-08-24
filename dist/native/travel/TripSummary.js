"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripSummary = TripSummary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A read-only recap of a trip — destination, dates, traveler count, an
 * itemized cost breakdown, and a grand total. When `totalCents` is omitted the
 * total is summed from `items` (guarded against an empty list). Money is
 * integer cents formatted through {@link formatMoney}. Token-only colors.
 */
function TripSummary({ destination, dates, travelers, items = [], totalCents, currency = 'USD', formatMoney: format = primitives_1.formatMoney, title = 'Trip summary', action, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const derived = items.reduce((sum, it) => sum + (it.cents || 0), 0);
    const total = typeof totalCents === 'number' ? totalCents : derived;
    const metaLine = [
        dates,
        typeof travelers === 'number' ? `${travelers} traveler${travelers === 1 ? '' : 's'}` : undefined,
    ]
        .filter(Boolean)
        .join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: destination }), metaLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: metaLine })) : null] }), items.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: items.map((it, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: it.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: it.cents < 0 ? colors.success : colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                            }, children: format(it.cents, currency) })] }, `${it.label}-${i}`))) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Total" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: format(total, currency) })] }), action ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: action }) : null] }));
}
//# sourceMappingURL=TripSummary.js.map