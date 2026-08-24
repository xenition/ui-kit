"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneCard = SceneCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A tappable scene / preset card — glyph, name, description and a device count.
 * When `active`, the card switches to the `elevated` surface, tints the glyph
 * with `primary`, and shows an "Active" {@link Badge} so the running state is
 * labeled, not color-only. Pressing anywhere fires `onActivate`. `deviceCount`
 * is rendered defensively (only when a positive number). Token-bound throughout.
 */
function SceneCard({ name, icon = '✨', description, deviceCount, active = false, onActivate, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const count = typeof deviceCount === 'number' && deviceCount > 0 ? deviceCount : 0;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: active }, accessibilityLabel: `${name} scene${active ? ', active' : ''}`, onPress: onActivate, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: active ? 'elevated' : 'interactive', style: [active ? { borderColor: colors.primary, borderWidth: 1 } : null, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 40,
                            height: 40,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.surface,
                            borderWidth: 1,
                            borderColor: active ? colors.primary : colors.border,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: active ? 'primary' : 'onSurface', size: "xl" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), active ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: "Active" })) : null] }), description != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }, children: description })) : null, count > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }, children: `${count} ${count === 1 ? 'device' : 'devices'}` })) : null] })] }) }) }));
}
//# sourceMappingURL=SceneCard.js.map