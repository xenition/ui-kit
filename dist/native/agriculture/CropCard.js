"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropCard = CropCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STAGE_META = {
    seeding: { label: 'Seeding', glyph: '🌱', tone: 'neutral' },
    growing: { label: 'Growing', glyph: '🌿', tone: 'primary' },
    flowering: { label: 'Flowering', glyph: '🌸', tone: 'accent' },
    mature: { label: 'Mature', glyph: '🌾', tone: 'success' },
    harvested: { label: 'Harvested', glyph: '📦', tone: 'neutral' },
};
const HEALTH_META = {
    healthy: { label: 'Healthy', color: 'success', tone: 'success' },
    stressed: { label: 'Stressed', color: 'warn', tone: 'warn' },
    critical: { label: 'Critical', color: 'danger', tone: 'danger' },
};
/**
 * A single crop / planting summary — glyph, name + variety, a growth-stage
 * {@link Badge}, an optional health chip (color is always paired with a text
 * label so an at-risk crop reads without color), and, in the `detailed`
 * variant, a maturity {@link Progress} bar plus field / harvest meta. Tapping
 * fires `onPress` (exposed as an accessible button); `loading` renders a muted
 * placeholder. Token-bound throughout — no literal colors.
 */
function CropCard({ name, variety, icon, stage = 'growing', health, progress, fieldLabel, harvestLabel, variant = 'detailed', loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const stageMeta = STAGE_META[stage];
    const glyph = icon ?? stageMeta.glyph;
    const healthMeta = health ? HEALTH_META[health] : null;
    const detailed = variant === 'detailed';
    const clampedProgress = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", style: style, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.base, backgroundColor: colors.border, borderRadius: tokens.radius.sm, width: '60%' } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, backgroundColor: colors.border, borderRadius: tokens.radius.sm, width: '40%', marginTop: tokens.spacing.sm } })] }));
    }
    const Body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: onPress ? 'interactive' : 'outlined', style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: detailed ? '2xl' : 'xl', color: "primary" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: name }), variety != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: variety })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: stageMeta.tone, variant: "soft", size: "sm", children: stageMeta.label }), healthMeta ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: healthMeta.tone, variant: "soft", size: "sm", children: healthMeta.label })) : null] })] }), detailed && clampedProgress != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Maturity" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: healthMeta ? colors[healthMeta.color] : colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [clampedProgress, "%"] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: clampedProgress, tone: healthMeta ? healthMeta.tone : 'primary' })] })) : null, detailed && (fieldLabel != null || harvestLabel != null) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: tokens.spacing.md }, children: [fieldLabel != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", fieldLabel] })) : null, harvestLabel != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDDD3\uFE0F ", harvestLabel] })) : null] })) : null] }));
    if (!onPress)
        return Body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${variety ? `, ${variety}` : ''}, ${stageMeta.label}`, onPress: onPress, style: ({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }], children: Body }));
}
//# sourceMappingURL=CropCard.js.map