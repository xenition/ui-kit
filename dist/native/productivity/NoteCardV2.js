"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteCardV2 = NoteCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
/**
 * NoteCard, redesigned (v2): a **sticky-note card**. A warm-tinted note surface;
 * pinned notes gain a 📌 and a primary top edge. Title, body preview, labels and a
 * timestamp stack inside. Shadowed. Distinct from v1. Same props, token-only.
 */
function NoteCardV2({ title, body, timestamp, pinned = false, labels, onPress, appearance, style }) {
    void appearance;
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, disabled: !onPress, style: [
                {
                    gap: tokens.spacing.xs,
                    padding: tokens.spacing.sm,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: (0, color_1.withAlpha)(colors.warn, 0.06),
                    borderTopWidth: pinned ? 2 : 0,
                    borderTopColor: colors.primary,
                    ...(0, elevation_1.shadow)('sm', tokens),
                },
                style,
            ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title }), pinned ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Pinned", children: "\uD83D\uDCCC" }) : null] }), body ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: body }) : null, labels ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: labels }) : null, timestamp ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: timestamp }) : null] }) }));
}
//# sourceMappingURL=NoteCardV2.js.map