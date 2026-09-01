"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightCardV4 = FlightCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
/**
 * FlightCard — **V4** "journey" design. The boarding-pass take on a bookable
 * flight: an elevated clean card, the origin→destination route drawn as a rail
 * with a small brand-gradient plane disc at its midpoint (the signature V4
 * touch), and the fare sitting below a dashed boarding-pass tear line. Same
 * props/behavior as {@link FlightCardProps}; token-only colors via
 * `useXenitionTheme()`. `loading` shows a placeholder recap; `variant="compact"`
 * tightens the padding.
 */
function FlightCardV4({ airline, flightNumber, from, to, duration, stops = 0, priceCents, currency = 'USD', variant = 'default', onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const compact = variant === 'compact';
    const stopLabel = stops <= 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                padding: compact ? tokens.spacing.md : tokens.spacing.lg,
                gap: compact ? tokens.spacing.sm : tokens.spacing.md,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.1,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: airline }), flightNumber ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: flightNumber })) : null] }), loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: "Loading flight\u2026" })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: from.code }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: from.time })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: duration }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 2, borderRadius: 1, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: {
                                            width: 26,
                                            height: 26,
                                            borderRadius: 13,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginHorizontal: 6,
                                            overflow: 'hidden',
                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale.sm }, children: "\u2708" }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 2, borderRadius: 1, backgroundColor: colors.border } })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: stopLabel })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: to.code }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: to.time })] })] })), typeof priceCents === 'number' && !loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.xs,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: colors.border,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: "Fare from" }), (0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, size: compact ? 'sm' : 'md' })] })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${airline} ${from.code} to ${to.code}, ${duration}, ${stopLabel}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=FlightCardV4.js.map