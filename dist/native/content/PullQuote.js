"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullQuote = PullQuote;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A pull quote / block quote for long-form articles — the visually emphasized
 * excerpt lifted out of the body. Three token-bound variants: a `bordered`
 * left-rule quote, a filled `block` card, and an oversized centered `large`
 * display quote. Rendered as an accessible quote for screen readers. All colors
 * come from `SemanticColors`; no literal hex.
 */
function PullQuote({ quote, attribution, variant = 'bordered', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const large = variant === 'large';
    const quoteSize = large ? tokens.typography.scale['2xl'] : tokens.typography.scale.xl;
    const containerStyle = variant === 'block'
        ? {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
        }
        : variant === 'large'
            ? { paddingVertical: tokens.spacing.lg, alignItems: 'center' }
            : {
                borderLeftWidth: 3,
                borderLeftColor: colors.accent,
                paddingLeft: tokens.spacing.md,
                paddingVertical: tokens.spacing.xs,
            };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Quote: ${quote}${attribution ? `, ${attribution}` : ''}`, style: [containerStyle, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: quoteSize,
                    lineHeight: quoteSize * 1.35,
                    fontStyle: large ? 'normal' : 'italic',
                    fontWeight: large ? '700' : '500',
                    textAlign: large ? 'center' : 'left',
                }, children: `“${quote}”` }), attribution ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    marginTop: tokens.spacing.sm,
                    textAlign: large ? 'center' : 'left',
                }, children: `— ${attribution}` })) : null] }));
}
//# sourceMappingURL=PullQuote.js.map