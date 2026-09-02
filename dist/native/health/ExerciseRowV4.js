"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseRowV4 = ExerciseRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const appearance_1 = require("../primitives/internal/appearance");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** The check mark's box, as a fraction of the 44 target it sits in. */
const BOX_RATIO = 0.55;
/**
 * **V4 exercise row** — same props as {@link ExerciseRow} plus `setsLabel`,
 * `repsLabel`, `doneLabel` and `notDoneLabel`.
 *
 * ## Five changes
 *
 * 1. **The checkbox clears 44.** It was a 24px square — the second-smallest
 *    control in the module — on a row a lifter taps between sets with one
 *    sweaty thumb. The drawn box keeps its size; the *target* around it does
 *    not.
 * 2. **Press is a state layer.** `opacity: pressed ? 0.7 : 1` fades the row's
 *    own content, which is the signal M3 spends 0.38 on to mean *disabled*, so
 *    a pressed row and a dead row looked alike.
 * 3. **The non-toggling branch is `accessible`.** It set a full computed name
 *    on a plain `Animated.View`, which is never an accessibility element on
 *    iOS, so a read-only exercise list announced nothing at all.
 * 4. **`'sets'`, `'reps'`, `'done'` and `'not done'` are props.** They were
 *    English literals inside a spoken string, which is the one place a
 *    hard-coded word cannot be worked around by the caller.
 * 5. **It is a row from the shared row family**, so an exercise row, a
 *    settings row and a notification row are one height and one rhythm rather
 *    than a hand-typed `minHeight: 52`.
 *
 * **Renders nothing without a `name`.**
 */
function ExerciseRowV4({ name, sets, reps, weight, done = false, meta, setsLabel = 'sets', repsLabel = 'reps', doneLabel = 'done', notDoneLabel = 'not done', onToggle, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const prescription = sets != null && reps != null
        ? `${sets} × ${reps}`
        : sets != null
            ? `${sets} ${setsLabel}`
            : reps != null
                ? `${reps} ${repsLabel}`
                : undefined;
    const details = [prescription, weight != null ? String(weight) : undefined, meta].filter((part) => part != null && part !== '');
    const spoken = (0, tone_v4_1.spokenLine)([name, ...details, done ? doneLabel : notDoneLabel]);
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const box = Math.round(tap * BOX_RATIO);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            appearance !== 'classic'
                ? { ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens), borderRadius: tokens.radius.md }
                : null,
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: details.length > 0 }),
            pressed ? { backgroundColor: (0, state_v4_1.pressFill)(theme) } : null,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: done ? 'mutedText' : 'onSurface', numberOfLines: 1, children: name }), details.length > 0 ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: (0, tone_v4_1.metaLine)(details) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tap, height: tap, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: box,
                        height: box,
                        borderRadius: tokens.radius.sm,
                        borderWidth: 2,
                        borderColor: done ? colors.success : (0, tone_v4_1.trackGround)(theme),
                        backgroundColor: done ? colors.success : 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: done ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", allowFontScaling: false, style: { color: colors.onSuccess }, children: "\u2713" })) : null }) })] }));
    if (!onToggle) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: done }, accessibilityLabel: spoken, onPress: () => onToggle(!done), children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=ExerciseRowV4.js.map