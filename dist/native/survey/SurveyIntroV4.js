"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyIntroV4 = SurveyIntroV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GradientSurface_1 = require("./internal/GradientSurface");
const focus_1 = require("./internal/focus");
/**
 * SurveyIntro — **V4** "clean form / focus" design. The start of a survey is a
 * peak moment, so this variant leads with a brand gradient hero band
 * (`focusGradient`) carrying near-white ink (`focusInk` / `focusInkSoft`): an
 * optional glyph mark, the title, the purpose line, and any meta stats rendered
 * as frosted glass tiles (`focusTile` / `focusBorder`). Below the band a big
 * ≥44px primary Start CTA sits in the thumb zone with an accessible name, and the
 * footnote is quiet muted fine print. `hero` centers the band and enlarges the
 * mark. Same props/behavior as {@link SurveyIntroProps}; token-only colors via
 * `useXenitionTheme()` + `focus*(tokens.ramps)` (no literals), dark-mode safe.
 */
function SurveyIntroV4({ title, description, logoGlyph, meta, startLabel = 'Start survey', onStart, footnote, variant = 'default', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, focus_1.focusInk)(r);
    const inkSoft = (0, focus_1.focusInkSoft)(r);
    const hero = variant === 'hero';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, focus_1.focusGradient)(r), style: { padding: tokens.spacing.lg, gap: tokens.spacing.md, alignItems: hero ? 'center' : 'stretch' }, children: [logoGlyph ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: hero ? 72 : 52,
                            height: hero ? 72 : 52,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, focus_1.focusTile)(r),
                            borderWidth: 1,
                            borderColor: (0, focus_1.focusBorder)(r),
                            alignSelf: hero ? 'center' : 'flex-start',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: hero ? tokens.typography.scale['2xl'] : tokens.typography.scale.xl }, children: logoGlyph }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                            color: ink,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '800',
                            textAlign: hero ? 'center' : 'left',
                        }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: inkSoft,
                            fontSize: tokens.typography.scale.base,
                            textAlign: hero ? 'center' : 'left',
                            lineHeight: Math.round(tokens.typography.scale.base * 1.5),
                        }, children: description })) : null, meta && meta.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: hero ? 'center' : 'flex-start',
                            gap: tokens.spacing.sm,
                        }, children: meta.map((m, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flex: 1,
                                minWidth: 84,
                                alignItems: 'center',
                                gap: 2,
                                borderRadius: tokens.radius.md,
                                backgroundColor: (0, focus_1.focusTile)(r),
                                borderWidth: 1,
                                borderColor: (0, focus_1.focusBorder)(r),
                                paddingHorizontal: tokens.spacing.md,
                                paddingVertical: tokens.spacing.sm,
                            }, children: [m.icon ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: m.icon })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: m.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: m.label })] }, `${m.label}-${i}`))) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: startLabel, onPress: onStart, style: ({ pressed }) => ({
                            minHeight: 44,
                            paddingVertical: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.primary,
                            opacity: pressed ? 0.9 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: startLabel }) }), footnote ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: footnote })) : null] })] }));
}
//# sourceMappingURL=SurveyIntroV4.js.map