"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRow = LeadRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const money_1 = require("../commerce/money");
const internal_1 = require("./internal");
/**
 * Dense list row for a lead, keyed by **temperature** (`hot` 🔥 / `warm` ☀ /
 * `cold` ❄). Temperature is shown as a glyph *and* a label so it never relies
 * on color; the matching tone (danger/warn/primary) is only reinforcement.
 * Shows optional value (cents → `formatMoney`) and a score badge. All colors
 * are theme tokens.
 */
function LeadRow({ name, company, temperature, valueCents, currency = 'USD', score, avatarUrl, selected = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.TEMPERATURE_META[temperature];
    const tempColor = (0, internal_1.toneColor)(colors, meta.tone);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${meta.label} lead ${name}${company ? `, ${company}` : ''}`, disabled: !onPress, onPress: onPress, testID: testID, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: 28 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg, color: tempColor }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: tempColor, fontWeight: '700' }, children: meta.label })] }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), company ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: company })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }, children: [valueCents != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: (0, money_1.formatMoney)(valueCents, currency) })) : null, score != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${(0, internal_1.clampPct)(score)}` })) : null] })] }));
}
//# sourceMappingURL=LeadRow.js.map