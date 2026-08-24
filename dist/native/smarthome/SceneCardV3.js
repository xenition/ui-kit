"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneCardV3 = SceneCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * SceneCard — alternate design **V3**: a compact pill/chip row. A small leading
 * glyph, the scene name, and a device count sit inline in a rounded-full
 * chip; the active state fills the chip with a primary tint, swaps to a filled
 * glyph, and appends a "✓ Active" text marker (not color-alone). Drop-in
 * replacement for `SceneCard` — same props — for horizontally scrolling scene
 * strips. `deviceCount` renders only when positive.
 */
function SceneCardV3({ name, icon = '✨', deviceCount, active = false, onActivate, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const count = typeof deviceCount === 'number' && deviceCount > 0 ? deviceCount : 0;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: active }, accessibilityLabel: `${name} scene${active ? ', active' : ''}`, onPress: onActivate, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1, alignSelf: 'flex-start' }), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    backgroundColor: active ? (0, color_1.withAlpha)(colors.primary, 0.12) : colors.surface,
                    borderWidth: 1,
                    borderColor: active ? colors.primary : colors.border,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: active ? 'primary' : 'onSurface', size: "base" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                        color: active ? colors.primaryText : colors.onSurface,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: '600',
                    }, children: name }), count > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `· ${count}` })) : null, active ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713 Active" })) : null] }) }));
}
//# sourceMappingURL=SceneCardV3.js.map