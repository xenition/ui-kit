"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickRepliesV4 = QuickRepliesV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
/**
 * **V4 quick replies** — same props as {@link QuickReplies} plus `wrap` and
 * `groupLabel`.
 *
 * ## Three changes
 *
 * 1. **The chips wrap.** See `wrap` — the base scrolled them, so the last
 *    reply was off-screen with no affordance saying it existed.
 * 2. **Every chip clears 44** and presses with a state layer over its own
 *    fill, not an opacity on its label.
 * 3. **The set is announced as one group**, so a reader hears "Quick replies,
 *    3 items" instead of three unrelated buttons.
 *
 * **Renders nothing for an empty list** (§4.5).
 */
function QuickRepliesV4({ replies, wrap = true, groupLabel = 'Quick replies', onSelect, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const list = replies?.filter((r) => r?.label) ?? [];
    if (list.length === 0)
        return null;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const chips = list.map((reply) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: reply.label, onPress: () => onSelect?.(reply.id), style: ({ pressed }) => ({
            minHeight: tap,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : colors.card,
            paddingHorizontal: tokens.spacing.md,
        }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", children: reply.label }) }, reply.id)));
    if (!wrap) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, accessibilityRole: "list", accessibilityLabel: groupLabel, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm }, style: style, children: chips }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: groupLabel, style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style], children: chips }));
}
//# sourceMappingURL=QuickRepliesV4.js.map