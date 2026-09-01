"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGroupV4 = RoomGroupV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const DeviceToggleRow_1 = require("./DeviceToggleRow");
/**
 * RoomGroup — **V4** "ambient" design. The control-panel take on a room card:
 * when **any** device is on, the whole card takes a soft `primary`-tinted wash,
 * a primary border, and a glowing icon disc so an active room reads at a glance.
 * A **bold numeral** summarizes how many devices are on, and a group all-on/off
 * {@link Switch} keeps parity with the base header. Idle rooms stay calm and
 * muted; status is carried by icon + a text summary (never color alone). Same
 * props/behavior as {@link RoomGroupProps}; token-only colors via `useXenitionTheme()`.
 */
function RoomGroupV4({ name, icon = '🛋️', devices, onDeviceToggle, onToggleAll, emptyTitle = 'No devices in this room', children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = Array.isArray(devices) ? devices : [];
    const reachable = list.filter((d) => !d.offline);
    const onCount = reachable.filter((d) => d.on).length;
    const allOn = reachable.length > 0 && onCount === reachable.length;
    const anyOn = onCount > 0;
    const offlineCount = list.length - reachable.length;
    const accent = anyOn ? 'primary' : 'muted';
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: [
            {
                backgroundColor: anyOn ? (0, color_1.withAlpha)(colors.primary, 0.08) : colors.card,
                borderColor: anyOn ? (0, color_1.withAlpha)(colors.primary, 0.5) : colors.border,
                ...(anyOn
                    ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
                    : {}),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: anyOn ? (0, color_1.withAlpha)(colors.primary, 0.16) : (0, color_1.withAlpha)(colors.onSurface, 0.05),
                            borderWidth: 1,
                            borderColor: anyOn ? (0, color_1.withAlpha)(colors.primary, 0.4) : colors.border,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: accent, size: "xl" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: name }), list.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No devices" })) : ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontWeight: '700' }, children: onCount }), ` of ${reachable.length} on${offlineCount > 0 ? ` · ${offlineCount} offline` : ''}`] }))] }), reachable.length > 0 ? ((0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: allOn, onCheckedChange: onToggleAll, accessibilityLabel: `Toggle all devices in ${name}` })) : null] }), list.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDD0C", color: "muted", size: "2xl" }), title: emptyTitle, description: "Add a device to control it from here." }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm }, children: list.map((d, i) => ((0, jsx_runtime_1.jsx)(DeviceToggleRow_1.DeviceToggleRow, { label: d.label, icon: d.icon, subtitle: d.subtitle, checked: !!d.on, offline: !!d.offline, last: i === list.length - 1, onCheckedChange: (next) => onDeviceToggle?.(d.id, next) }, d.id))) })), children != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm }, children: children }) : null] }));
}
//# sourceMappingURL=RoomGroupV4.js.map