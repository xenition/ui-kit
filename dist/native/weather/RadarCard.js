"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadarCard = RadarCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * Static radar map placeholder — INTENTIONALLY dependency-free: no maps SDK, no
 * SVG, no image. The "canvas" is built purely from `View`s: a token-tinted
 * backdrop, three concentric range rings, a crosshair, and a labelled centre. It
 * gives weather layouts a radar slot to render before (or without) a real tile
 * provider is wired. Optional `onPress` to open a full view. All colors/sizes
 * come from the compiled theme tokens via `useXenitionTheme()` — no literal
 * colors, no external dependencies.
 */
function RadarCard({ title = 'Radar', caption, height = 180, onPress, placeholderLabel = 'Radar preview', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const canvas = (0, weather_utils_1.clamp)(height, 96, 480);
    const rings = [0.9, 0.6, 0.3];
    const Canvas = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            height: canvas,
            borderRadius: tokens.radius.md,
            backgroundColor: (0, weather_utils_1.withAlpha)(colors.primary, 0.08),
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }, children: [rings.map((scale, i) => {
                const dim = canvas * scale;
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                        position: 'absolute',
                        width: dim,
                        height: dim,
                        borderRadius: dim / 2,
                        borderWidth: 1,
                        borderColor: (0, weather_utils_1.withAlpha)(colors.primary, 0.25),
                    } }, i));
            }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    width: '100%',
                    height: 1,
                    backgroundColor: (0, weather_utils_1.withAlpha)(colors.primary, 0.2),
                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    width: 1,
                    height: '100%',
                    backgroundColor: (0, weather_utils_1.withAlpha)(colors.primary, 0.2),
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCE1", size: "xl", accessibilityLabel: "Radar" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: placeholderLabel })] })] }));
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "outlined", padding: "sm", style: style, accessibilityRole: "summary", accessibilityLabel: `${title}${caption ? `, ${caption}` : ''}, ${placeholderLabel}`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '700',
                        }, children: title }), caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: caption })) : null] }), onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Open radar", onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: Canvas })) : (Canvas)] }));
}
//# sourceMappingURL=RadarCard.js.map