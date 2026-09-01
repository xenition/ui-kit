"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePromptV4 = ProfilePromptV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const profile_v4_1 = require("./internal/profile-v4");
/** The rail and wash behind the `quote` variant. */
const QUOTE_TINT = 0.06;
const QUOTE_RAIL = 3;
/**
 * **V4 profile prompt** — same props as {@link ProfilePrompt} plus
 * `likeLabel`.
 *
 * ## Four changes
 *
 * 1. **The heart is a sibling of the prompt, not a child of it.** With
 *    `onPress` set, the base wrapped the whole block — heart included — in a
 *    `Pressable`. A button inside a button is one target on iOS: tapping the
 *    heart fired `onPress`, and a reader was offered the outer control only.
 *    The press now lives on the text block, and the heart sits beside it.
 * 2. **The heart is a real target.** It was a bare glyph with `hitSlop={8}`,
 *    which is roughly 18px of drawn control — `hitSlop` widens where a touch
 *    counts and changes nothing about what a switch-control or a low-vision
 *    user can see or aim at. It clears 44 now, and announces with one name
 *    plus `selected`, which is how the web twin announces it too.
 * 3. **A like is not an error.** The liked heart was `danger` — the slot that
 *    means something has gone wrong, on the most positive gesture in the
 *    product. It is the brand's corrected ink, and filled-vs-hollow carries
 *    the state so it is not colour alone.
 * 4. **Press is a state layer** over the block's own ground, not an `opacity`
 *    that makes a pressed prompt read as an unavailable one.
 */
function ProfilePromptV4({ prompt, answer, variant = 'card', glyph, liked = false, onPress, onLike, emptyLabel = 'No answer yet', likeLabel = 'Like this answer', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const hasAnswer = answer != null && answer.trim().length > 0;
    const shown = hasAnswer ? answer : emptyLabel;
    const quoted = hasAnswer && variant === 'quote' ? `“${answer}”` : shown;
    const spoken = (0, profile_v4_1.spokenLine)([prompt, shown]);
    const block = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.sm,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [glyph ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", allowFontScaling: false, children: glyph })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "mutedText", children: prompt })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: variant === 'quote' ? 'xl' : 'lg', weight: variant === 'quote' ? 'semibold' : 'medium', tone: hasAnswer ? 'onCard' : 'mutedText', style: { fontStyle: variant === 'quote' ? 'italic' : 'normal' }, children: quoted })] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: tokens.spacing.sm,
        }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1 }, children: ({ pressed }) => block(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1 }, children: block(false) })), onLike ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: likeLabel, accessibilityState: { selected: liked }, onPress: onLike, style: ({ pressed }) => ({
                    width: (0, chrome_v4_1.minTap)(tokens.spacing),
                    height: (0, chrome_v4_1.minTap)(tokens.spacing),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: (0, chrome_v4_1.minTap)(tokens.spacing) / 2,
                    backgroundColor: pressed
                        ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard)
                        : 'transparent',
                }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", style: { color: liked ? colors.primaryText : colors.mutedText }, children: liked ? '♥' : '♡' }) })) : null] }));
    if (variant === 'plain') {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: body });
    }
    if (variant === 'quote') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                {
                    flexDirection: 'row',
                    gap: tokens.spacing.sm,
                    // Composited: the same quote sits on a card and on the page, and a
                    // 6% wash of the brand is a different colour on each.
                    backgroundColor: (0, v4_depth_1.mixToken)(colors.card, colors.primary, QUOTE_TINT),
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                        width: QUOTE_RAIL,
                        alignSelf: 'stretch',
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.primary,
                    } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: body })] }));
    }
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: "outlined", padding: "md", style: style, children: body }));
}
//# sourceMappingURL=ProfilePromptV4.js.map