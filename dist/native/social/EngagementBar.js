"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngagementBar = EngagementBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
function formatCount(n) {
    if (n >= 1000000)
        return `${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
    if (n >= 1000)
        return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    return String(n);
}
/**
 * The like / comment / share (+ optional bookmark) action row under a post.
 * Each action is an icon with an optional count; `liked` turns the heart
 * `dangerText`, `bookmarked` turns the flag `primaryText` (the on-surface-
 * readable variants). Only the handlers you pass become interactive. Token-only.
 */
function EngagementBar({ likeCount = 0, commentCount = 0, shareCount = 0, liked = false, bookmarked = false, onLike, onComment, onShare, onBookmark, hideZero = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const actions = [
        { key: 'like', glyph: '♡', activeGlyph: '♥', label: 'Like', count: likeCount, active: liked, activeColor: 'dangerText', onPress: onLike },
        { key: 'comment', glyph: '💬', label: 'Comment', count: commentCount, onPress: onComment },
        { key: 'share', glyph: '↗', label: 'Share', count: shareCount, onPress: onShare },
    ];
    if (onBookmark) {
        actions.push({ key: 'bookmark', glyph: '🔖', label: 'Bookmark', active: bookmarked, activeColor: 'primaryText', onPress: onBookmark });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg }, style], children: actions.map((a) => {
            const tint = a.active ? colors[a.activeColor ?? 'primaryText'] : colors.muted;
            const showCount = a.count != null && !(hideZero && a.count === 0);
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a.count != null ? `${a.label}, ${a.count}` : a.label, accessibilityState: { selected: !!a.active }, disabled: !a.onPress, onPress: a.onPress, style: ({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    opacity: pressed ? 0.6 : 1,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tint, fontSize: tokens.typography.scale.lg }, children: a.active && a.activeGlyph ? a.activeGlyph : a.glyph }), showCount ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tint, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: formatCount(a.count) })) : null] }, a.key));
        }) }));
}
//# sourceMappingURL=EngagementBar.js.map