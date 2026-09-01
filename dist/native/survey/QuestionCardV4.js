"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionCardV4 = QuestionCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * QuestionCard — **V4** "focus" design. The calm, legible take on a survey
 * question: an elevated rounded surface with generous air, a soft-primary
 * number pill (`N / total`), a big prompt, and a slim primary focus bar down the
 * left edge — the single signature accent that anchors the eye. Required shows a
 * spoken danger asterisk; `error` flips the focus bar and message to danger.
 * Same props/behavior as {@link QuestionCardProps}; token-only colors via
 * `useXenitionTheme()`. `variant="compact"` tightens the padding.
 */
function QuestionCardV4({ title, helpText, number, total, required = false, error, variant = 'default', children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const showBadge = number != null;
    const accent = error ? colors.danger : colors.primary;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                overflow: 'hidden',
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 4, backgroundColor: accent } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: compact ? tokens.spacing.xs : tokens.spacing.sm, padding: compact ? tokens.spacing.md : tokens.spacing.lg }, children: [showBadge ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            alignSelf: 'flex-start',
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '800', letterSpacing: 0.5 }, children: total != null ? `${number} / ${total}` : `Q${number}` }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityRole: "header", accessibilityLabel: required ? `${title}, required` : title, style: {
                            color: colors.onSurface,
                            fontSize: compact ? tokens.typography.scale.lg : tokens.typography.scale.xl,
                            fontWeight: '800',
                            lineHeight: (compact ? tokens.typography.scale.lg : tokens.typography.scale.xl) * 1.3,
                        }, children: [title, required ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger }, children: " *" }) : null] }), helpText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: helpText })) : null, children ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: children }) : null, error ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "text", style: { color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: error })) : null] })] }));
}
//# sourceMappingURL=QuestionCardV4.js.map