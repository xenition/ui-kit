"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatCardV3 = PlayerStatCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
/**
 * PlayerStatCard — design variant **V3**: a **single compact row with inline
 * stats**. A small avatar and the handle · rank on the left, then the headline
 * stats pushed to the right as tight `value / label` pairs — a scan-friendly
 * roster line rather than V1's card or V2's portrait passport. Same props as
 * {@link PlayerStatCardProps}; the (removed) variant switch is ignored and up to
 * three inline stats are shown. Token-only, minimal (hairline underline, no box).
 */
function PlayerStatCardV3({ player, online, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)({ translateY: 6 });
    const stats = (player.stats ?? []).slice(0, 3);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: player.avatarUrl, name: player.name, size: "sm", status: online === undefined ? undefined : online ? 'online' : 'offline' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: player.name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [player.rank, player.level != null ? `Lv ${player.level}` : null].filter(Boolean).join(' · ') || 'Unranked' })] }), stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: stats.map((s, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: s.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: s.label })] }, `${s.label}-${i}`))) })) : null] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${player.name}${player.rank ? `, ${player.rank}` : ''}`, onPress: () => onPress(player), onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }) }));
}
//# sourceMappingURL=PlayerStatCardV3.js.map