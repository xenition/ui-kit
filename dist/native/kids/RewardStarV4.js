"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardStarV4 = RewardStarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const feedback_v4_1 = require("../../primitives/internal/feedback-v4");
const color_1 = require("../../theme/color");
const family_v4_1 = require("../../kids/family-v4");
const tone_v4_1 = require("./internal/tone-v4");
const SIZE_KEY = {
    sm: 'lg',
    md: 'xl',
    lg: '2xl',
};
/**
 * **V4 reward star** — same props as {@link RewardStar} plus `formatCount` and
 * `awardLabel`.
 *
 * ## Four changes
 *
 * 1. **The swipe gestures the control promised now exist — as buttons.** The
 *    base declared `accessibilityRole="adjustable"` and no
 *    `accessibilityActions`, so VoiceOver offered swipe-up and swipe-down and
 *    both did **nothing**: the control announced itself as adjustable and could
 *    not be adjusted. The web twin meanwhile used `role="group"`/`"img"`, so
 *    the same component was two different things on two platforms. Both twins
 *    now use one model — **one real button per star** — because it is the only
 *    one both platforms can express identically, it needs no gesture
 *    vocabulary, and a child using switch control or a keyboard reaches every
 *    value directly instead of stepping through them.
 * 2. **The stars are targets.** They were a ~20px glyph with `hitSlop={6}` — a
 *    32px target with slop that overlaps its neighbours', in a module built for
 *    people whose aim is worse than an adult's. Each star is now a 44 control.
 * 3. **The count is drawn as a number, not only as five pictures of one.**
 *    `starParts` clamps what is **drawn** and leaves the caller's own value
 *    alone, and the numeral beside the glyphs is what a low-vision or
 *    colour-blind user actually reads — five glyphs at `sm` are not a number.
 *    It is `formatCount`, so it translates.
 * 4. **Press is a state layer** rather than `opacity: pressed ? 0.6 : 1`, which
 *    is well inside M3's *disabled* band, and the filled star's ink is held to
 *    3:1 against the ground rather than being whatever `colors[color]` happened
 *    to be.
 *
 * **Renders nothing when there is no scale to draw** (`max <= 0`, §4.5).
 */
function RewardStarV4({ value, max = 5, size = 'md', label, color = 'warn', readOnly = false, formatCount, awardLabel = 'Award', onReward, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const parts = (0, family_v4_1.starParts)(value, max);
    if (!parts.hasScale)
        return null;
    const format = formatCount ?? ((filled, total) => `${filled} of ${total} stars`);
    const count = format(parts.filled, parts.max);
    const interactive = !readOnly && !!onReward;
    // A star is a graphic, so 3:1 — and against the card it is drawn on, not
    // against whatever ground `colors[color]` was measured on.
    const filledInk = (0, color_1.ensureContrast)(colors[color], colors.card, feedback_v4_1.MIN_NON_TEXT_CONTRAST);
    const star = (isFilled) => ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: SIZE_KEY[size] ?? 'xl', allowFontScaling: false, style: { color: isFilled ? filledInk : colors.mutedText }, children: isFilled ? '★' : '☆' }));
    const glyphs = Array.from({ length: parts.max }).map((_, i) => {
        const isFilled = i < parts.filled;
        if (!interactive) {
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { paddingHorizontal: tokens.spacing.xs / 2 }, children: star(isFilled) }, i));
        }
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${awardLabel}: ${format(i + 1, parts.max)}`, accessibilityState: { selected: isFilled }, onPress: () => onReward?.(i + 1), style: ({ pressed }) => [
                (0, tone_v4_1.tapTargetStyle)(theme),
                {
                    borderRadius: tokens.radius.full,
                    backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                },
            ], children: star(isFilled) }, i));
    });
    const row = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: glyphs }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs, alignItems: 'flex-start' }, style], children: [row, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: (0, tone_v4_1.spokenLine)([count, label]) })] }));
}
//# sourceMappingURL=RewardStarV4.js.map