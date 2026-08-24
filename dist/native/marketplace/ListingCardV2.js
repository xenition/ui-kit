"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingCardV2 = ListingCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const ConditionBadge_1 = require("./ConditionBadge");
const internal_1 = require("./internal");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
/**
 * ListingCard — Design V2: a horizontal "media-left" card with a dedicated
 * right-hand **price rail**. The hero sits on the left; the middle column
 * carries the title, condition chip, and location; and a tinted vertical rail
 * on the trailing edge isolates the price (plus the ♥ watch toggle) so scanning
 * a feed reads price-first. Elevated (drop shadow, no border) rather than the
 * V1 bordered grid tile, so the two are distinct at a glance. Same props as
 * `ListingCard`; presentational only; token-pure colors with `withAlpha` tints.
 */
function ListingCardV2({ title, priceCents, currency = 'USD', compareAtCents, imageUrl, condition, subtitle, watched = false, onToggleWatch, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const mediaSize = 104;
    const watchChip = onToggleWatch != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: watched ? `Unwatch ${title}` : `Watch ${title}`, accessibilityState: { selected: watched }, onPress: () => onToggleWatch(!watched), hitSlop: 8, style: {
            width: 30,
            height: 30,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (0, internal_1.withAlpha)(colors.surface, 0.9),
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: watched ? colors.danger : colors.muted }, children: watched ? '♥' : '♡' }) })) : null;
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: mediaSize,
            height: mediaSize,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            backgroundColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, style: { width: '100%', height: '100%' }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No photo" })) }));
    const info = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, justifyContent: 'center' }, children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Loading listing\u2026" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [condition ? (0, jsx_runtime_1.jsx)(ConditionBadge_1.ConditionBadge, { condition: condition, size: "sm" }) : null, subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm, flexShrink: 1 }, children: subtitle })) : null] })] })) }));
    // The trailing price rail — a tinted column that separates money from copy.
    const rail = loading ? null : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            alignSelf: 'stretch',
            paddingLeft: tokens.spacing.md,
            marginLeft: tokens.spacing.xs,
            borderLeftWidth: 1,
            borderLeftColor: (0, internal_1.withAlpha)(colors.primary, 0.16),
            gap: tokens.spacing.sm,
        }, children: [watchChip, (0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: "md" })] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
                transform: [{ scale: press.scale }],
            },
            (0, elevation_1.shadow)('md', tokens),
            style,
        ], children: [media, info, rail] }));
    if (!onPress)
        return body;
    const priceLabel = (0, primitives_1.formatMoney)(priceCents, currency);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}, ${priceLabel}${condition ? `, ${condition}` : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }));
}
//# sourceMappingURL=ListingCardV2.js.map