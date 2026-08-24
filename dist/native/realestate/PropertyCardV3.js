"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyCardV3 = PropertyCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_TONE = {
    active: 'success',
    pending: 'warn',
    sold: 'danger',
    new: 'primary',
};
const STATUS_LABEL = {
    active: 'Active',
    pending: 'Pending',
    sold: 'Sold',
    new: 'New',
};
/**
 * PropertyCard — design variant **V3**: a horizontal **list row** with a square
 * thumbnail on the left, the address block in the middle, and a **price rail**
 * pinned to the right — a primary-tinted panel with an accent edge that carries
 * the price. Where V1 is a vertical media-top tile, V3 scans as a dense list
 * item. Same props as {@link PropertyCardProps}; only the layout differs.
 * Token-only: the rail fill is `withAlpha` of the primary token.
 */
function PropertyCardV3({ address, locality, priceCents, currency = 'USD', variant = 'sale', beds, baths, sqft, imageUrl, status, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const facts = [];
    if (typeof beds === 'number')
        facts.push(`${beds} bd`);
    if (typeof baths === 'number')
        facts.push(`${baths} ba`);
    if (typeof sqft === 'number')
        facts.push(`${sqft.toLocaleString()} sqft`);
    const thumb = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: 104,
            alignSelf: 'stretch',
            backgroundColor: tokens.ramps.neutral[200] ?? colors.border,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "No photo" })) }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                minHeight: 96,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                overflow: 'hidden',
            },
            style,
        ], children: [thumb, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, minWidth: 0, paddingVertical: tokens.spacing.md, paddingHorizontal: tokens.spacing.md, gap: 2, justifyContent: 'center' }, children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Loading listing\u2026" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [status ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', marginBottom: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: STATUS_TONE[status], children: STATUS_LABEL[status] }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: address }), locality ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: locality })) : null, facts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: facts.join(' · ') })) : null] })) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingHorizontal: tokens.spacing.md,
                    borderLeftWidth: 2,
                    borderLeftColor: (0, color_1.withAlpha)(colors.primary, 0.5),
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.08),
                }, children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "\u2014" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: (0, primitives_1.formatMoney)(priceCents, currency) }), variant === 'rent' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "/mo" })) : null] })) })] }));
    if (!onPress)
        return body;
    const priceLabel = `${(0, primitives_1.formatMoney)(priceCents, currency)}${variant === 'rent' ? ' per month' : ''}`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${address}, ${priceLabel}${facts.length ? `, ${facts.join(', ')}` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=PropertyCardV3.js.map