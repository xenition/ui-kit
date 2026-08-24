"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleHeader = ArticleHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const AuthorByline_1 = require("./AuthorByline");
const CategoryChip_1 = require("./CategoryChip");
/**
 * The masthead of an article page — category eyebrow, headline, dek, cover
 * image, and author byline. Composes `CategoryChip` + `AuthorByline` and reads
 * every color from `SemanticColors`. Two variants (`standard` / `hero`) and a
 * `loading` skeleton state. No literal hex.
 */
function ArticleHeader({ title, deck, category, coverImageUrl, author, date, readingTime, variant = 'standard', loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const hero = variant === 'hero';
    const titleSize = hero ? tokens.typography.scale['3xl'] : tokens.typography.scale['2xl'];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 100, height: 20 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "90%", height: titleSize * 1.3 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "70%", height: titleSize * 1.3 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "100%", height: 200 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 180, height: 40 })] }));
    }
    const cover = coverImageUrl && !hero ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: coverImageUrl }, accessibilityIgnoresInvertColors: true, style: { width: '100%', height: 220, borderRadius: tokens.radius.lg, backgroundColor: colors.border }, resizeMode: "cover" })) : null;
    const heroCover = coverImageUrl && hero ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: coverImageUrl }, accessibilityIgnoresInvertColors: true, style: { width: '100%', height: 260, borderRadius: tokens.radius.lg, backgroundColor: colors.border }, resizeMode: "cover" })) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [cover, category ? (0, jsx_runtime_1.jsx)(CategoryChip_1.CategoryChip, { label: category, variant: hero ? 'solid' : 'soft' }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                    color: colors.onSurface,
                    fontSize: titleSize,
                    lineHeight: titleSize * 1.2,
                    fontWeight: '800',
                }, children: title }), deck ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.lg,
                    lineHeight: tokens.typography.scale.lg * 1.4,
                }, children: deck })) : null, heroCover, author ? ((0, jsx_runtime_1.jsx)(AuthorByline_1.AuthorByline, { author: author, date: date, readingTime: readingTime, variant: "full" })) : date || readingTime ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [date, readingTime].filter(Boolean).join('  ·  ') })) : null] }));
}
//# sourceMappingURL=ArticleHeader.js.map