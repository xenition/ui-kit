"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeterReading = MeterReading;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const SOURCE_LABEL = {
    estimated: 'Estimated',
    actual: 'Actual read',
    customer: 'Self-reported',
};
/**
 * A meter reading entry: previous and current dial values with the derived
 * consumption between them. Consumption is `current − previous`, guarded to
 * never render negative (a rollover / correction clamps to 0) and always printed
 * via `formatUsage` (fixed decimals, no `NaN` leak). A "source" tag distinguishes
 * an estimated read from an actual one. Every color traces to a token.
 */
function MeterReading({ kind, previous, current, unit, decimals = 0, date, source, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    const prev = Number.isFinite(previous) ? previous : 0;
    const curr = Number.isFinite(current) ? current : 0;
    const consumption = Math.max(0, curr - prev);
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "lg", accessibilityLabel: `${kd.label} meter` }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: [kd.label, " meter"] }), date != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [date, source != null ? ` · ${SOURCE_LABEL[source]}` : ''] })) : source != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: SOURCE_LABEL[source] })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Previous" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: (0, format_1.formatUsage)(prev, u, decimals) })] }), (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\u2192", accessibilityLabel: "to", color: "muted" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Current" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: (0, format_1.formatUsage)(curr, u, decimals) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Used" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: (0, format_1.formatUsage)(consumption, u, decimals) })] })] })] }));
}
//# sourceMappingURL=MeterReading.js.map