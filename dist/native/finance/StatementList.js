"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementList = StatementList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyState_1 = require("../commerce/EmptyState");
const TransactionRow_1 = require("./TransactionRow");
/**
 * A statement feed: an optional section header over a token-divided list of
 * {@link TransactionRow}s. Handles the three list states explicitly —
 * `loading` renders shimmer-less skeleton rows, an empty `items` array renders
 * an {@link EmptyState}, and otherwise each entry becomes a pressable row
 * (row keys guard against a missing `id` by falling back to the index). No
 * fetching; purely presentational and token-bound.
 */
function StatementList({ items, header, onSelectItem, loading = false, loadingRows = 4, emptyTitle = 'No transactions', emptyDescription, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const headerNode = header != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            marginBottom: tokens.spacing.xs,
        }, children: header })) : null;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [headerNode, Array.from({ length: Math.max(1, loadingRows) }).map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading transaction", style: {
                        height: 44,
                        borderRadius: tokens.radius.sm,
                        backgroundColor: colors.border,
                        opacity: 0.5,
                        marginVertical: tokens.spacing.xs,
                    } }, i)))] }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [headerNode, (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyTitle, description: emptyDescription })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [headerNode, items.map((entry, index) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: index < items.length - 1
                    ? { borderBottomWidth: 1, borderBottomColor: colors.border }
                    : undefined, children: (0, jsx_runtime_1.jsx)(TransactionRow_1.TransactionRow, { title: entry.title, subtitle: entry.subtitle, amountCents: entry.amountCents, currency: entry.currency, direction: entry.direction, date: entry.date, icon: entry.icon, onPress: onSelectItem ? () => onSelectItem(entry, index) : undefined }) }, entry.id ?? String(index))))] }));
}
//# sourceMappingURL=StatementList.js.map