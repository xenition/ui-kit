"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneCardV4 = SceneCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * SceneCard — **V4** "ambient" design. A calm scene tile: a glyph sits in a tinted
 * disc, with the scene name, an optional description, and a device count. When
 * `active`, the whole card glows — a soft primary-tinted wash
 * (`withAlpha(primary, 0.08)`), a primary border, and a glowing glyph disc — plus
 * an "Active" {@link Badge} so the running state is labeled, not color-only.
 * Pressing anywhere fires `onActivate`. `deviceCount` renders defensively (only
 * when a positive number). Same props/behavior as {@link SceneCardProps};
 * token-only colors via `useXenitionTheme()` (+ `withAlpha`).
 */
function SceneCardV4({ name, icon = '✨', description, deviceCount, active = false, onActivate, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const count = typeof deviceCount === 'number' && deviceCount > 0 ? deviceCount : 0;
    const shell = {
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        padding: tokens.spacing.lg,
        backgroundColor: active ? (0, color_1.withAlpha)(colors.primary, 0.08) : colors.card,
        borderColor: active ? (0, color_1.withAlpha)(colors.primary, 0.5) : colors.border,
        ...(active
            ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
            : {}),
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: active }, accessibilityLabel: `${name} scene${active ? ', active' : ''}`, onPress: onActivate, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "flat", style: [shell, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: active ? (0, color_1.withAlpha)(colors.primary, 0.15) : (0, color_1.withAlpha)(colors.onSurface, 0.05),
                            borderWidth: 1,
                            borderColor: active ? (0, color_1.withAlpha)(colors.primary, 0.4) : colors.border,
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: active ? 'primary' : 'onSurface', size: "xl" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), active ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: "Active" })) : null] }), description != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }, children: description })) : null, count > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }, children: `${count} ${count === 1 ? 'device' : 'devices'}` })) : null] })] }) }) }));
}
//# sourceMappingURL=SceneCardV4.js.map