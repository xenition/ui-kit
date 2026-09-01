"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceTileV4 = DeviceTileV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATE_META = {
    on: { accent: 'success', label: 'On', tone: 'success' },
    off: { accent: 'muted', label: 'Off', tone: 'neutral' },
    unavailable: { accent: 'danger', label: 'Offline', tone: 'danger' },
};
/**
 * DeviceTile — **V4** "ambient" design. The control-panel take on a device tile:
 * an **active device glows** — when `on`, the tile takes a soft accent-tinted
 * wash, an accent border, and a glowing icon disc; `off`/`unavailable` stay calm.
 * A soft status pill + the on/off {@link Switch} keep the meaning readable
 * (status never by color alone). Same props/behavior as {@link DeviceTileProps};
 * token-only colors via `useXenitionTheme()`. `loading` shows a skeleton.
 */
function DeviceTileV4({ name, icon = '🔌', state = 'off', subtitle, onToggle, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATE_META[state];
    const isOn = state === 'on';
    const disabled = state === 'unavailable';
    const accent = colors[meta.accent];
    const shell = {
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        padding: tokens.spacing.md,
        backgroundColor: isOn ? (0, color_1.withAlpha)(accent, 0.08) : colors.card,
        borderColor: isOn ? (0, color_1.withAlpha)(accent, 0.5) : colors.border,
        ...(isOn
            ? { shadowColor: accent, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
            : {}),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, padding: tokens.spacing.md, gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 44, height: 44, borderRadius: tokens.radius.md, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1) } })] }));
    }
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [shell, { opacity: disabled ? 0.7 : 1 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isOn ? (0, color_1.withAlpha)(accent, 0.16) : (0, color_1.withAlpha)(colors.onSurface, 0.05),
                            borderWidth: 1,
                            borderColor: isOn ? (0, color_1.withAlpha)(accent, 0.4) : colors.border,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: isOn ? meta.accent : 'muted', size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), subtitle != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subtitle })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: isOn, disabled: disabled, onCheckedChange: onToggle, accessibilityLabel: `${name} power` })] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${meta.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=DeviceTileV4.js.map