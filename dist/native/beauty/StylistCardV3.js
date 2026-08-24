"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylistCardV3 = StylistCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
const money_1 = require("../commerce/money");
/**
 * StylistCard — design variant **V3**: a **dense compact row** for lists. A
 * small avatar, a middle column of name · role with an inline star rating +
 * "from" price, and a trailing small **Book** button, all on one hairline-ruled
 * line — no card fill, no shadow. Where V1 is a padded card and V2 a hero tile,
 * V3 is the scannable directory row. Same props as {@link StylistCardProps};
 * specialty chips are omitted by design at this density. `loading` shows a
 * skeleton; `fullyBooked` disables the CTA. Token-only colors.
 */
function StylistCardV3({ name, role, avatarUrl, rating, reviewCount, priceFromCents, currency = 'USD', formatMoney: format = money_1.formatMoney, availability, fullyBooked = false, loading = false, bookLabel = 'Book', onBook, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const rowBase = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading stylist", style: [rowBase, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] })] }));
    }
    const priceText = priceFromCents != null ? `from ${format(priceFromCents, currency)}` : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${name}${role ? `, ${role}` : ''}${rating != null ? `, rated ${rating} out of 5` : ''}${fullyBooked ? ', fully booked' : ''}`, disabled: !onPress, onPress: onPress, style: ({ pressed }) => [rowBase, { opacity: pressed && onPress ? 0.85 : 1 }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [name, role ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontWeight: '400' }, children: [" \u00B7 ", role] }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [rating != null ? (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm" }) : null, rating != null && reviewCount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["(", reviewCount, ")"] })) : null, priceText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: priceText })) : null, availability ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fullyBooked ? colors.warn : colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: availability })) : null] })] }), onBook ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "soft", onPress: onBook, disabled: fullyBooked, children: fullyBooked ? 'Booked' : bookLabel })) : null] }));
}
//# sourceMappingURL=StylistCardV3.js.map