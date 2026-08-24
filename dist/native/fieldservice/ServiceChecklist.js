"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceChecklist = ServiceChecklist;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
/**
 * A completion checklist for a service procedure. Each task is a checkbox row
 * whose label strikes through when done (completion reads without color alone).
 * A header progress bar summarizes `done / total`. Handles the empty state (no
 * tasks → `EmptyState`) and a `loading` skeleton. Toggling fires `onToggle(id,
 * next)`. No literal colors.
 */
function ServiceChecklist({ title, tasks, onToggle, loading = false, disabled = false, emptyLabel = 'No checklist items', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const list = Array.isArray(tasks) ? tasks : [];
    const total = list.length;
    const completed = list.filter((t) => t.done).length;
    const pct = total > 0 ? (0, format_1.clampPct)((completed / total) * 100) : 0;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading checklist", style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", width: "50%", height: 14 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", lines: 3 })] }) }));
    }
    if (total === 0) {
        return (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { title: emptyLabel, description: "Items will appear here once added.", style: style });
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [title != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [completed, "/", total] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: completed, max: total, tone: pct === 100 ? 'success' : 'primary', size: "sm" }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: list.map((task) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: task.done, disabled: disabled, onCheckedChange: (next) => onToggle?.(task.id, next), accessibilityLabel: task.label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                                flex: 1,
                                color: task.done ? colors.muted : colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                                textDecorationLine: task.done ? 'line-through' : 'none',
                            }, children: [task.label, task.required ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.sm }, children: " *" })) : null] })] }, task.id))) })] }));
}
//# sourceMappingURL=ServiceChecklist.js.map