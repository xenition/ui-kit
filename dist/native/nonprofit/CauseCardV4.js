"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CauseCardV4 = CauseCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const color_1 = require("../primitives/internal/color");
const CampaignProgressV4_1 = require("./CampaignProgressV4");
/**
 * CauseCard — **V4** "rally" design. The warm, mission-driven browse tile for a
 * cause: an elevated rounded card with a soft shadow, a cover (image or a
 * friendly glyph in a soft-primary well), a soft-primary category chip, a bold
 * title + blurb, and an inline `CampaignProgressV4` meter when a goal is
 * supplied. Honors all three `variant`s — `default`, `compact`, `featured` —
 * identical props/behavior to {@link CauseCardProps}; the whole card is pressable
 * via `onPress`. Token-only colors via `useXenitionTheme()`.
 */
function CauseCardV4({ title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency = 'USD', variant = 'default', onPress, loading = false, style, }) {
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
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading cause", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: isFeatured ? 180 : 130, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.lg, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.md, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }));
    }
    const hasProgress = typeof raisedCents === 'number' && typeof goalCents === 'number';
    const cover = !isCompact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height: isFeatured ? 180 : 130, width: '100%', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: [imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDD1D", size: "2xl" }) })), category ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", variant: "soft", children: category }) })) : null] })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, padding: tokens.spacing.md }, children: [isCompact && category ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", variant: "soft", children: category }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.base, fontWeight: '700' }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: isCompact ? 2 : 3, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, hasProgress ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(CampaignProgressV4_1.CampaignProgressV4, { raisedCents: raisedCents, goalCents: goalCents, currency: currency }) })) : null] }));
    const inner = isCompact ? body : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [cover, body] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => [containerStyle, { flexDirection: isCompact ? 'row' : 'column', opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [containerStyle, { flexDirection: isCompact ? 'row' : 'column' }], children: inner });
}
//# sourceMappingURL=CauseCardV4.js.map