"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldCardV2 = FieldCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const STATUS_META = {
    planted: { label: 'Planted', glyph: '🌱', tone: 'success' },
    fallow: { label: 'Fallow', glyph: '🟤', tone: 'neutral' },
    harvested: { label: 'Harvested', glyph: '📦', tone: 'primary' },
    preparing: { label: 'Preparing', glyph: '🚜', tone: 'warn' },
};
function StatCell({ label, value }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: value })] }));
}
/**
 * FieldCard — design variant **V2**: an elevated card built around a prominent
 * **area block** (large figure + unit on a tinted panel) with a glyph + text
 * status badge, then a labeled crop / soil / location stat grid. Where V1 puts
 * area as a small subtitle, V2 makes it the hero. Same props as
 * {@link FieldCardProps}; only the layout differs. Token-only.
 */
function FieldCardV2({ name, area, areaUnit = 'ha', crop, soilType, location, status = 'planted', icon = '🌾', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const meta = STATUS_META[status];
    const cells = [];
    if (crop != null)
        cells.push({ label: 'Crop', value: crop });
    if (soilType != null)
        cells.push({ label: 'Soil', value: soilType });
    if (location != null)
        cells.push({ label: 'Location', value: location });
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
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xl }, children: icon }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] })] }), area != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    padding: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(colors.accent, 0.1),
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', fontFamily: tokens.typography.fontHeading }, children: String(area) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: areaUnit })] })) : null, cells.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, marginTop: tokens.spacing.md }, children: cells.map((c) => ((0, jsx_runtime_1.jsx)(StatCell, { label: c.label, value: c.value }, c.label))) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${meta.label}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: container, children: inner }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [{ opacity: enter.opacity, transform: enter.transform }, container], children: inner }));
}
//# sourceMappingURL=FieldCardV2.js.map