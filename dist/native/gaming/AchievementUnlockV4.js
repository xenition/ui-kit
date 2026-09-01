"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementUnlockV4 = AchievementUnlockV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const arcade_v4_1 = require("./internal/arcade-v4");
/**
 * **V4 achievement unlock** — same props as {@link AchievementUnlock} plus
 * `lockedLabel` and `pointsUnit`.
 *
 * ## Five changes
 *
 * 1. **A locked achievement does not fire `onPress`.** The base set
 *    `accessibilityState={{ disabled: !unlocked }}` and left the `Pressable`
 *    live — the state is advisory, `disabled` is what actually blocks the
 *    press — so a locked trophy announced itself as unavailable and then
 *    opened anyway. (The web twin says `aria-disabled` and fires `onClick`,
 *    and its own docstring claims a real disabled `<button>`.) It is now
 *    genuinely disabled, and it dims to M3's 0.38 rather than staying at full
 *    strength.
 * 2. **The card announces its content.** The name was
 *    `` `${label}: ${title}` `` — the criteria and the point value, the two
 *    things that say what the trophy is *for*, were inside a subtree the label
 *    had already collapsed.
 * 3. **A trophy is identity, not a warning.** The medallion, its ring and the
 *    overline were all `warn` — a status slot spent on a decoration — and the
 *    overline used the `warn` *fill* as text. The medallion is the module's
 *    opaque neutral ground with the glyph as its ink, so it reads the same in
 *    both schemes and frees `warn` to mean warn.
 * 4. **`pointsUnit` replaces the bare `" G"`.** A gamerscore suffix is
 *    Xbox-specific copy hard-coded into a design system.
 * 5. **A press is a state layer**, not `opacity: 0.9`.
 */
function AchievementUnlockV4({ achievement, variant = 'toast', unlocked = true, label = 'Achievement unlocked', lockedLabel = 'Locked', pointsUnit = 'G', onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens, state } = theme;
    const inline = variant === 'inline';
    const medallion = tokens.spacing['2xl'] + tokens.spacing.sm;
    const overline = unlocked ? label : lockedLabel;
    const points = achievement.points != null ? `${achievement.points} ${pointsUnit}` : null;
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : colors.card,
                // A locked trophy is unavailable, so it wears M3's disabled band —
                // not the 0.6 the V2/V3 lines picked, which sits inside it and says
                // "disabled" about things that are not.
                opacity: unlocked ? 1 : state.disabledContent,
            },
            inline
                ? { alignItems: 'center', gap: tokens.spacing.sm }
                : { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: medallion,
                    height: medallion,
                    borderRadius: medallion / 2,
                    backgroundColor: (0, arcade_v4_1.placeholderGround)(theme),
                    borderWidth: 2,
                    borderColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", tone: "onCard", children: unlocked ? (achievement.glyph ?? '🏆') : '🔒' }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flex: inline ? undefined : 1,
                    minWidth: 0,
                    gap: tokens.spacing.xs / 2,
                    alignItems: inline ? 'center' : 'flex-start',
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", tone: "mutedText", align: inline ? 'center' : 'auto', style: { textTransform: 'uppercase' }, children: overline }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", numberOfLines: 2, align: inline ? 'center' : 'auto', children: achievement.title }), achievement.description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: inline ? 3 : 2, align: inline ? 'center' : 'auto', children: achievement.description })) : null, points ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", numeric: "tabular", children: points })) : null] })] }));
    const name = (0, arcade_v4_1.spokenLine)([overline, achievement.title, achievement.description, points]);
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: name, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, accessibilityState: { disabled: !unlocked }, 
        // Change 1: the state was set and the handler was left live.
        disabled: !unlocked, onPress: () => onPress(achievement), children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=AchievementUnlockV4.js.map