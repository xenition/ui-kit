"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentCard = TreatmentCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
const money_1 = require("../commerce/money");
const TREATMENT_META = {
    facial: { glyph: '🧖', label: 'Facial', color: 'success' },
    massage: { glyph: '💆', label: 'Massage', color: 'primary' },
    body: { glyph: '🌿', label: 'Body', color: 'accent' },
    nails: { glyph: '💅', label: 'Nails', color: 'accent' },
    hair: { glyph: '💇', label: 'Hair', color: 'primary' },
    wellness: { glyph: '🧘', label: 'Wellness', color: 'success' },
};
/**
 * A spa/salon treatment card: a hero image band with a category tag, the
 * treatment name, a duration · price meta line, an optional description, and a
 * "Book" CTA. `variant` sets the icon/tag/accent; a missing image degrades to a
 * token-tinted band with the category glyph. Prices are integer cents via
 * {@link formatMoney}. Token-only colors (semantic slots + `withAlpha`).
 */
function TreatmentCard({ name, priceCents, currency = 'USD', variant = 'wellness', durationMin, description, imageUrl, formatMoney: format = money_1.formatMoney, bookLabel = 'Book', onBook, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = TREATMENT_META[variant] ?? TREATMENT_META.wellness;
    const priceText = format(priceCents, currency);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${meta.label}: ${name}${durationMin != null ? `, ${durationMin} minutes` : ''}, ${priceText}`, disabled: !onPress, onPress: onPress, style: ({ pressed }) => [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                opacity: pressed && onPress ? 0.94 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height: 132, backgroundColor: (0, color_1.withAlpha)(colors[meta.color], 0.16), alignItems: 'center', justifyContent: 'center' }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: meta.glyph })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: tokens.spacing.sm,
                            left: tokens.spacing.sm,
                            borderRadius: tokens.radius.full,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                            backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.55),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [durationMin != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [durationMin, " min"] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[meta.color], fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: priceText })] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, onBook ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onBook, children: bookLabel })) : null] })] }));
}
//# sourceMappingURL=TreatmentCard.js.map