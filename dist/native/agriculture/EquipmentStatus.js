"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentStatus = EquipmentStatus;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATE_META = {
    operational: { label: 'Operational', tone: 'success', color: 'success' },
    idle: { label: 'Idle', tone: 'neutral', color: 'muted' },
    maintenance: { label: 'Maintenance', tone: 'warn', color: 'warn' },
    offline: { label: 'Offline', tone: 'danger', color: 'danger' },
};
/**
 * An equipment status card — machine glyph, name + type, and an operational
 * {@link Badge} whose text label (not color alone) carries the state. An
 * optional fuel/battery {@link Progress} bar and usage-hours line sit below.
 * The level is clamped to [0,100]. Tappable via `onPress` (accessible button).
 * Token-bound throughout — no literal colors.
 */
function EquipmentStatus({ name, type, icon = '🚜', state = 'operational', fuelPct, fuelLabel = 'Fuel', hours, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATE_META[state];
    const pct = typeof fuelPct === 'number' ? Math.max(0, Math.min(100, fuelPct)) : undefined;
    const lowFuel = pct != null && pct < 20;
    const Body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: onPress ? 'interactive' : 'outlined', style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "xl", color: meta.color }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: name }), type != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: type })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] }), pct != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: fuelLabel }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: lowFuel ? colors.danger : colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [pct, "%", lowFuel ? ' · Low' : ''] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: lowFuel ? 'danger' : 'primary' })] })) : null, hours != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.sm }, children: ["\u23F1\uFE0F ", hours] })) : null] }));
    if (!onPress)
        return Body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${meta.label}`, onPress: onPress, style: ({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }], children: Body }));
}
//# sourceMappingURL=EquipmentStatus.js.map