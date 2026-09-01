"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StylistCardV4 = StylistCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * **V4 stylist card** — same props as {@link StylistCard} plus
 * `fullyBookedLabel`, `fromLabel`, `formatReviewCount` and `maxSpecialties`.
 *
 * ## Five changes
 *
 * 1. **The rating carries its number and its count.** A stylist list is
 *    exactly where a client compares 4.9 against 4.6, and the base drew five
 *    glyphs at `sm` and left the count as loose muted text.
 * 2. **Fully booked disables the CTA.** The base showed the chip and left
 *    "Book" live, so a client could tap through to a stylist with no slots.
 * 3. **The specialty chips are capped and wrap.** Seven specialties pushed the
 *    price off the row; §7 says chips wrap and are never clipped.
 * 4. **The from-price is tabular** with its prefix as a separate muted
 *    element, so a column of stylists lines up.
 * 5. **The skeleton is opaque** and press is a state layer.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function StylistCardV4({ name, role, specialties = [], avatarUrl, rating, reviewCount, priceFromCents, currency = 'USD', formatMoney = money_1.formatMoney, availability, fullyBooked = false, variant = 'detailed', loading = false, bookLabel = 'Book', fullyBookedLabel = 'Fully booked', fromLabel = 'from', formatReviewCount, maxSpecialties = 3, onBook, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ flexDirection: 'row', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: tokens.spacing['2xl'],
                        height: tokens.spacing['2xl'],
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, salon_v4_1.skeletonFill)(theme),
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                height: tokens.typography.scale.base,
                                width: '55%',
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, salon_v4_1.skeletonFill)(theme),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                height: tokens.typography.scale.sm,
                                width: '75%',
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, salon_v4_1.skeletonFill)(theme),
                            } })] })] }));
    }
    if (!name)
        return null;
    const compact = variant === 'compact';
    const chips = specialties.filter(Boolean).slice(0, Math.max(0, maxSpecialties));
    const price = typeof priceFromCents === 'number' && Number.isFinite(priceFromCents)
        ? formatMoney(priceFromCents, currency)
        : null;
    const reviews = typeof reviewCount === 'number'
        ? (formatReviewCount ?? ((n) => `${n.toLocaleString()} reviews`))(reviewCount)
        : null;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: compact ? 'sm' : 'md' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), role ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: role })) : null, typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm", showValue: true }), reviews ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: reviews })) : null] })) : null] }), fullyBooked ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "soft", size: "sm", children: fullyBookedLabel })) : availability ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "success", variant: "soft", size: "sm", children: availability })) : null] }), !compact && chips.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: tokens.spacing.xs,
                    marginTop: tokens.spacing.sm,
                }, children: chips.map((s) => ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "outline", size: "sm", children: s }, s))) })) : null, price || onBook ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                    marginTop: tokens.spacing.md,
                }, children: [price ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: fromLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: price })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })), onBook ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "sm", 
                        // Fully booked DISABLES the CTA. The base showed the chip and
                        // left the button live.
                        disabled: fullyBooked, onPress: onBook, accessibilityLabel: `${bookLabel}, ${name}`, children: bookLabel })) : null] })) : null] }));
    if (!onPress)
        return (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, salon_v4_1.metaLine)([
            name,
            role,
            typeof rating === 'number' ? `rated ${rating}` : null,
            reviews,
            fullyBooked ? fullyBookedLabel : availability,
        ]), onPress: onPress, style: ({ pressed }) => ({
            borderRadius: tokens.radius.lg,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body }) }));
}
//# sourceMappingURL=StylistCardV4.js.map