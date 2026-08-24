"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCardV3 = PostCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const motion_1 = require("../primitives/internal/motion");
const MentionText_1 = require("./MentionText");
const EngagementBar_1 = require("./EngagementBar");
/**
 * PostCard, design V3 — **minimal & borderless** with a colored **left accent
 * rail**. No card fill or shadow: the post reads as a thread entry, header on
 * one line, a tight body, small inline media, and a flat engagement row. Same
 * props as {@link PostCard} (all four `variant`s supported), token-only.
 */
function PostCardV3({ variant = 'text', author, timestamp, text, imageUrl, imageAlt, link, video, showEngagement = true, likeCount, commentCount, shareCount, liked, bookmarked, onLike, onComment, onShare, onBookmark, onPress, onPressAuthor, onPressMenu, onPressMention, onPressHashtag, loading = false, density = 'comfortable', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const compact = density === 'compact';
    const containerStyle = [
        {
            backgroundColor: 'transparent',
            borderLeftWidth: 3,
            borderLeftColor: colors.primary,
            borderRadius: tokens.radius.sm,
            paddingLeft: tokens.spacing.md,
            paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
            gap: compact ? tokens.spacing.xs : tokens.spacing.sm,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading post", style: containerStyle, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '90%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }));
    }
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: author.name, disabled: !onPressAuthor, onPress: onPressAuthor, children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: author.avatarUrl, name: author.name, size: "sm" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: author.name }), author.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Verified", style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs }, children: "\u2713" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [author.handle ? `@${author.handle}` : null, timestamp].filter(Boolean).join(' · ') })] }), onPressMenu ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "More options", onPress: onPressMenu, style: ({ pressed }) => ({ paddingHorizontal: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "\u22EF" }) })) : null] }));
    const body = text ? ((0, jsx_runtime_1.jsx)(MentionText_1.MentionText, { text: text, size: "sm", onPressMention: onPressMention, onPressHashtag: onPressHashtag })) : null;
    let media = null;
    if (variant === 'image' && imageUrl) {
        media = ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? 'Post image', resizeMode: "cover", style: { width: '100%', aspectRatio: 16 / 9, borderRadius: tokens.radius.md, backgroundColor: colors.border } }));
    }
    else if (variant === 'video') {
        media = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                width: '100%',
                aspectRatio: 16 / 9,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
                backgroundColor: colors.border,
                alignItems: 'center',
                justifyContent: 'center',
            }, children: [video?.thumbnailUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: video.thumbnailUrl }, accessibilityLabel: "Video thumbnail", resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.onSurface, opacity: 0.85 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.lg }, children: "\u25B6" }) }), video?.duration ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', right: tokens.spacing.xs, bottom: tokens.spacing.xs, backgroundColor: colors.onSurface, borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: video.duration }) })) : null] }));
    }
    else if (variant === 'link' && link) {
        // Compact side-by-side link chip (thumbnail + title), not a full card.
        media = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center', borderRadius: tokens.radius.md, backgroundColor: colors.surface, paddingRight: tokens.spacing.sm, overflow: 'hidden' }, children: [link.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: link.imageUrl }, accessibilityLabel: link.title ?? 'Link preview', resizeMode: "cover", style: { width: 56, height: 56, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 56, height: 56, backgroundColor: colors.border } })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, paddingVertical: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: link.title ?? link.url }), link.domain ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: link.domain }) : null] })] }));
    }
    const footer = showEngagement &&
        (onLike || onComment || onShare || onBookmark || likeCount != null || commentCount != null || shareCount != null) ? ((0, jsx_runtime_1.jsx)(EngagementBar_1.EngagementBar, { likeCount: likeCount, commentCount: commentCount, shareCount: shareCount, liked: liked, bookmarked: bookmarked, onLike: onLike, onComment: onComment, onShare: onShare, onBookmark: onBookmark })) : null;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [header, body, media, footer] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Post by ${author.name}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.97 : 1 }], children: inner }) }) }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, containerStyle], children: inner });
}
//# sourceMappingURL=PostCardV3.js.map