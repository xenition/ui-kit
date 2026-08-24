"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropCardV2 = CropCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const STAGE_META = {
    seeding: { label: 'Seeding', glyph: '🌱', color: 'muted' },
    growing: { label: 'Growing', glyph: '🌿', color: 'primary' },
    flowering: { label: 'Flowering', glyph: '🌸', color: 'accent' },
    mature: { label: 'Mature', glyph: '🌾', color: 'success' },
    harvested: { label: 'Harvested', glyph: '📦', color: 'muted' },
};
const HEALTH_META = {
    healthy: { label: 'Healthy', mark: '✓', color: 'success', tone: 'success' },
    stressed: { label: 'Stressed', mark: '!', color: 'warn', tone: 'warn' },
    critical: { label: 'Critical', mark: '⚠', color: 'danger', tone: 'danger' },
};
/**
 * CropCard — design variant **V2**: an elevated card led by a large tinted
 * **glyph tile**, with a segmented **maturity ring** dial (percentage centered)
 * and a color-independent health line (mark + text). Where V1 is a bordered row
 * with an inline progress bar, V2 is a floating, tile-and-dial hero. Same props
 * as {@link CropCardProps}; only the layout differs. Token-only.
 */
function CropCardV2({ name, variety, icon, stage = 'growing', health, progress, fieldLabel, harvestLabel, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const stageMeta = STAGE_META[stage];
    const glyph = icon ?? stageMeta.glyph;
    const healthMeta = health ? HEALTH_META[health] : null;
    const ringColor = healthMeta ? colors[healthMeta.color] : colors.primary;
    const clamped = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;
    const container = [
        {
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 0,
            backgroundColor: colors.surface,
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading crop", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.lg, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, height: tokens.typography.scale.sm, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }));
    }
    const ringSize = 60;
    const ringBorder = 6;
    const seg = (threshold) => clamped != null && clamped >= threshold ? ringColor : colors.border;
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 56,
                            height: 56,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'] }, children: glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: name }), variety != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: variety })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: stageMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[stageMeta.color], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: stageMeta.label })] })] }), clamped != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: ringSize, height: ringSize, alignItems: 'center', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    position: 'absolute',
                                    width: ringSize,
                                    height: ringSize,
                                    borderRadius: tokens.radius.full,
                                    borderWidth: ringBorder,
                                    borderTopColor: seg(1),
                                    borderRightColor: seg(26),
                                    borderBottomColor: seg(51),
                                    borderLeftColor: seg(76),
                                    transform: [{ rotate: '45deg' }],
                                } }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [clamped, "%"] })] })) : null] }), healthMeta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[healthMeta.color], fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: healthMeta.mark }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: healthMeta.tone, variant: "soft", size: "sm", children: healthMeta.label })] })) : null, fieldLabel != null || harvestLabel != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: tokens.spacing.md }, children: [fieldLabel != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", fieldLabel] })) : null, harvestLabel != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDDD3\uFE0F ", harvestLabel] })) : null] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${variety ? `, ${variety}` : ''}, ${stageMeta.label}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: container, children: inner }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, container], children: inner }));
}
//# sourceMappingURL=CropCardV2.js.map