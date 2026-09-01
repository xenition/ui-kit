"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherStripV4 = WeatherStripV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
/**
 * WeatherStrip — **V4** "journey" design. The boarding-pass take on a multi-day
 * forecast: a horizontal strip of day tiles where the `highlightIndex` day is
 * lifted onto a brand-gradient fill with near-white ink (the signature V4 touch)
 * and announced as "today", while the other tiles stay clean surface with a
 * hairline edge and muted labels. Condition glyphs and high/low temperatures are
 * preserved. Renders an empty hint when there are no days. Same props/behavior as
 * {@link WeatherStripProps}; token-only colors via `useXenitionTheme()`.
 */
function WeatherStripV4({ days, unit = '°', highlightIndex, scrollEnabled = true, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    if (days.length === 0) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: "No forecast available." });
    }
    const tiles = days.map((d, i) => {
        const active = i === highlightIndex;
        const fg = active ? (0, journey_1.journeyInk)(r) : colors.onSurface;
        const sub = active ? (0, journey_1.journeyInkSoft)(r) : colors.mutedText;
        const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: sub, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: d.day }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.lg, color: fg }, children: d.glyph ?? '—' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [d.high, unit] }), typeof d.low === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: sub, fontSize: tokens.typography.scale.xs }, children: [d.low, unit] })) : null] })] }));
        const a11y = `${d.day}${active ? ' today' : ''}, ${d.condition ? `${d.condition}, ` : ''}high ${d.high}${unit}${typeof d.low === 'number' ? `, low ${d.low}${unit}` : ''}`;
        if (active) {
            return ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: {
                    minWidth: 64,
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: { alignItems: 'center', gap: tokens.spacing.xs }, children: inner }) }, `${d.day}-${i}`));
        }
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: {
                minWidth: 64,
                alignItems: 'center',
                gap: tokens.spacing.xs,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            }, children: inner }, `${d.day}-${i}`));
    });
    if (!scrollEnabled) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style], children: tiles }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm }, style: style, children: tiles }));
}
//# sourceMappingURL=WeatherStripV4.js.map