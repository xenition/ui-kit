"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodPickerV4 = MoodPickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("./internal/tone-v4");
const MOOD_GLYPH = {
    awful: '😣',
    bad: '🙁',
    okay: '😐',
    good: '🙂',
    great: '😄',
};
const MOOD_LABEL = {
    awful: 'Awful',
    bad: 'Bad',
    okay: 'Okay',
    good: 'Good',
    great: 'Great',
};
/**
 * Mood → tone. `okay` is `neutral` rather than the base's `muted`, which was
 * the *unselected* treatment, so choosing it produced no visible change at all.
 * The rest keep their reading: a mood genuinely is a status.
 */
const MOOD_TONE = {
    awful: 'danger',
    bad: 'warn',
    okay: 'neutral',
    good: 'primary',
    great: 'success',
};
const MOOD_ORDER = ['awful', 'bad', 'okay', 'good', 'great'];
/** One face. Its own component so each option can own its press state. */
function MoodFaceV4({ mood, label, selected, showLabels, onChange, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tone = MOOD_TONE[mood];
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const fill = selected ? (0, tone_v4_1.toneFill)(theme, tone) : 'transparent';
    const ground = selected ? fill : colors.surface;
    const groundInk = selected ? (0, tone_v4_1.onPair)(theme, tone) : colors.onSurface;
    const face = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    width: tap,
                    height: tap,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: selected ? (0, tone_v4_1.toneFill)(theme, tone) : (0, tone_v4_1.trackGround)(theme),
                    // The press layer is mixed against the ground this face actually
                    // paints, with that ground's own paired ink — `onSurface` over a tone
                    // fill would be a layer nobody measured.
                    backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, ground, groundInk) : fill,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", allowFontScaling: false, children: MOOD_GLYPH[mood] }), selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            borderRadius: tokens.radius.full,
                            paddingHorizontal: tokens.spacing.xs,
                            backgroundColor: (0, tone_v4_1.toneFill)(theme, tone),
                        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", allowFontScaling: false, style: { color: (0, tone_v4_1.onPair)(theme, tone) }, children: "\u2713" }) })) : null] }), showLabels ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: selected ? 'bold' : 'regular', style: { color: selected ? (0, tone_v4_1.toneInk)(theme, tone) : colors.mutedText }, children: label })) : null] }));
    if (!onChange) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: label, accessibilityState: { checked: selected }, children: face(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", 
        // A radio's state is `checked`. The base sent `selected`, which VoiceOver
        // reads on a tab or a cell and ignores here, so no option was ever
        // announced as the chosen one.
        accessibilityState: { checked: selected }, accessibilityLabel: label, onPress: () => onChange(mood), children: ({ pressed }) => face(pressed) }));
}
/**
 * **V4 mood picker** — same props as {@link MoodPicker} plus `moodLabels`,
 * `groupLabel` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **Choosing "Okay" now does something.** Its tone was `muted`, which is
 *    exactly the unselected treatment, so the middle option of a five-point
 *    scale gave no feedback at all — and with `showLabels={false}` nothing
 *    whatsoever distinguished it. Selection is a filled ground **and** a check
 *    mark now, so it survives a neutral tone, greyscale and CVD.
 * 2. **The unselected faces stop being dimmed.** `opacity: 0.5` on every
 *    option but the chosen one is inside M3's disabled band: picking a mood
 *    made the other four look unavailable rather than unchosen.
 * 3. **A radio announces `checked`.** The base sent `accessibilityState={{
 *    selected }}`, which is not the state a radio carries, so a reader was
 *    never told which mood was chosen.
 * 4. **The group has a name**, and it is explicitly *not* one accessibility
 *    element — an `accessible` radiogroup would swallow its own options.
 * 5. **A face clears 44** and presses with a state layer rather than
 *    `opacity: pressed ? 0.7 : 1`.
 */
function MoodPickerV4({ value, options = MOOD_ORDER, showLabels = true, moodLabels, groupLabel = 'Mood', appearance = 'classic', onChange, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View
    // Explicitly NOT `accessible`: a group that is one element flattens the
    // radios inside it and there is then nothing left to choose.
    , { 
        // Explicitly NOT `accessible`: a group that is one element flattens the
        // radios inside it and there is then nothing left to choose.
        accessible: false, accessibilityRole: "radiogroup", accessibilityLabel: groupLabel, style: [
            { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.xs },
            // `classic` is deliberately surface-free: a row of faces sits on the
            // page unless the caller asks for a treatment, exactly as the rings and
            // the streak readout do.
            (0, tone_v4_1.looseCardStyle)(theme, appearance),
            style,
        ], children: options.map((mood) => ((0, jsx_runtime_1.jsx)(MoodFaceV4, { mood: mood, label: moodLabels?.[mood] ?? MOOD_LABEL[mood], selected: value === mood, showLabels: showLabels, onChange: onChange }, mood))) }));
}
//# sourceMappingURL=MoodPickerV4.js.map