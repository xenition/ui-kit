"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleCardV3 = ArticleCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * ArticleCard — **minimal, text-first** alternate design.
 *
 * No card surface and no big image: a thin top rule, a colored category
 * eyebrow, the headline, a muted excerpt, and a small square thumbnail tucked
 * to the right. Reads like an index / digest entry rather than a hero card.
 * Same props as {@link ArticleCard}, so it is a drop-in swap.
 *
 * Token-pure: the rule is `colors.border`, the eyebrow is `colors.primaryText`,
 * body text is `onSurface` / `muted`. No literal colors.
 */
function ArticleCardV3({ article, onPress, variant = 'standard', loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const thumb = variant === 'featured' ? 72 : 56;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ paddingVertical: tokens.spacing.md, gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "40%", height: 12 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "92%", height: 18 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "70%", height: 14 })] }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: thumb, height: thumb })] })] }));
    }
    const meta = [article.author?.name, article.date, article.readingTime]
        .filter((p) => !!p && p.length > 0)
        .join('  ·  ');
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ paddingVertical: tokens.spacing.md, gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [article.category ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.primaryText,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: '800',
                                    letterSpacing: 0.8,
                                    textTransform: 'uppercase',
                                }, children: article.category })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: variant === 'featured' ? 4 : 3, style: {
                                    color: colors.onSurface,
                                    fontSize: variant === 'featured' ? tokens.typography.scale.lg : tokens.typography.scale.base,
                                    lineHeight: (variant === 'featured'
                                        ? tokens.typography.scale.lg
                                        : tokens.typography.scale.base) * 1.3,
                                    fontWeight: '700',
                                }, children: article.title }), article.excerpt ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                                    color: colors.muted,
                                    fontSize: tokens.typography.scale.sm,
                                    lineHeight: tokens.typography.scale.sm * 1.4,
                                }, children: article.excerpt })) : null, meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), article.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: article.imageUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: {
                            width: thumb,
                            height: thumb,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: colors.border,
                        } })) : null] })] }));
    if (!onPress)
        return inner;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: article.title, onPress: () => onPress(article), style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: inner }));
}
//# sourceMappingURL=ArticleCardV3.js.map