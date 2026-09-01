"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCardV4 = ProjectCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const AssigneeGroup_1 = require("./AssigneeGroup");
const DueDatePill_1 = require("./DueDatePill");
/**
 * ProjectCard — **V4** "flow" design. The focused-workspace take on a project
 * summary: a clean, softly-elevated {@link Card} with a legible title, one
 * **primary** progress track (which settles into a **soft-success glow** at
 * 100%), an {@link AssigneeGroup}, task-count meta, and an optional
 * {@link DueDatePill}. A hairline primary accent edge is the only flourish.
 * Same props/behavior as {@link ProjectCardProps}; token-only colors via
 * `useXenitionTheme()`.
 */
function ProjectCardV4({ title, description, progress, taskCount, assignees = [], dueLabel, dueTone = 'upcoming', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;
    const complete = pct != null && pct >= 100;
    const inner = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: {
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderLeftWidth: 3,
            borderLeftColor: colors.primary,
            backgroundColor: complete ? (0, color_1.withAlpha)(colors.success, 0.08) : colors.surface,
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null] }), pct != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: complete ? 'success' : 'primary', size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${pct}% complete${typeof taskCount === 'number' ? ` · ${taskCount} tasks` : ''}` })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(AssigneeGroup_1.AssigneeGroup, { assignees: assignees }), dueLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dueLabel, tone: dueTone }) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, style], children: inner }) }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: inner });
}
//# sourceMappingURL=ProjectCardV4.js.map