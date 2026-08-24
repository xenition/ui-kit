"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatCard = PlayerStatCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A player profile summary — avatar (with optional presence), handle, rank/
 * level, and (in `detailed`) a responsive grid of headline stats. Renders a
 * graceful "No stats yet" line when `detailed` has no stats. `onPress(player)`
 * opens the profile. Composes `Card`, `Avatar`, `Badge`. Token-only.
 */
function PlayerStatCard({ player, variant = 'compact', online, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const detailed = variant === 'detailed';
    const stats = player.stats ?? [];
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: player.avatarUrl, name: player.name, size: detailed ? 'lg' : 'md', status: online === undefined ? undefined : online ? 'online' : 'offline' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: player.name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [player.rank ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: player.rank })) : null, player.level != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["Level ", player.level] })) : null] })] })] }));
    const grid = detailed ? (stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: stats.map((s, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flexGrow: 1,
                flexBasis: '30%',
                minWidth: 84,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                gap: 2,
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: s.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: s.label })] }, `${s.label}-${i}`))) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No stats yet" }))) : null;
    const card = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: detailed ? tokens.spacing.md : 0 }, style], children: [header, grid] }));
    if (!onPress)
        return card;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${player.name}${player.rank ? `, ${player.rank}` : ''}`, onPress: () => onPress(player), style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: card }));
}
//# sourceMappingURL=PlayerStatCard.js.map