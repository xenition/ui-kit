"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingCardV3 = ListingCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const ConditionBadge_1 = require("./ConditionBadge");
const internal_1 = require("./internal");
const motion_1 = require("../primitives/internal/motion");
/**
 * ListingCard — Design V3: a **full-bleed hero** tile. The image fills the whole
 * card; the condition chip pins to the top-left and the ♥ watch toggle to the
 * top-right, while the title and price ride a frosted scrim panel across the
 * bottom. The scrim is a theme-safe `surface` overlay (two stacked translucent
 * bands, faint→solid, standing in for a gradient) with `on-surface` text, so it
 * stays legible in light and dark. Editorial and immersive — clearly distinct
 * from the V1 grid tile and the V2 media-left rail. Same props as `ListingCard`;
 * token-pure with `withAlpha` tints.
 */
function ListingCardV3({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, subtitle, watched = false, onToggleWatch, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const watchChip = onToggleWatch != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: watched ? `Unwatch ${title}` : `Watch ${title}`, accessibilityState: { selected: watched }, onPress: () => onToggleWatch(!watched), hitSlop: 8, style: {
            position: 'absolute',
            top: tokens.spacing.sm,
            right: tokens.spacing.sm,
            width: 32,
            height: 32,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (0, internal_1.withAlpha)(colors.surface, 0.9),
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: watched ? colors.danger : colors.muted }, children: watched ? '♥' : '♡' }) })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                height: 260,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                backgroundColor: colors.border,
                justifyContent: 'flex-end',
                transform: [{ scale: press.scale }],
            },
            style,
        ], children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, style: { ...StyleFill }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { ...StyleFill, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No photo" }) })), condition ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(ConditionBadge_1.ConditionBadge, { condition: condition, size: "sm" }) })) : null, watchChip, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    paddingTop: tokens.spacing.xl,
                    backgroundColor: (0, internal_1.withAlpha)(colors.surface, 0.4),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.md, paddingVertical: tokens.spacing.md, gap: 2, backgroundColor: (0, internal_1.withAlpha)(colors.surface, 0.86) }, children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Loading listing\u2026" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: "lg" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] })) }) })] }));
    if (!onPress)
        return body;
    const priceLabel = (0, primitives_1.formatMoney)(priceCents, currency);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}, ${priceLabel}${condition ? `, ${condition}` : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }));
}
/** Absolute full-bleed fill, shared by the hero image and its placeholder. */
const StyleFill = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
};
//# sourceMappingURL=ListingCardV3.js.map