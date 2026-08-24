"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGroup = RoomGroup;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const DeviceToggleRow_1 = require("./DeviceToggleRow");
/**
 * A room grouping card — a header (glyph, name, "N on" summary + an all-devices
 * {@link Switch}) over a list of {@link DeviceToggleRow}s. The header switch is
 * on when **every** reachable device is on and fires `onToggleAll`; the summary
 * count is derived defensively from the `devices` array. When there are no
 * devices it renders the shared {@link EmptyState} instead of an empty list.
 * Token-bound throughout — no literal colors.
 */
function RoomGroup({ name, icon = '🛋️', devices, onDeviceToggle, onToggleAll, emptyTitle = 'No devices in this room', children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = Array.isArray(devices) ? devices : [];
    const reachable = list.filter((d) => !d.offline);
    const onCount = reachable.filter((d) => d.on).length;
    const allOn = reachable.length > 0 && onCount === reachable.length;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: "onSurface", size: "xl" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: list.length === 0
                                    ? 'No devices'
                                    : `${onCount} of ${reachable.length} on${list.length !== reachable.length ? ` · ${list.length - reachable.length} offline` : ''}` })] }), reachable.length > 0 ? ((0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: allOn, onCheckedChange: onToggleAll, accessibilityLabel: `Toggle all devices in ${name}` })) : null] }), list.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDD0C", color: "muted", size: "2xl" }), title: emptyTitle, description: "Add a device to control it from here." }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm }, children: list.map((d, i) => ((0, jsx_runtime_1.jsx)(DeviceToggleRow_1.DeviceToggleRow, { label: d.label, icon: d.icon, subtitle: d.subtitle, checked: !!d.on, offline: !!d.offline, last: i === list.length - 1, onCheckedChange: (next) => onDeviceToggle?.(d.id, next) }, d.id))) })), children != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm }, children: children }) : null] }));
}
//# sourceMappingURL=RoomGroup.js.map