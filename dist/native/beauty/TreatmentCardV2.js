"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentCardV2 = TreatmentCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
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
 * TreatmentCard — design variant **V2**: a **full-bleed image hero**. The image
 * fills the whole tile; a bottom scrim (`withAlpha` of the on-surface token)
 * carries the title, a duration · price line, and an inline **Book** chip in
 * inverse (surface-colored) text, with the category badge floated top-left.
 * Where V1 splits into an image band above a text body, V2 is one immersive
 * poster. Missing images degrade to a token-tinted panel with the glyph. Same
 * props as {@link TreatmentCardProps}. Token-only colors.
 */
function TreatmentCardV2({ name, priceCents, currency = 'USD', variant = 'wellness', durationMin, description, imageUrl, formatMoney: format = money_1.formatMoney, bookLabel = 'Book', onBook, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const meta = TREATMENT_META[variant] ?? TREATMENT_META.wellness;
    const priceText = format(priceCents, currency);
    const containerStyle = [
        {
            height: 220,
            borderRadius: tokens.radius.lg,
            borderWidth: 0,
            overflow: 'hidden',
            justifyContent: 'flex-end',
            backgroundColor: (0, color_1.withAlpha)(colors[meta.color], 0.16),
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: meta.glyph }) })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: tokens.spacing.sm,
                    left: tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                    backgroundColor: (0, color_1.withAlpha)(colors[meta.color], 0.9),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    padding: tokens.spacing.md,
                    gap: tokens.spacing.xs,
                    backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.55),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.surface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: name }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: (0, color_1.withAlpha)(colors.surface, 0.85), fontSize: tokens.typography.scale.sm }, children: description })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [durationMin != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: (0, color_1.withAlpha)(colors.surface, 0.85), fontSize: tokens.typography.scale.sm }, children: [durationMin, " min"] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: priceText })] }), onBook ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Book ${name}, ${priceText}`, onPress: onBook, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({
                                    borderRadius: tokens.radius.full,
                                    paddingHorizontal: tokens.spacing.md,
                                    paddingVertical: tokens.spacing.sm,
                                    backgroundColor: colors.surface,
                                    opacity: pressed ? 0.85 : 1,
                                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: bookLabel }) })) : null] })] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${meta.label}: ${name}${durationMin != null ? `, ${durationMin} minutes` : ''}, ${priceText}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: containerStyle, children: inner }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, containerStyle], children: inner }));
}
//# sourceMappingURL=TreatmentCardV2.js.map