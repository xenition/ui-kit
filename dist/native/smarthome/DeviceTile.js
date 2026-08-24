"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceTile = DeviceTile;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/** Per-state presentation: accent color slot + a text label so state never relies on color alone. */
const STATE_META = {
    on: { accent: 'success', label: 'On', tone: 'success' },
    off: { accent: 'muted', label: 'Off', tone: 'neutral' },
    unavailable: { accent: 'danger', label: 'Offline', tone: 'danger' },
};
/**
 * A single controllable device tile — a tinted glyph, name + status, and an
 * on/off {@link Switch}. `state` drives the accent slot and a text status label
 * (`on`→success, `off`→muted, `unavailable`→danger) so device status is never
 * conveyed by color alone; `unavailable` disables the switch. Optional `onPress`
 * makes the body open a detail view while the switch stays independently
 * tappable. Token-bound throughout — no literal colors.
 */
function DeviceTile({ name, icon = '🔌', state = 'off', subtitle, onToggle, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATE_META[state];
    const isOn = state === 'on';
    const disabled = state === 'unavailable';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.md,
                            backgroundColor: colors.border,
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }) }));
    }
    const body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: isOn ? 'elevated' : 'outlined', style: [{ opacity: disabled ? 0.7 : 1 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.surface,
                            borderWidth: 1,
                            borderColor: colors[meta.accent],
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: isOn ? meta.accent : 'muted', size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), subtitle != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subtitle })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: isOn, disabled: disabled, onCheckedChange: onToggle, accessibilityLabel: `${name} power` })] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${meta.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=DeviceTile.js.map