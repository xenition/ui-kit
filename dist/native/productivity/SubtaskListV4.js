"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubtaskListV4 = SubtaskListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const ChecklistItem_1 = require("./ChecklistItem");
/** One subtask row that fades/rises in on mount via the shared `useEnter`. */
function SubtaskRow({ subtask, onToggle, }) {
    const enter = (0, motion_1.useEnter)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: enter, children: (0, jsx_runtime_1.jsx)(ChecklistItem_1.ChecklistItem, { label: subtask.title, checked: !!subtask.done, onCheckedChange: (next) => onToggle?.(subtask.id, next) }) }));
}
/**
 * SubtaskList — **V4** "flow" design. The focused-workspace take on a subtask
 * list: a calm header carrying a **soft-primary progress bar** and an "N/M done"
 * count, then the {@link ChecklistItem} rows. Guards against a missing/empty
 * array and keeps the add/toggle callbacks. Same props/behavior as
 * {@link SubtaskListProps}; token-only colors via `useXenitionTheme()`.
 */
function SubtaskListV4({ subtasks, onToggle, emptyLabel = 'No subtasks yet', showProgress = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const items = Array.isArray(subtasks) ? subtasks : [];
    const done = items.filter((s) => s.done).length;
    const pct = items.length > 0 ? (done / items.length) * 100 : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [showProgress && items.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: `${done}/${items.length} done` }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", style: {
                            height: 6,
                            borderRadius: tokens.radius.full,
                            overflow: 'hidden',
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: colors.primary } }) })] })) : null, items.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.md, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: emptyLabel }) })) : (items.map((s) => (0, jsx_runtime_1.jsx)(SubtaskRow, { subtask: s, onToggle: onToggle }, s.id)))] }));
}
//# sourceMappingURL=SubtaskListV4.js.map