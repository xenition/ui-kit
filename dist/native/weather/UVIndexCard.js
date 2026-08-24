"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UVIndexCard = UVIndexCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
function uvBand(uv) {
    if (uv <= 2)
        return { label: 'Low', glyph: '🕶️', tone: 'success' };
    if (uv <= 5)
        return { label: 'Moderate', glyph: '🧢', tone: 'warn' };
    if (uv <= 7)
        return { label: 'High', glyph: '🧴', tone: 'warn' };
    if (uv <= 10)
        return { label: 'Very high', glyph: '⛱️', tone: 'danger' };
    return { label: 'Extreme', glyph: '🚫', tone: 'danger' };
}
/**
 * UV index card: the numeric UV value, its exposure band shown as a glyph + text
 * label (never color alone), a token-tinted 0–11 scale track with a marker, and
 * an optional protection tip. Band severity maps to success/warn/danger tokens.
 * Renders a muted empty state when `uv` is absent. All colors/sizes come from
 * the compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
function UVIndexCard({ uv, advice, emptyLabel = 'UV index unavailable', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (uv == null) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    const meta = uvBand(uv);
    const toneColor = colors[meta.tone];
    const markerPct = (0, weather_utils_1.clamp)(uv, 0, 11) / 11;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", accessibilityLabel: `UV index ${uv}, ${meta.label}`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF1E", size: "lg", accessibilityLabel: "UV index" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "UV Index" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    gap: tokens.spacing.sm,
                    marginTop: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '800',
                        }, children: uv }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "sm", accessibilityLabel: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: toneColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: meta.label })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 8,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, weather_utils_1.withAlpha)(toneColor, 0.18),
                    marginTop: tokens.spacing.sm,
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        left: `${markerPct * 100}%`,
                        width: 4,
                        height: 14,
                        marginLeft: -2,
                        borderRadius: tokens.radius.full,
                        backgroundColor: toneColor,
                    } }) }), advice ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    marginTop: tokens.spacing.sm,
                }, children: advice })) : null] }));
}
//# sourceMappingURL=UVIndexCard.js.map