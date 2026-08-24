"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorByline = AuthorByline;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/** Joins the non-empty meta fragments with a middot separator. */
function metaLine(parts) {
    return parts.filter((p) => !!p && p.length > 0).join('  ·  ');
}
/**
 * The "by {author} · {date} · {read time}" credit line under a headline —
 * the native mirror of a web article byline. Composes the `Avatar` primitive
 * (initials fallback when there's no photo) and reads all colors from the
 * theme's `SemanticColors`. Two variants: a stacked `full` byline for article
 * headers and a single-line `compact` byline for cards. No literal hex.
 */
function AuthorByline({ author, date, readingTime, variant = 'full', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const meta = metaLine([date, readingTime]);
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `By ${author.name}${meta ? `, ${meta}` : ''}`, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: author.avatarUrl, name: author.name, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, numberOfLines: 1, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontWeight: '600' }, children: author.name }), meta ? `  ·  ${meta}` : ''] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `By ${author.name}${author.role ? `, ${author.role}` : ''}${meta ? `, ${meta}` : ''}`, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: author.avatarUrl, name: author.name, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexShrink: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, numberOfLines: 1, children: author.name }), author.role ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, numberOfLines: 1, children: author.role })) : null, meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, numberOfLines: 1, children: meta })) : null] })] }));
}
//# sourceMappingURL=AuthorByline.js.map