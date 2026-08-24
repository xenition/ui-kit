"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionCardV3 = QuestionCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * QuestionCard, design V3 — **minimal and borderless**. No card, no shadow: a
 * small primary "eyebrow" (`Q n`, or `Q n / total`) sits above a large prompt,
 * separated from the answer control by a single hairline rule. The stripped
 * treatment suits dense, editorial surveys. Required state is spoken and marked
 * (never color-alone); the prompt is the `header`. Token-pure.
 */
function QuestionCardV3({ title, helpText, number, total, required = false, error, variant = 'default', children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const eyebrow = number != null ? (total != null ? `Q ${number} / ${total}` : `Q ${number}`) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: compact ? tokens.spacing.xs : tokens.spacing.sm }, style], children: [eyebrow ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.primaryText,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '800',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                }, children: eyebrow })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityRole: "header", accessibilityLabel: required ? `${title}, required` : title, style: {
                    color: colors.onSurface,
                    fontSize: compact ? tokens.typography.scale.lg : tokens.typography.scale.xl,
                    fontWeight: '700',
                    lineHeight: (compact ? tokens.typography.scale.lg : tokens.typography.scale.xl) * 1.25,
                }, children: [title, required ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.dangerText }, children: " *" }) : null] }), helpText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: helpText })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 1,
                    backgroundColor: (0, color_1.withAlpha)(colors.border, 0.8),
                    marginTop: tokens.spacing.xs,
                    marginBottom: children ? tokens.spacing.sm : 0,
                } }), children ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: children }) : null, error ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "text", style: {
                    marginTop: tokens.spacing.xs,
                    color: colors.dangerText,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '700',
                }, children: error })) : null] }));
}
//# sourceMappingURL=QuestionCardV3.js.map