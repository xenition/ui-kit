"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingTask = OnboardingTask;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A single onboarding checklist item: a checkbox, title, category, and status
 * pill (glyph + word — `blocked` reads danger, `done` success, never color
 * alone). Overdue tasks are called out with a word. Toggling the checkbox fires
 * `onToggle(next)` for optimistic completion. `compact` drops the category /
 * assignee meta. All colors are theme tokens — no literals.
 */
function OnboardingTask({ title, category, status = 'todo', dueDate, overdue = false, assignee, assigneeAvatarUrl, variant = 'default', onToggle, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const done = status === 'done';
    const meta = [category, dueDate ? `Due ${dueDate}` : null].filter(Boolean).join('  ·  ');
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingTop: 2 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: done, onCheckedChange: (next) => onToggle?.(next), accessibilityLabel: `${done ? 'Mark incomplete' : 'Mark complete'}: ${title}` }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            color: done ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                            textDecorationLine: done ? 'line-through' : 'none',
                        }, children: title }), !compact && meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.TASK_STATUS_META[status], size: "sm" }), overdue && !done ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, internal_1.toneColor)(colors, 'danger'), fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "\u26A0 Overdue" })) : null, !compact && assignee ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "xs", name: assignee, src: assigneeAvatarUrl }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: assignee })] })) : null] })] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Onboarding task ${title}`, onPress: onPress, testID: testID, children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: inner });
}
//# sourceMappingURL=OnboardingTask.js.map