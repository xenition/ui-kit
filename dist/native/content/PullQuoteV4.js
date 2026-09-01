"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullQuoteV4 = PullQuoteV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
/**
 * **V4 pull quote** — same props as {@link PullQuote} plus `formatQuote`.
 *
 * ## Two changes
 *
 * 1. **The quote is read once.** The base hung a label duplicating the quote
 *    on a figure that then rendered the same words underneath it. A native
 *    label *replaces* its subtree and a web one does not, so a screen-reader
 *    user heard the quote once on a phone and twice on a laptop — from the
 *    same component with the same props. Both twins now name the quote exactly
 *    once, and the wording is a prop rather than a hard-coded `'Quote: '`.
 * 2. **The attribution takes `mutedText`**, not the `muted` fill it was set
 *    in.
 *
 * **Renders nothing without a quote** (§4.5).
 */
function PullQuoteV4({ quote, attribution, variant = 'bordered', formatQuote, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (!quote)
        return null;
    const large = variant === 'large';
    const containerStyle = variant === 'block'
        ? {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
        }
        : large
            ? { paddingVertical: tokens.spacing.lg, alignItems: 'center' }
            : {
                borderLeftWidth: 3,
                borderLeftColor: colors.accent,
                paddingLeft: tokens.spacing.md,
                paddingVertical: tokens.spacing.xs,
            };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View
    // One element, one name. The subtree below it is the visual rendering of
    // the very same words.
    , { 
        // One element, one name. The subtree below it is the visual rendering of
        // the very same words.
        accessible: true, accessibilityRole: "text", 
        // No label by default: `accessible` alone joins the children, so the
        // words are read once. `formatQuote` is the deliberate way to replace
        // that with one composed line — the same contract as the web twin,
        // where an absent label lets the blockquote read once on its own.
        accessibilityLabel: formatQuote?.(quote, attribution), style: [containerStyle, style], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: large ? '2xl' : 'xl', weight: large ? 'bold' : 'medium', tone: "onSurface", align: large ? 'center' : 'auto', measure: true, style: { fontStyle: large ? 'normal' : 'italic' }, children: `“${quote}”` }), attribution ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "mutedText", align: large ? 'center' : 'auto', style: { marginTop: tokens.spacing.sm }, children: `— ${attribution}` })) : null] }));
}
//# sourceMappingURL=PullQuoteV4.js.map