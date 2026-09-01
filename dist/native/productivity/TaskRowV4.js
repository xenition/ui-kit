"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRowV4 = TaskRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const PriorityTag_1 = require("./PriorityTag");
const DueDatePill_1 = require("./DueDatePill");
/**
 * TaskRow — **V4** "flow" design. The focused-workspace take on a task line: a
 * leading {@link Checkbox}, a bigger, more legible title, and the variant-driven
 * trailing accessory (priority tag or due pill). Completing a task is the
 * satisfying moment — the row settles into a **soft-success glow** with the title
 * struck through. Same props/behavior as {@link TaskRowProps}; token-only colors
 * via `useXenitionTheme()`.
 */
function TaskRowV4({ title, done = false, onToggle, onPress, variant = 'checkbox', priority = 'low', dueLabel, dueTone = 'upcoming', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                backgroundColor: done ? (0, color_1.withAlpha)(colors.success, 0.08) : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: done, onCheckedChange: onToggle, accessibilityLabel: title }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { flex: 1, transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, disabled: !onPress, style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            color: done ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                            lineHeight: tokens.typography.scale.base * 1.4,
                            textDecorationLine: done ? 'line-through' : 'none',
                        }, children: title }) }) }), variant === 'priority' ? (0, jsx_runtime_1.jsx)(PriorityTag_1.PriorityTag, { level: priority }) : null, variant === 'dated' && dueLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dueLabel, tone: dueTone }) : null] }));
}
//# sourceMappingURL=TaskRowV4.js.map