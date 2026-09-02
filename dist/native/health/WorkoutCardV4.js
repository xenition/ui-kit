"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutCardV4 = WorkoutCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const tone_v4_1 = require("./internal/tone-v4");
const WORKOUT_GLYPH = {
    strength: '🏋️',
    cardio: '❤️',
    yoga: '🧘',
    cycling: '🚴',
    running: '🏃',
    swimming: '🏊',
    hiit: '🔥',
    walking: '🚶',
};
const WORKOUT_LABEL = {
    strength: 'Strength',
    cardio: 'Cardio',
    yoga: 'Yoga',
    cycling: 'Cycling',
    running: 'Running',
    swimming: 'Swimming',
    hiit: 'HIIT',
    walking: 'Walking',
};
/**
 * **V4 workout card** — same props as {@link WorkoutCard} plus `statLabels`
 * and `completedLabel`.
 *
 * ## Five changes
 *
 * 1. **A discipline is not a status.** The base tinted the eyebrow by
 *    variant — `cardio: 'danger'`, `running: 'warn'`, `walking: 'success'` —
 *    so a card announcing a gentle walk was green with approval and one
 *    announcing a cardio session was in the same red the kit uses for an
 *    error. Identity keeps the glyph and the word and takes ordinary ink;
 *    `success` is then free to mean "you finished this".
 * 2. **The stat strip is guarded.** Native laid it out unconditionally, so a
 *    workout with neither a duration nor a calorie figure drew an empty
 *    `xl`-wide gap where the numbers would have been. The web twin already
 *    guarded it — this is the two halves disagreeing.
 * 3. **The card's name is `accessible` and complete.** It sat on a plain
 *    `View` (dead on iOS) and named only the discipline and the title, leaving
 *    out the description, the duration and the calories.
 * 4. **The name sits beside the "Start" button, not around it.** An
 *    `accessible` container would flatten the one control on the card, so the
 *    spoken region wraps the media and text and the button is its sibling.
 * 5. **`Duration`, `Calories` and `Completed` are props**, and the card uses
 *    the V4 button and the `*Text` ink slots throughout.
 *
 * **Renders nothing without a `title`.**
 */
function WorkoutCardV4({ title, variant, durationMin, calories, description, completed = false, startLabel = 'Start', statLabels, completedLabel = 'Completed', onStart, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!title)
        return null;
    const discipline = WORKOUT_LABEL[variant];
    const durationLabel = statLabels?.duration ?? 'Duration';
    const caloriesLabel = statLabels?.calories ?? 'Calories';
    const hasStats = durationMin != null || calories != null;
    const name = (0, tone_v4_1.spokenLine)([
        discipline,
        title,
        description,
        durationMin != null ? `${durationLabel} ${durationMin} min` : null,
        calories != null ? `${caloriesLabel} ${calories} kcal` : null,
        completed ? completedLabel : null,
    ]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, tone_v4_1.cardStyle)(theme, appearance), { gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", allowFontScaling: false, children: WORKOUT_GLYPH[variant] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", tone: "mutedText", style: { textTransform: 'uppercase' }, children: discipline }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onSurface", numberOfLines: 1, children: title })] })] }), description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 2, children: description })) : null, hasStats ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xl }, children: [durationMin != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: durationLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numeric: "tabular", children: `${durationMin} min` })] })) : null, calories != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: caloriesLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numeric: "tabular", children: `${calories} kcal` })] })) : null] })) : null] }), completed ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", style: { color: (0, tone_v4_1.toneInk)(theme, 'success') }, children: `✓ ${completedLabel}` })) : onStart ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", onPress: onStart, children: startLabel })) : null] }));
}
//# sourceMappingURL=WorkoutCardV4.js.map