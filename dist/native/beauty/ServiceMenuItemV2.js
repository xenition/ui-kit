"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceMenuItemV2 = ServiceMenuItemV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const money_1 = require("../commerce/money");
const CATEGORY_META = {
    hair: { glyph: '💇', label: 'Hair', color: 'primary' },
    nails: { glyph: '💅', label: 'Nails', color: 'accent' },
    skin: { glyph: '✨', label: 'Skin', color: 'success' },
    massage: { glyph: '💆', label: 'Massage', color: 'primary' },
    makeup: { glyph: '💄', label: 'Makeup', color: 'danger' },
    brows: { glyph: '👁️', label: 'Brows', color: 'accent' },
    waxing: { glyph: '🕯️', label: 'Waxing', color: 'warn' },
    spa: { glyph: '🧖', label: 'Spa', color: 'success' },
};
/**
 * ServiceMenuItem — design variant **V2**: an **elevated card** rather than V1's
 * flat bordered row. A large rounded category glyph tile anchors the top-left,
 * the name + optional "Popular" badge and description stack beside it, and a
 * footer band carries a duration chip, the price, and a dedicated **Book** chip.
 * Same props as {@link ServiceMenuItemProps}; `onPress` powers the Book chip.
 * `unavailable` dims the card and disables the chip. Token-only colors.
 */
function ServiceMenuItemV2({ name, priceCents, currency = 'USD', category = 'spa', durationMin, description, popular = false, unavailable = false, pricePrefix, formatMoney: format = money_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const meta = CATEGORY_META[category] ?? CATEGORY_META.spa;
    const accent = colors[meta.color];
    const priceText = `${pricePrefix ? `${pricePrefix} ` : ''}${format(priceCents, currency)}`;
    const interactive = !unavailable && !!onPress;
    const containerStyle = [
        {
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            borderWidth: 0,
            padding: tokens.spacing.md,
            gap: tokens.spacing.md,
            opacity: unavailable ? 0.5 : 1,
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 52,
                                height: 52,
                                borderRadius: tokens.radius.md,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flexShrink: 1 }, children: name }), popular ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                borderRadius: tokens.radius.sm,
                                                paddingHorizontal: tokens.spacing.xs,
                                                paddingVertical: 1,
                                                backgroundColor: (0, color_1.withAlpha)(colors.accent, 0.16),
                                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Popular" }) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: meta.label }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: tokens.spacing.sm,
                        paddingTop: tokens.spacing.sm,
                        borderTopWidth: 1,
                        borderTopColor: (0, color_1.withAlpha)(colors.muted, 0.16),
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [durationMin != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        borderRadius: tokens.radius.full,
                                        paddingHorizontal: tokens.spacing.sm,
                                        paddingVertical: 2,
                                        backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.14),
                                    }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [durationMin, " min"] }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: priceText })] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Book ${name}, ${priceText}${unavailable ? ', unavailable' : ''}`, accessibilityState: { disabled: !interactive }, disabled: !interactive, onPress: interactive ? onPress : undefined, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({
                                borderRadius: tokens.radius.full,
                                paddingHorizontal: tokens.spacing.md,
                                paddingVertical: tokens.spacing.sm,
                                backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: unavailable ? 'Unavailable' : 'Book' }) })] })] }) }));
}
//# sourceMappingURL=ServiceMenuItemV2.js.map