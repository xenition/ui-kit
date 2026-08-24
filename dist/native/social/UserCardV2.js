"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCardV2 = UserCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const FollowButton_1 = require("./FollowButton");
const ProfileStats_1 = require("./ProfileStats");
/**
 * UserCard, design V2 — a **banner profile card**: a tinted cover strip with an
 * **overlapping avatar**, centered identity, bio, {@link ProfileStats}, and a
 * prominent follow CTA. The `row` variant renders the same banner idiom, minus
 * bio/stats. Same props as {@link UserCard}, token-only.
 */
function UserCardV2({ user, variant = 'row', stats, followState, followLoading, onFollow, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const isCard = variant === 'card';
    const bannerHeight = isCard ? 72 : 48;
    const avatarSize = isCard ? 'lg' : 'md';
    const avatarOverlap = isCard ? 28 : 20;
    const containerStyle = [
        {
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    const banner = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: bannerHeight, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.16) }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', right: 0, top: 0, bottom: 0, width: '55%', backgroundColor: (0, color_1.withAlpha)(colors.accent, 0.16) } }) }));
    const identity = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: user.name }), user.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Verified", style: { color: colors.primaryText, fontSize: tokens.typography.scale.base }, children: "\u2713" })) : null] }), user.handle ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["@", user.handle] })) : null] }));
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [banner, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingHorizontal: tokens.spacing.md, paddingBottom: tokens.spacing.md, marginTop: -avatarOverlap, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { borderRadius: tokens.radius.full, borderWidth: 3, borderColor: colors.surface }, children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: user.avatarUrl, name: user.name, size: avatarSize }) }), identity, isCard && user.bio ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, textAlign: 'center', lineHeight: tokens.typography.scale.sm * 1.4 }, children: user.bio })) : null, isCard && stats && stats.length > 0 ? (0, jsx_runtime_1.jsx)(ProfileStats_1.ProfileStats, { stats: stats, dividers: true, style: { alignSelf: 'stretch' } }) : null, followState != null ? ((0, jsx_runtime_1.jsx)(FollowButton_1.FollowButton, { state: followState, loading: followLoading, onPress: onFollow, size: isCard ? 'md' : 'sm', style: { minWidth: isCard ? 160 : 120 } })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: user.name, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.95 : 1 }], children: inner }) }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=UserCardV2.js.map