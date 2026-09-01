"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightStatusBanner = FlightStatusBanner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
const STATUS = {
    'on-time': { label: 'On time', glyph: '✓', tone: 'success' },
    boarding: { label: 'Boarding', glyph: '🛫', tone: 'primary', peak: true },
    delayed: { label: 'Delayed', glyph: '⏳', tone: 'warn' },
    cancelled: { label: 'Cancelled', glyph: '⛔', tone: 'danger' },
    landed: { label: 'Landed', glyph: '🛬', tone: 'success' },
};
/**
 * FlightStatusBanner — a **V4** "journey" status strip. Announces where a flight
 * is in its lifecycle: on-time / landed read as a success tint, delayed as warn,
 * cancelled as danger, and boarding rides the brand gradient (the boarding "peak"
 * moment) in near-white ink. Severity is always carried by **glyph + label + a
 * tint that traces to a semantic token slot**, never color alone; the state is
 * pilled with a `Badge`. Gate / seat / boarding surface as small fields.
 * Token-only colors via `useXenitionTheme()`; dark-mode safe.
 */
function FlightStatusBanner({ status, flightNumber, gate, seat, boardingTime, remark, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const meta = STATUS[status];
    const peak = meta.peak === true;
    const tint = colors[meta.tone];
    const fields = [
        gate ? { label: 'Gate', value: gate } : null,
        seat ? { label: 'Seat', value: seat } : null,
        boardingTime ? { label: 'Boarding', value: boardingTime } : null,
    ].filter((f) => f != null);
    const Field = ({ label, value }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            gap: 2,
            minWidth: 64,
            flexGrow: 1,
            flexBasis: 0,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: peak ? (0, journey_1.journeyBorder)(r) : colors.border,
            backgroundColor: peak ? (0, journey_1.journeyTile)(r) : colors.surface,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: peak ? (0, journey_1.journeyInkSoft)(r) : colors.muted, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: peak ? (0, journey_1.journeyInk)(r) : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: value })] }));
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: peak ? (0, journey_1.journeyInk)(r) : colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: peak ? (0, journey_1.journeyInkSoft)(r) : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: flightNumber }), remark != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginTop: 2, color: peak ? (0, journey_1.journeyInkSoft)(r) : colors.onSurface, fontSize: tokens.typography.scale.sm }, children: remark })) : null] })] }), peak ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, journey_1.journeyTile)(r),
                    borderWidth: 1,
                    borderColor: (0, journey_1.journeyBorder)(r),
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, journey_1.journeyInk)(r), fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: meta.label }) })) : ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", dot: true, children: meta.label }))] }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [header, fields.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: fields.map((f) => ((0, jsx_runtime_1.jsx)(Field, { label: f.label, value: f.value }, f.label))) })) : null] }));
    if (peak) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Flight ${flightNumber} ${meta.label}${remark != null ? `, ${remark}` : ''}`, style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyGradient)(r), style: { borderRadius: tokens.radius.lg, overflow: 'hidden', padding: tokens.spacing.lg, gap: tokens.spacing.md }, children: inner }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Flight ${flightNumber} ${meta.label}${remark != null ? `, ${remark}` : ''}`, style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: (0, color_1.withAlpha)(tint, 0.4),
                backgroundColor: (0, color_1.withAlpha)(tint, 0.1),
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: inner }));
}
//# sourceMappingURL=FlightStatusBanner.js.map