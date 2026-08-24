"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyCardV2 = PropertyCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
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
 * PropertyCard — design variant **V2**: a **full-bleed hero photo** with a
 * bottom gradient scrim and the price / address / beds-baths chips overlaid
 * directly on the image. Where V1 is a media-top card with a separate white
 * body, V2 is one immersive tile — the photo fills the frame and the facts sit
 * on a dark scrim at the bottom. Same props as {@link PropertyCardProps}; only
 * the layout differs. Token-only: the scrim is `withAlpha` of the neutral ramp,
 * overlay text is the lightest neutral step, chips are translucent.
 */
function PropertyCardV2({ address, locality, priceCents, currency = 'USD', variant = 'sale', beds, baths, sqft, imageUrl, status, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const scrim = (a) => (0, color_1.withAlpha)(tokens.ramps.neutral[900] ?? colors.onSurface, a);
    const light = tokens.ramps.neutral[50] ?? colors.onPrimary;
    const facts = [];
    if (typeof beds === 'number')
        facts.push(`${beds} bd`);
    if (typeof baths === 'number')
        facts.push(`${baths} ba`);
    if (typeof sqft === 'number')
        facts.push(`${sqft.toLocaleString()} sqft`);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                height: 300,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                backgroundColor: tokens.ramps.neutral[200] ?? colors.border,
                justifyContent: 'flex-end',
            },
            style,
        ], children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No photo" }) })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '70%', backgroundColor: scrim(0.22) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '45%', backgroundColor: scrim(0.42) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '22%', backgroundColor: scrim(0.66) } }), status ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: STATUS_TONE[status], children: STATUS_LABEL[status] }) })) : null, loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.lg }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: light, fontSize: tokens.typography.scale.sm }, children: "Loading listing\u2026" }) })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: light, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: (0, primitives_1.formatMoney)(priceCents, currency) }), variant === 'rent' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: light, fontSize: tokens.typography.scale.sm, opacity: 0.85 }, children: "/mo" })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: light, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: address }), locality ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: light, fontSize: tokens.typography.scale.sm, opacity: 0.85 }, children: locality })) : null, facts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: facts.map((f) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                backgroundColor: (0, color_1.withAlpha)(light, 0.2),
                                borderRadius: tokens.radius.full,
                                paddingVertical: 2,
                                paddingHorizontal: tokens.spacing.sm,
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: light, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: f }) }, f))) })) : null] }))] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body }));
    }
    const priceLabel = `${(0, primitives_1.formatMoney)(priceCents, currency)}${variant === 'rent' ? ' per month' : ''}`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${address}, ${priceLabel}${facts.length ? `, ${facts.join(', ')}` : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }) }));
}
//# sourceMappingURL=PropertyCardV2.js.map