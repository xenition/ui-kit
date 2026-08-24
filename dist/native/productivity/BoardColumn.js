"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardColumn = BoardColumn;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const TaskRow_1 = require("./TaskRow");
/** A single board card that fades/rises in on mount via the shared `useEnter`. */
function BoardCardRow({ card, onToggle, onPress, borderColor, }) {
    const enter = (0, motion_1.useEnter)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: enter, children: (0, jsx_runtime_1.jsx)(TaskRow_1.TaskRow, { title: card.title, done: card.done, variant: card.dueLabel ? 'dated' : 'priority', priority: card.priority ?? 'low', dueLabel: card.dueLabel, dueTone: card.dueTone, onToggle: (next) => onToggle?.(card.id, next), onPress: onPress ? () => onPress(card.id) : undefined, style: { borderWidth: 1, borderColor } }) }));
}
/**
 * A single Kanban column — the vertical half of a board: a header with a title
 * and count chip, a stack of {@link TaskRow} cards (each toggleable), an optional
 * "+ Add" footer, and a muted empty placeholder. Mirrors the primitive `Kanban`
 * column but with task-aware rows. Guards a missing array. No literal colors.
 */
function BoardColumn({ title, cards, onToggleCard, onCardPress, onAddCard, width = 280, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const items = Array.isArray(cards) ? cards : [];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${title} column, ${items.length} cards`, style: [
            (0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            {
                width,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.sm,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            minWidth: tokens.spacing.lg,
                            alignItems: 'center',
                            paddingHorizontal: tokens.spacing.xs,
                            paddingVertical: tokens.spacing.xs / 2,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.muted,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: items.length }) })] }), items.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.lg, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No cards" }) })) : (items.map((c) => ((0, jsx_runtime_1.jsx)(BoardCardRow, { card: c, onToggle: onToggleCard, onPress: onCardPress, borderColor: colors.border }, c.id)))), onAddCard ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Add card", onPress: onAddCard, style: ({ pressed }) => ({
                    paddingVertical: tokens.spacing.xs,
                    alignItems: 'center',
                    opacity: pressed ? 0.7 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "+ Add" }) })) : null] }));
}
//# sourceMappingURL=BoardColumn.js.map