"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCardV3 = ProjectCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const AssigneeGroup_1 = require("./AssigneeGroup");
const DueDatePill_1 = require("./DueDatePill");
/**
 * ProjectCard, redesigned (v3): a **dense project row**. The title over a
 * description·task-count line with a thin progress bar, and assignees + a due pill
 * on the right — a hairline row for a projects list. The opposite of v2's card.
 * Same props, token-only.
 */
function ProjectCardV3({ title, description, progress, taskCount, assignees, dueLabel, dueTone, onPress, appearance, style, }) {
    void appearance;
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const pct = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : null;
    const sub = [description, typeof taskCount === 'number' ? `${taskCount} tasks` : null].filter((s) => !!s).join('  ·  ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, disabled: !onPress, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), sub ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: sub }) : null, pct !== null ? (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: "primary", size: "sm" }) : null] }), assignees && assignees.length > 0 ? (0, jsx_runtime_1.jsx)(AssigneeGroup_1.AssigneeGroup, { assignees: assignees, max: 3 }) : null, dueLabel ? (0, jsx_runtime_1.jsx)(DueDatePill_1.DueDatePill, { label: dueLabel, tone: dueTone }) : null] }));
}
//# sourceMappingURL=ProjectCardV3.js.map