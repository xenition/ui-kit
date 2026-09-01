"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCardV4 = UserCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const motion_1 = require("../primitives/internal/motion");
const FollowButton_1 = require("./FollowButton");
const ProfileStats_1 = require("./ProfileStats");
/**
 * UserCard — **V4** "feed" design. The clean, airy take on a user block: a
 * larger avatar, a bold name with a primary verified tick, a muted handle, a
 * bio line and {@link ProfileStats} in the `card` variant, plus an inline
 * {@link FollowButton} when a `followState` is given. The `card` variant is an
 * elevated rounded surface with generous whitespace. Same props/behavior as
 * {@link UserCardProps}; token-only colors via `useXenitionTheme()`. The
 * `appearance` prop is accepted for drop-in parity; the feed line keeps its own
 * clean elevated surface.
 */
function UserCardV4({ user, variant = 'row', stats, followState, followLoading, onFollow, onPress, appearance: _appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const isCard = variant === 'card';
    const identity = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: user.name }), user.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Verified", style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm }, children: "\u2713" })) : null] }), user.handle ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["@", user.handle] })) : null] }));
    const follow = followState != null ? ((0, jsx_runtime_1.jsx)(FollowButton_1.FollowButton, { state: followState, loading: followLoading, onPress: onFollow })) : null;
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: user.avatarUrl, name: user.name, size: isCard ? 'xl' : 'lg' }), identity, follow] }));
    const inner = isCard ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [header, user.bio ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.5 }, children: user.bio })) : null, stats && stats.length > 0 ? (0, jsx_runtime_1.jsx)(ProfileStats_1.ProfileStats, { stats: stats }) : null] })) : (header);
    // The feed line's user block is a clean elevated surface: a bordered, softly
    // shadowed card for the `card` variant, and a bare surface for the compact
    // `row`. Every value is a compiled theme token (no literals).
    const containerStyle = [
        {
            backgroundColor: isCard ? colors.card : colors.surface,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            ...(isCard
                ? {
                    borderColor: colors.border,
                    borderWidth: 1,
                    shadowColor: colors.onSurface,
                    shadowOpacity: 0.06,
                    shadowRadius: 10,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 2,
                }
                : null),
        },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: user.name, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.98 : 1 }], children: inner }) }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=UserCardV4.js.map