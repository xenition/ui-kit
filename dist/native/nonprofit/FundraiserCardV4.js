"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundraiserCardV4 = FundraiserCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const color_1 = require("../primitives/internal/color");
const CampaignProgressV4_1 = require("./CampaignProgressV4");
/**
 * FundraiserCard — **V4** "rally" design. The warm, mission-driven peer-to-peer
 * fundraiser card: an elevated rounded card with a soft shadow, an organizer
 * identity row, a cover (image or a friendly glyph in a soft-primary well), a
 * bold title, an inline `CampaignProgressV4` meter (raised/goal in integer cents,
 * with the donor meta), and donate / share actions. Honors all three `variant`s —
 * `default` (cover on top), `compact` (cover-less dense row), and `featured`
 * (larger cover + title) — identical props/behavior to {@link FundraiserCardProps}.
 * Token-only colors via `useXenitionTheme()`.
 */
function FundraiserCardV4({ title, organizerName, organizerAvatarUrl, imageUrl, imageAlt, raisedCents, goalCents, currency = 'USD', donorCount, variant = 'default', onDonate, onShare, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading fundraiser", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: isFeatured ? 180 : 140, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.md, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }));
    }
    const cover = !isCompact ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: isFeatured ? 180 : 140, width: '100%', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF97\uFE0F", size: "2xl" }) })) })) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [cover, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: organizerName, src: organizerAvatarUrl, size: "xs" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: `by ${organizerName}` })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(CampaignProgressV4_1.CampaignProgressV4, { raisedCents: raisedCents, goalCents: goalCents, currency: currency, donorCount: donorCount }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", onPress: onDonate, children: "Donate" }) }), onShare ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", onPress: onShare, accessibilityLabel: "Share fundraiser", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2197", size: "base", accessibilityLabel: "Share" }) })) : null] })] })] }));
}
//# sourceMappingURL=FundraiserCardV4.js.map