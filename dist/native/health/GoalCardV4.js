"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalCardV4 = GoalCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const goal_v4_1 = require("../../health/goal-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 goal card** — same props as {@link GoalCard} plus `noGoalLabel`,
 * `metLabel` and `formatValue`.
 *
 * ## Five changes
 *
 * 1. **A walk of 12 400 steps against a 10 000 target is no longer three
 *    different walks.** The base clamped the measurement itself, so the card
 *    showed 12 400, announced "12 400 of 10 000, 100%" and handed the bar a
 *    value of 10 000 — three mutually inconsistent readings of one day.
 *    `goalParts` keeps the measurement, the drawing fraction and the overshoot
 *    as three separate numbers, and the card now says how far past the target
 *    the user actually got.
 * 2. **The meter is a real meter.** `MiniBar` hard-codes
 *    `accessibilityRole="image"`, so the progress this card exists to show was
 *    announced as a picture with no value at all. It is wrapped in a
 *    `progressbar` that carries the percentage, and the bar itself is hidden
 *    from the reader so the number is stated once.
 * 3. **The meter is a *sibling* of the card's activation, not a descendant.**
 *    A `Pressable` is `accessible` by default and flattens everything under
 *    it, so on iOS the meter was pruned outright — inside a button, a
 *    progressbar's value is presentational. The container is now a plain
 *    `View`, the activation wraps only the title and the readout, and the
 *    meter sits beside it.
 * 4. **`MiniBar` is handed a fraction, not a pair.** It rescales any `max`
 *    below 1 to 1, so a half-hour meditation against a half-hour target drew a
 *    half-full bar under the words "Goal met". It is given `ratio` against 1,
 *    which is the one opinion the card already formed.
 * 5. **Press is a state layer.** `opacity: pressed ? 0.85 : 1` sits inside
 *    M3's disabled band, so a pressed card read as an unavailable one.
 *
 * **Renders nothing without a `title`.**
 */
function GoalCardV4({ title, value, target, unit, color = 'primary', icon, noGoalLabel = 'No target set', metLabel = 'Goal met', formatValue, onPress, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const parts = (0, goal_v4_1.goalParts)(value, target);
    const format = formatValue ?? ((v, u) => `${v}${u ? ` ${u}` : ''}`);
    const reading = format(parts.value, unit);
    const barColor = parts.met ? 'success' : color;
    // The overshoot is the interesting fact on a day someone beat their target,
    // and the base destroyed it before anyone could read it.
    const overNote = parts.over > 0 ? `+${format(parts.over, unit)}` : null;
    const meterName = parts.hasGoal
        ? (0, tone_v4_1.spokenLine)([title, `${parts.percent}%`, parts.met ? metLabel : null, overNote])
        : null;
    const name = (0, tone_v4_1.spokenLine)([
        title,
        parts.hasGoal ? `${reading} of ${format(parts.target ?? 0, unit)}` : reading,
        parts.hasGoal ? `${parts.percent}%` : noGoalLabel,
        parts.met ? metLabel : null,
        overNote,
    ]);
    const heading = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [icon ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: icon })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, style: { flex: 1 }, children: title }), parts.met ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", style: { color: (0, tone_v4_1.toneInk)(theme, 'success') }, children: `✓ ${metLabel}` })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", style: { color: parts.met ? (0, tone_v4_1.toneInk)(theme, 'success') : colors.onSurface }, children: reading }), parts.hasGoal ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: `/ ${format(parts.target ?? 0, unit)}` })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, tone_v4_1.cardStyle)(theme, appearance), style], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, children: ({ pressed }) => heading(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: heading(false) })), parts.hasGoal && meterName ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: meterName, accessibilityValue: (0, tone_v4_1.percentValue)(parts.percent), children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(charts_1.MiniBar, { value: parts.ratio ?? 0, max: 1, color: barColor }) }) })) : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: noGoalLabel }))] }));
}
//# sourceMappingURL=GoalCardV4.js.map