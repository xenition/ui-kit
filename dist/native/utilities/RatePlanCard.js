"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatePlanCard = RatePlanCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const VARIANT = {
    fixed: { label: 'Fixed rate', glyph: '🔒' },
    variable: { label: 'Variable', glyph: '📈' },
    'time-of-use': { label: 'Time-of-use', glyph: '⏱️' },
    tiered: { label: 'Tiered', glyph: '📊' },
    green: { label: '100% renewable', glyph: '🌱' },
};
/**
 * A selectable rate-plan card: a per-unit price headline (integer cents via
 * `formatMoney`, so it never drifts), a rate-structure glyph + label, an optional
 * feature list, and a select action. The `selected` state is conveyed by **a
 * badge + label + an accent ring** (never color alone). The select `Button`
 * renders only when `onSelect` is supplied. Every color traces to a
 * `SemanticColors` slot or a `ramps`-derived tint — no literals.
 */
function RatePlanCard({ name, variant = 'fixed', rateCents, unit, term, features, selected = false, currency = 'USD', formatMoney: format = format_1.formatMoney, selectLabel = 'Choose plan', onSelect, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const vd = VARIANT[variant] ?? VARIANT.fixed;
    const rate = Math.max(0, Math.trunc(rateCents || 0));
    const rows = Array.isArray(features) ? features : [];
    const card = ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: selected ? 'elevated' : 'outlined', style: [
            selected
                ? { borderWidth: 2, borderColor: colors.primary, backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.06) }
                : null,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: vd.glyph, size: "lg", accessibilityLabel: vd.label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [vd.label, term != null ? ` · ${term}` : ''] })] }), selected ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "primary", variant: "soft", size: "sm", children: '✓ Current' })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: format(rate, currency) }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["/", unit] })] }), rows.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: rows.map((f, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\u2713", size: "sm", color: "success", accessibilityLabel: "included" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: f })] }, `${f}-${i}`))) })) : null, onSelect != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: selected ? 'outline' : 'primary', onPress: onSelect, disabled: selected, style: { marginTop: tokens.spacing.md }, children: selected ? 'Current plan' : selectLabel })) : null] }));
    // Already the current plan → the card is inert (re-selecting is a no-op).
    if (!onSelect || selected)
        return card;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: `${name}, ${vd.label}, ${format(rate, currency)} per ${unit}${selected ? ', current plan' : ''}`, onPress: onSelect, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: card }));
}
//# sourceMappingURL=RatePlanCard.js.map