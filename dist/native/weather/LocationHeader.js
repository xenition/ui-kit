"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationHeader = LocationHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const GradientSurface_1 = require("./internal/GradientSurface");
const v4_sky_1 = require("./internal/v4-sky");
/**
 * LocationHeader — a rounded **sky** gradient header card (weather V4 line). A
 * pin glyph and the bold location sit over the gradient with the date beneath in
 * a softer ink; an optional circular translucent button trails on the right.
 * Reuses {@link GradientSurface} with `skyGradient` and the near-white sky inks,
 * exactly like the V4 exemplar, so the whole thing restyles from the seed and
 * never introduces a literal color.
 */
function LocationHeader({ location, date, onMenu, menuGlyph = '☰', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, v4_sky_1.skyInk)(r);
    const inkSoft = (0, v4_sky_1.skyInkSoft)(r);
    const surface = {
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        overflow: 'hidden',
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "header", accessibilityLabel: date ? `${location}, ${date}` : location, style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, v4_sky_1.skyGradient)(r), style: surface, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCCD", size: "lg", style: { color: ink } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: location }), date ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                            color: inkSoft,
                                            fontSize: tokens.typography.scale.sm,
                                            fontWeight: '600',
                                            marginTop: tokens.spacing.xs,
                                        }, children: date })) : null] })] }), onMenu ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Menu", onPress: onMenu, style: ({ pressed }) => ({
                            width: 40,
                            height: 40,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, v4_sky_1.skyTile)(r),
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: pressed ? 0.85 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: menuGlyph, size: "lg", style: { color: ink } }) })) : null] }) }) }));
}
//# sourceMappingURL=LocationHeader.js.map