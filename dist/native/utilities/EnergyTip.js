"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyTip = EnergyTip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const CATEGORY = {
    heating: { label: 'Heating', glyph: '🔥' },
    cooling: { label: 'Cooling', glyph: '❄️' },
    lighting: { label: 'Lighting', glyph: '💡' },
    water: { label: 'Water', glyph: '💧' },
    appliance: { label: 'Appliances', glyph: '🔌' },
    general: { label: 'Tip', glyph: '🌱' },
};
const EFFORT_LABEL = {
    easy: 'Easy',
    moderate: 'Moderate',
    project: 'Project',
};
/**
 * An energy-saving tip card: a tinted category glyph disc, a headline + body, an
 * optional effort tag, and an optional estimated monthly saving badge. The
 * saving is integer cents via `formatMoney`, so the printed figure never drifts.
 * Becomes a button only when `onPress` is supplied. Every color traces to a
 * `SemanticColors` slot or a `ramps`-derived tint — no literals.
 */
function EnergyTip({ title, body, category = 'general', savingsCents, effort, currency = 'USD', formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const cd = CATEGORY[category] ?? CATEGORY.general;
    const savings = savingsCents != null ? Math.max(0, Math.trunc(savingsCents)) : null;
    const card = ((0, jsx_runtime_1.jsx)(primitives_2.Card, { variant: onPress ? 'interactive' : 'outlined', style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 44,
                        height: 44,
                        borderRadius: tokens.radius.md,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (0, format_1.withAlpha)(colors.success, 0.14),
                    }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: cd.glyph, size: "lg", accessibilityLabel: cd.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: cd.label.toUpperCase() }), effort != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "neutral", variant: "soft", size: "sm", children: EFFORT_LABEL[effort] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), body != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: body })) : null, savings != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: 2 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "success", variant: "soft", size: "sm", children: `Save ~${format(savings, currency)}/mo` }) })) : null] })] }) }));
    if (!onPress)
        return card;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${cd.label} tip: ${title}${savings != null ? `, save about ${format(savings, currency)} per month` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: card }));
}
//# sourceMappingURL=EnergyTip.js.map