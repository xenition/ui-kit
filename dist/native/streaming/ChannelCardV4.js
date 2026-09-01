"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelCardV4 = ChannelCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const spotlight_1 = require("./internal/spotlight");
const LiveBadge_1 = require("./LiveBadge");
const types_1 = require("./types");
/**
 * ChannelCard — **V4** "spotlight" design. A rounded, elevated live/creator card:
 * the avatar sits inside a subtle brand-gradient glow ring (the V4 signature —
 * gradient reserved for the cover glow), with the name, category, and — when
 * `channel.live` — a `LiveBadge` plus a `formatCount` viewer label.
 * `onFollowToggle(next)` renders a **primary** follow `Button` (the one accent,
 * secondary once following). `onPress(channel)` opens the card with a ≥44px tap
 * target. Composes `Card` / `Avatar` / `Button`. Same props/behavior as
 * {@link ChannelCardProps}; token-only colors via `useXenitionTheme()`.
 */
function ChannelCardV4({ channel, following = false, variant = 'row', onPress, onFollowToggle, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
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
    /* Avatar wrapped in a soft brand-gradient glow ring — the V4 cover glow. */
    const glowAvatar = ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, spotlight_1.spotlightGlow)(r), style: { padding: 2, borderRadius: tokens.radius.full, alignSelf: 'flex-start' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: 2, borderRadius: tokens.radius.full, backgroundColor: colors.card }, children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: channel.avatarUrl, name: channel.name, size: avatarSize }) }) }));
    const nameRow = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: channel.name }), channel.live ? (0, jsx_runtime_1.jsx)(LiveBadge_1.LiveBadge, { variant: featured ? 'solid' : 'dot' }) : null] }));
    const meta = subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subtitle })) : null;
    const inner = grid ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.sm }, children: [glowAvatar, nameRow, meta, followBtn] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [glowAvatar, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [nameRow, meta] }), followBtn] }));
    const card = (0, jsx_runtime_1.jsx)(primitives_1.Card, { style: [{ gap: tokens.spacing.sm, borderRadius: tokens.radius.lg }, style], children: inner });
    if (!onPress)
        return card;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: channel.name, onPress: () => onPress(channel), style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: card }));
}
//# sourceMappingURL=ChannelCardV4.js.map