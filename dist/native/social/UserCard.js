"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCard = UserCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const FollowButton_1 = require("./FollowButton");
const ProfileStats_1 = require("./ProfileStats");
/**
 * A user identity block in two shapes: a compact `row` for follower lists /
 * search results, and a full `card` with bio + {@link ProfileStats} for
 * profile previews. Includes an inline {@link FollowButton} when a
 * `followState` is given. Token-only.
 */
function UserCard({ user, variant = 'row', stats, followState, followLoading, onFollow, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isCard = variant === 'card';
    const identity = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: user.name }), user.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Verified", style: { color: colors.primary, fontSize: tokens.typography.scale.sm }, children: "\u2713" })) : null] }), user.handle ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["@", user.handle] })) : null] }));
    const follow = followState != null ? ((0, jsx_runtime_1.jsx)(FollowButton_1.FollowButton, { state: followState, loading: followLoading, onPress: onFollow })) : null;
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: user.avatarUrl, name: user.name, size: isCard ? 'lg' : 'md' }), identity, follow] }));
    const inner = isCard ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [header, user.bio ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.4 }, children: user.bio })) : null, stats && stats.length > 0 ? (0, jsx_runtime_1.jsx)(ProfileStats_1.ProfileStats, { stats: stats }) : null] })) : (header);
    const containerStyle = [
        {
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.md,
            ...(isCard ? { borderWidth: 1, borderColor: colors.border } : null),
        },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: user.name, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=UserCard.js.map