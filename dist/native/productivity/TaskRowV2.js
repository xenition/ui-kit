"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRowV2 = TaskRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
const PriorityTag_1 = require("./PriorityTag");
const DueDatePill_1 = require("./DueDatePill");
/**
 * TaskRow, redesigned (v2): an **elevated task card**. The checkbox rides in a soft
 * tinted well, the title is bolder, and the accessory sits on a shadowed surface
 * row. Distinct from v1's flat line. Same props, token-only.
 */
function TaskRowV2({ title, done = false, onToggle, onPress, variant = 'checkbox', priority = 'low', dueLabel, dueTone = 'upcoming', appearance, style, }) {
    void appearance;
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                ...(0, elevation_1.shadow)('sm', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 32,
                    height: 32,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: done, onCheckedChange: onToggle, accessibilityLabel: title }) }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { flex: 1, transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, disabled: !onPress, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            color: done ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '700',
                            textDecorationLine: done ? 'line-through' : 'none',
                        }, children: title }) }) }), variant === 'priority' ? (0, jsx_runtime_1.jsx)(PriorityTag_1.PriorityTag, { level: priority }) : null, variant === 'dated' && dueLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dueLabel, tone: dueTone }) : null] }));
}
//# sourceMappingURL=TaskRowV2.js.map