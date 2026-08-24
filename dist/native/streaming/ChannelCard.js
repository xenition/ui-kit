"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelCard = ChannelCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const LiveBadge_1 = require("./LiveBadge");
const types_1 = require("./types");
/**
 * A channel / creator card — avatar, name, category, a `LiveBadge` (with
 * viewer count) when `channel.live`, and an optional follow button.
 * `onPress(channel)` opens it; `onFollowToggle(next)` flips the follow state
 * with the button label + a11y reflecting `following`. Composes `Card` /
 * `Avatar` / `Button`. Token-only — no literal hex.
 */
function ChannelCard({ channel, following = false, variant = 'row', onPress, onFollowToggle, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const grid = variant === 'grid';
    const featured = variant === 'featured';
    const avatarSize = featured ? 'lg' : grid ? 'lg' : 'md';
    const followBtn = onFollowToggle ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: following ? 'secondary' : 'primary', size: "sm", onPress: () => onFollowToggle(!following), accessibilityLabel: following ? `Unfollow ${channel.name}` : `Follow ${channel.name}`, children: following ? 'Following' : 'Follow' })) : null;
    const subtitle = [
        channel.category,
        channel.live && channel.viewers != null ? `${(0, types_1.formatCount)(channel.viewers)} watching` : undefined,
    ]
        .filter(Boolean)
        .join(' · ');
    const nameRow = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: channel.name }), channel.live ? (0, jsx_runtime_1.jsx)(LiveBadge_1.LiveBadge, { variant: featured ? 'solid' : 'dot' }) : null] }));
    const meta = subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subtitle })) : null;
    const inner = grid ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: channel.avatarUrl, name: channel.name, size: avatarSize }), nameRow, meta, followBtn] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: channel.avatarUrl, name: channel.name, size: avatarSize }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [nameRow, meta] }), followBtn] }));
    const card = (0, jsx_runtime_1.jsx)(primitives_1.Card, { style: [{ gap: tokens.spacing.sm }, style], children: inner });
    if (!onPress)
        return card;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: channel.name, onPress: () => onPress(channel), style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: card }));
}
//# sourceMappingURL=ChannelCard.js.map