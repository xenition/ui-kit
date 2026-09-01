"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadarCardV4 = RadarCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
const GradientSurface_1 = require("./internal/GradientSurface");
const v4_sky_1 = require("./internal/v4-sky");
/**
 * RadarCard — **sky scope** design (v4). A dependency-free radar placeholder that
 * actually looks like a scope: a gradient sky canvas with concentric range rings,
 * a crosshair, a rotated sweep beam, a couple of translucent "precip" returns, and
 * a pinging center marker — all built from `View`s (no maps SDK, no SVG, no image).
 * A header carries the title and a "live" pill. Optional `onPress` opens a full
 * view. Gradient stops, rings and ink derive from the brand ramp; returns use the
 * `accent`/`warn` tokens — no literal colors. Same props as {@link RadarCardProps}.
 */
function RadarCardV4({ title = 'Radar', caption, height = 200, onPress, placeholderLabel = 'Radar preview', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, v4_sky_1.skyInk)(r);
    const inkSoft = (0, v4_sky_1.skyInkSoft)(r);
    const canvas = (0, weather_utils_1.clamp)(height, 120, 480);
    const rings = [1, 0.68, 0.36];
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.12,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    const Scope = ((0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, v4_sky_1.skyGradient)(r), style: {
            height: canvas,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }, children: [rings.map((scale, i) => {
                const dim = canvas * 0.86 * scale;
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                        position: 'absolute',
                        width: dim,
                        height: dim,
                        borderRadius: dim / 2,
                        borderWidth: 1,
                        borderColor: (0, v4_sky_1.skyTile)(r, 0.4),
                    } }, i));
            }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', width: '86%', height: 1, backgroundColor: (0, v4_sky_1.skyTile)(r, 0.35) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', width: 1, height: '86%', backgroundColor: (0, v4_sky_1.skyTile)(r, 0.35) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    width: canvas * 0.42,
                    height: 2,
                    left: '50%',
                    top: '50%',
                    backgroundColor: (0, weather_utils_1.withAlpha)(ink, 0.55),
                    transform: [{ translateX: 0 }, { rotate: '-35deg' }],
                    transformOrigin: 'left center',
                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', top: canvas * 0.24, left: canvas * 0.3, width: canvas * 0.2, height: canvas * 0.2, borderRadius: canvas * 0.1, backgroundColor: (0, weather_utils_1.withAlpha)(colors.accent, 0.5) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', bottom: canvas * 0.22, right: canvas * 0.26, width: canvas * 0.14, height: canvas * 0.14, borderRadius: canvas * 0.07, backgroundColor: (0, weather_utils_1.withAlpha)(colors.warn, 0.5) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: (0, weather_utils_1.withAlpha)(colors.accent, 0.7) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'absolute', bottom: tokens.spacing.sm, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md, paddingVertical: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: (0, v4_sky_1.skyTile)(r, 0.22) }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCE1", size: "sm", accessibilityLabel: "Radar", style: { color: ink } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: placeholderLabel })] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [card, style], accessibilityRole: "summary", accessibilityLabel: `${title}${caption ? `, ${caption}` : ''}, ${placeholderLabel}`, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: tokens.spacing.sm, paddingHorizontal: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), caption ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2, borderRadius: tokens.radius.full, backgroundColor: (0, weather_utils_1.withAlpha)(colors.accent, 0.14) }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.accentText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: caption })] })) : null] }), onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Open radar", onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: Scope })) : (Scope)] }));
}
//# sourceMappingURL=RadarCardV4.js.map