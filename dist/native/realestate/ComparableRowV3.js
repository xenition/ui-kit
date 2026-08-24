"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparableRowV3 = ComparableRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const STATUS_COLOR = {
    active: 'success',
    pending: 'warn',
    sold: 'muted',
};
/**
 * ComparableRow — design variant **V3**: an **ultra-compact leaderboard line**.
 * Where V1 is a bordered card row, V3 is borderless with a leading status dot,
 * the address in the middle, and price + $/sq ft stacked tight on the right —
 * built to stack many comps with hairline separation. Same props as
 * {@link ComparableRowProps}; the $/sq ft figure is guarded against a
 * missing/zero `sqft`. Token-only: the status dot reads a semantic color slot.
 */
function ComparableRowV3({ address, priceCents, currency = 'USD', sqft, beds, baths, distance, status, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const perSqft = typeof sqft === 'number' && sqft > 0 ? Math.round(priceCents / sqft) : null;
    const facts = [];
    if (typeof beds === 'number')
        facts.push(`${beds} bd`);
    if (typeof baths === 'number')
        facts.push(`${baths} ba`);
    if (typeof sqft === 'number')
        facts.push(`${sqft.toLocaleString()} sqft`);
    const sub = [facts.join(' · '), distance].filter(Boolean).join(' · ');
    const dotColor = status ? colors[STATUS_COLOR[status]] : colors.border;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                backgroundColor: 'transparent',
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.xs,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: dotColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: address }), sub ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: sub })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: (0, primitives_1.formatMoney)(priceCents, currency) }), perSqft != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${(0, primitives_1.formatMoney)(perSqft, currency)}/sqft` })) : null] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${address}, ${(0, primitives_1.formatMoney)(priceCents, currency)}${facts.length ? `, ${facts.join(', ')}` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=ComparableRowV3.js.map