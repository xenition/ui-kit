"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricRingV4 = MetricRingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const TextV4_1 = require("../primitives/TextV4");
const goal_v4_1 = require("../../health/goal-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 metric ring** — same props as {@link MetricRing} plus `noGoalLabel` and
 * `formatValue`.
 *
 * ## Four changes
 *
 * 1. **The ring announces its value.** `ProgressRing` hard-codes
 *    `accessibilityRole="image"`, so a component whose entire job is to show a
 *    number against a goal announced itself as a picture. The ring is wrapped
 *    in a `progressbar` carrying the percentage, and the drawing is hidden
 *    from the reader so the number is stated once rather than twice.
 * 2. **540 of 500 kcal reads as 540, not 500.** The base clamped the
 *    measurement and printed the clamped copy in the caption, so a metric that
 *    had been beaten looked exactly like one that had been met on the nose.
 *    The caption now shows what was measured and names the overshoot.
 * 3. **`ProgressRing` is handed a fraction against 1**, which is the same
 *    number the caption was derived from, so the arc and the words cannot
 *    disagree.
 * 4. **The "no goal" branch is a branch, not a zero.** `goal={0}` is now
 *    absence rather than nought per cent — a distinction the caption is free
 *    to say out loud.
 *
 * **Renders nothing without a `label`.**
 */
function MetricRingV4({ label, value, goal, unit, color = 'primary', size = 120, centerLabel, noGoalLabel = 'No goal set', formatValue, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!label)
        return null;
    const parts = (0, goal_v4_1.goalParts)(value, goal);
    const format = formatValue ?? ((v, u) => `${v}${u ? ` ${u}` : ''}`);
    const surface = (0, tone_v4_1.looseCardStyle)(theme, appearance);
    const box = [{ alignItems: 'center', gap: tokens.spacing.xs }, surface, style];
    if (!parts.hasGoal) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: box, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([label, format(parts.value, unit), noGoalLabel]), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", align: "center", children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: noGoalLabel })] }) }));
    }
    const overNote = parts.over > 0 ? `+${format(parts.over, unit)}` : null;
    const caption = `${format(parts.value, unit)} / ${format(parts.target ?? 0, unit)}`;
    const name = (0, tone_v4_1.spokenLine)([label, caption, `${parts.percent}%`, overNote]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: box, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: name, accessibilityValue: (0, tone_v4_1.percentValue)(parts.percent), children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: parts.ratio ?? 0, max: 1, size: size, color: color, label: centerLabel ?? `${parts.percent}%` }) }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: caption }), overNote ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: (0, tone_v4_1.toneInk)(theme, 'success') }, children: overNote })) : null] }));
}
//# sourceMappingURL=MetricRingV4.js.map