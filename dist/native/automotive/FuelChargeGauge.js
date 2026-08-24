"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelChargeGauge = FuelChargeGauge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Level bands → semantic tone + word. A low level maps to the `danger` slot. */
function bandFor(pct, low) {
    if (pct <= low)
        return { tone: 'danger', word: 'Low' };
    if (pct <= low * 2.5)
        return { tone: 'warn', word: 'Fair' };
    return { tone: 'success', word: 'Good' };
}
/**
 * A fuel-tank or EV-battery level gauge — draws a token-tinted meter filled to
 * `percent`, with an estimated-range readout. A low level (at/under
 * `lowThreshold`) resolves to the `danger` slot per contract, but the band is
 * always spelled out ("Low"/"Fair"/"Good") and the a11y label states the number
 * plus a glyph, so meaning never rests on color. Colors come from semantic
 * tokens and `withAlpha` tints — no literal colors. Input is clamped to 0–100.
 */
function FuelChargeGauge({ percent, kind = 'fuel', label, rangeLabel, lowThreshold = 15, charging = false, variant = 'bar', loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(percent) ? percent : 0)));
    const low = Number.isFinite(lowThreshold) ? lowThreshold : 15;
    const band = bandFor(clamped, low);
    const toneColor = colors[band.tone];
    const heading = label ?? (kind === 'ev' ? 'Battery' : 'Fuel');
    const glyph = kind === 'ev' ? (charging ? '⚡' : '🔋') : '⛽';
    const compact = variant === 'compact';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Loading ${heading.toLowerCase()} level`, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.25) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: compact ? 10 : 14, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] }));
    }
    const a11y = `${heading}${charging ? ' charging' : ''}: ${clamped} percent, ${band.word}${rangeLabel ? `, ${rangeLabel} range` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [glyph, " ", heading, charging ? ' · Charging' : ''] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: toneColor, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: [clamped, "%"] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: band.word })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    height: compact ? 8 : 12,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.2),
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: `${clamped}%`,
                        height: '100%',
                        borderRadius: tokens.radius.full,
                        backgroundColor: toneColor,
                    } }) }), rangeLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Est. range ", rangeLabel] })) : null] }));
}
//# sourceMappingURL=FuelChargeGauge.js.map