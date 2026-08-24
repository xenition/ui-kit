"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundraiserCard = FundraiserCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const CampaignProgress_1 = require("./CampaignProgress");
/**
 * A peer-to-peer fundraiser card: organizer identity, an optional cover, the
 * title, a `CampaignProgress` meter (raised/goal in integer cents), and donate /
 * share actions. `variant` switches density; `compact` drops the cover. All
 * colors come from the compiled theme tokens — no literal colors.
 */
function FundraiserCard({ title, organizerName, organizerAvatarUrl, imageUrl, imageAlt, raisedCents, goalCents, currency = 'USD', donorCount, variant = 'default', onDonate, onShare, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';
    const containerStyle = [
        { overflow: 'hidden', borderRadius: tokens.radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading fundraiser", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: isFeatured ? 180 : 140, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.md, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [!isCompact ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: isFeatured ? 180 : 140, width: '100%', backgroundColor: tokens.ramps.neutral[100] }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF97\uFE0F", size: "2xl" }) })) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: organizerName, src: organizerAvatarUrl, size: "xs" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: `by ${organizerName}` })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(CampaignProgress_1.CampaignProgress, { raisedCents: raisedCents, goalCents: goalCents, currency: currency, donorCount: donorCount }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", onPress: onDonate, children: "Donate" }) }), onShare ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", onPress: onShare, accessibilityLabel: "Share fundraiser", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2197", size: "base", accessibilityLabel: "Share" }) })) : null] })] })] }));
}
//# sourceMappingURL=FundraiserCard.js.map