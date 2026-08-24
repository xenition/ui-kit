"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kanban = Kanban;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Horizontally scrolling board of titled columns, each a vertical stack of
 * cards with a count chip in its header — the display half of a Kanban. This is
 * a **non-drag** version (tap a card via `onCardPress`); wire your own gesture
 * layer for reordering. Empty columns render a muted placeholder. All colors and
 * spacing come from the compiled theme tokens via `useXenitionTheme()` — no
 * literal colors.
 */
function Kanban({ columns, onCardPress, columnWidth = 260, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: columns.map((column) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    width: columnWidth,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.surface,
                    padding: tokens.spacing.sm,
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: tokens.spacing.xs,
                            paddingBottom: tokens.spacing.xs,
                        }, children: [typeof column.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: column.title })) : (column.title), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    minWidth: tokens.spacing.lg,
                                    alignItems: 'center',
                                    paddingHorizontal: tokens.spacing.xs,
                                    paddingVertical: tokens.spacing.xs / 2,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: colors.muted,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: column.cards.length }) })] }), column.cards.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.lg, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No cards" }) })) : (column.cards.map((card) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", onPress: () => onCardPress?.(card, column), style: {
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: tokens.radius.sm,
                            padding: tokens.spacing.sm,
                            gap: tokens.spacing.xs,
                            backgroundColor: colors.surface,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: [typeof card.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: card.title })) : (card.title), card.trailing != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: card.trailing }) : null] }), card.description != null ? (typeof card.description === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: card.description })) : (card.description)) : null] }, card.id))))] }, column.key))) }) }));
}
//# sourceMappingURL=Kanban.js.map