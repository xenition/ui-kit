"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindCompassV4 = WindCompassV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const weather_utils_1 = require("./weather-utils");
const CARDINALS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
/** Nearest 8-point cardinal name for a bearing in degrees. */
function cardinalFor(deg) {
    const idx = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
    return CARDINALS[idx] ?? 'N';
}
/**
 * WindCompass — **elevated card** design (v4). A polished white card carrying a
 * bigger, cleaner dependency-free dial: a token-ringed compass with N/E/S/W tick
 * labels and a rotated arrow (`transform: rotate`) showing the bearing, the
 * sustained speed centred on a soft token-tinted hub, and an optional gust
 * caption. The cardinal direction is also written out as text, so orientation
 * never relies on the arrow alone. Every color/size traces to the compiled theme
 * via `useXenitionTheme()` — no literal colors, no SVG/native deps. Same props as
 * {@link WindCompassProps}.
 */
function WindCompassV4({ direction = 0, speed, gust, unit = 'mph', size = 120, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const deg = ((direction % 360) + 360) % 360;
    const cardinal = cardinalFor(deg);
    const dial = (0, weather_utils_1.clamp)(size, 72, 400);
    const arrowLen = dial * 0.4;
    const surface = [
        {
            backgroundColor: colors.card,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.12,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    const tick = (pos, letter) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
            position: 'absolute',
            [pos]: 6,
            color: letter === 'N' ? colors.primary : colors.mutedText,
            fontSize: tokens.typography.scale.xs,
            fontWeight: letter === 'N' ? '800' : '600',
        }, children: letter }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: `Wind from ${cardinal}, ${deg} degrees${speed != null ? `, ${speed} ${unit}` : ''}${gust != null ? `, gusting ${gust} ${unit}` : ''}`, style: surface, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        width: dial,
                        height: dial,
                        borderRadius: dial / 2,
                        borderWidth: 3,
                        borderColor: colors.border,
                        backgroundColor: (0, weather_utils_1.withAlpha)(colors.primary, 0.15),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: [tick('top', 'N'), tick('bottom', 'S'), tick('left', 'W'), tick('right', 'E'), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                width: 3,
                                height: arrowLen,
                                transform: [{ rotate: `${deg}deg` }],
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 0,
                                        height: 0,
                                        alignSelf: 'center',
                                        borderLeftWidth: 6,
                                        borderRightWidth: 6,
                                        borderBottomWidth: 10,
                                        borderLeftColor: (0, weather_utils_1.withAlpha)(colors.primary, 0),
                                        borderRightColor: (0, weather_utils_1.withAlpha)(colors.primary, 0),
                                        borderBottomColor: colors.primary,
                                    } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, width: 3, alignSelf: 'center', backgroundColor: colors.primary } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                position: 'absolute',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: dial * 0.5,
                                height: dial * 0.5,
                                borderRadius: dial * 0.25,
                                backgroundColor: colors.card,
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.xl,
                                        fontWeight: '800',
                                    }, children: speed != null ? speed : '—' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: unit })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: ["From ", cardinal, " (", deg, "\u00B0)"] }), gust != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: ["Gusts ", gust, " ", unit] })) : null] }) }));
}
//# sourceMappingURL=WindCompassV4.js.map