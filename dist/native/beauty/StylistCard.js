"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylistCard = StylistCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
const money_1 = require("../commerce/money");
/**
 * A stylist / practitioner profile card: avatar, name + role, an optional star
 * rating with review count, specialty chips, a "from" price and availability
 * line, plus a "Book" CTA. `variant="compact"` drops the chips and CTA for
 * list rows; `loading` shows a token-tinted skeleton; `fullyBooked` disables
 * the CTA and swaps its label. Token-only colors — chips use `withAlpha` tints.
 */
function StylistCard({ name, role, specialties, avatarUrl, rating, reviewCount, priceFromCents, currency = 'USD', formatMoney: format = money_1.formatMoney, availability, fullyBooked = false, variant = 'detailed', loading = false, bookLabel = 'Book', onBook, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const tags = specialties ?? [];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", accessibilityLabel: "Loading stylist", style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.md,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 48, height: 48, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '75%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] })] }));
    }
    const compact = variant === 'compact';
    const priceText = priceFromCents != null ? `from ${format(priceFromCents, currency)}` : undefined;
    const a11yLabel = `${name}${role ? `, ${role}` : ''}${rating != null ? `, rated ${rating} out of 5` : ''}${fullyBooked ? ', fully booked' : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: a11yLabel, disabled: !onPress, onPress: onPress, style: ({ pressed }) => [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                gap: tokens.spacing.md,
                opacity: pressed && onPress ? 0.92 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), role ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: role })) : null, rating != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm" }), reviewCount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["(", reviewCount, ")"] })) : null] })) : null] }), priceText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: priceText })) : null] }), !compact && tags.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: tags.map((tag, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        borderRadius: tokens.radius.full,
                        paddingHorizontal: tokens.spacing.sm,
                        paddingVertical: 2,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: tag }) }, `${tag}-${i}`))) })) : null, availability ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fullyBooked ? colors.warn : colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: availability })) : null, !compact && onBook ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onBook, disabled: fullyBooked, children: fullyBooked ? 'Fully booked' : bookLabel })) : null] }));
}
//# sourceMappingURL=StylistCard.js.map