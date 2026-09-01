"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRow = NotificationRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const Avatar_1 = require("../primitives/Avatar");
const FollowButton_1 = require("./FollowButton");
/** Default action phrase per kind, appended after the actor's name. */
const DEFAULT_TEXT = {
    like: 'liked your post',
    comment: 'commented on your post',
    follow: 'started following you',
    mention: 'mentioned you',
    repost: 'reposted your post',
};
/** Small kind glyph shown as a badge overlapping the avatar. */
const KIND_GLYPH = {
    like: '❤',
    comment: '💬',
    follow: '＋',
    mention: '@',
    repost: '🔁',
};
/** Semantic color slot (fill / on-fill) for the badge per kind. */
const KIND_SLOT = {
    like: { bg: 'danger', fg: 'onDanger' },
    comment: { bg: 'primary', fg: 'onPrimary' },
    follow: { bg: 'primary', fg: 'onPrimary' },
    mention: { bg: 'primary', fg: 'onPrimary' },
    repost: { bg: 'success', fg: 'onSuccess' },
};
/**
 * NotificationRow — **V4** "feed" design. A single activity/notification item:
 * the actor's big avatar carries a small kind-glyph badge (❤ / 💬 / ＋ / @ / 🔁)
 * tinted by a semantic token, followed by a bold-name action line and a muted
 * time. `unread` paints a soft-primary row tint (via `withAlpha`) and a leading
 * primary dot. A trailing slot shows either the referenced post's `thumbnailUrl`
 * or — for the follow kind — a {@link FollowButton}. Presentational; token-only
 * colors via `useXenitionTheme()`. Native twin of the web `NotificationRow`.
 */
function NotificationRow({ kind, actor, text, time, unread = false, thumbnailUrl, onPress, following, onFollow, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const body = text ?? DEFAULT_TEXT[kind];
    const slot = KIND_SLOT[kind];
    const showFollow = kind === 'follow' && (onFollow != null || following != null);
    const trailing = showFollow ? ((0, jsx_runtime_1.jsx)(FollowButton_1.FollowButton, { state: following ? 'following' : 'follow', size: "sm", onPress: onFollow ? () => onFollow(!following) : undefined })) : thumbnailUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: thumbnailUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: 44, height: 44, borderRadius: tokens.radius.md, backgroundColor: colors.border } })) : null;
    const a11yLabel = `${actor.name} ${body}${time ? `, ${time}` : ''}${unread ? ', unread' : ''}`;
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            minHeight: 44,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.md,
            backgroundColor: unread ? (0, color_1.withAlpha)(colors.primary, 0.1) : colors.surface,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: unread ? colors.primary : 'transparent',
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: actor.avatarUrl, name: actor.name, size: "lg" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            right: -2,
                            bottom: -2,
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 2,
                            borderColor: colors.surface,
                            backgroundColor: colors[slot.bg],
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[slot.fg], fontSize: tokens.typography.scale.xs }, children: KIND_GLYPH[kind] }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: colors.muted }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontWeight: '800' }, children: actor.name }), actor.verified ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText }, children: " \u2713" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { children: ` ${body}` })] }), time ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: time }) : null] }), trailing] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, onPress: onPress, style: ({ pressed }) => [containerStyle, pressed ? { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) } : null], children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: a11yLabel, style: containerStyle, children: inner }));
}
//# sourceMappingURL=NotificationRow.js.map