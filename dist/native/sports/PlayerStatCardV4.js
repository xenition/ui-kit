"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatCardV4 = PlayerStatCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    available: { label: 'Available', glyph: '✓', slot: 'success' },
    injured: { label: 'Injured', glyph: '＋', slot: 'danger' },
    suspended: { label: 'Suspended', glyph: '⛔', slot: 'warn' },
};
/**
 * PlayerStatCard — **V4** "broadcast" design. The matchday take on a player
 * profile: an elevated card with a shirt-number chip in a soft-primary tint,
 * name/position/team, an availability pill that reads by glyph + text (never color
 * alone), and the key stats as big bold numerals over muted labels — the leading
 * `highlight` stat sits on a soft-primary tile. Same props/behavior as
 * {@link PlayerStatCardProps}; token-only colors via `useXenitionTheme()`.
 * `loading` swaps in a token skeleton.
 */
function PlayerStatCardV4({ name, position, number, photo, team, stats = [], variant = 'full', status, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const container = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.md,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityState: { busy: true }, accessibilityLabel: "Loading player", style: [container, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: 20, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.base, borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1) } })] })] }) }));
    }
    const meta = status ? STATUS_META[status] : undefined;
    const metaColor = meta ? colors[meta.slot] : colors.muted;
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photo, name: name, size: compact ? 'sm' : 'lg' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [number !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    minWidth: 24,
                                    height: 24,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingHorizontal: 4,
                                    borderRadius: tokens.radius.md,
                                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: number }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: name })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [position, team].filter(Boolean).join(' · ') || 'Player' })] }), meta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: meta.label, style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(metaColor, 0.12),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: metaColor, fontSize: tokens.typography.scale.xs }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: metaColor, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: meta.label })] })) : null] }));
    const renderStat = (s, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            minWidth: 72,
            flexGrow: 1,
            flexBasis: '28%',
            padding: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: s.highlight ? (0, color_1.withAlpha)(colors.primary, 0.12) : (0, color_1.withAlpha)(colors.onSurface, 0.05),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: s.highlight ? colors.primary : colors.onSurface,
                    fontSize: tokens.typography.scale['2xl'],
                    fontWeight: '800',
                }, children: s.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: s.label })] }, `${s.label}-${i}`));
    const grid = !compact && stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: stats.map(renderStat) })) : !compact ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No stats recorded" })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, grid] }));
    const a11y = `${name}${position ? `, ${position}` : ''}${meta ? `, ${meta.label}` : ''}`;
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: body }));
}
//# sourceMappingURL=PlayerStatCardV4.js.map