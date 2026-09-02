"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolEventRowV4 = SchoolEventRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("./internal/tone-v4");
const TYPE_GLYPH = {
    holiday: '🏖️',
    exam: '📝',
    meeting: '👥',
    trip: '🚌',
    activity: '⚽',
    deadline: '⏳',
    other: '🏫',
};
const TYPE_LABEL = {
    holiday: 'Holiday',
    exam: 'Exam',
    meeting: 'Meeting',
    trip: 'Trip',
    activity: 'Activity',
    deadline: 'Deadline',
    other: 'Event',
};
/**
 * **V4 school event row** — same props as {@link SchoolEventRow} plus
 * `typeLabels`.
 *
 * ## Four changes
 *
 * 1. **An exam is not an error and a holiday is not a success.** The base drew
 *    `exam → danger` and `holiday → success`, spending two status colours on
 *    what is plainly a *category*. A child looking at their own calendar saw a
 *    red chip on the exam. Every type now wears the same neutral chip and is
 *    told apart by its glyph and its word, which is the only version that also
 *    survives greyscale and a screen reader.
 * 2. **The row's summary is not silently dropped.** The non-pressable branch
 *    put `accessibilityLabel` on a bare `View` with no `accessible`, which
 *    Android ignores entirely — so the row read as one name on iOS and as four
 *    loose fragments on Android.
 * 3. **The spoken name carries the whole row**, including the time, the
 *    location and which child it concerns. It stopped at the date before, so
 *    "Room 12" and "Maya" were on screen and nowhere else.
 * 4. **`card`/`onCard` and a state layer** instead of the page's `surface` and
 *    `opacity: pressed ? 0.85 : 1`, which is inside M3's *disabled* band.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function SchoolEventRowV4({ title, type = 'other', date, time, location, childName, typeLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const glyph = TYPE_GLYPH[type] ?? TYPE_GLYPH.other;
    const word = typeLabels?.[type] ?? TYPE_LABEL[type] ?? TYPE_LABEL.other;
    const caption = (0, tone_v4_1.metaLine)([date, time, location]);
    const spoken = (0, tone_v4_1.spokenLine)([word, title, date, time, location, childName]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, tone_v4_1.rowShellStyle)(theme),
            pressed ? { backgroundColor: (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) } : null,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: title }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null, childName ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: `👶 ${childName}` })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: tone_v4_1.IDENTITY_TONE, variant: "soft", size: "sm", children: word })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=SchoolEventRowV4.js.map