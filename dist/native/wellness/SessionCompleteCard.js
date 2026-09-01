"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionCompleteCard = SessionCompleteCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
/**
 * SessionCompleteCard — the peak moment after a practice: a festive two-hue
 * "dawn" gradient ground, a big frosted check badge, and frosted stat chips
 * (minutes, streak). The `Done`/`Reflect` actions each appear only when their
 * handler is set. Near-white ink and the gradient both derive from the brand
 * ramp — no literal colors, so the celebration restyles from the seed in light
 * and dark. Deliberately more saturated than the resting surfaces: this is the
 * one screen allowed to feel like a reward.
 */
function SessionCompleteCard({ title = 'Session complete', message, minutes, streakDays, onDone, onReflect, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
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
    const a11y = `${title}${message ? ', ' + message : ''}${minutes != null ? ', ' + minutes + ' minutes' : ''}${streakDays != null ? ', ' + streakDays + ' day streak' : ''}`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmDawn)(r), style: {
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                overflow: 'hidden',
                alignItems: 'center',
                gap: tokens.spacing.md,
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: "Complete", style: {
                        width: 64,
                        height: 64,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (0, calm_1.calmTile)(r, 0.22),
                        borderWidth: 1,
                        borderColor: (0, calm_1.calmBorder)(r),
                    }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: tokens.typography.scale['2xl'], style: { color: ink } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800', textAlign: 'center' }, children: title }), message ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: message })) : null] }), minutes != null || streakDays != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: tokens.spacing.sm,
                    }, children: [minutes != null ? (0, jsx_runtime_1.jsx)(Chip, { glyph: "\uD83E\uDDD8", text: `${minutes} min` }) : null, streakDays != null ? (0, jsx_runtime_1.jsx)(Chip, { glyph: "\uD83D\uDD25", text: `${streakDays} day streak` }) : null] })) : null, onDone || onReflect ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: tokens.spacing.sm,
                        marginTop: tokens.spacing.xs,
                    }, children: [onDone ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Done", onPress: onDone, style: ({ pressed }) => ({
                                paddingHorizontal: tokens.spacing.xl,
                                paddingVertical: tokens.spacing.sm,
                                borderRadius: tokens.radius.full,
                                backgroundColor: ink,
                                opacity: pressed ? 0.9 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: "Done" }) })) : null, onReflect ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Reflect", onPress: onReflect, style: ({ pressed }) => ({
                                paddingHorizontal: tokens.spacing.xl,
                                paddingVertical: tokens.spacing.sm,
                                borderRadius: tokens.radius.full,
                                backgroundColor: 'transparent',
                                borderWidth: 1,
                                borderColor: (0, calm_1.calmBorder)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Reflect" }) })) : null] })) : null] }) }));
}
//# sourceMappingURL=SessionCompleteCard.js.map