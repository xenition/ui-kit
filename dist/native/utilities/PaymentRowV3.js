"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRowV3 = PaymentRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * PaymentRow, redesigned (v3): a **dense scan line**. A small state glyph leads,
 * the method and a middot-joined `date · status · reference` caption stack in the
 * flexible middle, and the amount hugs the right (muted + struck when voided). No
 * disc, no card, no badge — the most compact of the three for long histories.
 * Distinct at a glance from v1/v2. Same props; state is glyph + label text (never
 * color alone); integer cents; token-pure.
 */
function PaymentRowV3({ amountCents, date, status, method, reference, currency = 'USD', formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = (0, status_1.paymentState)(status);
    const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const voided = status === 'failed' || status === 'refunded';
    const caption = [`${sd.glyph} ${sd.label}`, reference].filter((s) => s != null).join(' · ');
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: tint } }), (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: sd.glyph, size: "sm", accessibilityLabel: sd.label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: method ?? 'Payment' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${date} · ${caption}` })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: voided ? colors.muted : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '700',
                    textDecorationLine: voided ? 'line-through' : 'none',
                }, children: format(amount, currency) })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Payment ${format(amount, currency)}, ${date}, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=PaymentRowV3.js.map