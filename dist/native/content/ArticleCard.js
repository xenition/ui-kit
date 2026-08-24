"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleCard = ArticleCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const AuthorByline_1 = require("./AuthorByline");
const CategoryChip_1 = require("./CategoryChip");
/**
 * A feed card for one article — the native mirror of a web article card.
 * Composes `Card`, `CategoryChip`, and `AuthorByline`; every color comes from
 * `SemanticColors`. Three variants: `standard` (image-top), `featured` (large
 * hero headline), and `compact` (horizontal list row). Supports a `loading`
 * skeleton and fires `onPress(article)` when tapped. No literal hex.
 */
function ArticleCard({ article, onPress, variant = 'standard', loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { style: style, children: variant === 'compact' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 88, height: 88 }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "90%", height: 18 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "60%", height: 14 })] })] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "100%", height: variant === 'featured' ? 200 : 150 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "90%", height: 20 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "70%", height: 14 })] })) }));
    }
    const compact = variant === 'compact';
    const featured = variant === 'featured';
    const titleSize = featured ? tokens.typography.scale.xl : tokens.typography.scale.lg;
    const imageHeight = featured ? 200 : 160;
    const body = compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [article.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: article.imageUrl }, accessibilityIgnoresInvertColors: true, style: { width: 88, height: 88, borderRadius: tokens.radius.md, backgroundColor: colors.border }, resizeMode: "cover" })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [article.category ? (0, jsx_runtime_1.jsx)(CategoryChip_1.CategoryChip, { label: article.category, variant: "soft" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', lineHeight: tokens.typography.scale.base * 1.25 }, children: article.title }), article.readingTime || article.date ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [article.date, article.readingTime].filter(Boolean).join('  ·  ') })) : null] })] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [article.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: article.imageUrl }, accessibilityIgnoresInvertColors: true, style: { width: '100%', height: imageHeight, borderRadius: tokens.radius.md, backgroundColor: colors.border }, resizeMode: "cover" })) : null, article.category ? (0, jsx_runtime_1.jsx)(CategoryChip_1.CategoryChip, { label: article.category, variant: "soft" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: featured ? 3 : 2, style: { color: colors.onSurface, fontSize: titleSize, fontWeight: '800', lineHeight: titleSize * 1.2 }, children: article.title }), article.excerpt ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: featured ? 3 : 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.4 }, children: article.excerpt })) : null, article.author ? ((0, jsx_runtime_1.jsx)(AuthorByline_1.AuthorByline, { author: article.author, date: article.date, readingTime: article.readingTime, variant: "compact" })) : article.date || article.readingTime ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [article.date, article.readingTime].filter(Boolean).join('  ·  ') })) : null] }));
    const content = (0, jsx_runtime_1.jsx)(primitives_1.Card, { style: style, children: body });
    if (!onPress)
        return content;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: article.title, onPress: () => onPress(article), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: content }));
}
//# sourceMappingURL=ArticleCard.js.map