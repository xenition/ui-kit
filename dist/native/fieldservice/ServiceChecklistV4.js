"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceChecklistV4 = ServiceChecklistV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const CheckboxV4_1 = require("../primitives/CheckboxV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const verdict_v4_1 = require("../../fieldservice/verdict-v4");
const job_v4_1 = require("./internal/job-v4");
/** How many skeleton rows stand in for the list while it loads. */
const SKELETON_ROWS = 3;
/**
 * **V4 service checklist** — same props as {@link ServiceChecklist} plus
 * `emptyDescription`, `requiredLabel` and `progressLabel`.
 *
 * ## Five changes
 *
 * 1. **Complete means complete.** The base compared a **rounded** percentage
 *    against 100 — and `clampPct` rounds — so 199 tasks of 200 turned the bar
 *    green with an item still outstanding. `isComplete(completed, total)`
 *    answers the question with counts; a percentage is for drawing.
 * 2. **Requiredness is a word.** A red asterisk is colour and punctuation, one
 *    of which a colour-blind user cannot see and the other of which a screen
 *    reader may not read at all. `requiredLabel` is a neutral chip beside the
 *    task and joins the control's spoken name.
 * 3. **The progress bar has a name.** It announced a bare percentage, so a
 *    reader heard a number with nothing attached to it.
 * 4. **The whole row toggles**, as it already did on the web twin — the base
 *    made only the 20px box hittable, on a screen used in gloves.
 * 5. **A checklist nobody can tick is not enabled.** With no `onToggle` the
 *    base still rendered live checkboxes that could be pressed forever and
 *    never changed.
 */
function ServiceChecklistV4({ title, tasks, onToggle, loading = false, disabled = false, emptyLabel = 'No checklist items', emptyDescription = 'Items will appear here once added.', requiredLabel = 'Required', progressLabel = 'Checklist progress', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const list = Array.isArray(tasks) ? tasks : [];
    const total = list.length;
    const completed = list.filter((task) => task.done).length;
    const complete = (0, verdict_v4_1.isComplete)(completed, total);
    const interactive = Boolean(onToggle) && !disabled;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: "outlined", style: [{ backgroundColor: colors.card }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading checklist", style: { gap: tokens.spacing.sm }, children: Array.from({ length: SKELETON_ROWS }, (_, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, minHeight: tap }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: tokens.spacing.lg,
                                height: tokens.spacing.lg,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, job_v4_1.skeletonFill)(theme),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                flex: 1,
                                height: tokens.spacing.md,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, job_v4_1.skeletonFill)(theme),
                            } })] }, i))) }) }));
    }
    if (total === 0) {
        return (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription, style: style });
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "outlined", style: [{ backgroundColor: colors.card }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [title != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: title })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", numeric: "tabular", children: `${completed}/${total}` })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: progressLabel, accessibilityValue: { min: 0, max: total, now: completed }, style: { marginTop: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: completed, max: total, tone: complete ? 'success' : 'primary', size: "sm" }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: list.map((task) => {
                    const name = (0, job_v4_1.spokenLine)([task.label, task.required === true ? requiredLabel : null]);
                    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.md,
                            minHeight: tap,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.md,
                            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(CheckboxV4_1.CheckboxV4, { checked: task.done, disabled: !interactive, onCheckedChange: interactive ? (next) => onToggle?.(task.id, next) : undefined }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: task.done ? 'mutedText' : 'onCard', style: {
                                    flex: 1,
                                    textDecorationLine: task.done ? 'line-through' : 'none',
                                }, children: task.label }), task.required === true ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", ...job_v4_1.BADGE_V4, children: requiredLabel })) : null] }));
                    if (!interactive) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "checkbox", accessibilityLabel: name, accessibilityState: { checked: task.done, disabled: true }, children: body(false) }, task.id));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityLabel: name, accessibilityState: { checked: task.done, disabled: false }, onPress: () => onToggle?.(task.id, !task.done), style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => body(pressed) }, task.id));
                }) })] }));
}
//# sourceMappingURL=ServiceChecklistV4.js.map