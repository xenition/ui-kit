"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCardV2 = PostCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const MentionText_1 = require("./MentionText");
const EngagementBar_1 = require("./EngagementBar");
/**
 * PostCard, design V2 — an **elevated, media-forward** post. The media leads
 * (big imagery, no border), the engagement bar **floats** in a shadowed pill
 * bridging the media and the body, and the author sits beneath. Same props as
 * {@link PostCard} (all four `variant`s supported), token-only.
 */
function PostCardV2({ variant = 'text', author, timestamp, text, imageUrl, imageAlt, link, video, showEngagement = true, likeCount, commentCount, shareCount, liked, bookmarked, onLike, onComment, onShare, onBookmark, onPress, onPressAuthor, onPressMenu, onPressMention, onPressHashtag, loading = false, density = 'comfortable', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const compact = density === 'compact';
    const containerStyle = [
        {
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            ...(0, elevation_1.shadow)('lg', tokens),
            padding: compact ? tokens.spacing.sm : tokens.spacing.md,
            gap: compact ? tokens.spacing.xs : tokens.spacing.sm,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading post", style: containerStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 200, borderRadius: tokens.radius.md, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 8, width: '25%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }));
    }
    const footer = showEngagement &&
        (onLike || onComment || onShare || onBookmark || likeCount != null || commentCount != null || shareCount != null) ? ((0, jsx_runtime_1.jsx)(EngagementBar_1.EngagementBar, { likeCount: likeCount, commentCount: commentCount, shareCount: shareCount, liked: liked, bookmarked: bookmarked, onLike: onLike, onComment: onComment, onShare: onShare, onBookmark: onBookmark, style: { flex: 1, justifyContent: 'space-between' } })) : null;
    let media = null;
    if (variant === 'image' && imageUrl) {
        media = ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? 'Post image', resizeMode: "cover", style: { width: '100%', aspectRatio: 4 / 5, borderRadius: tokens.radius.md, backgroundColor: colors.border } }));
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
            }, children: [video?.thumbnailUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: video.thumbnailUrl }, accessibilityLabel: "Video thumbnail", resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.55),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale['2xl'] }, children: "\u25B6" }) }), video?.duration ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        right: tokens.spacing.sm,
                        top: tokens.spacing.sm,
                        backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.6),
                        borderRadius: tokens.radius.full,
                        paddingHorizontal: tokens.spacing.sm,
                        paddingVertical: 2,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: video.duration }) })) : null] }));
    }
    else if (variant === 'link' && link) {
        media = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { borderRadius: tokens.radius.md, overflow: 'hidden', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.06) }, children: [link.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: link.imageUrl }, accessibilityLabel: link.title ?? 'Link preview', resizeMode: "cover", style: { width: '100%', aspectRatio: 2, backgroundColor: colors.border } })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: 2 }, children: [link.domain ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: link.domain }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: link.title ?? link.url }), link.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: link.description })) : null] })] }));
    }
    else if (variant === 'text' && text) {
        // No media: a tinted hero block carries the body large and up-front.
        media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.06), borderRadius: tokens.radius.md, padding: tokens.spacing.lg }, children: (0, jsx_runtime_1.jsx)(MentionText_1.MentionText, { text: text, size: "lg", onPressMention: onPressMention, onPressHashtag: onPressHashtag }) }));
    }
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: author.name, disabled: !onPressAuthor, onPress: onPressAuthor, children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: author.avatarUrl, name: author.name, size: "md", ring: true }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: author.name }), author.verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: "Verified", style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm }, children: "\u2713" })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [author.handle ? `@${author.handle}` : null, timestamp].filter(Boolean).join(' · ') })] }), onPressMenu ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "More options", onPress: onPressMenu, style: ({ pressed }) => ({ paddingHorizontal: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: "\u22EF" }) })) : null] }));
    // Body caption below media only when the media itself isn't the text hero.
    const caption = text && variant !== 'text' ? ((0, jsx_runtime_1.jsx)(MentionText_1.MentionText, { text: text, onPressMention: onPressMention, onPressHashtag: onPressHashtag })) : null;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [media ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'relative', marginBottom: footer ? tokens.spacing.lg : 0 }, children: [media, footer ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: tokens.spacing.md,
                            right: tokens.spacing.md,
                            bottom: -tokens.spacing.md,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: colors.surface,
                            borderRadius: tokens.radius.full,
                            ...(0, elevation_1.shadow)('md', tokens),
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.md,
                        }, children: footer })) : null] })) : null, header, caption, !media && footer ? footer : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Post by ${author.name}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.97 : 1 }], children: inner }) }) }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, containerStyle], children: inner });
}
//# sourceMappingURL=PostCardV2.js.map