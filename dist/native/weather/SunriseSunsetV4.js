"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SunriseSunsetV4 = SunriseSunsetV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * SunriseSunset — **elevated white card** design (v4). A polished card carrying a
 * static daylight arc: a dependency-free dome of token-tinted dots with the sun
 * marker positioned at `progress` along it. The arc highlight uses `accent`; the
 * track uses `border`/`withAlpha`. Sunrise and sunset are labelled with glyphs +
 * times below, so the info never relies on the arc alone. Renders a muted empty
 * state when both times are absent. All colors/sizes come from the compiled theme
 * tokens via `useXenitionTheme()` — no literal colors, no SVG/native deps. Same
 * props as {@link SunriseSunsetProps}.
 */
function SunriseSunsetV4({ sunrise, sunset, progress = 0.5, arcHeight = 72, emptyLabel = 'Sun times unavailable', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.12,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    if (sunrise == null && sunset == null) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [card, style], accessibilityRole: "summary", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.base }, children: emptyLabel }) }));
    }
    const p = (0, weather_utils_1.clamp)(progress, 0, 1);
    const DOTS = 11;
    const height = (0, weather_utils_1.clamp)(arcHeight, 40, 200);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [card, style], accessibilityRole: "summary", accessibilityLabel: `Sunrise ${sunrise ?? 'unknown'}, sunset ${sunset ?? 'unknown'}`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height, justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            height,
                        }, children: Array.from({ length: DOTS }).map((_, i) => {
                            const t = i / (DOTS - 1);
                            const dome = Math.sin(t * Math.PI); // 0→1→0
                            const active = t <= p;
                            const dotSize = 7;
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: dotSize,
                                    height: dotSize,
                                    borderRadius: dotSize / 2,
                                    marginBottom: dome * (height - dotSize * 2),
                                    backgroundColor: active ? colors.accent : (0, weather_utils_1.withAlpha)(colors.border, 0.9),
                                } }, i));
                        }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                            position: 'absolute',
                            left: `${p * 100}%`,
                            bottom: Math.sin(p * Math.PI) * (height - 12),
                            marginLeft: -11,
                        }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2600\uFE0F", size: "xl", accessibilityLabel: "Sun position", style: { color: colors.accent } }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF05", size: "base", accessibilityLabel: "Sunrise" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '600',
                                }, children: sunrise ?? '—' })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF07", size: "base", accessibilityLabel: "Sunset" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '600',
                                }, children: sunset ?? '—' })] })] })] }));
}
//# sourceMappingURL=SunriseSunsetV4.js.map