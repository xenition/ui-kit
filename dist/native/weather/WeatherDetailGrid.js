"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherDetailGrid = WeatherDetailGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const GradientSurface_1 = require("./internal/GradientSurface");
const v4_sky_1 = require("./internal/v4-sky");
/**
 * WeatherDetailGrid — weather detail metrics grouped into elevated cards. Instead
 * of many loose tiles, the items are chunked `perCard` at a time (default 3) into
 * clean list cards: each row is a glyph badge + label/caption on the left and a
 * big value + unit on the right, separated by hairline dividers. Every color is a
 * semantic token (`card`/`onSurface`/`mutedText`/`border`), so it adapts to light
 * AND dark; the glyph badge is a brand-ramp gradient. No literal colors.
 */
function WeatherDetailGrid({ items, perCard = 3, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const size = Math.max(1, perCard);
    const groups = [];
    for (let i = 0; i < items.length; i += size)
        groups.push(items.slice(i, i + size));
    const badge = tokens.typography.scale.lg + tokens.spacing.sm;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: groups.map((group, gi) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                paddingHorizontal: tokens.spacing.lg,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.1,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
            }, children: group.map((item, ri) => {
                const hasValue = item.value != null;
                const a11y = `${item.label}, ${hasValue ? `${item.value}${item.unit ? ' ' + item.unit : ''}` : 'no data'}`;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: a11y, style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: tokens.spacing.md,
                        paddingVertical: tokens.spacing.md,
                        borderTopWidth: ri === 0 ? 0 : 1,
                        borderTopColor: colors.border,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1, minWidth: 0 }, children: [item.glyph ? ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, v4_sky_1.skyGradient)(r), style: { width: badge, height: badge, borderRadius: tokens.radius.full, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: item.glyph, size: "base", style: { color: (0, v4_sky_1.skyInk)(r) } }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: item.label }), item.caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs, marginTop: 1 }, children: item.caption })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [typeof item.value === 'string' || typeof item.value === 'number' || !hasValue ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: hasValue ? item.value : '—' })) : (item.value), item.unit && hasValue ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: item.unit })) : null] })] }, `${item.label}-${ri}`));
            }) }, gi))) }));
}
//# sourceMappingURL=WeatherDetailGrid.js.map