"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripHeader = TripHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
/**
 * TripHeader — a **V4** "journey" hero. The trip cover for an itinerary screen: a
 * saturated brand-gradient ground carrying the origin→destination route drawn as
 * a rail with a small brand-gradient plane disc at its midpoint (the signature
 * FlightCardV4 motif) in near-white ink, an optional subtitle, then the dates /
 * travelers / nights as frosted glass tiles and an optional manage CTA (a
 * near-white pill). Token-only colors via `useXenitionTheme()` and the `journey*`
 * helpers; dark-mode safe.
 */
function TripHeader({ origin, destination, startDate, endDate, travelers, nights, subtitle, manageLabel = 'Manage trip', onManage, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, journey_1.journeyInk)(r);
    const inkSoft = (0, journey_1.journeyInkSoft)(r);
    const dateRange = endDate ? `${startDate} – ${endDate}` : startDate;
    const Endpoint = ({ place, align }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: align, minWidth: 0, flexShrink: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: place.city }), place.code ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600', letterSpacing: 1 }, children: place.code })) : null] }));
    const Tile = ({ label, value }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            gap: 2,
            minWidth: 72,
            flexGrow: 1,
            flexBasis: 0,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: (0, journey_1.journeyBorder)(r),
            backgroundColor: (0, journey_1.journeyTile)(r),
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: value })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: `Trip from ${origin.city} to ${destination.city}, ${dateRange}`, style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyGradient)(r), style: { borderRadius: tokens.radius.lg, overflow: 'hidden', padding: tokens.spacing.lg, gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(Endpoint, { place: origin, align: "flex-start" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 2, borderRadius: 1, backgroundColor: (0, journey_1.journeyBorder)(r, 0.4) } }), (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: {
                                                width: 26,
                                                height: 26,
                                                borderRadius: 13,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginHorizontal: 6,
                                                overflow: 'hidden',
                                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm }, children: "\u2708" }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 2, borderRadius: 1, backgroundColor: (0, journey_1.journeyBorder)(r, 0.4) } })] }), (0, jsx_runtime_1.jsx)(Endpoint, { place: destination, align: "flex-end" })] }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Tile, { label: "Dates", value: dateRange }), typeof travelers === 'number' ? ((0, jsx_runtime_1.jsx)(Tile, { label: "Travelers", value: `${travelers} ${travelers === 1 ? 'traveler' : 'travelers'}` })) : null, typeof nights === 'number' ? ((0, jsx_runtime_1.jsx)(Tile, { label: "Nights", value: `${nights} ${nights === 1 ? 'night' : 'nights'}` })) : null] }), onManage ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: manageLabel, onPress: onManage, style: ({ pressed }) => ({
                        paddingVertical: tokens.spacing.md,
                        borderRadius: tokens.radius.md,
                        alignItems: 'center',
                        backgroundColor: ink,
                        opacity: pressed ? 0.9 : 1,
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: manageLabel }) })) : null] }) }));
}
//# sourceMappingURL=TripHeader.js.map