"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyIntro = SurveyIntro;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Survey landing / intro screen — a token `Card` leading with the title and
 * purpose, an optional meta stats row (question count, estimated time), and a
 * primary start `Button`. `hero` centers the layout behind an enlarged mark.
 * The CTA carries an accessible name; no literal colors.
 */
function SurveyIntro({ title, description, logoGlyph, meta, startLabel = 'Start survey', onStart, footnote, variant = 'default', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hero = variant === 'hero';
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "elevated", padding: "lg", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md, alignItems: hero ? 'center' : 'stretch' }, children: [logoGlyph ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: hero ? 72 : 52,
                        height: hero ? 72 : 52,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.primary,
                        alignSelf: hero ? 'center' : 'flex-start',
                    }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: logoGlyph, size: hero ? '2xl' : 'xl', color: "onPrimary" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                        color: colors.onSurface,
                        fontSize: tokens.typography.scale['2xl'],
                        fontWeight: '800',
                        textAlign: hero ? 'center' : 'left',
                    }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.muted,
                        fontSize: tokens.typography.scale.base,
                        textAlign: hero ? 'center' : 'left',
                        lineHeight: Math.round(tokens.typography.scale.base * 1.5),
                    }, children: description })) : null, meta && meta.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        justifyContent: hero ? 'center' : 'flex-start',
                        gap: tokens.spacing.lg,
                        paddingVertical: tokens.spacing.sm,
                    }, children: meta.map((m, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [m.icon ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: m.icon, size: "lg", color: "primary" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: m.value }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: m.label })] }, `${m.label}-${i}`))) })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "lg", onPress: onStart, accessibilityLabel: startLabel, children: startLabel }), footnote ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.muted,
                        fontSize: tokens.typography.scale.xs,
                        textAlign: 'center',
                    }, children: footnote })) : null] }) }));
}
//# sourceMappingURL=SurveyIntro.js.map