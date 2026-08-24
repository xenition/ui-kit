"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRowV3 = TaskRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const PriorityTag_1 = require("./PriorityTag");
const DueDatePill_1 = require("./DueDatePill");
/**
 * TaskRow, redesigned (v3): an **ultra-dense checklist line**. A small checkbox, the
 * title inline, and a compact accessory on a bare hairline row — the tightest to-do
 * line. The opposite of v2's card. Same props, token-only.
 */
function TaskRowV3({ title, done = false, onToggle, onPress, variant = 'checkbox', priority = 'low', dueLabel, dueTone = 'upcoming', appearance, style, }) {
    void appearance;
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: done, onCheckedChange: onToggle, accessibilityLabel: title }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, disabled: !onPress, style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                        color: done ? colors.muted : colors.onSurface,
                        fontSize: tokens.typography.scale.sm,
                        textDecorationLine: done ? 'line-through' : 'none',
                    }, children: title }) }), variant === 'priority' ? (0, jsx_runtime_1.jsx)(PriorityTag_1.PriorityTag, { level: priority, dotOnly: true }) : null, variant === 'dated' && dueLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dueLabel, tone: dueTone }) : null] }));
}
//# sourceMappingURL=TaskRowV3.js.map