"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyTipV4 = EnergyTipV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
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
 * EnergyTip — **V4** design. A clean, elevated tip card: the category glyph in
 * the signature brand-gradient disc, a category eyebrow + optional effort tag, a
 * headline + body, and an optional estimated monthly saving badge (integer cents
 * via `formatMoney`, so the figure never drifts). Becomes a button only when
 * `onPress` is supplied. Same props/categories as {@link EnergyTipProps};
 * token-only colors.
 */
function EnergyTipV4({ title, body, category = 'general', savingsCents, effort, currency = 'USD', formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const cd = CATEGORY[category] ?? CATEGORY.general;
    const savings = savingsCents != null ? Math.max(0, Math.trunc(savingsCents)) : null;
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
    const card = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [cardStyle, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: { width: 44, height: 44, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: cd.glyph, size: "lg", accessibilityLabel: cd.label, style: { color: (0, brand_1.brandInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: cd.label.toUpperCase() }), effort != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "neutral", variant: "soft", size: "sm", children: EFFORT_LABEL[effort] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), body != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: body })) : null, savings != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: 2 }, children: (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "success", variant: "soft", size: "sm", children: `Save ~${format(savings, currency)}/mo` }) })) : null] })] }) }));
    if (!onPress)
        return card;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${cd.label} tip: ${title}${savings != null ? `, save about ${format(savings, currency)} per month` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: card }));
}
//# sourceMappingURL=EnergyTipV4.js.map