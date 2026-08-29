"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHeadingV4 = AuthHeadingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("./TextV4");
/**
 * §4's comfortable measure, as a multiple of the spacing scale.
 *
 * `2xl × 10` is 480 at the default scale — about 60 characters at the `base`
 * step. The web twin spells the identical product out as a Tailwind class, and
 * both specs assert the arithmetic so the two cannot drift.
 */
const MEASURE_STEPS = 10;
function AuthHeadingV4({ title, subtitle, align = 'left', size = 'xl', measure = true, titleLines, subtitleLines, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    // §12 — no words, no block. Not an empty column with a gap in it.
    if (title == null && subtitle == null)
        return null;
    const textAlign = align === 'center' ? 'center' : 'left';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                // §4's step between the headline and its supporting line, as written.
                gap: tokens.spacing.sm,
                alignItems: align === 'center' ? 'center' : 'flex-start',
            },
            measure ? { maxWidth: tokens.spacing['2xl'] * MEASURE_STEPS } : null,
            // A capped block that is meant to be centred has to be centred as a
            // block, not only as text — otherwise it sits left in its own column.
            measure && align === 'center' ? { alignSelf: 'center' } : null,
            style,
        ], children: [title != null ? (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: size, weight: "bold", align: textAlign, accessibilityRole: "header", numberOfLines: titleLines, face: "heading", children: title })) : (title)) : null, subtitle != null ? (typeof subtitle === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", align: textAlign, numberOfLines: subtitleLines, face: "body", children: subtitle })) : (subtitle)) : null] }));
}
//# sourceMappingURL=AuthHeadingV4.js.map