"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomHeader = RoomHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const ambient_1 = require("./internal/ambient");
/**
 * RoomHeader — a room **hero** for the smart-home module. A brand-gradient
 * ground carries an optional frosted glyph disc, a big near-white room name,
 * climate + devices-on frosted tiles, and an all-off / all-on control. When
 * `lightsOn` is set it picks the more useful single control (on → "All off",
 * off → "All on"); otherwise both provided controls render. Every color derives
 * from the compiled brand ramp via `ambient*` + `GradientSurface` — the light
 * ramp steps act as near-white "ink" on the saturated ground — token-only, no
 * literals, light + dark. Presentational: shaped data + callbacks, nothing
 * fetches.
 */
function RoomHeader({ roomName, glyph, temperature, humidity, devicesOn, deviceCount, onAllOff, onAllOn, lightsOn, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, ambient_1.ambientInk)(r);
    const inkSoft = (0, ambient_1.ambientInkSoft)(r);
    const tile = (0, ambient_1.ambientTile)(r);
    const border = (0, ambient_1.ambientBorder)(r);
    const tiles = [];
    if (temperature != null)
        tiles.push({ label: 'Temperature', value: temperature });
    if (humidity != null)
        tiles.push({ label: 'Humidity', value: humidity });
    if (devicesOn != null) {
        tiles.push({
            label: 'Devices on',
            value: deviceCount != null ? `${devicesOn} / ${deviceCount}` : String(devicesOn),
        });
    }
    const showAllOff = onAllOff != null && (lightsOn === undefined || lightsOn === true);
    const showAllOn = onAllOn != null && (lightsOn === undefined || lightsOn === false);
    const Control = ({ label, glyph: g, onPress }) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => ({
            flex: 1,
            minHeight: 44,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: tile,
            borderWidth: 1,
            borderColor: border,
            opacity: pressed ? 0.85 : 1,
        }), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: g, size: "sm", style: { color: ink } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: label })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, ambient_1.ambientGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 48,
                                height: 48,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: tile,
                                borderWidth: 1,
                                borderColor: border,
                            }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xl", style: { color: ink } }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, minWidth: 0, color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5 }, children: roomName })] }), tiles.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }, children: tiles.map((t) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexGrow: 1,
                            minWidth: 104,
                            justifyContent: 'center',
                            borderRadius: tokens.radius.md,
                            backgroundColor: tile,
                            borderWidth: 1,
                            borderColor: border,
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: t.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: t.label })] }, t.label))) })) : null, showAllOff || showAllOn ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }, children: [showAllOff ? (0, jsx_runtime_1.jsx)(Control, { label: "All off", glyph: "\u23FB", onPress: onAllOff }) : null, showAllOn ? (0, jsx_runtime_1.jsx)(Control, { label: "All on", glyph: "\uD83D\uDCA1", onPress: onAllOn }) : null] })) : null] }) }));
}
//# sourceMappingURL=RoomHeader.js.map