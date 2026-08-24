"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteCard = QuoteCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const money_1 = require("../commerce/money");
const internal_1 = require("./internal");
/**
 * Card for a sales quote / proposal: number, account, line-item count, grand
 * total (cents → `formatMoney`) and a lifecycle {@link Badge} whose glyph +
 * word carry the status (draft/sent/viewed/accepted/rejected/expired) so it is
 * never color-only. An optional inline action button (`onAction`) drives the
 * next step. All colors are theme tokens.
 */
function QuoteCard({ number, company, totalCents, currency = 'USD', lineItems, status, validUntil, actionLabel, onAction, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.QUOTE_META[status];
    const itemsLabel = lineItems != null && lineItems > 0 ? `${lineItems} item${lineItems === 1 ? '' : 's'}` : undefined;
    const body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { padding: "md", style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: number }), company ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: company })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `Status ${meta.label}`, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: (0, money_1.formatMoney)(totalCents, currency) }), itemsLabel || validUntil ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [itemsLabel, validUntil].filter(Boolean).join(' · ') })) : null] }), actionLabel && onAction ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "soft", size: "sm", onPress: onAction, children: actionLabel })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Quote ${number}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=QuoteCard.js.map