"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreakCounterV4 = StreakCounterV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const goal_v4_1 = require("../../health/goal-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 streak counter** — same props as {@link StreakCounter} plus
 * `unitPlural`, `emptyLabel`, `bestLabel` and `formatCount`.
 *
 * ## Four changes
 *
 * 1. **`unit="día"` no longer renders "díass".** The base appended `'s'`
 *    unconditionally, so every non-English unit this component was handed came
 *    out wrong. It goes through the shared `pluralizeUnit`, and `unitPlural`
 *    lets the caller's language be the caller's business.
 * 2. **The whole readout is `accessible`.** `accessibilityRole="summary"` and
 *    a computed label sat on a plain `Animated.View`, which is never an
 *    accessibility element on iOS — so the one component in the module whose
 *    entire content is a number announced nothing.
 * 3. **The record reaches the spoken name.** "Best: 42" was drawn and then
 *    left out of the label, which is the number a user checks the screen for.
 * 4. **Every English string is a prop**, and the flame is marked decorative so
 *    a reader hears "12 day streak" rather than "fire, 12".
 */
function StreakCounterV4({ count, unit = 'day', label = 'streak', tone = 'warn', best, unitPlural, emptyLabel = 'Start your streak', bestLabel = 'Best', formatCount, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const safe = Math.max(Math.floor(count), 0);
    const format = formatCount ?? ((n) => String(n));
    const unitWord = (0, goal_v4_1.pluralizeUnit)(safe, unit, unitPlural);
    const record = best != null && best > 0 ? Math.max(Math.floor(best), 0) : null;
    const recordLine = record != null ? `${bestLabel}: ${format(record)}` : null;
    const name = (0, tone_v4_1.spokenLine)([
        safe === 0 ? emptyLabel : `${format(safe)} ${unitWord} ${label}`,
        recordLine,
    ]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: name, style: [
            { alignItems: 'center', gap: tokens.spacing.xs },
            (0, tone_v4_1.looseCardStyle)(theme, appearance),
            style,
        ], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: safe === 0 ? '🌱' : '🔥' }), safe === 0 ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "3xl", weight: "bold", numeric: "tabular", style: { color: (0, tone_v4_1.toneInk)(theme, tone) }, children: format(safe) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", children: unitWord })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onSurface", children: label })] })), recordLine ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: recordLine })) : null] }));
}
//# sourceMappingURL=StreakCounterV4.js.map