"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistItemV4 = ChecklistItemV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
/**
 * ChecklistItem — **V4** "flow" design. The focused-workspace take on a checklist
 * line: a big ≥44px tap target, a round toggle, and a bigger, more legible label.
 * Checking the item is the satisfying moment — the row settles into a
 * **soft-success glow** with the label struck through. Same props/behavior as
 * {@link ChecklistItemProps} (both `onChange` and `onCheckedChange` spellings,
 * the original winning); token-only colors via `useXenitionTheme()`.
 */
function ChecklistItemV4({ label, checked = false, onCheckedChange, onChange, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    // Two spellings, one callback: the original wins when both are passed, so a
    // caller who has migrated half a file never gets the change reported twice.
    const emit = onCheckedChange ?? onChange;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked, disabled }, accessibilityLabel: label, disabled: disabled, onPress: () => emit?.(!checked), onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    minHeight: 44,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    backgroundColor: checked ? (0, color_1.withAlpha)(colors.success, 0.08) : 'transparent',
                    opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 24,
                        height: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.full,
                        borderWidth: 1,
                        borderColor: checked ? colors.success : colors.border,
                        backgroundColor: checked ? colors.success : colors.surface,
                    }, children: checked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSuccess, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "\u2713" })) : null }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        flex: 1,
                        color: checked ? colors.muted : colors.onSurface,
                        fontSize: tokens.typography.scale.base,
                        fontWeight: '500',
                        lineHeight: tokens.typography.scale.base * 1.4,
                        textDecorationLine: checked ? 'line-through' : 'none',
                    }, children: label })] }) }));
}
//# sourceMappingURL=ChecklistItemV4.js.map