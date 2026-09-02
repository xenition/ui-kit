"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitRowV4 = HabitRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const appearance_1 = require("../primitives/internal/appearance");
const row_v4_1 = require("../dashboard/internal/row-v4");
const goal_v4_1 = require("../../health/goal-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** The check disc, as a fraction of the 44 target it sits in. */
const DISC_RATIO = 0.6;
/**
 * **V4 habit row** — same props as {@link HabitRow} plus `doneLabel` and
 * `notDoneLabel`.
 *
 * ## Five changes
 *
 * 1. **The check clears 44.** It was a 26px disc, and ticking a habit off is
 *    the single thing this row exists for.
 * 2. **The streak is a sibling of the toggle, not a descendant.** A
 *    `Pressable` is `accessible` by default and flattens everything under it,
 *    so the streak count was folded into the checkbox and could not be reached
 *    on its own. The row is a plain `View` now, the checkbox wraps the check
 *    and the habit's text, and the streak sits beside it with its own name.
 * 3. **The non-toggling branch is `accessible`**, so its label is no longer
 *    dead on iOS.
 * 4. **Press is a state layer**, where `opacity: pressed ? 0.7 : 1` dimmed the
 *    row's content into M3's disabled band.
 * 5. **The streak count is pluralised properly**, through the shared
 *    `pluralizeUnit`, rather than by appending `'s'` — and the flame is marked
 *    decorative so a reader hears "5 day streak" instead of "fire, 5".
 *
 * **Renders nothing without a `name`.**
 */
function HabitRowV4({ name, done, streak = 0, meta, doneLabel = 'done', notDoneLabel = 'not done', onToggle, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const safeStreak = Math.max(Math.floor(streak), 0);
    const spoken = (0, tone_v4_1.spokenLine)([name, done ? doneLabel : notDoneLabel, meta]);
    const streakName = safeStreak > 0 ? `${safeStreak} ${(0, goal_v4_1.pluralizeUnit)(safeStreak, 'day')} streak` : null;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const disc = Math.round(tap * DISC_RATIO);
    const toggle = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tap, height: tap, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: disc,
                        height: disc,
                        borderRadius: tokens.radius.full,
                        borderWidth: 2,
                        borderColor: done ? colors.success : (0, tone_v4_1.trackGround)(theme),
                        backgroundColor: done ? colors.success : pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: done ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", allowFontScaling: false, style: { color: colors.onSuccess }, children: "\u2713" })) : null }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: done ? 'mutedText' : 'onSurface', numberOfLines: 1, style: { textDecorationLine: done ? 'line-through' : 'none' }, children: name }), meta ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: meta })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            appearance !== 'classic'
                ? { ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens), borderRadius: tokens.radius.md }
                : null,
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: meta != null && meta !== '' }),
            style,
        ], children: [onToggle ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: done }, accessibilityLabel: spoken, onPress: () => onToggle(!done), style: { flex: 1, minWidth: 0 }, children: ({ pressed }) => toggle(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1, minWidth: 0 }, children: toggle(false) })), streakName ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: streakName, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: "\uD83D\uDD25" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", numeric: "tabular", style: { color: (0, tone_v4_1.toneInk)(theme, 'warn') }, children: safeStreak })] })) : null] }));
}
//# sourceMappingURL=HabitRowV4.js.map