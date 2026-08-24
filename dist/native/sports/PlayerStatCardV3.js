"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatCardV3 = PlayerStatCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const STATUS_META = {
    available: { label: 'Available', glyph: '✓', slot: 'success' },
    injured: { label: 'Injured', glyph: '＋', slot: 'danger' },
    suspended: { label: 'Suspended', glyph: '⛔', slot: 'warn' },
};
/**
 * PlayerStatCard, design variant 3 — a **dense stat row**. A small avatar leads,
 * then shirt number + name + position stacked, and the stat cells run inline on
 * the right as tight value / label pairs. Availability is a leading glyph on the
 * name (glyph + a11y label, never color alone). Sized for tables and roster
 * lists. Same props as `PlayerStatCard`; token-pure, reduced-motion press scale.
 */
function PlayerStatCardV3({ name, position, number, photo, team, stats = [], status, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const container = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
        backgroundColor: colors.surface,
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: colors.border,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityState: { busy: true }, accessibilityLabel: "Loading player", style: [container, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: tokens.typography.scale.base, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }));
    }
    const meta = status ? STATUS_META[status] : undefined;
    const metaColor = meta?.slot === 'success' ? colors.successText : meta?.slot === 'danger' ? colors.dangerText : colors.warnText;
    const a11y = `${name}${position ? `, ${position}` : ''}${meta ? `, ${meta.label}` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photo, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexShrink: 1, minWidth: 96 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [number !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: number })) : null, meta ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, size: "xs", style: { color: metaColor }, accessibilityLabel: meta.label }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [position, team].filter(Boolean).join(' · ') || 'Player' })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: tokens.spacing.md }, children: stats.length > 0 ? (stats.slice(0, 4).map((s, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', minWidth: 34 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: s.highlight ? colors.primaryText : colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: s.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: s.label })] }, `${s.label}-${i}`)))) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, alignSelf: 'center' }, children: "No stats" })) })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: body }));
}
//# sourceMappingURL=PlayerStatCardV3.js.map