"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCard = PostCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const MentionText_1 = require("./MentionText");
const EngagementBar_1 = require("./EngagementBar");
/**
 * The feed post — one component, four media variants (`text` / `image` /
 * `link` / `video`) sharing an author header, a mention-aware body, and an
 * optional {@link EngagementBar} footer. Has a `loading` skeleton and tappable
 * author/menu/body affordances. Token-only.
 */
function PostCard({ variant = 'text', author, timestamp, text, imageUrl, imageAlt, link, video, showEngagement = true, likeCount, commentCount, shareCount, liked, bookmarked, onLike, onComment, onShare, onBookmark, onPress, onPressAuthor, onPressMenu, onPressMention, onPressHashtag, loading = false, appearance = 'classic', density = 'comfortable', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const compact = density === 'compact';
    const containerStyle = [
        {
            ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
            borderRadius: tokens.radius.lg,
            padding: compact ? tokens.spacing.sm : tokens.spacing.md,
            gap: compact ? tokens.spacing.xs : tokens.spacing.sm,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading post", style: containerStyle, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 8, width: '25%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 160, borderRadius: tokens.radius.md, backgroundColor: colors.border } })] }));
    }
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: author.name, disabled: !onPressAuthor, onPress: onPressAuthor, children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: author.avatarUrl, name: author.name, size: "md" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: author.name }), author.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Verified", style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm }, children: "\u2713" })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [author.handle ? `@${author.handle}` : null, timestamp].filter(Boolean).join(' · ') })] }), onPressMenu ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "More options", onPress: onPressMenu, style: ({ pressed }) => ({ paddingHorizontal: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: "\u22EF" }) })) : null] }));
    const body = text ? ((0, jsx_runtime_1.jsx)(MentionText_1.MentionText, { text: text, onPressMention: onPressMention, onPressHashtag: onPressHashtag })) : null;
    let media = null;
    if (variant === 'image' && imageUrl) {
        media = ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? 'Post image', resizeMode: "cover", style: { width: '100%', aspectRatio: 16 / 10, borderRadius: tokens.radius.md, backgroundColor: colors.border } }));
    }
    else if (variant === 'video') {
        media = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: '100%', aspectRatio: 16 / 9, borderRadius: tokens.radius.md, overflow: 'hidden', backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' }, children: [video?.thumbnailUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: video.thumbnailUrl }, accessibilityLabel: "Video thumbnail", resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.onSurface, opacity: 0.85 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xl }, children: "\u25B6" }) }), video?.duration ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', right: tokens.spacing.sm, bottom: tokens.spacing.sm, backgroundColor: colors.onSurface, borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: video.duration }) })) : null] }));
    }
    else if (variant === 'link' && link) {
        media = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { borderWidth: 1, borderColor: colors.border, borderRadius: tokens.radius.md, overflow: 'hidden' }, children: [link.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: link.imageUrl }, accessibilityLabel: link.title ?? 'Link preview', resizeMode: "cover", style: { width: '100%', aspectRatio: 2, backgroundColor: colors.border } })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.sm, gap: 2 }, children: [link.domain ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: link.domain })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: link.title ?? link.url }), link.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: link.description })) : null] })] }));
    }
    const footer = showEngagement && (onLike || onComment || onShare || onBookmark || likeCount != null || commentCount != null || shareCount != null) ? ((0, jsx_runtime_1.jsx)(EngagementBar_1.EngagementBar, { likeCount: likeCount, commentCount: commentCount, shareCount: shareCount, liked: liked, bookmarked: bookmarked, onLike: onLike, onComment: onComment, onShare: onShare, onBookmark: onBookmark, style: { marginTop: tokens.spacing.xs } })) : null;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [header, body, media, footer] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Post by ${author.name}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.97 : 1 }], children: inner }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, containerStyle], children: inner }));
}
//# sourceMappingURL=PostCard.js.map