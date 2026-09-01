"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripSummaryV4 = TripSummaryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
/**
 * TripSummary — **V4** "journey" design. The boarding-pass recap: a
 * brand-gradient hero total up top (the grand total in near-white `journeyInk`
 * — the signature V4 lift), then the itemized line items on the clean surface
 * below, split from the hero by a dashed boarding-pass tear line. When
 * `totalCents` is omitted the total is summed from `items`. Money is integer
 * cents formatted through {@link formatMoney}. Same props/behavior as
 * {@link TripSummaryProps}; token-only colors via `useXenitionTheme()`.
 */
function TripSummaryV4({ destination, dates, travelers, items = [], totalCents, currency = 'USD', formatMoney: format = primitives_1.formatMoney, title = 'Trip summary', action, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const derived = items.reduce((sum, it) => sum + (it.cents || 0), 0);
    const total = typeof totalCents === 'number' ? totalCents : derived;
    const metaLine = [
        dates,
        typeof travelers === 'number' ? `${travelers} traveler${travelers === 1 ? '' : 's'}` : undefined,
    ]
        .filter(Boolean)
        .join(' · ');
    const ink = (0, journey_1.journeyInk)(r);
    const inkSoft = (0, journey_1.journeyInkSoft)(r);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyGradient)(r), style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: destination }), metaLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: metaLine })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Total" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: format(total, currency) })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    padding: tokens.spacing.lg,
                    gap: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderStyle: 'dashed',
                    borderTopColor: colors.border,
                }, children: [items.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: items.map((it, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: it.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: it.cents < 0 ? colors.successText : colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                    }, children: format(it.cents, currency) })] }, `${it.label}-${i}`))) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No items" })), action ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: action }) : null] })] }));
}
//# sourceMappingURL=TripSummaryV4.js.map