"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardColumnV4 = BoardColumnV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const TaskRow_1 = require("./TaskRow");
/** A single board card that fades/rises in on mount via the shared `useEnter`. */
function BoardCardRow({ card, onToggle, onPress, borderColor, }) {
    const enter = (0, motion_1.useEnter)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: enter, children: (0, jsx_runtime_1.jsx)(TaskRow_1.TaskRow, { title: card.title, done: card.done, variant: card.dueLabel ? 'dated' : 'priority', priority: card.priority ?? 'low', dueLabel: card.dueLabel, dueTone: card.dueTone, onToggle: (next) => onToggle?.(card.id, next), onPress: onPress ? () => onPress(card.id) : undefined, style: { borderWidth: 1, borderColor } }) }));
}
/**
 * BoardColumn — **V4** "flow" design. The focused-workspace take on a Kanban
 * column: a calm header with the title and a **soft-primary count pill**, a
 * subtle column surface, the stack of {@link TaskRow} cards, and the "+ Add"
 * affordance. Guards a missing array and keeps title/count/cards/toggle
 * behavior. Same props/behavior as {@link BoardColumnProps}; token-only colors
 * via `useXenitionTheme()`.
 */
function BoardColumnV4({ title, cards, onToggleCard, onCardPress, onAddCard, width = 280, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const items = Array.isArray(cards) ? cards : [];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${title} column, ${items.length} cards`, style: [
            {
                width,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
                backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.04),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            minWidth: tokens.spacing.lg,
                            alignItems: 'center',
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs / 2,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: items.length }) })] }), items.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.lg, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No cards" }) })) : (items.map((c) => ((0, jsx_runtime_1.jsx)(BoardCardRow, { card: c, onToggle: onToggleCard, onPress: onCardPress, borderColor: colors.border }, c.id)))), onAddCard ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Add card", onPress: onAddCard, style: ({ pressed }) => ({
                    minHeight: 44,
                    justifyContent: 'center',
                    paddingVertical: tokens.spacing.xs,
                    alignItems: 'center',
                    opacity: pressed ? 0.7 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "+ Add" }) })) : null] }));
}
//# sourceMappingURL=BoardColumnV4.js.map