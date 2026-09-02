"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepBarV4 = SleepBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const goal_v4_1 = require("../../health/goal-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Quality → the tone its tag and bar take. */
const QUALITY_TONE = {
    poor: 'danger',
    fair: 'warn',
    good: 'primary',
    excellent: 'success',
};
const QUALITY_LABEL = {
    poor: 'Poor',
    fair: 'Fair',
    good: 'Good',
    excellent: 'Excellent',
};
/**
 * **V4 sleep bar** — same props as {@link SleepBar} plus `noGoalLabel`,
 * `qualityLabels` and `formatHours`.
 *
 * ## Five changes
 *
 * 1. **A fully-slept night with `goal={0}` no longer draws an empty bar.** The
 *    base read a goal of zero as *nought per cent* rather than as *no goal*,
 *    so someone who turned their sleep target off saw 7.5 hours reported above
 *    a completely empty track. Absence is now its own branch: the hours stand
 *    alone and the card says there is no goal.
 * 2. **The bar is a real `progressbar` with a value.** It was a pair of plain
 *    `View`s inside a container whose `accessibilityLabel` was set on a
 *    non-`accessible` element — dead on iOS — so nothing about this card
 *    reached a screen reader at all.
 * 3. **The container stops claiming a name it cannot carry.** The label moves
 *    onto the elements that actually own each fact: one for the readout, the
 *    meter for the progress, one for the bed and wake times.
 * 4. **The track is a surface, not a hairline.** `colors.border` as a fill is
 *    nearly invisible on a dark seed, which made an empty bar and a half-full
 *    one hard to tell apart.
 * 5. **The quality words are props**, and the tag is a word as well as a
 *    colour — the base carried the rating in the tag's ink alone once the
 *    label was lost.
 */
function SleepBarV4({ hours, goal = 8, quality, bedtime, wakeTime, noGoalLabel = 'No goal set', qualityLabels, formatHours, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const parts = (0, goal_v4_1.goalParts)(hours, goal);
    const format = formatHours ?? ((h) => `${h}h`);
    const tone = quality ? QUALITY_TONE[quality] : 'primary';
    const qualityWord = quality ? (qualityLabels?.[quality] ?? QUALITY_LABEL[quality]) : null;
    const readout = (0, tone_v4_1.spokenLine)([
        `Sleep ${format(parts.value)}`,
        parts.hasGoal ? `of ${format(parts.target ?? 0)}` : noGoalLabel,
        qualityWord ? `${qualityWord} quality` : null,
    ]);
    const times = (0, tone_v4_1.spokenLine)([
        bedtime ? `Bedtime ${bedtime}` : null,
        wakeTime ? `Wake ${wakeTime}` : null,
    ]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, tone_v4_1.cardStyle)(theme, appearance), style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: readout, style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: "\uD83D\uDE34" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", tone: "onSurface", numeric: "tabular", children: format(parts.value) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: parts.hasGoal ? `/ ${format(parts.target ?? 0)}` : noGoalLabel })] }), qualityWord ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", style: { color: (0, tone_v4_1.toneInk)(theme, tone) }, children: qualityWord })) : null] }), parts.hasGoal ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: readout, accessibilityValue: (0, tone_v4_1.percentValue)(parts.percent), style: {
                    height: tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, tone_v4_1.trackGround)(theme),
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: `${Math.round((parts.ratio ?? 0) * 100)}%`,
                        height: '100%',
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, tone_v4_1.toneFill)(theme, tone),
                    } }) })) : null, times ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: times, style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: bedtime ? `🌙 ${bedtime}` : '' }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: wakeTime ? `☀️ ${wakeTime}` : '' })] })) : null] }));
}
//# sourceMappingURL=SleepBarV4.js.map