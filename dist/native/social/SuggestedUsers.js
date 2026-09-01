"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestedUsers = SuggestedUsers;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const FollowButton_1 = require("./FollowButton");
/**
 * SuggestedUsers — **V4** "feed" design. A "who to follow" block: a header
 * (`title` + optional "See all") over a horizontally-scrolling `ScrollView` of
 * user chip cards. Each chip is an elevated rounded card with a big avatar, bold
 * name with a primary verified tick, muted handle/bio, and a
 * {@link FollowButton}; the whole chip (min 44px) opens the profile via
 * `onPressUser`. Presentational; token-only colors via `useXenitionTheme()`.
 * Native twin of the web `SuggestedUsers`.
 */
function SuggestedUsers({ title = 'Who to follow', users, onFollow, onPressUser, onSeeAll, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: title, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, fontWeight: '800', color: colors.onSurface }, children: title }), onSeeAll ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "See all", onPress: onSeeAll, hitSlop: 8, style: ({ pressed }) => ({
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            opacity: pressed ? 0.6 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.primaryText }, children: "See all" }) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md, paddingBottom: tokens.spacing.xs }, children: users.map((user) => {
                    const meta = user.bio ?? (user.handle ? `@${user.handle}` : undefined);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: {
                            width: 160,
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            borderRadius: tokens.radius.lg,
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: colors.surface,
                            padding: tokens.spacing.md,
                            shadowColor: colors.onSurface,
                            shadowOpacity: 0.06,
                            shadowRadius: 10,
                            shadowOffset: { width: 0, height: 4 },
                            elevation: 2,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: user.name, disabled: !onPressUser, onPress: onPressUser ? () => onPressUser(user.id) : undefined, style: ({ pressed }) => ({
                                    minHeight: 44,
                                    alignItems: 'center',
                                    gap: tokens.spacing.xs,
                                    opacity: pressed ? 0.9 : 1,
                                }), children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: user.avatarUrl, name: user.name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, maxWidth: '100%' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.sm, fontWeight: '800', color: colors.onSurface }, children: user.name }), user.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Verified", style: { fontSize: tokens.typography.scale.xs, color: colors.primaryText }, children: "\u2713" })) : null] }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { fontSize: tokens.typography.scale.xs, textAlign: 'center', color: colors.muted }, children: meta })) : null] }), (0, jsx_runtime_1.jsx)(FollowButton_1.FollowButton, { state: user.following ? 'following' : 'follow', size: "sm", style: { alignSelf: 'stretch' }, onPress: onFollow ? () => onFollow(user.id) : undefined })] }, user.id));
                }) })] }));
}
//# sourceMappingURL=SuggestedUsers.js.map