"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsRow = MaterialsRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const MATERIAL_STOCK = {
    'in-stock': { label: 'In stock', glyph: '✓', tone: 'success' },
    low: { label: 'Low', glyph: '▲', tone: 'warn' },
    'back-ordered': { label: 'Back-ordered', glyph: '⋯', tone: 'danger' },
};
/**
 * One line in a materials / parts list: a leading box glyph disc, a name/SKU
 * stack with a quantity × unit-price breakdown, an optional stock pill (text +
 * glyph + a color that traces to a `SemanticColors` slot — never color alone),
 * and a right-aligned extended total (`qty × unit` in integer cents through
 * `formatMoney`, guarded against negatives). Becomes a button only when
 * `onPress` is supplied. No literals.
 */
function MaterialsRow({ name, sku, quantity, unit = 'ea', unitCents, stock, currency = 'USD', formatMoney: format = format_1.formatMoney, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = stock ? MATERIAL_STOCK[stock] : undefined;
    const qty = Number.isFinite(quantity) ? Math.max(0, quantity) : 0;
    const unitSafe = Math.max(0, Math.trunc(unitCents || 0));
    const totalCents = Math.round(qty * unitSafe);
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
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.1),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDCE6", accessibilityLabel: "Material" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [qty, " ", unit, " \u00D7 ", format(unitSafe, currency)] }), sku != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", sku] })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: format(totalCents, currency) }), sd ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })) : null] })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${qty} ${unit}, ${format(totalCents, currency)}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=MaterialsRow.js.map