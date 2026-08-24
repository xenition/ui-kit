"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtaskList = SubtaskList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const ChecklistItem_1 = require("./ChecklistItem");
/** One subtask row that fades/rises in on mount via the shared `useEnter`. */
function SubtaskRow({ subtask, onToggle, }) {
    const enter = (0, motion_1.useEnter)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: enter, children: (0, jsx_runtime_1.jsx)(ChecklistItem_1.ChecklistItem, { label: subtask.title, checked: !!subtask.done, onCheckedChange: (next) => onToggle?.(subtask.id, next) }) }));
}
/**
 * Vertical list of subtasks rendered as {@link ChecklistItem}s, with an optional
 * `done/total` counter and a muted empty state. Guards against a missing/empty
 * array. Colors come from the theme tokens. No literal colors.
 */
function SubtaskList({ subtasks, onToggle, emptyLabel = 'No subtasks yet', showProgress = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const items = Array.isArray(subtasks) ? subtasks : [];
    const done = items.filter((s) => s.done).length;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [showProgress && items.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: `${done}/${items.length} done` })) : null, items.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.md, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: emptyLabel }) })) : (items.map((s) => (0, jsx_runtime_1.jsx)(SubtaskRow, { subtask: s, onToggle: onToggle }, s.id)))] }));
}
//# sourceMappingURL=SubtaskList.js.map