"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHeadingV4 = AuthHeadingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
const TextV4_1 = require("./TextV4");
/**
 * The measure §4 asks for, composed from the spacing scale rather than picked.
 *
 * `2xl × 10` is 480 at the default scale — about 60 characters at the `base`
 * step, comfortably inside the 45–75 band, and it re-scales with a seed that
 * re-scales its rhythm. Written out whole because Tailwind's scanner reads
 * source text; the native twin computes the identical product from
 * `tokens.spacing`, and both specs assert it.
 */
const MEASURE = 'max-w-[calc(var(--xen-space-2xl)*10)]';
function AuthHeadingV4({ title, subtitle, align = 'left', size = 'xl', measure = true, titleLines, subtitleLines, className, }) {
    // §12 — no words, no block. Not an empty column with a gap in it.
    if (title == null && subtitle == null)
        return null;
    const textAlign = align === 'center' ? 'center' : 'left';
    return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-auth-heading": "", "data-align": align, className: (0, cn_1.cn)(
        // §4's step between the headline and its supporting line, as written.
        'flex flex-col gap-sm', align === 'center' ? 'items-center text-center' : 'items-start text-left', measure && MEASURE, 
        // A capped block that is meant to be centred has to be centred as a
        // block, not only as text — otherwise it sits left in its own column.
        measure && align === 'center' && 'mx-auto', className), children: [title != null ? (typeof title === 'string' ? (
            // `m-0` because a bare `h1` carries a user-agent margin that would
            // sit inside the `gap-sm` above and quietly widen it.
            (0, jsx_runtime_1.jsx)("h1", { className: "m-0", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: size, weight: "bold", align: textAlign, numberOfLines: titleLines, face: "heading", children: title }) })) : (title)) : null, subtitle != null ? (typeof subtitle === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", align: textAlign, numberOfLines: subtitleLines, face: "body", children: subtitle })) : (subtitle)) : null] }));
}
//# sourceMappingURL=AuthHeadingV4.js.map