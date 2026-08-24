"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentItemV3 = CommentItemV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const MentionText_1 = require("./MentionText");
/**
 * CommentItem, design V3 — **flat & threaded** with a thin **indent rail**.
 * No bubble: a tiny inline avatar, a single author line, a tight body, and a
 * compact action row. Nested replies (`depth` > 0) draw a hairline vertical
 * rail on the left to show the thread. Same props as {@link CommentItem}.
 */
function CommentItemV3({ author, handle, avatarUrl, text, timestamp, likeCount = 0, liked = false, depth = 0, pinned = false, appearance = 'classic', onLike, onReply, onPressAuthor, onPressMention, onPressHashtag, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const nested = Math.max(0, depth) > 0;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row' }, children: [nested ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing.lg, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 2, flex: 1, borderRadius: 1, backgroundColor: colors.border } }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flex: 1,
                        gap: tokens.spacing.xs,
                        ...(pinned ? (0, appearance_1.appearanceStyle)(appearance, colors, tokens) : null),
                        borderRadius: tokens.radius.sm,
                        padding: pinned ? tokens.spacing.sm : 0,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: author, disabled: !onPressAuthor, onPress: onPressAuthor, children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: author, size: "xs" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: author }), handle ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["@", handle] }) : null, timestamp ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", timestamp] }) : null, pinned ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "\u00B7 Pinned" })) : null] }), (0, jsx_runtime_1.jsx)(MentionText_1.MentionText, { text: text, size: "sm", onPressMention: onPressMention, onPressHashtag: onPressHashtag }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Like, ${likeCount}`, accessibilityState: { selected: liked }, disabled: !onLike, onPress: onLike, style: ({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: liked ? colors.dangerText : colors.muted, fontSize: tokens.typography.scale.sm }, children: liked ? '♥' : '♡' }), likeCount > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: likeCount })) : null] }), onReply ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Reply", onPress: onReply, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "Reply" }) })) : null] }), children ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, gap: tokens.spacing.sm }, children: children }) : null] })] }) }));
}
//# sourceMappingURL=CommentItemV3.js.map