"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextStepRow = NextStepRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const PRIORITY_META = {
    low: { glyph: '↓', label: 'Low' },
    normal: { glyph: '•', label: 'Normal' },
    high: { glyph: '↑', label: 'High' },
};
/**
 * A single "next step" / task row for a deal or contact: a tappable checkbox,
 * the action title (struck through when `done`), and a meta line of assignee,
 * priority (glyph + label) and due date. `overdue` is surfaced as the word
 * "Overdue" plus a ⚠ glyph in the `danger` tone — never color alone. The
 * checkbox reports the next state via `onToggle`. All colors are theme tokens.
 */
function NextStepRow({ title, dueDate, overdue = false, done = false, assignee, priority, onToggle, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const prio = priority ? PRIORITY_META[priority] : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingVertical: tokens.spacing.sm },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: done }, accessibilityLabel: `${done ? 'Completed' : 'Mark complete'}: ${title}`, onPress: () => onToggle?.(!done), hitSlop: 8, disabled: !onToggle, style: {
                    width: 22,
                    height: 22,
                    borderRadius: tokens.radius.sm,
                    borderWidth: 2,
                    borderColor: done ? colors.success : colors.border,
                    backgroundColor: done ? colors.success : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: done ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '900' }, children: "\u2713" })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : 'text', accessibilityLabel: title, onPress: onPress, disabled: !onPress, style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            color: done ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                            textDecorationLine: done ? 'line-through' : 'none',
                        }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [prio ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: `${prio.glyph} ${prio.label}` })) : null, assignee ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: assignee })) : null, overdue ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: `⚠ Overdue${dueDate ? ` · ${dueDate}` : ''}` })) : dueDate ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: dueDate })) : null] })] })] }));
}
//# sourceMappingURL=NextStepRow.js.map