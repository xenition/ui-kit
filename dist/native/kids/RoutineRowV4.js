"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutineRowV4 = RoutineRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("./internal/tone-v4");
const SLOT_GLYPH = {
    morning: '🌅',
    afternoon: '☀️',
    evening: '🌆',
    bedtime: '🌙',
    anytime: '⏰',
};
/**
 * **V4 routine row** — same props as {@link RoutineRow} plus `onPress`,
 * `doneLabel` and `notDoneLabel`.
 *
 * ## Four changes
 *
 * 1. **A routine step can be opened.** The base made the *whole row* one
 *    `role="checkbox"`, which is the mirror image of `ChoreCard`'s defect: there
 *    was nowhere left to put "open this step", so a routine step could never be
 *    tapped into. The tick is now its own control — a real `checkbox` with its
 *    own name and a 44 target — and the label region is a `button` when
 *    `onPress` is supplied. Without `onPress` the label region stays inert and
 *    carries the row's spoken name, so the row still reads as one object.
 * 2. **The tick is a target, not a decoration.** It was a 24px circle with no
 *    floor under it; children aim worse than adults and it is the one thing on
 *    this row they touch every morning.
 * 3. **Disabled is 0.38, M3's band, not a hand-picked 0.5** — and it dims the
 *    *content* rather than the row's ground, so the row does not change colour
 *    when a step becomes unavailable.
 * 4. **Press is a state layer**, not `opacity: pressed ? 0.7 : 1`. An opacity
 *    that deep is what M3 spends on *disabled*, so a pressed row and a dead one
 *    looked alike. The row also paints `card`/`onCard` rather than the page's
 *    `surface`, so it reads as raised in dark mode.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
function RoutineRowV4({ label, slot = 'anytime', icon, time, done = false, disabled = false, doneLabel = 'done', notDoneLabel = 'not done', onToggle, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!label)
        return null;
    const glyph = icon ?? SLOT_GLYPH[slot] ?? SLOT_GLYPH.anytime;
    const stateWord = done ? doneLabel : notDoneLabel;
    const name = (0, tone_v4_1.spokenLine)([label, time, stateWord]);
    const content = (0, chrome_v4_1.disabledOpacity)(theme.state, disabled);
    const text = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minWidth: 0,
            gap: tokens.spacing.xs,
            opacity: content,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.sm,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, style: { textDecorationLine: done ? 'line-through' : 'none' }, children: label }), time ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: time })) : null] }));
    const tick = (pressed) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            (0, tone_v4_1.tapTargetStyle)(theme),
            {
                borderRadius: tokens.radius.full,
                opacity: content,
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
            },
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                width: tokens.spacing.lg,
                height: tokens.spacing.lg,
                borderRadius: tokens.radius.full,
                borderWidth: 1,
                borderColor: done ? (0, tone_v4_1.toneFill)(theme, 'success') : colors.border,
                backgroundColor: done ? (0, tone_v4_1.toneFill)(theme, 'success') : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
            }, children: done ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", allowFontScaling: false, style: { color: (0, tone_v4_1.onPair)(theme, 'success') }, children: "\u2713" })) : null }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, tone_v4_1.rowShellStyle)(theme), style], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { opacity: content }, children: glyph }), onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, accessibilityState: { disabled }, disabled: disabled, onPress: onPress, style: { flex: 1, minWidth: 0 }, children: ({ pressed }) => text(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: { flex: 1, minWidth: 0 }, children: text(false) })), onToggle ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityLabel: (0, tone_v4_1.spokenLine)([label, stateWord]), accessibilityState: { checked: done, disabled }, disabled: disabled, onPress: () => onToggle(!done), children: ({ pressed }) => tick(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: stateWord, children: tick(false) }))] }));
}
//# sourceMappingURL=RoutineRowV4.js.map