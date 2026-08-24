"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTicketRow = EventTicketRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const internal_1 = require("./internal");
/**
 * A selectable charity-event ticket row: tier name, price (integer cents →
 * `formatMoney`), optional tax-deductible portion, perks, and inventory, with a
 * radio indicator. Selection is conveyed by a filled indicator, a bold border,
 * and `accessibilityState` — not color alone. Sold-out rows are dimmed, badged
 * and non-interactive. All colors come from the compiled theme tokens — no
 * literal colors.
 */
function EventTicketRow({ name, priceCents, currency = 'USD', description, deductibleCents, remaining, soldOut, selected = false, onSelect, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isSoldOut = soldOut === true || remaining === 0;
    const isDisabled = disabled || isSoldOut;
    const lowStock = !isSoldOut && typeof remaining === 'number' && remaining > 0 && remaining <= 10;
    const priceLabel = (0, internal_1.formatMoney)(priceCents, currency);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled: isDisabled }, accessibilityLabel: `${name}, ${priceLabel}${isSoldOut ? ', sold out' : ''}`, disabled: isDisabled, onPress: onSelect, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: pressed && !isDisabled ? tokens.ramps.neutral[50] : colors.surface,
                opacity: isDisabled ? 0.6 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), isSoldOut ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "danger", children: "Sold out" }) : lowStock ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "warn", children: `${remaining} left` }) : null] }), description ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description }) : null, typeof deductibleCents === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs }, children: `${(0, internal_1.formatMoney)(deductibleCents, currency)} tax-deductible` })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: priceLabel }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: tokens.spacing.lg,
                    height: tokens.spacing.lg,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: selected ? colors.primary : colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing.sm, height: tokens.spacing.sm, borderRadius: tokens.radius.full, backgroundColor: colors.primary } })) : null })] }));
}
//# sourceMappingURL=EventTicketRow.js.map