"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyComplete = SurveyComplete;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GradientSurface_1 = require("./internal/GradientSurface");
const focus_1 = require("./internal/focus");
/**
 * SurveyComplete — the survey's peak-end **celebration hero** (V4 "focus" line).
 * A full two-hue celebratory gradient ground (`focusCelebrate`, accent→primary)
 * carries near-white ink (`focusInk` / `focusInkSoft`): a big emoji/check mark,
 * the headline, an optional thank-you message, and an optional highlight stat as
 * a frosted glass tile (`focusTile` / `focusBorder`). Big ≥44px CTAs sit in the
 * thumb zone — a near-white primary pill and an optional ghost secondary.
 * Presentational only (shaped data + callbacks). Token-only colors via
 * `useXenitionTheme()` + `focus*(tokens.ramps)` (no literals), dark-mode safe.
 */
function SurveyComplete({ title = 'All done!', message, emoji = '🎉', stat, primaryLabel = 'Done', onPrimary, secondaryLabel, onSecondary, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, focus_1.focusInk)(r);
    const inkSoft = (0, focus_1.focusInkSoft)(r);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, focus_1.focusCelebrate)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.xl, alignItems: 'center', overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: title, style: {
                        width: 64,
                        height: 64,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, focus_1.focusTile)(r),
                        borderWidth: 1,
                        borderColor: (0, focus_1.focusBorder)(r),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: emoji }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                        color: ink,
                        fontSize: tokens.typography.scale['2xl'],
                        fontWeight: '800',
                        textAlign: 'center',
                        marginTop: tokens.spacing.md,
                    }, children: title }), message ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: inkSoft,
                        fontSize: tokens.typography.scale.base,
                        textAlign: 'center',
                        lineHeight: Math.round(tokens.typography.scale.base * 1.5),
                        marginTop: tokens.spacing.xs,
                    }, children: message })) : null, stat ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        alignSelf: 'stretch',
                        alignItems: 'center',
                        gap: 2,
                        marginTop: tokens.spacing.lg,
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, focus_1.focusTile)(r),
                        borderWidth: 1,
                        borderColor: (0, focus_1.focusBorder)(r),
                        paddingHorizontal: tokens.spacing.md,
                        paddingVertical: tokens.spacing.md,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: stat.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: stat.label })] })) : null, onPrimary || onSecondary ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignSelf: 'stretch', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }, children: [onPrimary ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: primaryLabel, onPress: onPrimary, style: ({ pressed }) => ({
                                minHeight: 44,
                                paddingVertical: tokens.spacing.md,
                                borderRadius: tokens.radius.md,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: ink,
                                opacity: pressed ? 0.9 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: primaryLabel }) })) : null, onSecondary && secondaryLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: secondaryLabel, onPress: onSecondary, style: ({ pressed }) => ({
                                minHeight: 44,
                                paddingVertical: tokens.spacing.md,
                                borderRadius: tokens.radius.md,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: (0, focus_1.focusBorder)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: secondaryLabel }) })) : null] })) : null] }) }));
}
//# sourceMappingURL=SurveyComplete.js.map