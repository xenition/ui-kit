"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SunriseSunset = SunriseSunset;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * Sunrise / sunset card with a static daylight arc. The arc is a
 * dependency-free row of token-tinted dots forming a dome; the sun marker sits
 * at `progress` along it. Sunrise and sunset are labelled with glyphs + times,
 * so the info never relies on the arc alone. Renders a muted empty state when
 * both times are absent. All colors/sizes come from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors, no SVG/native deps.
 */
function SunriseSunset({ sunrise, sunset, progress = 0.5, arcHeight = 72, emptyLabel = 'Sun times unavailable', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (sunrise == null && sunset == null) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    const p = (0, weather_utils_1.clamp)(progress, 0, 1);
    const DOTS = 11;
    const height = (0, weather_utils_1.clamp)(arcHeight, 40, 200);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", accessibilityLabel: `Sunrise ${sunrise ?? 'unknown'}, sunset ${sunset ?? 'unknown'}`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height, justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            height,
                        }, children: Array.from({ length: DOTS }).map((_, i) => {
                            const t = i / (DOTS - 1);
                            const dome = Math.sin(t * Math.PI); // 0→1→0
                            const active = t <= p;
                            const dotSize = 6;
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: dotSize,
                                    height: dotSize,
                                    borderRadius: dotSize / 2,
                                    marginBottom: dome * (height - dotSize * 2),
                                    backgroundColor: active
                                        ? colors.accent
                                        : (0, weather_utils_1.withAlpha)(colors.accent, 0.25),
                                } }, i));
                        }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                            position: 'absolute',
                            left: `${p * 100}%`,
                            bottom: Math.sin(p * Math.PI) * (height - 12),
                            marginLeft: -9,
                        }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2600\uFE0F", size: "lg", accessibilityLabel: "Sun position" }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF05", size: "sm", accessibilityLabel: "Sunrise" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: sunrise ?? '—' })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF07", size: "sm", accessibilityLabel: "Sunset" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: sunset ?? '—' })] })] })] }));
}
//# sourceMappingURL=SunriseSunset.js.map