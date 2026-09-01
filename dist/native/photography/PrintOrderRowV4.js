"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintOrderRowV4 = PrintOrderRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const PriceTag_1 = require("../commerce/PriceTag");
const STATUS = {
    pending: { label: 'Pending', tone: 'neutral', glyph: '⏳' },
    printing: { label: 'Printing', tone: 'warn', glyph: '🖨' },
    shipped: { label: 'Shipped', tone: 'primary', glyph: '📦' },
    delivered: { label: 'Delivered', tone: 'success', glyph: '✅' },
};
/**
 * PrintOrderRow — **V4** "studio" design (native parity of the web V4). The
 * matted take on a print-order line: an elevated clean-surface row with a leading
 * glyph tile floating inside a thin neutral **mat**, a bold product name, a soft
 * muted meta line (size · finish · ×qty), and a trailing line total
 * ({@link PriceTag} of `unitPriceCents × quantity`) above a labelled status
 * `Badge`. Every `status` value carries glyph + token tone + label (never color
 * alone). Quantity is clamped to at least 1. Identical props/behavior to
 * {@link PrintOrderRowProps}; optional `onPress` exposes the row as a `button`.
 * Token-only colors via `useXenitionTheme()`.
 */
function PrintOrderRowV4({ product, size, finish, quantity = 1, unitPriceCents, currency = 'USD', status = 'pending', onPress, formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const qty = Math.max(1, Math.floor(quantity));
    const meta = STATUS[status];
    const metaBits = [];
    if (size)
        metaBits.push(size);
    if (finish)
        metaBits.push(finish);
    metaBits.push(`×${qty}`);
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: tokens.ramps.neutral[100],
                    borderWidth: 1,
                    borderColor: colors.border,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: product }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: metaBits.join(' · ') })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(PriceTag_1.PriceTag, { cents: unitPriceCents * qty, currency: currency, formatMoney: formatMoney, size: "sm" }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${product}, ${qty}, ${meta.label}`, onPress: onPress, style: ({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: rowStyle, children: inner });
}
//# sourceMappingURL=PrintOrderRowV4.js.map