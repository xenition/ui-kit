"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentItemV4 = CommentItemV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const Avatar_1 = require("../primitives/Avatar");
const motion_1 = require("../primitives/internal/motion");
const MentionText_1 = require("./MentionText");
/**
 * CommentItem — **V4** "feed" design. The clean, airy take on a comment: a
 * larger avatar, a bold name, a muted handle/timestamp, a mention-aware body,
 * and a like + reply action row. Threaded replies keep their `depth` indent
 * and nested `children`; a `pinned` comment gets a soft-primary tinted rounded
 * surface. Same props/behavior as {@link CommentItemProps}; token-only colors
 * via `useXenitionTheme()` (+ `withAlpha`).
 */
function CommentItemV4({ author, handle, avatarUrl, text, timestamp, likeCount = 0, liked = false, depth = 0, pinned = false, onLike, onReply, onPressAuthor, onPressMention, onPressHashtag, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const indent = Math.max(0, depth) * tokens.spacing.xl;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, { paddingLeft: indent }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    gap: tokens.spacing.sm,
                    // A pinned comment gets a soft-primary tinted surface; an unpinned one
                    // stays bare on the clean feed surface.
                    ...(pinned ? { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) } : null),
                    borderRadius: tokens.radius.lg,
                    padding: pinned ? tokens.spacing.sm : 0,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: author, disabled: !onPressAuthor, onPress: onPressAuthor, children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: author, size: "md" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: author }), handle ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["@", handle] })) : null, timestamp ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", timestamp] })) : null, pinned ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "\u00B7 Pinned" })) : null] }), (0, jsx_runtime_1.jsx)(MentionText_1.MentionText, { text: text, size: "sm", onPressMention: onPressMention, onPressHashtag: onPressHashtag }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Like, ${likeCount}`, accessibilityState: { selected: liked }, disabled: !onLike, onPress: onLike, style: ({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: liked ? colors.primaryText : colors.muted, fontSize: tokens.typography.scale.sm }, children: liked ? '♥' : '♡' }), likeCount > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: likeCount })) : null] }), onReply ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Reply", onPress: onReply, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Reply" }) })) : null] })] })] }), children ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, gap: tokens.spacing.sm }, children: children }) : null] }));
}
//# sourceMappingURL=CommentItemV4.js.map