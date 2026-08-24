"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatCard = PlayerStatCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const STATUS_META = {
    available: { label: 'Available', glyph: '✓', tone: 'success' },
    injured: { label: 'Injured', glyph: '＋', tone: 'danger' },
    suspended: { label: 'Suspended', glyph: '⛔', tone: 'warn' },
};
/**
 * A player profile + stat grid — avatar (initials fallback), name/position/
 * number, and a grid of labelled stat cells. Availability is shown as a chip
 * carrying both a glyph and text so it never reads by color alone.
 * Presentational; shaped props plus optional `onPress`. Empty stats and a
 * loading skeleton are handled. Token-only colors.
 */
function PlayerStatCard({ name, position, number, photo, team, stats = [], variant = 'full', status, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const container = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.md,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityState: { busy: true }, accessibilityLabel: "Loading player", style: [container, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: 20, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.base, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }) }));
    }
    const meta = status ? STATUS_META[status] : undefined;
    const metaColor = meta?.tone === 'success' ? colors.success : meta?.tone === 'danger' ? colors.danger : colors.warn;
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photo, name: name, size: compact ? 'sm' : 'lg' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [number !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: number })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [position, team].filter(Boolean).join(' · ') || 'Player' })] }), meta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: meta.label, style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: metaColor,
                    backgroundColor: tokens.ramps.neutral[50],
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: metaColor, fontSize: tokens.typography.scale.xs }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: metaColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })] })) : null] }));
    const grid = !compact && stats.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: stats.map((s, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                minWidth: 72,
                flexGrow: 1,
                flexBasis: '28%',
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: tokens.ramps.neutral[50],
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: s.highlight ? colors.primary : colors.onSurface,
                        fontSize: tokens.typography.scale.lg,
                        fontWeight: '700',
                    }, children: s.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: s.label })] }, `${s.label}-${i}`))) })) : !compact ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No stats recorded" })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, grid] }));
    const a11y = `${name}${position ? `, ${position}` : ''}${meta ? `, ${meta.label}` : ''}`;
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: body }));
}
//# sourceMappingURL=PlayerStatCard.js.map