"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentProfileHeader = AgentProfileHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const listing_1 = require("./internal/listing");
function stars(rating) {
    const clamped = Math.max(0, Math.min(5, rating));
    const full = Math.round(clamped);
    return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
}
/**
 * AgentProfileHeader — a brand-gradient agent hero for the real-estate V4
 * "listing" line. The avatar (photo or token monogram), near-white name +
 * agency, an optional star rating, and headline stats as frosted tiles sit on the
 * brand gradient (`listingGradient`); near-white Call / Message CTAs anchor the
 * bottom. Presentational — shaped data + callbacks, nothing fetches. Token-only
 * colors via `useXenitionTheme()` + the listing ramp helpers, dark-mode safe.
 */
function AgentProfileHeader({ name, title, agency, photoUrl, rating, stats, verified = false, onCall, onMessage, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, listing_1.listingInk)(r);
    const inkSoft = (0, listing_1.listingInkSoft)(r);
    const monogram = name.trim().charAt(0).toUpperCase() || '?';
    const hasRating = typeof rating === 'number';
    const ratingValue = hasRating ? Math.max(0, Math.min(5, rating)).toFixed(1) : '';
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, listing_1.listingGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [photoUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: photoUrl }, accessibilityLabel: name, style: { width: 64, height: 64, borderRadius: tokens.radius.full, borderWidth: 1, borderColor: (0, listing_1.listingBorder)(r) } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: name, style: {
                                width: 64,
                                height: 64,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (0, listing_1.listingTile)(r),
                                borderWidth: 1,
                                borderColor: (0, listing_1.listingBorder)(r),
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: monogram }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800', flexShrink: 1 }, children: name }), verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Verified", allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale.sm }, children: "\u2713" })) : null] }), title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600', marginTop: 2 }, children: title })) : null, agency ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: agency })) : null, hasRating ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `Rated ${ratingValue} out of 5`, style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600', marginTop: 2 }, children: `${stars(rating)} ${ratingValue}` })) : null] })] }), stats && stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: stats.map((s) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flex: 1,
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, listing_1.listingTile)(r),
                            borderWidth: 1,
                            borderColor: (0, listing_1.listingBorder)(r),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: s.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: s.label })] }, s.label))) })) : null, onCall || onMessage ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onCall ? ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Call ${name}`, onPress: onCall, style: ({ pressed }) => ({
                                flex: 1,
                                minHeight: 44,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: tokens.spacing.xs,
                                paddingVertical: tokens.spacing.md,
                                borderRadius: tokens.radius.md,
                                backgroundColor: ink,
                                opacity: pressed ? 0.9 : 1,
                            }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: "\uD83D\uDCDE" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: "Call" })] })) : null, onMessage ? ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Message ${name}`, onPress: onMessage, style: ({ pressed }) => ({
                                flex: 1,
                                minHeight: 44,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: tokens.spacing.xs,
                                paddingVertical: tokens.spacing.md,
                                borderRadius: tokens.radius.md,
                                borderWidth: 1,
                                borderColor: (0, listing_1.listingBorder)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: "\uD83D\uDCAC" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Message" })] })) : null] })) : null] }) }));
}
//# sourceMappingURL=AgentProfileHeader.js.map