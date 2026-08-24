"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadUnreadToggle = ReadUnreadToggle;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const tint_1 = require("./tint");
/**
 * A control that flips a message between read and unread. The glyph (open vs.
 * filled envelope) and the word label both change with state, and the tap
 * target announces the *action* ("Mark as read" / "Mark as unread") so it never
 * relies on color alone. Controlled via `read` / `onToggle`. No literal colors.
 */
function ReadUnreadToggle({ read = false, onToggle, iconOnly = false, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Tapping toggles: if currently read → mark unread, and vice-versa.
    const nextRead = !read;
    const actionLabel = nextRead ? 'Mark as read' : 'Mark as unread';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: actionLabel, accessibilityState: { disabled }, disabled: disabled, onPress: () => onToggle?.(nextRead), hitSlop: 6, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: iconOnly ? tokens.spacing.xs : tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: iconOnly ? 'transparent' : (0, tint_1.withAlpha)(colors.primary, 0.1),
                opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: read ? '✉️' : '📩', size: "base", color: read ? 'muted' : 'primary' }), iconOnly ? null : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: read ? colors.muted : colors.primary,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                }, children: actionLabel })), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { width: 0, height: 0 } })] }));
}
//# sourceMappingURL=ReadUnreadToggle.js.map