"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardingPass = BoardingPass;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A mobile boarding pass — passenger, the from→to route, flight, and a grid of
 * gate/seat/zone/boarding fields, capped by a token-styled barcode placeholder
 * (no barcode dependency; the `barcode` string is shown beneath it). Token-only
 * colors.
 */
function BoardingPass({ passenger, from, to, flight, gate, seat, zone, boardingTime, extraFields = [], barcode, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const fields = [
        gate ? { label: 'Gate', value: gate } : null,
        seat ? { label: 'Seat', value: seat } : null,
        zone ? { label: 'Zone', value: zone } : null,
        boardingTime ? { label: 'Boarding', value: boardingTime } : null,
        ...extraFields,
    ].filter((f) => f != null);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `Boarding pass for ${passenger}, ${from} to ${to}, flight ${flight}`, style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { backgroundColor: colors.primary, padding: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "BOARDING PASS" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: from }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.lg }, children: "\u2708" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: to })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Passenger" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: passenger })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Flight" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: flight })] })] }), fields.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }, children: fields.map((f, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, minWidth: 64 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: f.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: f.value })] }, `${f.label}-${i}`))) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', gap: 2, height: 44, alignItems: 'stretch' }, children: Array.from({ length: 32 }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                flex: i % 3 === 0 ? 2 : 1,
                                backgroundColor: i % 2 === 0 ? colors.onSurface : colors.surface,
                            } }, i))) }), barcode ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.xs, letterSpacing: 2 }, children: barcode })) : null] })] }));
}
//# sourceMappingURL=BoardingPass.js.map