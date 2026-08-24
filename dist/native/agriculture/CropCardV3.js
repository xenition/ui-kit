"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropCardV3 = CropCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const STAGE_GLYPH = {
    seeding: { glyph: '🌱', label: 'Seeding', color: 'muted' },
    growing: { glyph: '🌿', label: 'Growing', color: 'primary' },
    flowering: { glyph: '🌸', label: 'Flowering', color: 'accent' },
    mature: { glyph: '🌾', label: 'Mature', color: 'success' },
    harvested: { glyph: '📦', label: 'Harvested', color: 'muted' },
};
const HEALTH_GLYPH = {
    healthy: { mark: '✓', label: 'Healthy', color: 'success' },
    stressed: { mark: '!', label: 'Stressed', color: 'warn' },
    critical: { mark: '⚠', label: 'Critical', color: 'danger' },
};
/**
 * CropCard — design variant **V3**: a **dense single line** — leading stage
 * glyph, name · variety, a stage word, a color-independent health mark, and the
 * maturity percentage flush right. No card chrome; separation comes from a
 * hairline underline. Same props as {@link CropCardProps}; only the layout
 * differs. Token-only.
 */
function CropCardV3({ name, variety, icon, stage = 'growing', health, progress, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const stageMeta = STAGE_GLYPH[stage];
    const glyph = icon ?? stageMeta.glyph;
    const healthMeta = health ? HEALTH_GLYPH[health] : null;
    const clamped = typeof progress === 'number' ? Math.max(0, Math.min(100, progress)) : undefined;
    const container = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.xs,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading crop", style: container, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }) }));
    }
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base }, children: glyph }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontWeight: '700' }, children: name }), variety != null ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted }, children: [" \u00B7 ", variety] }) : null] }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[stageMeta.color], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: stageMeta.label }), healthMeta ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors[healthMeta.color], fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: [healthMeta.mark, " ", healthMeta.label] })) : null, clamped != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: [clamped, "%"] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${variety ? `, ${variety}` : ''}, ${stageMeta.label}`, onPress: onPress, style: ({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, container], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: container, children: inner });
}
//# sourceMappingURL=CropCardV3.js.map