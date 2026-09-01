"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorRowV4 = DonorRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
const TIER = {
    bronze: { tone: 'warn', label: 'Bronze', glyph: '🥉' },
    silver: { tone: 'neutral', label: 'Silver', glyph: '🥈' },
    gold: { tone: 'warn', label: 'Gold', glyph: '🥇' },
    platinum: { tone: 'primary', label: 'Platinum', glyph: '💎' },
};
/**
 * DonorRow — **V4** "rally" design. An elevated, rounded donor / leaderboard row
 * on a clean surface (no gradient): a leading avatar in a soft-primary well, an
 * optional rank, a bold donor name with a glyph + labelled recognition-tier
 * {@link Badge} (never color alone), an optional gift-count chip, and a trailing
 * bold lifetime-giving total (integer cents → `formatMoney`). Anonymous donors
 * show a generic label + placeholder avatar. The whole row is pressable via
 * `onPress`. Identical props/behavior to {@link DonorRowProps}. Token-only colors
 * via `useXenitionTheme()`.
 */
function DonorRowV4({ name, avatarUrl, totalCents, currency = 'USD', giftCount, tier, rank, anonymous = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const displayName = anonymous ? 'Anonymous donor' : name;
    const tierMeta = tier ? TIER[tier] : null;
    const label = `${displayName}, ${(0, internal_1.formatMoney)(totalCents, currency)} donated${tierMeta ? `, ${tierMeta.label}` : ''}`;
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            minHeight: 44,
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
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [typeof rank === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '800', minWidth: tokens.spacing.lg, textAlign: 'center' }, children: rank })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 44, width: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: anonymous ? undefined : name, src: anonymous ? undefined : avatarUrl, size: "sm" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: displayName }), tierMeta ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: tierMeta.tone, variant: "soft", children: `${tierMeta.glyph} ${tierMeta.label}` })) : null] }), typeof giftCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: tokens.spacing.xs, paddingVertical: 2, paddingHorizontal: tokens.spacing.sm, borderRadius: tokens.radius.lg, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF81", size: "xs" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm }, children: `${giftCount} gifts` })] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: (0, internal_1.formatMoney)(totalCents, currency) })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: label, style: containerStyle, children: inner }));
}
//# sourceMappingURL=DonorRowV4.js.map