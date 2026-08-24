"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindCompass = WindCompass;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const weather_utils_1 = require("./weather-utils");
const CARDINALS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
/** Nearest 8-point cardinal name for a bearing in degrees. */
function cardinalFor(deg) {
    const idx = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
    return CARDINALS[idx] ?? 'N';
}
/**
 * Wind direction + speed dial. A dependency-free `View` compass: a token-bordered
 * ring with N/E/S/W tick labels and a rotated arrow (`transform: rotate`) showing
 * the bearing, with the sustained speed centred and an optional gust caption. The
 * cardinal direction is also written out as text, so orientation never relies on
 * the arrow alone. All colors/sizes come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors, no SVG/native deps.
 */
function WindCompass({ direction = 0, speed, gust, unit = 'mph', size = 120, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const deg = ((direction % 360) + 360) % 360;
    const cardinal = cardinalFor(deg);
    const dial = (0, weather_utils_1.clamp)(size, 72, 400);
    const arrowLen = dial * 0.36;
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", accessibilityLabel: `Wind from ${cardinal}, ${deg} degrees${speed != null ? `, ${speed} ${unit}` : ''}${gust != null ? `, gusting ${gust} ${unit}` : ''}`, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        width: dial,
                        height: dial,
                        borderRadius: dial / 2,
                        borderWidth: 2,
                        borderColor: colors.border,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                position: 'absolute',
                                top: 4,
                                color: colors.muted,
                                fontSize: tokens.typography.scale.xs,
                            }, children: "N" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                position: 'absolute',
                                bottom: 4,
                                color: colors.muted,
                                fontSize: tokens.typography.scale.xs,
                            }, children: "S" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                position: 'absolute',
                                left: 4,
                                color: colors.muted,
                                fontSize: tokens.typography.scale.xs,
                            }, children: "W" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                position: 'absolute',
                                right: 4,
                                color: colors.muted,
                                fontSize: tokens.typography.scale.xs,
                            }, children: "E" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                width: 2,
                                height: arrowLen,
                                transform: [{ rotate: `${deg}deg` }],
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 0,
                                        height: 0,
                                        alignSelf: 'center',
                                        borderLeftWidth: 5,
                                        borderRightWidth: 5,
                                        borderBottomWidth: 8,
                                        borderLeftColor: 'transparent',
                                        borderRightColor: 'transparent',
                                        borderBottomColor: colors.primary,
                                    } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, width: 2, alignSelf: 'center', backgroundColor: colors.primary } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'absolute', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.lg,
                                        fontWeight: '800',
                                    }, children: speed != null ? speed : '—' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: unit })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["From ", cardinal, " (", deg, "\u00B0)"] }), gust != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Gusts ", gust, " ", unit] })) : null] }) }));
}
//# sourceMappingURL=WindCompass.js.map