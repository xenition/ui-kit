"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorRow = DonorRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
const TIER = {
    bronze: { tone: 'warn', label: 'Bronze' },
    silver: { tone: 'neutral', label: 'Silver' },
    gold: { tone: 'warn', label: 'Gold' },
    platinum: { tone: 'primary', label: 'Platinum' },
};
/**
 * A donor list / leaderboard row: optional rank, avatar, name, an optional
 * recognition-tier badge, lifetime giving (integer cents → `formatMoney`), and a
 * gift count. Anonymous donors show a generic label and a placeholder avatar.
 * The row is optionally pressable. All colors come from the compiled theme
 * tokens — no literal colors.
 */
function DonorRow({ name, avatarUrl, totalCents, currency = 'USD', giftCount, tier, rank, anonymous = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const displayName = anonymous ? 'Anonymous donor' : name;
    const tierMeta = tier ? TIER[tier] : null;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [typeof rank === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '800', minWidth: tokens.spacing.lg, textAlign: 'center' }, children: rank })) : null, (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: anonymous ? undefined : name, src: anonymous ? undefined : avatarUrl, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: displayName }), tierMeta ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: tierMeta.tone, variant: "soft", children: tierMeta.label }) : null] }), typeof giftCount === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF81", size: "xs", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: `${giftCount} gifts` })] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: (0, internal_1.formatMoney)(totalCents, currency) })] }));
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.surface,
        },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${displayName}, ${(0, internal_1.formatMoney)(totalCents, currency)} donated`, onPress: onPress, style: ({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${displayName}, ${(0, internal_1.formatMoney)(totalCents, currency)} donated`, style: rowStyle, children: inner }));
}
//# sourceMappingURL=DonorRow.js.map