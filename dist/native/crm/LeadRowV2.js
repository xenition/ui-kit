"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadRowV2 = LeadRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const money_1 = require("../commerce/money");
const internal_1 = require("./internal");
/**
 * LeadRow **design V2** — a *card* (not a dense line) with a prominent
 * hot/warm/cold *flame chip*: a tinted pill carrying the temperature glyph +
 * word, so heat reads instantly without relying on color. Avatar, name and
 * company lead; value and score sit in a right column. Elevated on a token
 * shadow, with a colored accent bar when `selected`. Same props as
 * {@link LeadRow}. Token-pure.
 */
function LeadRowV2({ name, company, temperature, valueCents, currency = 'USD', score, avatarUrl, selected = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const meta = internal_1.TEMPERATURE_META[temperature];
    const tempColor = (0, internal_1.toneColor)(colors, meta.tone);
    const card = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
                borderLeftWidth: selected ? 4 : 0,
                borderLeftColor: selected ? colors.primary : colors.surface,
                transform: [{ scale: press.scale }],
            },
            (0, elevation_1.shadow)('sm', tokens),
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "md", name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), company ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: company })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignSelf: 'flex-start',
                            gap: tokens.spacing.xs / 2,
                            marginTop: tokens.spacing.xs / 2,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(tempColor, 0.12),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: tempColor }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: tempColor, fontWeight: '700' }, children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }, children: [valueCents != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: (0, money_1.formatMoney)(valueCents, currency) })) : null, score != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${(0, internal_1.clampPct)(score)}` })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${meta.label} lead ${name}${company ? `, ${company}` : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, testID: testID, children: card }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: card });
}
//# sourceMappingURL=LeadRowV2.js.map