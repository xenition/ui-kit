"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceLine = InvoiceLine;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const appearance_1 = require("../primitives/internal/appearance");
const money_1 = require("../commerce/money");
const MoneyAmount_1 = require("./MoneyAmount");
/**
 * One invoice / receipt line: a description with a `qty × unit` sub-line and a
 * right-aligned line total. The total defaults to `unitPriceCents * quantity`
 * (integer cents — exact), rendered neutral-toned through {@link MoneyAmount}.
 * `emphasized` styles it as the grand-total row. Token-bound throughout.
 */
function InvoiceLine({ description, unitPriceCents, quantity = 1, currency = 'USD', amountCents, emphasized = false, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const qty = Number.isFinite(quantity) ? quantity : 1;
    const total = typeof amountCents === 'number' ? amountCents : Math.trunc(unitPriceCents) * qty;
    const showBreakdown = !emphasized && qty !== 1;
    // Appearance surface FIRST; layout (radius/padding) stays AFTER. Classic → unchanged.
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            surface,
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: emphasized ? '700' : '500',
                        }, children: description }), showBreakdown ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [qty, " \u00D7 ", (0, money_1.formatMoney)(Number.isFinite(unitPriceCents) ? Math.trunc(unitPriceCents) : 0, currency)] })) : null] }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: total, currency: currency, tone: "neutral", size: emphasized ? 'md' : 'sm', style: emphasized ? { fontWeight: '700' } : undefined })] }));
}
//# sourceMappingURL=InvoiceLine.js.map