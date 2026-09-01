"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastStripV4 = ForecastStripV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
const GradientSurface_1 = require("./internal/GradientSurface");
const v4_sky_1 = require("./internal/v4-sky");
/**
 * ForecastStrip — **sky tiles** design (v4). A rounded gradient panel of soft
 * translucent day tiles (horizontal scroll, or full-width rows under
 * `variant='list'`): day label, condition glyph + label, and high/low. The
 * selected day inverts to a solid near-white tile with deep-brand text — a filled
 * chip plus a bold label, never color alone. Gradient, ink and tiles all derive
 * from the brand ramp; no literal colors. Renders a muted line when `days` is
 * empty. Same props as {@link ForecastStripProps}.
 */
function ForecastStripV4({ days, unit = '°', selectedIndex, onSelectDay, variant = 'scroll', emptyLabel = 'No forecast available', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, v4_sky_1.skyInk)(r);
    const inkSoft = (0, v4_sky_1.skyInkSoft)(r);
    const isRow = variant === 'list';
    const surface = { borderRadius: tokens.radius.lg, padding: tokens.spacing.md, overflow: 'hidden' };
    if (days.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, v4_sky_1.skyGradient)(r), style: surface, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: emptyLabel }) }) }));
    }
    const renderCell = (day, index) => {
        const selected = index === selectedIndex;
        const label = (0, weather_utils_1.conditionLabel)(day.condition);
        const glyph = (0, weather_utils_1.conditionGlyph)(day.condition);
        const a11y = `${day.label}, ${label}${day.high != null ? `, high ${day.high}${unit}` : ''}${day.low != null ? `, low ${day.low}${unit}` : ''}`;
        // Selected tile is near-white; its text is the deep end of the brand ramp.
        const fg = selected ? r.primary[700] : ink;
        const fgSoft = selected ? r.primary[500] : inkSoft;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: a11y, onPress: onSelectDay ? () => onSelectDay(day, index) : undefined, style: ({ pressed }) => [
                {
                    flexDirection: isRow ? 'row' : 'column',
                    alignItems: 'center',
                    justifyContent: isRow ? 'space-between' : 'center',
                    gap: tokens.spacing.xs,
                    minWidth: isRow ? undefined : 70,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: selected ? r.primary[50] : (0, v4_sky_1.skyTile)(r, pressed ? 0.26 : 0.16),
                },
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.sm, fontWeight: selected ? '800' : '600', flex: isRow ? 1 : undefined, textAlign: isRow ? 'left' : 'center' }, children: day.label }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "lg", accessibilityLabel: label, style: { color: fg } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: day.high != null ? `${day.high}${unit}` : '—' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fgSoft, fontSize: tokens.typography.scale.sm }, children: day.low != null ? `${day.low}${unit}` : '—' })] }), day.precip != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: fgSoft, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCA7 ", day.precip, "%"] })) : null] }, `${day.label}-${index}`));
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, v4_sky_1.skyGradient)(r), style: surface, children: isRow ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: days.map(renderCell) })) : ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm }, children: days.map(renderCell) })) }) }));
}
//# sourceMappingURL=ForecastStripV4.js.map