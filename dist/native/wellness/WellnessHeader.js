"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WellnessHeader = WellnessHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
/**
 * WellnessHeader — the home-screen header: a soft gradient ground with a greeting
 * and name, an optional profile avatar, and frosted "glass" stat chips (streak,
 * minutes today). Near-white ink and the gradient both derive from the brand
 * ramp, and the chips are translucent brand-ink — no literal colors, restyles
 * from the seed, light + dark. The single vivid surface on the screen; the rest
 * of the screen stays calm around it.
 */
function WellnessHeader({ greeting = 'Good morning', name, subtitle, streakDays, minutes, avatarGlyph = '🧘', onProfile, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, calm_1.calmInk)(r);
    const inkSoft = (0, calm_1.calmInkSoft)(r);
    const Chip = ({ glyph, text }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: (0, calm_1.calmTile)(r),
            borderWidth: 1,
            borderColor: (0, calm_1.calmBorder)(r),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: text })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: greeting }), name ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', marginTop: 2 }, children: name })) : null, subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, marginTop: 2 }, children: subtitle })) : null] }), onProfile ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Open profile", onPress: onProfile, style: ({ pressed }) => ({
                                width: 44,
                                height: 44,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (0, calm_1.calmTile)(r, 0.22),
                                borderWidth: 1,
                                borderColor: (0, calm_1.calmBorder)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: avatarGlyph }) })) : null] }), streakDays != null || minutes != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }, children: [streakDays != null ? (0, jsx_runtime_1.jsx)(Chip, { glyph: "\uD83D\uDD25", text: `${streakDays} day streak` }) : null, minutes != null ? (0, jsx_runtime_1.jsx)(Chip, { glyph: "\uD83E\uDDD8", text: `${minutes} min today` }) : null] })) : null] }) }));
}
//# sourceMappingURL=WellnessHeader.js.map