"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRow = PaymentRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * One line in a payment history: a tinted state glyph disc, a method/date stack,
 * a right-aligned amount, and a status pill. The state is conveyed redundantly
 * (glyph + label + a color that traces to a `SemanticColors` slot: paid →
 * success, failed → danger) so it is never color-alone. A refunded/failed amount
 * is shown muted with a strike so it reads as non-current at a glance. Amount is
 * integer cents via `formatMoney`. Becomes a button only when `onPress` is
 * supplied.
 */
function PaymentRow({ amountCents, date, status, method, reference, currency = 'USD', formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = (0, status_1.paymentState)(status);
    const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const voided = status === 'failed' || status === 'refunded';
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, format_1.withAlpha)(tint, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: sd.glyph, accessibilityLabel: sd.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: method ?? 'Payment' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: date }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: voided ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '700',
                            textDecorationLine: voided ? 'line-through' : 'none',
                        }, children: format(amount, currency) }), reference != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: reference })) : null] })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Payment ${format(amount, currency)}, ${date}, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=PaymentRow.js.map