"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundraiserCardV2 = FundraiserCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const elevation_1 = require("../primitives/internal/elevation");
const CampaignProgressV2_1 = require("./CampaignProgressV2");
const internal_1 = require("./internal");
/**
 * FundraiserCard — design variant **V2**: an **organizer-forward profile card**.
 * Instead of a cover photo up top, V2 leads with the organizer's identity — a
 * large avatar over a tinted banner, an "Organized by" line, the title, the
 * progress meter (raised/goal in integer cents, divide-by-zero guarded
 * downstream), and donate / share actions. Floats on a drop shadow (no border).
 * Same props as {@link FundraiserCardProps}. Token-only.
 * Stays inside its own design line: the meter is {@link CampaignProgressV2}, not
 * the base one, because an app that picks V2 picks it for every surface it sees.
 */
function FundraiserCardV2({ title, organizerName, organizerAvatarUrl, raisedCents, goalCents, currency = 'USD', donorCount, variant = 'default', onDonate, onShare, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isFeatured = variant === 'featured';
    const containerStyle = [
        { overflow: 'hidden', borderRadius: tokens.radius.lg, backgroundColor: colors.surface, ...(0, elevation_1.shadow)('md', tokens) },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading fundraiser", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 64, backgroundColor: tokens.ramps.neutral[200] ?? colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] ?? colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.md, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] ?? colors.border } })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 56, backgroundColor: (0, internal_1.withAlpha)(colors.primary, 0.12) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: -28, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: organizerName, src: organizerAvatarUrl, size: isFeatured ? 'xl' : 'lg' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: `Organized by ${organizerName}` })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.lg, fontWeight: '800' }, children: title }), (0, jsx_runtime_1.jsx)(CampaignProgressV2_1.CampaignProgressV2, { raisedCents: raisedCents, goalCents: goalCents, currency: currency, donorCount: donorCount }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", size: "lg", onPress: onDonate, children: "Donate" }) }), onShare ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", size: "lg", onPress: onShare, accessibilityLabel: "Share fundraiser", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2197", size: "lg", accessibilityLabel: "Share" }) })) : null] })] })] }));
}
//# sourceMappingURL=FundraiserCardV2.js.map