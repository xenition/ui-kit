"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleHeaderV3 = ArticleHeaderV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const AuthorBylineV3_1 = require("./AuthorBylineV3");
/**
 * ArticleHeader — **left-aligned editorial** alternate design.
 *
 * Text-forward masthead: a category eyebrow led by a short accent rule, a large
 * left-aligned headline, a dek, then a full-width divider and the full byline —
 * with the cover image dropped in last as a figure. Reads like a longform
 * feature opener. Same props as {@link ArticleHeader}, so it is a drop-in swap.
 *
 * Token-pure: the eyebrow rule and label use `colors.accent` / `accentText`,
 * the divider uses `colors.border`. No literal colors.
 * Stays inside its own design line: the byline is {@link AuthorBylineV3}, not
 * the base one, because an app that picks V3 picks it for every surface it sees.
 */
function ArticleHeaderV3({ title, deck, category, coverImageUrl, author, date, readingTime, variant = 'standard', loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const titleSize = variant === 'hero' ? tokens.typography.scale['3xl'] : tokens.typography.scale['2xl'];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 120, height: 16 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "92%", height: titleSize * 1.2 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "70%", height: titleSize * 1.2 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "100%", height: 1 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 180, height: 40 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "100%", height: 200 })] }));
    }
    const meta = [date, readingTime]
        .filter((p) => !!p && p.length > 0)
        .join('  ·  ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md, alignItems: 'flex-start' }, style], children: [category ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 28, height: 3, borderRadius: tokens.radius.full, backgroundColor: colors.accent } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.accentText,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '800',
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                        }, children: category })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                    color: colors.onSurface,
                    fontSize: titleSize,
                    lineHeight: titleSize * 1.15,
                    fontWeight: '800',
                    textAlign: 'left',
                }, children: title }), deck ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.lg,
                    lineHeight: tokens.typography.scale.lg * 1.45,
                }, children: deck })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'stretch', height: 1, backgroundColor: colors.border } }), author ? ((0, jsx_runtime_1.jsx)(AuthorBylineV3_1.AuthorBylineV3, { author: author, date: date, readingTime: readingTime, variant: "full" })) : meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta })) : null, coverImageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: coverImageUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: {
                    width: '100%',
                    height: variant === 'hero' ? 240 : 200,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: colors.border,
                } })) : null] }));
}
//# sourceMappingURL=ArticleHeaderV3.js.map