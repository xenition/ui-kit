"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationCardV4 = DestinationCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
/**
 * DestinationCard — **V4** "journey" design. The boarding-pass take on a
 * destination tile: a decorative accent→primary "horizon" gradient cover carries
 * the destination name in near-white ink (the signature V4 touch), with the
 * "from" price sitting in a frosted glass tile overlaid on the gradient. The
 * overlaid glyph/emoji and optional badge ribbon are preserved, and the
 * country/tagline sit on the calm surface below. Same props/behavior as
 * {@link DestinationCardProps}; token-only colors via `useXenitionTheme()`.
 * `variant="wide"` fills the container width.
 */
function DestinationCardV4({ name, country, tagline, glyph = '🌍', fromCents, currency = 'USD', badge, variant = 'default', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const wide = variant === 'wide';
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                width: wide ? '100%' : 220,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.1,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyHorizon)(r), style: {
                    height: wide ? 132 : 148,
                    padding: tokens.spacing.md,
                    justifyContent: 'flex-end',
                    overflow: 'hidden',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.md, fontSize: tokens.typography.scale['3xl'] }, children: glyph }), badge ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: badge }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: name }), typeof fromCents === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            marginTop: tokens.spacing.sm,
                            alignSelf: 'flex-start',
                            flexDirection: 'row',
                            alignItems: 'baseline',
                            gap: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, journey_1.journeyTile)(r),
                            borderWidth: 1,
                            borderColor: (0, journey_1.journeyBorder)(r),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInkSoft)(r), fontSize: tokens.typography.scale.xs }, children: "from" }), (0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: fromCents, currency: currency, size: "sm" })] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.xs }, children: [country ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: country })) : null, tagline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: tagline })) : null] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${country ? `, ${country}` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=DestinationCardV4.js.map