"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistItem = ChecklistItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
/**
 * A single checklist line — a round toggle + label. Unlike the square primitive
 * `Checkbox`, a checked item fills with the **success** token (done = success)
 * and strikes through its label. Exposes the `checkbox` a11y role/state. No
 * literal colors.
 */
function ChecklistItem({ label, checked = false, onCheckedChange, onChange, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onCheckedChange ?? onChange;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked, disabled }, accessibilityLabel: label, disabled: disabled, onPress: () => emit?.(!checked), onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.xs,
                    opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.full,
                        borderWidth: 1,
                        borderColor: checked ? colors.success : colors.border,
                        backgroundColor: checked ? colors.success : colors.surface,
                    }, children: checked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713" })) : null }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        flex: 1,
                        color: checked ? colors.muted : colors.onSurface,
                        fontSize: tokens.typography.scale.sm,
                        textDecorationLine: checked ? 'line-through' : 'none',
                    }, children: label })] }) }));
}
//# sourceMappingURL=ChecklistItem.js.map