"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRowV2 = PaymentRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * PaymentRow, redesigned (v2): a **method card**. The whole payment is a Card: a
 * tinted method-glyph tile leads, the method and reference stack in the middle,
 * and the right column sets the amount big above a status pill. A failed /
 * refunded amount is muted + struck so it reads non-current. Springs on press.
 * Distinct at a glance from v1's bare dense row and v3's line. Same props; state
 * is glyph + label + tone (never color alone); integer cents; token-pure.
 */
function PaymentRowV2({ amountCents, date, status, method, reference, currency = 'USD', formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = (0, status_1.paymentState)(status);
    const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const voided = status === 'failed' || status === 'refunded';
    const press = (0, motion_1.usePressScale)();
    const body = ((0, jsx_runtime_1.jsx)(primitives_2.Card, { variant: onPress ? 'interactive' : 'elevated', style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 48,
                        height: 48,
                        borderRadius: tokens.radius.md,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (0, format_1.withAlpha)(tint, 0.14),
                    }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: sd.glyph, size: "lg", accessibilityLabel: sd.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: method ?? 'Payment' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: reference != null ? `${date} · ${reference}` : date })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: voided ? colors.muted : colors.onSurface,
                                fontSize: tokens.typography.scale.lg,
                                fontWeight: '700',
                                textDecorationLine: voided ? 'line-through' : 'none',
                            }, children: format(amount, currency) }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] })] }) }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Payment ${format(amount, currency)}, ${date}, ${sd.label}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
//# sourceMappingURL=PaymentRowV2.js.map