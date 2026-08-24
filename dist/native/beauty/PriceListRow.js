"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceListRow = PriceListRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const money_1 = require("../commerce/money");
/**
 * One line of a printed-style salon price list: a left label (+ optional note)
 * and a right-aligned price. `fromPrice` prefixes "from"; `compareAtCents`
 * strikes through the original; `durationMin` adds a small sub-line. The
 * `section` variant is a subdued header (bold label, no price). Prices are
 * integer cents via {@link formatMoney}. Token-only colors.
 */
function PriceListRow({ label, priceCents, currency = 'USD', fromPrice = false, note, durationMin, compareAtCents, variant = 'default', formatMoney: format = money_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (variant === 'section') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "header", accessibilityLabel: label, style: [
                { paddingVertical: tokens.spacing.sm, borderBottomColor: (0, color_1.withAlpha)(colors.muted, 0.25), borderBottomWidth: 1 },
                style,
            ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 }, children: label }) }));
    }
    const hasPrice = typeof priceCents === 'number';
    const priceText = hasPrice ? `${fromPrice ? 'from ' : ''}${format(priceCents, currency)}` : '—';
    const hasCompare = typeof compareAtCents === 'number' && hasPrice && compareAtCents > priceCents;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${label}${hasPrice ? `, ${priceText}` : ''}${durationMin != null ? `, ${durationMin} minutes` : ''}`, style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                borderBottomColor: (0, color_1.withAlpha)(colors.muted, 0.15),
                borderBottomWidth: 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), note ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: note }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [hasCompare ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textDecorationLine: 'line-through' }, children: format(compareAtCents, currency) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: priceText })] }), durationMin != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [durationMin, " min"] })) : null] })] }));
}
//# sourceMappingURL=PriceListRow.js.map