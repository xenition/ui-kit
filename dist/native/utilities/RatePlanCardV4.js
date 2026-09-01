"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatePlanCardV4 = RatePlanCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
const VARIANT = {
    fixed: { label: 'Fixed rate', glyph: '🔒' },
    variable: { label: 'Variable', glyph: '📈' },
    'time-of-use': { label: 'Time-of-use', glyph: '⏱️' },
    tiered: { label: 'Tiered', glyph: '📊' },
    green: { label: '100% renewable', glyph: '🌱' },
};
/**
 * RatePlanCard — **V4** design. A clean, elevated rate-plan card: the
 * rate-structure glyph in the signature brand-gradient disc, a per-unit price
 * headline (integer cents via `formatMoney`, so it never drifts), an optional
 * feature list, and a select action. The `selected` state stays conveyed by a
 * badge + label + an accent ring (never color alone) and the CTA becomes inert.
 * Same props/variants as {@link RatePlanCardProps}; token-only colors.
 */
function RatePlanCardV4({ name, variant = 'fixed', rateCents, unit, term, features, selected = false, currency = 'USD', formatMoney: format = format_1.formatMoney, selectLabel = 'Choose plan', onSelect, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const vd = VARIANT[variant] ?? VARIANT.fixed;
    const rate = Math.max(0, Math.trunc(rateCents || 0));
    const rows = Array.isArray(features) ? features : [];
    const cardStyle = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    const card = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            cardStyle,
            selected
                ? { borderWidth: 2, borderColor: colors.primary, backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.06) }
                : null,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: { width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: vd.glyph, size: "xl", accessibilityLabel: vd.label, style: { color: (0, brand_1.brandInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: [vd.label, term != null ? ` · ${term}` : ''] })] }), selected ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "primary", variant: "soft", size: "sm", children: '✓ Current' })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: format(rate, currency) }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: ["/", unit] })] }), rows.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: rows.map((f, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\u2713", size: "sm", color: "success", accessibilityLabel: "included" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: f })] }, `${f}-${i}`))) })) : null, onSelect != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: selected ? 'outline' : 'primary', onPress: onSelect, disabled: selected, style: { marginTop: tokens.spacing.md }, children: selected ? 'Current plan' : selectLabel })) : null] }));
    // Already the current plan → the card is inert (re-selecting is a no-op).
    if (!onSelect || selected)
        return card;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: `${name}, ${vd.label}, ${format(rate, currency)} per ${unit}${selected ? ', current plan' : ''}`, onPress: onSelect, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: card }));
}
//# sourceMappingURL=RatePlanCardV4.js.map