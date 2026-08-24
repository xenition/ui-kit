"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRow = TaskRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const PriorityTag_1 = require("./PriorityTag");
const DueDatePill_1 = require("./DueDatePill");
/**
 * A single task line: a leading {@link Checkbox}, the title (struck through when
 * `done`), and a variant-driven trailing accessory (priority tag or due-date
 * pill). The checkbox carries its own `checkbox` a11y role; the row body is a
 * separate pressable. No literal colors.
 */
function TaskRow({ title, done = false, onToggle, onPress, variant = 'checkbox', priority = 'low', dueLabel, dueTone = 'upcoming', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: done, onCheckedChange: onToggle, accessibilityLabel: title }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, disabled: !onPress, style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                        color: done ? colors.muted : colors.onSurface,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: '500',
                        textDecorationLine: done ? 'line-through' : 'none',
                    }, children: title }) }), variant === 'priority' ? (0, jsx_runtime_1.jsx)(PriorityTag_1.PriorityTag, { level: priority }) : null, variant === 'dated' && dueLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dueLabel, tone: dueTone }) : null] }));
}
//# sourceMappingURL=TaskRow.js.map