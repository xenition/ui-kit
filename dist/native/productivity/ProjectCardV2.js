"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCardV2 = ProjectCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const AssigneeGroup_1 = require("./AssigneeGroup");
const DueDatePill_1 = require("./DueDatePill");
/**
 * ProjectCard, redesigned (v2): an **elevated project card**. A bold title/desc, a
 * percent read-out over a progress bar, then assignees, a task-count meta and a due
 * pill on a footer row. Shadowed, press-scales. Distinct from v1. Same props,
 * token-only.
 */
function ProjectCardV2({ title, description, progress, taskCount, assignees, dueLabel, dueTone, onPress, appearance, style, }) {
    void appearance;
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, disabled: !onPress, style: [
                {
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.md,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: colors.surface,
                    ...(0, elevation_1.shadow)('md', tokens),
                },
                style,
            ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), description ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description }) : null] }), pct !== null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Progress" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: "primary", size: "sm" })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [assignees && assignees.length > 0 ? (0, jsx_runtime_1.jsx)(AssigneeGroup_1.AssigneeGroup, { assignees: assignees }) : (0, jsx_runtime_1.jsx)(react_native_1.View, {}), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [typeof taskCount === 'number' ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [taskCount, " tasks"] }) : null, dueLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dueLabel, tone: dueTone }) : null] })] })] }) }));
}
//# sourceMappingURL=ProjectCardV2.js.map