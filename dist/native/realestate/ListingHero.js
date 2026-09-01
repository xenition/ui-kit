"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingHero = ListingHero;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const listing_1 = require("./internal/listing");
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
 * ListingHero — the property-detail **peak** for the real-estate V4 "listing"
 * line. A full-bleed hero photo with a bottom `listingScrim` gradient carries the
 * near-white price + address; a status chip, a frosted photo counter, and
 * saved/share controls float over the media; the beds/baths/sqft facts read as
 * frosted tiles and a near-white Tour pill anchors the bottom. With no `imageUrl`
 * it falls back to the brand gradient ground (`listingGradient`). Presentational
 * — shaped data + callbacks, nothing fetches. Token-only colors via
 * `useXenitionTheme()` + the listing ramp helpers, dark-mode safe. The
 * `sale`/`rent` variant only changes the price suffix.
 */
function ListingHero({ imageUrl, priceCents, currency = 'USD', variant = 'sale', address, locality, status, beds, baths, sqft, photoCount, saved = false, onSave, onShare, onTour, tourLabel = 'Schedule tour', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, listing_1.listingInk)(r);
    const inkSoft = (0, listing_1.listingInkSoft)(r);
    const facts = [];
    if (typeof beds === 'number')
        facts.push({ glyph: '🛏', value: `${beds} bd` });
    if (typeof baths === 'number')
        facts.push({ glyph: '🛁', value: `${baths} ba` });
    if (typeof sqft === 'number')
        facts.push({ glyph: '📐', value: `${sqft.toLocaleString()} sqft` });
    const priceText = `${(0, primitives_1.formatMoney)(priceCents, currency)}${variant === 'rent' ? '/mo' : ''}`;
    const RoundControl = ({ label, glyph, onPress }) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (0, listing_1.listingTile)(r),
            borderWidth: 1,
            borderColor: (0, listing_1.listingBorder)(r),
            opacity: pressed ? 0.85 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: glyph }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ minHeight: 380, borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.border }, style], children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, style: { ...absoluteFill }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, listing_1.listingGradient)(r), style: { ...absoluteFill } })), (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, listing_1.listingScrim)(r), start: { x: 0, y: 0 }, end: { x: 0, y: 1 }, style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '66%' } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.md,
                    padding: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }, children: [status ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: STATUS_TONE[status], variant: "soft", children: STATUS_LABEL[status] })) : null, typeof photoCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: tokens.spacing.xs,
                                    paddingHorizontal: tokens.spacing.sm,
                                    paddingVertical: 2,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, listing_1.listingTile)(r),
                                    borderWidth: 1,
                                    borderColor: (0, listing_1.listingBorder)(r),
                                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs }, children: "\uD83D\uDCF7" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: photoCount.toLocaleString() })] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [onSave ? ((0, jsx_runtime_1.jsx)(RoundControl, { label: saved ? 'Remove from saved' : 'Save listing', glyph: saved ? '❤️' : '🤍', onPress: onSave })) : null, onShare ? (0, jsx_runtime_1.jsx)(RoundControl, { label: "Share listing", glyph: "\u2197", onPress: onShare }) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: 'auto', gap: tokens.spacing.md, padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, accessibilityLabel: `Price ${priceText}`, style: { color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5 }, children: priceText }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: address }), locality ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: locality })) : null] }), facts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: facts.map((f) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                paddingHorizontal: tokens.spacing.md,
                                paddingVertical: tokens.spacing.sm,
                                borderRadius: tokens.radius.md,
                                backgroundColor: (0, listing_1.listingTile)(r),
                                borderWidth: 1,
                                borderColor: (0, listing_1.listingBorder)(r),
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: f.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: f.value })] }, f.value))) })) : null, onTour ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: tourLabel, onPress: onTour, style: ({ pressed }) => ({
                            minHeight: 44,
                            paddingVertical: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: ink,
                            opacity: pressed ? 0.9 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: tourLabel }) })) : null] })] }));
}
const absoluteFill = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 };
//# sourceMappingURL=ListingHero.js.map