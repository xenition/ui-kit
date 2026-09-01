"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UVIndexCardV4 = UVIndexCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
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
/** `onSuccess`/`onWarn`/`onDanger` ink for a given severity tone. */
const ON_TONE = {
    success: 'onSuccess',
    warn: 'onWarn',
    danger: 'onDanger',
};
/**
 * UVIndexCard — **elevated card** design (v4). A polished white card sitting on
 * the page: an oversized UV numeral, its exposure band as a solid pill (glyph +
 * text — never color alone), a token-tinted 0–11 scale track with a marker, and
 * an optional protection tip. Band severity maps to success/warn/danger tokens,
 * every color/size traces to the compiled theme via `useXenitionTheme()` — no
 * literal colors. Renders a muted empty state when `uv` is absent. Same props as
 * {@link UVIndexCardProps}.
 */
function UVIndexCardV4({ uv, advice, emptyLabel = 'UV index unavailable', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
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
    if (uv == null) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: surface, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    const meta = uvBand(uv);
    const toneColor = colors[meta.tone];
    const onTone = colors[ON_TONE[meta.tone]];
    const markerPct = (0, weather_utils_1.clamp)(uv, 0, 11) / 11;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: `UV index ${uv}, ${meta.label}`, style: surface, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF1E", size: "lg", accessibilityLabel: "UV index" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "UV Index" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                    marginTop: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '800',
                            letterSpacing: -1,
                        }, children: uv }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            backgroundColor: toneColor,
                        }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "sm", accessibilityLabel: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: onTone, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: meta.label })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 10,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, weather_utils_1.withAlpha)(toneColor, 0.15),
                    marginTop: tokens.spacing.md,
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        left: `${markerPct * 100}%`,
                        width: 4,
                        height: 16,
                        marginLeft: -2,
                        borderRadius: tokens.radius.full,
                        backgroundColor: toneColor,
                    } }) }), advice ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    marginTop: tokens.spacing.md,
                }, children: advice })) : null] }));
}
//# sourceMappingURL=UVIndexCardV4.js.map