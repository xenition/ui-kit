"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionBarV4 = ReactionBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * ReactionBar — **V4** "feed" design. A clean wrap of emoji reaction pills, each
 * with a count. The selected reaction highlights with a soft-primary tint pill
 * (primary border + `withAlpha(primary)` fill + `primaryText` count); the rest
 * read on a plain surface with a `muted` count. A trailing `+` opens a fuller
 * picker upstream, and the empty tally is handled too. Same props/behavior as
 * {@link ReactionBarProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`, `accessibilityState.selected` per pill.
 */
function ReactionBarV4({ reactions, onReact, onAddReaction, emptyLabel = 'No reactions yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (reactions.length === 0 && !onAddReaction) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [{ color: colors.muted, fontSize: tokens.typography.scale.sm }, style], children: emptyLabel }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, style], children: [reactions.map((r) => {
                const selected = !!r.reacted;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${r.label ?? r.key}${r.count != null ? `, ${r.count}` : ''}`, accessibilityState: { selected }, disabled: !onReact, onPress: onReact ? () => onReact(r.key) : undefined, style: ({ pressed }) => ({
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.xs,
                        minHeight: 44,
                        borderRadius: tokens.radius.full,
                        borderWidth: 1,
                        borderColor: selected ? colors.primary : colors.border,
                        backgroundColor: selected
                            ? (0, color_1.withAlpha)(colors.primary, pressed ? 0.2 : 0.1)
                            : pressed
                                ? (0, color_1.withAlpha)(colors.primary, 0.1)
                                : colors.surface,
                        paddingHorizontal: tokens.spacing.md,
                    }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base }, children: r.emoji }), r.count != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: selected ? colors.primaryText : colors.muted,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '600',
                            }, children: r.count })) : null] }, r.key));
            }), onAddReaction ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Add reaction", onPress: onAddReaction, style: ({ pressed }) => ({
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 44,
                    minWidth: 44,
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: pressed ? (0, color_1.withAlpha)(colors.primary, 0.1) : colors.surface,
                    paddingHorizontal: tokens.spacing.md,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "+" }) })) : null] }));
}
//# sourceMappingURL=ReactionBarV4.js.map