"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylistCardV2 = StylistCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const primitives_1 = require("../primitives");
const money_1 = require("../commerce/money");
/**
 * StylistCard — design variant **V2**: a **centered profile card**. Where V1 is
 * an avatar-left row, V2 stacks a large ringed avatar, the name + role, the star
 * rating, centered specialty chips, an availability line, and a full-width
 * **Book** CTA down a single centered column — a hero "meet your stylist" tile.
 * Same props as {@link StylistCardProps}. `variant="compact"` still trims chips +
 * CTA; `loading` shows a token skeleton; `fullyBooked` disables the CTA. Elevated
 * (shadow, no border). Token-only colors.
 */
function StylistCardV2({ name, role, specialties, avatarUrl, rating, reviewCount, priceFromCents, currency = 'USD', formatMoney: format = money_1.formatMoney, availability, fullyBooked = false, variant = 'detailed', loading = false, bookLabel = 'Book', onBook, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const tags = specialties ?? [];
    const base = {
        backgroundColor: colors.surface,
        borderRadius: tokens.radius.lg,
        borderWidth: 0,
        padding: tokens.spacing.lg,
        alignItems: 'center',
        gap: tokens.spacing.md,
        ...(0, elevation_1.shadow)('md', tokens),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading stylist", style: [base, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 72, height: 72, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] }));
    }
    const compact = variant === 'compact';
    const priceText = priceFromCents != null ? `from ${format(priceFromCents, currency)}` : undefined;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${name}${role ? `, ${role}` : ''}${rating != null ? `, rated ${rating} out of 5` : ''}${fullyBooked ? ', fully booked' : ''}`, style: [base, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "xl", ring: true }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), role ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: role })) : null] }), rating != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "md" }), reviewCount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["(", reviewCount, ")"] })) : null] })) : null, !compact && tags.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: tokens.spacing.xs }, children: tags.map((tag, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            borderRadius: tokens.radius.full,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: tag }) }, `${tag}-${i}`))) })) : null, priceText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: priceText })) : null, availability ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fullyBooked ? colors.warn : colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: availability })) : null, !compact && onBook ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onBook, disabled: fullyBooked, style: { alignSelf: 'stretch' }, children: fullyBooked ? 'Fully booked' : bookLabel })) : null] }) }));
}
//# sourceMappingURL=StylistCardV2.js.map