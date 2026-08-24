"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftCardRow = GiftCardRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const money_1 = require("../commerce/money");
const STATUS_META = {
    active: { label: 'Active', slot: 'success' },
    redeemed: { label: 'Redeemed', slot: 'muted' },
    expired: { label: 'Expired', slot: 'danger' },
    pending: { label: 'Pending', slot: 'warn' },
};
/**
 * A gift-card wallet row: a gift glyph, the face value with remaining balance,
 * the (masked) code and expiry, and a status badge. `status` carries the state
 * word and accent (never color alone) — `redeemed`/`expired` dim the row. When
 * balance differs from the face value both are shown. Amounts are integer cents
 * via {@link formatMoney}. Token-only colors via semantic slots + `withAlpha`.
 */
function GiftCardRow({ amountCents, balanceCents, currency = 'USD', code, status = 'active', expires, note, formatMoney: format = money_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status] ?? STATUS_META.active;
    const accent = colors[meta.slot];
    const balance = typeof balanceCents === 'number' ? balanceCents : amountCents;
    const spent = balance < amountCents;
    const dim = status === 'redeemed' || status === 'expired';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `Gift card ${format(balance, currency)}${spent ? ` of ${format(amountCents, currency)}` : ''}, ${meta.label}${expires ? `, ${expires}` : ''}`, accessibilityState: { disabled: dim }, disabled: !onPress, onPress: onPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                opacity: dim ? 0.6 : pressed && onPress ? 0.94 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: "\uD83C\uDF81" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: format(balance, currency) }), spent ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["of ", format(amountCents, currency)] })) : null] }), code ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: code }) : null, note ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: note })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1, backgroundColor: (0, color_1.withAlpha)(accent, 0.16) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label }) }), expires ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: expires }) : null] })] }));
}
//# sourceMappingURL=GiftCardRow.js.map