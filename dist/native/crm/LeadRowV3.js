"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRowV3 = LeadRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const money_1 = require("../commerce/money");
const internal_1 = require("./internal");
/**
 * LeadRow **design V3** — the *densest* single line: a leading temperature glyph
 * (🔥/☀/❄), the name, the value pushed right, and a small score. No avatar, no
 * second line of chrome — a maximum-density lead list for triage screens.
 * Temperature still pairs the glyph with an accessible word in the row label, so
 * meaning never rests on color. Same props as {@link LeadRow}. Token-pure.
 */
function LeadRowV3({ name, company, temperature, valueCents, currency = 'USD', score, selected = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.TEMPERATURE_META[temperature];
    const tempColor = (0, internal_1.toneColor)(colors, meta.tone);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${meta.label} lead ${name}${company ? `, ${company}` : ''}`, disabled: !onPress, onPress: onPress, testID: testID, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                borderLeftWidth: 3,
                borderLeftColor: selected ? colors.primary : tempColor,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base, color: tempColor, width: 20, textAlign: 'center' }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [name, company ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '400' }, children: `  ${company}` })) : null] }), valueCents != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: (0, money_1.formatMoney)(valueCents, currency) })) : null, score != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tempColor, fontSize: tokens.typography.scale.xs, fontWeight: '700', minWidth: 20, textAlign: 'right' }, children: `${(0, internal_1.clampPct)(score)}` })) : null] }));
}
//# sourceMappingURL=LeadRowV3.js.map