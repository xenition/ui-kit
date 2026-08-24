"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionCard = QuestionCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Framed container for one survey question — a token-bound {@link Card} with a
 * prompt, optional help line, an optional position badge (`numbered`), a
 * required marker, and a slot for the answer control. `compact` tightens the
 * padding for dense forms. The prompt is announced as a `header`; the required
 * state is spoken (asterisk color is never the sole signal). No literal colors.
 */
function QuestionCard({ title, helpText, number, total, required = false, error, variant = 'default', children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const showBadge = variant === 'numbered' && number != null;
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", padding: compact ? 'sm' : 'md', style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: compact ? tokens.spacing.xs : tokens.spacing.sm }, children: [showBadge ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.primary,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '700',
                        letterSpacing: 1,
                    }, children: total != null ? `${number} / ${total}` : `Q${number}` })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityRole: "header", accessibilityLabel: required ? `${title}, required` : title, style: {
                        color: colors.onSurface,
                        fontSize: compact ? tokens.typography.scale.base : tokens.typography.scale.lg,
                        fontWeight: '700',
                    }, children: [title, required ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger }, children: " *" })) : null] }), helpText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: helpText })) : null, children ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: children }) : null, error ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "text", style: { color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: error })) : null] }) }));
}
//# sourceMappingURL=QuestionCard.js.map