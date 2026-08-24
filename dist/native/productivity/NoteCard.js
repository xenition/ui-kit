"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteCard = NoteCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
/**
 * A note preview built on the primitive {@link Card}: title, a clamped body,
 * a footer timestamp, an optional pin marker (primary), and a labels slot. When
 * `pinned`, a left accent edge in the primary token highlights it. No literals.
 */
function NoteCard({ title, body, timestamp, pinned = false, labels, onPress, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const inner = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [
            (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                gap: tokens.spacing.sm,
                borderLeftWidth: pinned ? 3 : 1,
                borderLeftColor: pinned ? colors.primary : colors.border,
            },
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [pinned ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Pinned", style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm }, children: "\uD83D\uDCCC" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })] }), body ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: body })) : null, labels ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: labels }) : null, timestamp ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: timestamp })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, style], children: inner }) }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: inner });
}
//# sourceMappingURL=NoteCard.js.map