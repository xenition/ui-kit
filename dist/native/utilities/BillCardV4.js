"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillCardV4 = BillCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
/**
 * BillCard — **V4** design. The clean, trust-first bill card: an elevated
 * rounded surface, the utility-kind glyph in a small brand-gradient disc (the
 * signature V4 touch), a status pill carrying text + glyph + color, and the
 * amount due in integer cents via `formatMoney`. Restraint by design — the money
 * stays on the calm surface; only the small disc is gradient. An optional pay
 * `Button` (danger tone when overdue) and whole-card press are preserved. Same
 * props as {@link BillCardProps}; token-only colors.
 */
function BillCardV4({ kind, provider, accountNumber, amountCents, dueDate, status = 'due', currency = 'USD', formatMoney: format = format_1.formatMoney, payLabel = 'Pay now', onPay, paying = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.billStatus)(status);
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const settled = status === 'paid';
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
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [card, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: { width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "xl", accessibilityLabel: `${kd.label} bill`, style: { color: (0, brand_1.brandInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: provider }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: [kd.label, " \u00B7 ", accountNumber] })] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: settled ? 'Paid' : 'Amount due' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: format(amount, currency) })] }), dueDate != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: settled ? 'Paid on' : 'Due' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: status === 'overdue' ? colors.dangerText : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: dueDate })] })) : null] }), onPay != null && !settled ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "primary", tone: status === 'overdue' ? 'danger' : 'default', onPress: onPay, loading: paying, style: { marginTop: tokens.spacing.md }, children: `${payLabel} · ${format(amount, currency)}` })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${provider}, ${kd.label} bill, ${sd.label}, ${format(amount, currency)}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=BillCardV4.js.map