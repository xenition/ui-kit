"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListV4 = ListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const state_v4_1 = require("./internal/state-v4");
/**
 * **V4 list** — same props as {@link List}, a different design line.
 *
 * The base list puts a hairline between every pair of rows and gives the title
 * and the description the same font size, so the only thing separating a name
 * from its subtitle is colour. That is two problems with one cause: structure
 * is being drawn instead of typeset.
 *
 * Three changes:
 *
 * 1. **Typography carries the hierarchy.** The title steps up to `base` at
 *    weight 600; the description drops to `xs` and stays muted. §10 asks for
 *    size, weight and contrast before containers and dividers, and a title
 *    that is bigger than its description does not need a line under the row to
 *    say where the row ends.
 * 2. **No divider between rows.** The gap between one row's description and
 *    the next row's title is the whole vertical padding of both — many times
 *    the two-pixel gap inside a row — so the grouping is already unambiguous.
 *    §9: spacing IS the structure. What is left is the one border around the
 *    list, because a list is a single object and earns a container (§11);
 *    the rows inside it are not `n` more objects.
 * 3. **A pressable row is a real target and tints, not lifts.** Every row
 *    takes `2xl` of height — the tap target the rest of the V4 line uses — and
 *    a press mixes `onSurface` into `surface`. The base's web twin used
 *    `hover:bg-neutral-50`, which is the light-oriented ramp: in dark mode
 *    that is a near-white slab. Mixing the two scheme-resolved slots follows
 *    the scheme for free.
 *
 * Nothing here gains a shadow. A list row that lifts is a card, and a stack of
 * cards inside a bordered list is exactly the "cards inside cards inside
 * cards" §8 bans.
 */
function ListV4({ items, style }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const pressedBg = (0, state_v4_1.pressFill)(theme);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
            },
            style,
        ], children: items.map((it, i) => {
            const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [it.leading != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: it.leading }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [typeof it.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    color: colors.onSurface,
                                    fontFamily: tokens.typography.fontBody,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '600',
                                }, children: it.title })) : (it.title), it.description != null ? (typeof it.description === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    color: colors.mutedText,
                                    fontFamily: tokens.typography.fontBody,
                                    fontSize: tokens.typography.scale.xs,
                                }, children: it.description })) : (it.description)) : null] }), it.trailing != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: it.trailing }) : null] }));
            // No `borderTopWidth`: the gap between rows already says where one
            // ends (§9).
            const rowStyle = {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                minHeight: tokens.spacing['2xl'],
                paddingHorizontal: tokens.spacing.lg,
                paddingVertical: tokens.spacing.md,
            };
            return it.onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", onPress: it.onPress, 
                // A press tints; it never lifts.
                style: ({ pressed }) => [
                    rowStyle,
                    { backgroundColor: pressed ? pressedBg : colors.surface },
                ], children: inner }, i)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [rowStyle, { backgroundColor: colors.surface }], children: inner }, i));
        }) }));
}
//# sourceMappingURL=ListV4.js.map