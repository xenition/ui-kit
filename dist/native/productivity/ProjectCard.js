"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCard = ProjectCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const AssigneeGroup_1 = require("./AssigneeGroup");
const DueDatePill_1 = require("./DueDatePill");
/**
 * A project summary card composed on the primitive {@link Card}: title +
 * description, a {@link Progress} completion bar, and a footer with an
 * {@link AssigneeGroup} and optional {@link DueDatePill}. Progress tone shifts to
 * success at 100%. No literal colors.
 */
function ProjectCard({ title, description, progress, taskCount, assignees = [], dueLabel, dueTone = 'upcoming', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;
    const inner = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null] }), pct != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: pct >= 100 ? 'success' : 'primary', size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${pct}% complete${typeof taskCount === 'number' ? ` · ${taskCount} tasks` : ''}` })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(AssigneeGroup_1.AssigneeGroup, { assignees: assignees }), dueLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dueLabel, tone: dueTone }) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, style], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: inner });
}
//# sourceMappingURL=ProjectCard.js.map