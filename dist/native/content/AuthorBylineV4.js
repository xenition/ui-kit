"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorBylineV4 = AuthorBylineV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const TextV4_1 = require("../primitives/TextV4");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * **V4 byline** — same props as {@link AuthorByline} plus `formatByline`.
 *
 * ## Three changes
 *
 * 1. **The byline is one stop with a real role.** The web twin hung an
 *    `aria-label` on a roleless `<div>`, where it is ignored outright, so a
 *    credit line read as three loose fragments — name, then role, then date —
 *    while this twin read it as one. Both are now a single named `text`
 *    element, so the two platforms say the same sentence.
 * 2. **`'By '` is a prop.** It was the one word in the component nobody
 *    outside English could change.
 * 3. **The role and the meta line take `mutedText`.** They were set in
 *    `muted`, a fill slot the compiler makes no contrast promise about, at the
 *    smallest step in the component.
 *
 * **Renders nothing without an author name** (§4.5).
 */
function AuthorBylineV4({ author, date, readingTime, variant = 'full', formatByline = (name) => `By ${name}`, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    if (!author?.name)
        return null;
    // The dot is for the eye; the spoken name gets commas, which a reader pauses
    // on instead of reading out as "middle dot".
    const meta = (0, reading_v4_1.metaLine)([date, readingTime]);
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: (0, reading_v4_1.spokenLine)([formatByline(author.name), date, readingTime]), style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: author.avatarUrl, name: author.name, size: "sm" }), (0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, style: { flexShrink: 1 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", children: author.name }), meta ? `  ·  ${meta}` : ''] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: (0, reading_v4_1.spokenLine)([formatByline(author.name), author.role, date, readingTime]), style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: author.avatarUrl, name: author.name, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexShrink: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: author.name }), author.role ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: author.role })) : null, meta ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: meta })) : null] })] }));
}
//# sourceMappingURL=AuthorBylineV4.js.map