"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelCardV4 = HotelCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
/**
 * HotelCard — **V4** "journey" design. The boarding-pass take on a hotel result:
 * an elevated clean card with a small brand-gradient disc behind the leading
 * hotel glyph (the signature V4 touch), the property name/location, guest star
 * rating, amenity chips, and the nightly fare sitting below a dashed
 * boarding-pass tear line. Same props/behavior as {@link HotelCardProps};
 * token-only colors via `useXenitionTheme()`. `variant="row"` keeps the layout
 * compact.
 */
function HotelCardV4({ name, location, rating, reviewCount, priceCents, currency = 'USD', tags = [], compareAtCents, variant = 'stacked', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.1,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: {
                            width: 48,
                            height: 48,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale['2xl'] }, children: "\uD83C\uDFE8" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), location ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: location })) : null] }), typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm" }), typeof reviewCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: ["(", reviewCount, ")"] })) : null] })) : null] }), tags.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: tags.map((t, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: t }, `${t}-${i}`))) })) : null, typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: colors.border,
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: "Nightly from" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, compareAtCents: compareAtCents, size: "md" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: "/ night" })] })] })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${location ? `, ${location}` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=HotelCardV4.js.map