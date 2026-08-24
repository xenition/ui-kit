"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherStrip = WeatherStrip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A horizontal multi-day forecast strip — one token-styled tile per day with a
 * condition glyph and high/low temperatures. The `highlightIndex` day gets a
 * primary-tinted tile and is announced as "today". Renders an empty hint when
 * there are no days. Token-only colors.
 */
function WeatherStrip({ days, unit = '°', highlightIndex, scrollEnabled = true, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (days.length === 0) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No forecast available." });
    }
    const tiles = days.map((d, i) => {
        const active = i === highlightIndex;
        const bg = active ? colors.primary : colors.surface;
        const fg = active ? colors.onPrimary : colors.onSurface;
        const sub = active ? colors.onPrimary : colors.muted;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${d.day}${active ? ' today' : ''}, ${d.condition ? `${d.condition}, ` : ''}high ${d.high}${unit}${typeof d.low === 'number' ? `, low ${d.low}${unit}` : ''}`, style: {
                minWidth: 64,
                alignItems: 'center',
                gap: tokens.spacing.xs,
                borderWidth: 1,
                borderColor: active ? colors.primary : colors.border,
                backgroundColor: bg,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: sub, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: d.day }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg, color: fg }, children: d.glyph ?? '—' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [d.high, unit] }), typeof d.low === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: sub, fontSize: tokens.typography.scale.xs }, children: [d.low, unit] })) : null] })] }, `${d.day}-${i}`));
    });
    if (!scrollEnabled) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style], children: tiles }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm }, style: style, children: tiles }));
}
//# sourceMappingURL=WeatherStrip.js.map