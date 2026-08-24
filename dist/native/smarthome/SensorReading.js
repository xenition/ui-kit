"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorReading = SensorReading;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATUS_META = {
    normal: { color: 'onSurface', label: 'Normal', tone: 'success' },
    warn: { color: 'warn', label: 'Elevated', tone: 'warn' },
    danger: { color: 'danger', label: 'Alert', tone: 'danger' },
    offline: { color: 'muted', label: 'Offline', tone: 'neutral' },
};
/**
 * A single sensor reading — glyph, label, a large value+unit, and a status
 * {@link Badge}. `status` colors the value (`warn`→warn, `danger`→danger,
 * else onSurface/muted) but is always paired with a text chip so an at-risk
 * reading is legible without color. When `offline` the value renders as an em
 * dash. Optional `trend` line sits underneath. Token-bound throughout.
 */
function SensorReading({ label, value, unit, icon = '📈', status = 'normal', trend, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const shownValue = status === 'offline' || value == null ? '—' : String(value);
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: "muted", size: "base" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[meta.color], fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: shownValue }), unit != null && shownValue !== '—' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: unit })) : null] }), trend != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }, children: trend })) : null] }));
}
//# sourceMappingURL=SensorReading.js.map