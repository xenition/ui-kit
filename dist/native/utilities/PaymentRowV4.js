"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRowV4 = PaymentRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
/**
 * PaymentRow — **V4** design. The clean, trust-first payment line: an elevated
 * rounded surface, the settlement-state glyph in a small brand-gradient disc (the
 * signature V4 touch), a method/date stack with a status pill, and a right-aligned
 * amount. The state is still conveyed redundantly (glyph + label + a color that
 * traces to a `SemanticColors` slot: paid → success, failed → danger) so it is
 * never color-alone, and a refunded/failed amount stays muted with a strike.
 * Amount is integer cents via `formatMoney`; becomes a button only when `onPress`
 * is supplied. Same props as {@link PaymentRowProps}; token-only colors.
 */
function PaymentRowV4({ amountCents, date, status, method, reference, currency = 'USD', formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const sd = (0, status_1.paymentState)(status);
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const voided = status === 'failed' || status === 'refunded';
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [card, { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: sd.glyph, size: "lg", accessibilityLabel: sd.label, style: { color: (0, brand_1.brandInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: method ?? 'Payment' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: date }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: voided ? colors.mutedText : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '700',
                            textDecorationLine: voided ? 'line-through' : 'none',
                        }, children: format(amount, currency) }), reference != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: reference })) : null] })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Payment ${format(amount, currency)}, ${date}, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: row }));
}
//# sourceMappingURL=PaymentRowV4.js.map