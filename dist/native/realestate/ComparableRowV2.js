"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparableRowV2 = ComparableRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const STATUS_TONE = { active: 'success', pending: 'warn', sold: 'neutral' };
const STATUS_LABEL = { active: 'Active', pending: 'Pending', sold: 'Sold' };
/**
 * ComparableRow — design variant **V2**: a **stat-forward, elevated card**.
 * Where V1 is a single bordered line (facts left, price right), V2 leads with an
 * address + status header and a metric strip of three `Statistic` cells —
 * price, $/sq ft, and size — reading as a valuation summary block rather than a
 * table row. Same props as {@link ComparableRowProps}; the $/sq ft figure is
 * still guarded against a missing/zero `sqft`. Token-only.
 */
function ComparableRowV2({ address, priceCents, currency = 'USD', sqft, beds, baths, distance, status, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 6 });
    const perSqft = typeof sqft === 'number' && sqft > 0 ? Math.round(priceCents / sqft) : null;
    const sizeBits = [];
    if (typeof beds === 'number')
        sizeBits.push(`${beds} bd`);
    if (typeof baths === 'number')
        sizeBits.push(`${baths} ba`);
    const sizeValue = sizeBits.join(' · ') || (typeof sqft === 'number' ? `${sqft.toLocaleString()} sqft` : '—');
    const facts = [];
    if (typeof beds === 'number')
        facts.push(`${beds} bd`);
    if (typeof baths === 'number')
        facts.push(`${baths} ba`);
    if (typeof sqft === 'number')
        facts.push(`${sqft.toLocaleString()} sqft`);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 0,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
                ...(0, elevation_1.shadow)('sm', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: address }), status ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: STATUS_TONE[status], children: STATUS_LABEL[status] }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Statistic, { label: "Price", value: (0, primitives_1.formatMoney)(priceCents, currency) }), (0, jsx_runtime_1.jsx)(primitives_1.Statistic, { label: "$/sq ft", value: perSqft != null ? (0, primitives_1.formatMoney)(perSqft, currency) : '—' }), (0, jsx_runtime_1.jsx)(primitives_1.Statistic, { label: distance ? 'Distance' : 'Size', value: distance ?? sizeValue })] })] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${address}, ${(0, primitives_1.formatMoney)(priceCents, currency)}${facts.length ? `, ${facts.join(', ')}` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
//# sourceMappingURL=ComparableRowV2.js.map