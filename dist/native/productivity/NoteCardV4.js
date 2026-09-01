"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteCardV4 = NoteCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
/**
 * NoteCard — **V4** "flow" design. The focused-workspace take on a sticky
 * note: a clean, softly-elevated {@link Card} with a legible title and a
 * clamped body preview. When `pinned`, a soft **primary** wash + a left accent
 * edge lift the note and a pin marker appears. One primary accent, generous
 * whitespace. Same props/behavior as {@link NoteCardProps}; token-only colors
 * via `useXenitionTheme()`.
 */
function NoteCardV4({ title, body, timestamp, pinned = false, labels, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const inner = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: {
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            borderLeftWidth: pinned ? 3 : 1,
            borderLeftColor: pinned ? colors.primary : colors.border,
            backgroundColor: pinned ? (0, color_1.withAlpha)(colors.primary, 0.06) : colors.surface,
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [pinned ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Pinned", style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm }, children: "\uD83D\uDCCC" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })] }), body ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: body })) : null, labels ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: labels }) : null, timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: timestamp })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, style], children: inner }) }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: inner });
}
//# sourceMappingURL=NoteCardV4.js.map