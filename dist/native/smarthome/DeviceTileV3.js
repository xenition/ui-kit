"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceTileV3 = DeviceTileV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATE_META = {
    on: { accent: 'success', label: 'On', glyph: '●' },
    off: { accent: 'muted', label: 'Off', glyph: '○' },
    unavailable: { accent: 'danger', label: 'Offline', glyph: '⊘' },
};
/**
 * DeviceTile — alternate design **V3**: a compact single-line list row. A small
 * tinted glyph leads, the name + subtitle stack in the middle, and a status
 * glyph+text pair (never color-alone) precedes an inline {@link Switch}. Drop-in
 * replacement for `DeviceTile` — same props — meant for dense device lists.
 */
function DeviceTileV3({ name, icon = '🔌', state = 'off', subtitle, onToggle, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATE_META[state];
    const isOn = state === 'on';
    const disabled = state === 'unavailable';
    const rowBase = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [rowBase, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 28, height: 28, borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 12, borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }));
    }
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [rowBase, { opacity: disabled ? 0.65 : 1 }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 30,
                    height: 30,
                    borderRadius: tokens.radius.sm,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isOn ? (0, color_1.withAlpha)(colors[meta.accent], 0.12) : (0, color_1.withAlpha)(colors.muted, 0.06),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: isOn ? meta.accent : 'muted', size: "base" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), subtitle != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subtitle })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, color: meta.accent, size: "xs" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: meta.label })] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: isOn, disabled: disabled, onCheckedChange: onToggle, accessibilityLabel: `${name} power` })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${meta.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=DeviceTileV3.js.map