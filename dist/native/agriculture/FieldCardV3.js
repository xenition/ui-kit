"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldCardV3 = FieldCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const STATUS_META = {
    planted: { label: 'Planted', glyph: '🌱', color: 'success' },
    fallow: { label: 'Fallow', glyph: '🟤', color: 'muted' },
    harvested: { label: 'Harvested', glyph: '📦', color: 'primary' },
    preparing: { label: 'Preparing', glyph: '🚜', color: 'warn' },
};
/**
 * FieldCard — design variant **V3**: a **compact row** — glyph, name, an inline
 * muted area figure, and a glyph + text status flush right. No card chrome; a
 * hairline underline separates rows in a list. Same props as
 * {@link FieldCardProps}; only the layout differs. Token-only.
 */
function FieldCardV3({ name, area, areaUnit = 'ha', status = 'planted', icon = '🌾', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
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
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base }, children: icon }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name }), area != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [String(area), " ", areaUnit] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors[meta.color], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [meta.glyph, " ", meta.label] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}, ${meta.label}`, onPress: onPress, style: ({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, container], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: container, children: inner });
}
//# sourceMappingURL=FieldCardV3.js.map