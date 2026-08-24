"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentItemV2 = CommentItemV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
const MentionText_1 = require("./MentionText");
/**
 * CommentItem, design V2 — a **chat bubble**: the avatar sits outside a filled,
 * speech-bubble surface (one squared corner) that carries the author + body;
 * timestamp and like/reply actions live below the bubble. Threads via `depth`
 * indentation; `pinned` tints the bubble. Same props as {@link CommentItem}.
 */
function CommentItemV2({ author, handle, avatarUrl, text, timestamp, likeCount = 0, liked = false, depth = 0, pinned = false, appearance = 'classic', onLike, onReply, onPressAuthor, onPressMention, onPressHashtag, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const indent = Math.max(0, depth) * tokens.spacing.xl;
    // Pinned uses the shared appearance treatment; otherwise a faint neutral fill
    // gives the bubble body without a literal color.
    const bubbleSurface = pinned
        ? (0, appearance_1.appearanceStyle)(appearance, colors, tokens)
        : { backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.05) };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, { paddingLeft: indent }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: author, disabled: !onPressAuthor, onPress: onPressAuthor, children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: author, size: "sm" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    ...bubbleSurface,
                                    borderRadius: tokens.radius.lg,
                                    borderBottomLeftRadius: tokens.radius.sm,
                                    paddingHorizontal: tokens.spacing.md,
                                    paddingVertical: tokens.spacing.sm,
                                    gap: tokens.spacing.xs,
                                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: author }), handle ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["@", handle] }) : null, pinned ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "\u00B7 Pinned" })) : null] }), (0, jsx_runtime_1.jsx)(MentionText_1.MentionText, { text: text, size: "sm", onPressMention: onPressMention, onPressHashtag: onPressHashtag })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg, paddingHorizontal: tokens.spacing.sm, paddingTop: tokens.spacing.xs }, children: [timestamp ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: timestamp }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Like, ${likeCount}`, accessibilityState: { selected: liked }, disabled: !onLike, onPress: onLike, style: ({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: liked ? colors.dangerText : colors.muted, fontSize: tokens.typography.scale.sm }, children: liked ? '♥' : '♡' }), likeCount > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: likeCount })) : null] }), onReply ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Reply", onPress: onReply, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Reply" }) })) : null] })] })] }), children ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, gap: tokens.spacing.sm }, children: children }) : null] }));
}
//# sourceMappingURL=CommentItemV2.js.map