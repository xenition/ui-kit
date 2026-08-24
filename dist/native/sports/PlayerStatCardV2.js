"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatCardV2 = PlayerStatCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    available: { label: 'Available', glyph: '✓', slot: 'success' },
    injured: { label: 'Injured', glyph: '＋', slot: 'danger' },
    suspended: { label: 'Suspended', glyph: '⛔', slot: 'warn' },
};
/**
 * PlayerStatCard, design variant 2 — a **profile card**. A large ringed avatar
 * sits centered above the shirt number, name, and position/team caption, with
 * an availability chip (glyph + text, never color alone) and a bordered stat
 * grid below. Highlighted stats draw in the primary text accent. Same props as
 * `PlayerStatCard`; token-pure (`shadow`, `withAlpha`), reduced-motion aware.
 */
function PlayerStatCardV2({ name, position, number, photo, team, stats = [], status, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const container = {
        backgroundColor: colors.surface,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
        alignItems: 'center',
        ...(0, elevation_1.shadow)('md', tokens),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityState: { busy: true }, accessibilityLabel: "Loading player", style: [container, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 72, height: 72, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.lg, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }));
    }
    const meta = status ? STATUS_META[status] : undefined;
    const metaColor = meta?.slot === 'success' ? colors.successText : meta?.slot === 'danger' ? colors.dangerText : colors.warnText;
    const metaAccent = meta?.slot === 'success' ? colors.success : meta?.slot === 'danger' ? colors.danger : colors.warn;
    const a11y = `${name}${position ? `, ${position}` : ''}${meta ? `, ${meta.label}` : ''}`;
    const hero = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photo, name: name, size: "xl", ring: true }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [number !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: number })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: name })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [position, team].filter(Boolean).join(' · ') || 'Player' })] }), meta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: meta.label, style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: metaAccent,
                    backgroundColor: (0, color_1.withAlpha)(metaAccent, 0.1),
                }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, size: "xs", style: { color: metaColor } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: metaColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })] })) : null] }));
    const grid = stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignSelf: 'stretch',
            borderTopWidth: 1,
            borderColor: colors.border,
            paddingTop: tokens.spacing.sm,
        }, children: stats.map((s, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                width: '33.33%',
                paddingVertical: tokens.spacing.sm,
                alignItems: 'center',
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: s.highlight ? colors.primaryText : colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: s.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: s.label })] }, `${s.label}-${i}`))) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No stats recorded" }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [hero, grid] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: body }) }));
}
//# sourceMappingURL=PlayerStatCardV2.js.map