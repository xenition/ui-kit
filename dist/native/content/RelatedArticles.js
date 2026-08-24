"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatedArticles = RelatedArticles;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const ArticleCard_1 = require("./ArticleCard");
/**
 * A "Related / Read next" section that renders a set of {@link ArticleCard}s.
 * Handles the three real-world states: `loading` (skeleton cards), empty (a
 * muted `emptyLabel`), and populated. Two layouts — a vertical `list` of
 * compact rows or a two-column `grid`. Colors come from `SemanticColors` (via
 * the composed cards); no literal hex.
 */
function RelatedArticles({ articles, onArticlePress, title = 'Related', variant = 'list', loading = false, loadingCount = 3, emptyLabel = 'Nothing related yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const grid = variant === 'grid';
    const heading = title != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
            color: colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '800',
            marginBottom: tokens.spacing.sm,
        }, children: title })) : null;
    if (loading) {
        const placeholders = Array.from({ length: Math.max(1, loadingCount) });
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: grid ? { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md } : { gap: tokens.spacing.md }, children: placeholders.map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: grid ? { flexBasis: '47%', flexGrow: 1 } : undefined, children: (0, jsx_runtime_1.jsx)(ArticleCard_1.ArticleCard, { loading: true, variant: grid ? 'standard' : 'compact', article: { id: `skeleton-${i}`, title: '' } }) }, i))) })] }));
    }
    if (articles.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: tokens.radius.lg,
                        padding: tokens.spacing.lg,
                        alignItems: 'center',
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: grid ? { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md } : { gap: tokens.spacing.md }, children: articles.map((article) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: grid ? { flexBasis: '47%', flexGrow: 1 } : undefined, children: (0, jsx_runtime_1.jsx)(ArticleCard_1.ArticleCard, { article: article, onPress: onArticlePress, variant: grid ? 'standard' : 'compact' }) }, article.id))) })] }));
}
//# sourceMappingURL=RelatedArticles.js.map