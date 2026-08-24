"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardColumn = BoardColumn;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TaskRow_1 = require("./TaskRow");
/**
 * A single Kanban column — the vertical half of a board: a header with a title
 * and count chip, a stack of {@link TaskRow} cards (each toggleable), an optional
 * "+ Add" footer, and a muted empty placeholder. Mirrors the primitive `Kanban`
 * column but with task-aware rows. Guards a missing array. No literal colors.
 */
function BoardColumn({ title, cards, onToggleCard, onCardPress, onAddCard, width = 280, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const items = Array.isArray(cards) ? cards : [];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${title} column, ${items.length} cards`, style: [
            {
                width,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
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
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: items.length }) })] }), items.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.lg, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No cards" }) })) : (items.map((c) => ((0, jsx_runtime_1.jsx)(TaskRow_1.TaskRow, { title: c.title, done: c.done, variant: c.dueLabel ? 'dated' : 'priority', priority: c.priority ?? 'low', dueLabel: c.dueLabel, dueTone: c.dueTone, onToggle: (next) => onToggleCard?.(c.id, next), onPress: onCardPress ? () => onCardPress(c.id) : undefined, style: { borderWidth: 1, borderColor: colors.border } }, c.id)))), onAddCard ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Add card", onPress: onAddCard, style: ({ pressed }) => ({
                    paddingVertical: tokens.spacing.xs,
                    alignItems: 'center',
                    opacity: pressed ? 0.7 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "+ Add" }) })) : null] }));
}
//# sourceMappingURL=BoardColumn.js.map