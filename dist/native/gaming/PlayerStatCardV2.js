"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatCardV2 = PlayerStatCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const types_1 = require("./types");
/**
 * PlayerStatCard — design variant **V2**: a **centered profile card** with a
 * large ringed avatar over a tinted banner, the handle + rank + level stacked
 * below it, and the headline stats in a bordered grid. Where V1 is a left-
 * aligned single row (avatar · name · rank), V2 is a portrait "player passport"
 * — hero avatar centered, identity underneath, then a full stat grid regardless
 * of the (removed) variant switch. Same props as {@link PlayerStatCardProps};
 * renders a graceful "No stats yet" line when empty. Token-only, elevated.
 */
function PlayerStatCardV2({ player, online, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const stats = player.stats ?? [];
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 44, backgroundColor: (0, types_1.withAlpha)(colors.primary, 0.14) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, marginTop: -28, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: player.avatarUrl, name: player.name, size: "xl", ring: true, status: online === undefined ? undefined : online ? 'online' : 'offline' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: player.name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap', justifyContent: 'center' }, children: [player.rank ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: player.rank })) : null, player.level != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["Level ", player.level] })) : null] }), stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm, alignSelf: 'stretch' }, children: stats.map((s, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexGrow: 1,
                                flexBasis: '28%',
                                minWidth: 80,
                                alignItems: 'center',
                                backgroundColor: (0, types_1.withAlpha)(colors.primary, 0.06),
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.md,
                                paddingVertical: tokens.spacing.sm,
                                paddingHorizontal: tokens.spacing.sm,
                                gap: 2,
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: s.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: s.label })] }, `${s.label}-${i}`))) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.sm }, children: "No stats yet" }))] })] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${player.name}${player.rank ? `, ${player.rank}` : ''}`, onPress: () => onPress(player), onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }) }));
}
//# sourceMappingURL=PlayerStatCardV2.js.map