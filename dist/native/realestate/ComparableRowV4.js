"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparableRowV4 = ComparableRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_TONE = { active: 'success', pending: 'warn', sold: 'neutral' };
/**
 * ComparableRow — **V4** "listing" design. The image-forward, editorial take on a
 * comparable-sale ("comp") row: a small rounded thumbnail, the address, the
 * price-forward sold figure, beds/baths/sqft facts as soft-primary chips, and a
 * derived $/sqft indicator. The row itself stays clean surface (no gradient).
 * The $/sqft is guarded against a missing or zero `sqft`. Same props/behavior as
 * {@link ComparableRowProps}. Token-only colors via `useXenitionTheme()`.
 */
function ComparableRowV4({ address, priceCents, currency = 'USD', sqft, beds, baths, distance, status, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const perSqft = typeof sqft === 'number' && sqft > 0 ? Math.round(priceCents / sqft) : null;
    const facts = [];
    if (typeof beds === 'number')
        facts.push(`${beds} bd`);
    if (typeof baths === 'number')
        facts.push(`${baths} ba`);
    if (typeof sqft === 'number')
        facts.push(`${sqft.toLocaleString()} sqft`);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.lg,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 48,
                    height: 48,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base }, children: "\uD83C\uDFE0" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: address }), status ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: STATUS_TONE[status], variant: "soft", children: status })) : null] }), facts.length > 0 || distance ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs, marginTop: 2 }, children: [facts.map((f) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    paddingHorizontal: tokens.spacing.sm,
                                    paddingVertical: 2,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: f }) }, f))), distance ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: distance })) : null] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: (0, primitives_1.formatMoney)(priceCents, currency) }), perSqft != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${(0, primitives_1.formatMoney)(perSqft, currency)}/sqft` })) : null] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${address}, ${(0, primitives_1.formatMoney)(priceCents, currency)}${facts.length ? `, ${facts.join(', ')}` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=ComparableRowV4.js.map