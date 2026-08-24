"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxRow = TxRow;
exports.TxList = TxList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const EmptyState_1 = require("../commerce/EmptyState");
const format_1 = require("./internal/format");
const STATUS = {
    pending: { label: 'Pending', glyph: '◷', slot: 'warn' },
    confirmed: { label: 'Confirmed', glyph: '✓', slot: 'success' },
    failed: { label: 'Failed', glyph: '✕', slot: 'danger' },
};
/**
 * One transaction in a history feed: a status pill (glyph + label, so state is
 * never color-only), a truncated hash, an optional signed token amount +
 * fiat value, and a timestamp. Send reads `danger`, receive reads `success`.
 * Amounts are fixed-precision — no float drift. Becomes a button when
 * `onPress` is set.
 */
function TxRow({ hash, status = 'confirmed', direction, amount, symbol, decimals = 4, valueCents, currency = 'USD', timestamp, hashLead = 6, hashTail = 4, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS[status];
    const short = (0, format_1.truncateHash)(hash, hashLead, hashTail);
    const signedAmount = direction && amount != null ? (direction === 'send' ? -Math.abs(amount) : Math.abs(amount)) : amount;
    const amountToneKey = direction === 'send' ? 'danger' : direction === 'receive' ? 'success' : 'onSurface';
    const amountPrefix = direction === 'send' ? '−' : direction === 'receive' ? '+' : '';
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: meta.label, style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    backgroundColor: tokens.ramps.neutral[100],
                    borderRadius: tokens.radius.full,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[meta.slot], fontSize: tokens.typography.scale.xs }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[meta.slot], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: meta.label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                            fontVariant: ['tabular-nums'],
                        }, children: short }), timestamp != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: timestamp })) : null] }), signedAmount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                            color: colors[amountToneKey],
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '700',
                            fontVariant: ['tabular-nums'],
                        }, children: [amountPrefix, (0, format_1.formatToken)(Math.abs(signedAmount), { decimals, symbol })] }), valueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: valueCents, currency: currency, tone: "muted", size: "sm" })) : null] })) : null] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Transaction ${short}, ${meta.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
/**
 * A token-divided list of {@link TxRow}s with an explicit empty state. Row
 * keys fall back to the index when a `hash` collides. Purely presentational.
 */
function TxList({ items, emptyTitle = 'No transactions', emptyDescription, onSelectItem, style, }) {
    const { colors } = (0, theme_1.useXenitionTheme)();
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyTitle, description: emptyDescription }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: items.map((item, index) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: index < items.length - 1
                ? { borderBottomWidth: 1, borderBottomColor: colors.border }
                : undefined, children: (0, jsx_runtime_1.jsx)(TxRow, { ...item, onPress: onSelectItem ? () => onSelectItem(item, index) : item.onPress }) }, `${item.hash}-${index}`))) }));
}
//# sourceMappingURL=TxRow.js.map