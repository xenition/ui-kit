"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyCardV4 = PropertyCardV4;
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
 * PropertyCard — **V4** "listing" design. The image-forward, editorial take on a
 * listing summary: an elevated card with a floating rounded photo, an overlaid
 * status chip, a price-forward header, and the beds/baths/sqft facts as small
 * soft-primary chips. Same props/behavior as {@link PropertyCardProps}; the
 * `sale`/`rent` variant only changes the price suffix. Token-only colors via
 * `useXenitionTheme()`. `loading` shows a recap.
 */
function PropertyCardV4({ address, locality, priceCents, currency = 'USD', variant = 'sale', beds, baths, sqft, imageUrl, status, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const facts = [];
    if (typeof beds === 'number')
        facts.push({ glyph: '🛏', value: `${beds} bd` });
    if (typeof baths === 'number')
        facts.push({ glyph: '🛁', value: `${baths} ba` });
    if (typeof sqft === 'number')
        facts.push({ glyph: '📐', value: `${sqft.toLocaleString()} sqft` });
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                padding: tokens.spacing.sm,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height: 190, borderRadius: tokens.radius.md, overflow: 'hidden', backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.08), alignItems: 'center', justifyContent: 'center' }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, style: { width: '100%', height: '100%' }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No photo" })), status ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: STATUS_TONE[status], variant: "soft", children: STATUS_LABEL[status] }) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.xs, paddingTop: tokens.spacing.md, paddingBottom: tokens.spacing.xs, gap: tokens.spacing.xs }, children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Loading listing\u2026" })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.PriceTag, { cents: priceCents, currency: currency, size: "lg" }), variant === 'rent' ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "/mo" }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: address }), locality ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: locality })) : null, facts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs, marginTop: 2 }, children: facts.map((f) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 4,
                                    paddingHorizontal: tokens.spacing.sm,
                                    paddingVertical: 2,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs }, children: f.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: f.value })] }, f.value))) })) : null] })) })] }));
    if (!onPress)
        return body;
    const priceLabel = `${(0, primitives_1.formatMoney)(priceCents, currency)}${variant === 'rent' ? ' per month' : ''}`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${address}, ${priceLabel}${facts.length ? `, ${facts.map((f) => f.value).join(', ')}` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=PropertyCardV4.js.map