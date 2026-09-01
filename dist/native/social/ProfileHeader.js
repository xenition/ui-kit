"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileHeader = ProfileHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const GradientSurface_1 = require("./internal/GradientSurface");
const feed_1 = require("./internal/feed");
/**
 * ProfileHeader — the profile-page hero for the social V4 "feed" line, and one of
 * the module's gradient identity moments. A brand-gradient cover (optionally over
 * a `coverUrl`) carries a large overlapping avatar, the name with a primary
 * verified tick, `@handle` + `bio` in near-white ink, a row of frosted stat tiles
 * (posts / followers / following), and a single CTA — "Edit profile" in `owner`
 * mode, otherwise a Follow / Following toggle. Every color derives from the brand
 * ramp via `GradientSurface` + `feed*` + `useXenitionTheme()` (no literals);
 * dark-mode safe.
 */
function ProfileHeader({ name, handle, avatarUrl, verified = false, bio, stats, coverUrl, owner = false, following = false, onFollow, onEditProfile, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, feed_1.feedInk)(r);
    const inkSoft = (0, feed_1.feedInkSoft)(r);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, feed_1.feedGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }, children: [coverUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: coverUrl }, accessible: false, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3 } })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { borderRadius: tokens.radius.full, borderWidth: 3, borderColor: (0, feed_1.feedBorder)(r, 0.4) }, children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: name, size: "xl" }) }), owner ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Edit profile", onPress: onEditProfile, style: ({ pressed }) => ({
                                minHeight: 44,
                                justifyContent: 'center',
                                paddingHorizontal: tokens.spacing.lg,
                                borderRadius: tokens.radius.md,
                                backgroundColor: (0, feed_1.feedTile)(r),
                                borderWidth: 1,
                                borderColor: (0, feed_1.feedBorder)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: "Edit profile" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: following }, accessibilityLabel: following ? 'Following' : 'Follow', onPress: onFollow, style: ({ pressed }) => ({
                                minHeight: 44,
                                justifyContent: 'center',
                                paddingHorizontal: tokens.spacing.lg,
                                borderRadius: tokens.radius.md,
                                backgroundColor: following ? (0, feed_1.feedTile)(r) : ink,
                                borderWidth: following ? 1 : 0,
                                borderColor: (0, feed_1.feedBorder)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: following ? ink : colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: following ? 'Following' : 'Follow' }) }))] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', flexShrink: 1 }, children: name }), verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Verified", style: { color: inkSoft, fontSize: tokens.typography.scale.lg }, children: "\u2713" })) : null] }), handle ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["@", handle] })) : null, bio ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.5 }, children: bio }) : null] }), stats && stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }, children: stats.map((stat) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flex: 1,
                            minWidth: 96,
                            alignItems: 'center',
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, feed_1.feedTile)(r),
                            borderWidth: 1,
                            borderColor: (0, feed_1.feedBorder)(r),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: stat.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: stat.label })] }, stat.label))) })) : null] }) }));
}
//# sourceMappingURL=ProfileHeader.js.map