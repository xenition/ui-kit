"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardingPassV4 = BoardingPassV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
/**
 * BoardingPass — **V4** "journey" design. The signature of the boarding-pass
 * line: a saturated brand-gradient header band carrying the airline/flight and
 * the from→gradient-plane-disc→to route in near-white ink (the FlightCardV4 rail
 * motif), the gate/seat/zone/boarding fields as frosted glass tiles, then a
 * dashed perforated tear line — notched at both edges — dividing the header from
 * a stub bearing a token-drawn barcode and the passenger name / confirmation
 * code. Same props/behavior as {@link BoardingPassProps}; token-only colors via
 * `useXenitionTheme()` and the `journey*` helpers; dark-mode safe.
 */
function BoardingPassV4({ passenger, from, to, flight, gate, seat, zone, boardingTime, extraFields = [], barcode, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const fields = [
        gate ? { label: 'Gate', value: gate } : null,
        seat ? { label: 'Seat', value: seat } : null,
        zone ? { label: 'Zone', value: zone } : null,
        boardingTime ? { label: 'Boarding', value: boardingTime } : null,
        ...extraFields,
    ].filter((f) => f != null);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `Boarding pass for ${passenger}, ${from} to ${to}, flight ${flight}`, style: [
            {
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                shadowColor: colors.onSurface,
                shadowOpacity: 0.1,
                shadowRadius: 14,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyGradient)(r), style: { padding: tokens.spacing.lg, gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInkSoft)(r), fontSize: tokens.typography.scale.xs, fontWeight: '600', letterSpacing: 2 }, children: "BOARDING PASS" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: flight })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: from }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 2, borderRadius: 1, backgroundColor: (0, journey_1.journeyBorder)(r, 0.4) } }), (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: {
                                            width: 26,
                                            height: 26,
                                            borderRadius: 13,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginHorizontal: 6,
                                            overflow: 'hidden',
                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale.sm }, children: "\u2708" }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 2, borderRadius: 1, backgroundColor: (0, journey_1.journeyBorder)(r, 0.4) } })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: to })] }), fields.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: fields.map((f, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                gap: 2,
                                minWidth: 64,
                                flexGrow: 1,
                                flexBasis: 0,
                                borderRadius: tokens.radius.md,
                                borderWidth: 1,
                                borderColor: (0, journey_1.journeyBorder)(r),
                                backgroundColor: (0, journey_1.journeyTile)(r),
                                paddingHorizontal: tokens.spacing.sm,
                                paddingVertical: tokens.spacing.xs,
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInkSoft)(r), fontSize: tokens.typography.scale.xs }, children: f.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: f.value })] }, `${f.label}-${i}`))) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { borderTopWidth: 1, borderStyle: 'dashed', borderColor: colors.border }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: -6,
                            top: -6,
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: colors.card,
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            right: -6,
                            top: -6,
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: colors.card,
                        } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Passenger" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: passenger })] }), barcode ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Confirmation" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', letterSpacing: 2 }, children: barcode })] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', gap: 2, height: 44, alignItems: 'stretch' }, children: Array.from({ length: 40 }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                flex: i % 3 === 0 ? 2 : 1,
                                backgroundColor: i % 2 === 0 ? colors.onSurface : colors.border,
                            } }, i))) })] })] }));
}
//# sourceMappingURL=BoardingPassV4.js.map