"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparableRow = ComparableRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const STATUS_TONE = { active: 'success', pending: 'warn', sold: 'neutral' };
/**
 * A comparable-sale ("comp") row for a valuation table — address, price, the
 * beds/baths/sqft facts, a derived $/sqft figure, distance, and a status chip.
 * The $/sqft is guarded against a missing or zero `sqft`. Data + `onPress`
 * only; nothing fetches. Reuses `Badge` and the shared `formatMoney`; token-only
 * colors and an a11y summary.
 */
function ComparableRow({ address, priceCents, currency = 'USD', sqft, beds, baths, distance, status, onPress, style, }) {
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
                backgroundColor: colors.surface,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: address }), status ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: STATUS_TONE[status], children: status }) : null] }), facts.length > 0 || distance ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [facts.join(' · '), distance].filter(Boolean).join(' · ') })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: (0, primitives_1.formatMoney)(priceCents, currency) }), perSqft != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${(0, primitives_1.formatMoney)(perSqft, currency)}/sqft` })) : null] })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${address}, ${(0, primitives_1.formatMoney)(priceCents, currency)}${facts.length ? `, ${facts.join(', ')}` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=ComparableRow.js.map