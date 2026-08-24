"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionBar = ReactionBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A wrap of emoji reaction pills, each with a count and a selected state.
 * Selected pills fill with the primary color; the rest read on-surface. An
 * optional `+` opens a fuller picker upstream. Handles the empty tally too.
 * Token-only.
 */
function ReactionBar({ reactions, onReact, onAddReaction, emptyLabel = 'No reactions yet', style, }) {
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
                        borderRadius: tokens.radius.full,
                        borderWidth: 1,
                        borderColor: selected ? colors.primary : colors.border,
                        backgroundColor: selected ? colors.primary : colors.surface,
                        paddingVertical: 2,
                        paddingHorizontal: tokens.spacing.sm,
                        opacity: pressed ? 0.8 : 1,
                    }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: r.emoji }), r.count != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: selected ? colors.onPrimary : colors.onSurface,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '600',
                            }, children: r.count })) : null] }, r.key));
            }), onAddReaction ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Add reaction", onPress: onAddReaction, style: ({ pressed }) => ({
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                    opacity: pressed ? 0.8 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "+" }) })) : null] }));
}
//# sourceMappingURL=ReactionBar.js.map