"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceTileV2 = DeviceTileV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const STATE_META = {
    on: { accent: 'success', label: 'On', tone: 'success' },
    off: { accent: 'muted', label: 'Off', tone: 'neutral' },
    unavailable: { accent: 'danger', label: 'Offline', tone: 'danger' },
};
/**
 * DeviceTile — alternate design **V2**: a big square glass-panel tile. A large
 * centered glyph sits inside a soft on/off glow (a tinted, radiused halo that
 * only lights when the device is `on`), the name + a status {@link Badge} label
 * the state without relying on color alone, and a full-width {@link Switch}
 * anchors the bottom. Drop-in replacement for `DeviceTile` — same props. The
 * glow tint is derived from the accent token via `withAlpha` (never a literal),
 * and `unavailable` dims the panel and disables the toggle.
 */
function DeviceTileV2({ name, icon = '🔌', state = 'off', subtitle, onToggle, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATE_META[state];
    const isOn = state === 'on';
    const disabled = state === 'unavailable';
    const panelBase = {
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        aspectRatio: 1,
        minHeight: 140,
        justifyContent: 'space-between',
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: isOn ? (0, color_1.withAlpha)(colors[meta.accent], 0.4) : colors.border,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [panelBase, { justifyContent: 'center', alignItems: 'center' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 56,
                        height: 56,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.border,
                    } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }));
    }
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [panelBase, isOn ? (0, elevation_1.shadow)('md', tokens) : null, { opacity: disabled ? 0.65 : 1 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: isOn, disabled: disabled, onCheckedChange: onToggle, accessibilityLabel: `${name} power` })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', justifyContent: 'center', flex: 1 }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 68,
                        height: 68,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isOn ? (0, color_1.withAlpha)(colors[meta.accent], 0.18) : (0, color_1.withAlpha)(colors.muted, 0.08),
                        borderWidth: 1,
                        borderColor: isOn ? (0, color_1.withAlpha)(colors[meta.accent], 0.35) : colors.border,
                    }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: isOn ? meta.accent : 'muted', size: 34 }) }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), subtitle != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subtitle })) : null] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${meta.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=DeviceTileV2.js.map