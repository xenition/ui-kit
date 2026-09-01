"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextStepRowV4 = NextStepRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const crm_v4_1 = require("./internal/crm-v4");
const PRIORITY_V4 = {
    low: { glyph: '↓', label: 'Low' },
    normal: { glyph: '•', label: 'Normal' },
    high: { glyph: '↑', label: 'High' },
};
/**
 * **V4 next-step row** — same props as {@link NextStepRow} plus
 * `priorityLabels`, `overdueLabel`, `completeLabel` and `completedLabel`.
 *
 * ## Six changes
 *
 * 1. **The row announces its meta line.** `accessibilityLabel={title}` dropped
 *    everything under the title, so "⚠ Overdue · Mar 4" — the entire point of
 *    a next-step row — was silent (rule A).
 * 2. **The checkbox clears 44.** It was a 22px box with `hitSlop`, and it is
 *    the row's *primary* action; the box keeps its size and the target grows
 *    around it.
 * 3. **No dead checkbox.** With no `onToggle` the base still rendered a
 *    normal, apparently-tappable checkbox that silently did nothing. Without a
 *    handler it is now a static mark, and `done` is carried by the row's name.
 * 4. **A checked box fills `primary`, not `success`.** Ticking a task is a
 *    *selection*, not a report that something went well; spending a status
 *    colour on it leaves `success` meaning nothing.
 * 5. **Overdue is inked with `dangerText`**, the contrast-corrected slot — the
 *    base drew text in the `danger` **fill**, which carries no promise as ink.
 * 6. **A press is a state layer** (rule B) rather than no feedback at all.
 *
 * **Renders nothing without a `title`.**
 */
function NextStepRowV4({ title, dueDate, overdue = false, done = false, assignee, priority, priorityLabels, overdueLabel = 'Overdue', completeLabel = 'Mark complete', completedLabel = 'Completed', onToggle, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    // 24 — the drawn box. The 44 target is the transparent square around it.
    const box = tokens.spacing.lg;
    const prio = priority
        ? { ...PRIORITY_V4[priority], label: priorityLabels?.[priority] ?? PRIORITY_V4[priority].label }
        : undefined;
    const name = (0, crm_v4_1.spokenLine)([
        title,
        prio ? prio.label : null,
        assignee,
        overdue ? overdueLabel : null,
        dueDate,
        done ? completedLabel : null,
    ]);
    const mark = (pressed) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: box,
            height: box,
            borderRadius: tokens.radius.sm,
            borderWidth: 2,
            borderColor: done ? colors.primary : colors.border,
            backgroundColor: done
                ? pressed
                    ? (0, state_v4_1.pressOver)(theme, colors.primary, colors.onPrimary)
                    : colors.primary
                : pressed
                    ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface)
                    : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
        }, children: done ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", style: { color: colors.onPrimary }, children: "\u2713" })) : null }));
    const target = {
        width: tap,
        height: tap,
        alignItems: 'center',
        justifyContent: 'center',
    };
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minWidth: 0,
            gap: tokens.spacing.xs / 2,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.xs,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: done ? 'mutedText' : 'onSurface', numberOfLines: 2, style: { textDecorationLine: done ? 'line-through' : 'none' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    flexWrap: 'wrap',
                }, children: [prio ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: `${prio.glyph} ${prio.label}` })) : null, assignee ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: assignee })) : null, overdue ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", tone: "dangerText", children: `⚠ ${overdueLabel}${dueDate ? ` · ${dueDate}` : ''}` })) : dueDate ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: dueDate })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: testID, style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
            style,
        ], children: [onToggle ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: done }, accessibilityLabel: `${done ? completedLabel : completeLabel}: ${title}`, onPress: () => onToggle(!done), style: target, children: ({ pressed }) => mark(pressed) })) : (
            // No handler, so no affordance. The state travels in the row's name.
            (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: target, children: mark(false) })), onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: { flex: 1, minHeight: tap, justifyContent: 'center' }, children: ({ pressed }) => body(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: { flex: 1 }, children: body(false) }))] }));
}
//# sourceMappingURL=NextStepRowV4.js.map