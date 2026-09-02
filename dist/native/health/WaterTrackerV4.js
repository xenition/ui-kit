"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterTrackerV4 = WaterTrackerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const goal_v4_1 = require("../../health/goal-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** The drawn glass, inside its 44 target. A tall rounded vessel, not a glyph. */
const GLASS_RATIO = 0.6;
/**
 * The card's own two English words.
 *
 * They are not props, deliberately: the health twins share one prop table, and
 * a prop that exists on only one platform is exactly the drift the V4 pass is
 * closing. Widening the table is a decision for both halves at once.
 */
const TITLE = 'Water';
const MET = 'goal reached';
/**
 * **V4 water tracker** — same props as {@link WaterTracker} plus
 * `noGoalLabel`, `formatAmount` and `glassLabel`.
 *
 * ## Six changes
 *
 * 1. **Ten glasses against a goal of eight now read as ten.** The base clamped
 *    the count into the goal, so someone who drank 2 500 ml saw "8 / 8 · 2000
 *    ml" — the overshoot, which is the only interesting thing about that day,
 *    was destroyed rather than merely not drawn. The extra glasses are drawn,
 *    counted and announced.
 * 2. **Filled and empty are different shapes, not different alphas.** The base
 *    wrote `{isFilled ? '🥛' : '🥛'}` — a dead ternary — and carried the whole
 *    distinction in `opacity: 0.3`, which is inside M3's disabled band and
 *    reads as "this glass is unavailable". A glass is now a drawn vessel with
 *    a real fill level.
 * 3. **A glass is a 44 target.** At roughly 20px they were the smallest
 *    controls in the module and the most tapped control on a hydration screen.
 * 4. **The readout is a real `progressbar`.** The base put an
 *    `accessibilityLabel` on a non-`accessible` `Animated.View`, where iOS
 *    ignores it, so the card had no spoken summary at all.
 * 5. **The "no goal" branch keeps `style` and `appearance`.** It returned a
 *    bare `<Text>` before either was applied.
 * 6. **Press is a state layer**, where `opacity: pressed ? 0.6 : 1` dimmed the
 *    glass into the same band that already meant "empty".
 */
function WaterTrackerV4({ count, goal, mlPerGlass, noGoalLabel = 'No hydration goal set', formatAmount, glassLabel, onChange, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const parts = (0, goal_v4_1.goalParts)(Math.floor(count), Math.floor(goal));
    const amount = formatAmount ?? ((ml) => `${ml} ml`);
    const nameGlass = glassLabel ??
        ((index, filled) => `Glass ${index + 1}, ${filled ? 'filled' : 'empty'}`);
    if (!parts.hasGoal) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [(0, tone_v4_1.cardStyle)(theme, appearance), style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: noGoalLabel, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: noGoalLabel }) }) }));
    }
    const target = parts.target ?? 0;
    const drunk = Math.max(0, Math.floor(parts.value));
    // Draw every glass that was actually logged, so a day past the goal looks
    // like a day past the goal rather than a day exactly on it.
    const slots = Math.max(target, drunk);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const glassWidth = Math.round(tap * GLASS_RATIO);
    const readout = (0, tone_v4_1.spokenLine)([
        TITLE,
        `${drunk} of ${target}`,
        mlPerGlass != null ? amount(drunk * mlPerGlass) : null,
        parts.met ? MET : null,
        parts.over > 0 ? `+${parts.over}` : null,
    ]);
    const press = (index) => {
        if (!onChange)
            return;
        const position = index + 1;
        onChange(position === drunk ? position - 1 : position);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, tone_v4_1.cardStyle)(theme, appearance), style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: readout, accessibilityValue: (0, tone_v4_1.percentValue)(parts.percent), style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", children: `💧 ${TITLE}` }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", numeric: "tabular", style: { color: parts.met ? (0, tone_v4_1.toneInk)(theme, 'success') : colors.mutedText }, children: `${drunk} / ${target}${mlPerGlass != null ? `  ·  ${amount(drunk * mlPerGlass)}` : ''}` })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap' }, children: Array.from({ length: slots }, (_, i) => {
                    const filled = i < drunk;
                    // Past the goal is a status — the goal was beaten — so `success` is
                    // spent on a status here rather than on an identity.
                    const fill = filled ? (i >= target ? colors.success : colors.primary) : 'transparent';
                    const glass = (pressed) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tap,
                            height: tap,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.md,
                            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: glassWidth,
                                height: glassWidth,
                                borderWidth: 2,
                                borderColor: filled ? fill : (0, tone_v4_1.trackGround)(theme),
                                backgroundColor: fill,
                                borderTopLeftRadius: tokens.radius.sm,
                                borderTopRightRadius: tokens.radius.sm,
                                borderBottomLeftRadius: tokens.radius.lg,
                                borderBottomRightRadius: tokens.radius.lg,
                            } }) }));
                    if (!onChange) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: nameGlass(i, filled), children: glass(false) }, i));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: filled }, accessibilityLabel: nameGlass(i, filled), onPress: () => press(i), children: ({ pressed }) => glass(pressed) }, i));
                }) })] }));
}
//# sourceMappingURL=WaterTrackerV4.js.map