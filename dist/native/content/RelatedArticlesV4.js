"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelatedArticlesV4 = RelatedArticlesV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const ArticleCardV4_1 = require("./ArticleCardV4");
/**
 * **V4 related articles** — same props as {@link RelatedArticles} plus
 * `emptyDescription` and `loadingLabel`.
 *
 * ## Three changes
 *
 * 1. **The empty state is the shared `EmptyState`.** The web twin composed it
 *    and this one hand-rolled a bordered box with a single muted line in it,
 *    even though `EmptyState` has been in native primitives all along — so on
 *    a phone the section could never have an icon, a description or a "browse
 *    the archive" action, and the two platforms drew a different component for
 *    the same state.
 * 2. **The empty state explains itself.** `emptyDescription` is the next-step
 *    sentence a lone grey line cannot carry.
 * 3. **The loading region says it is loading.** The base showed a silent grid
 *    of skeleton cards.
 */
function RelatedArticlesV4({ articles, onArticlePress, title = 'Related', variant = 'list', loading = false, loadingCount = 3, emptyLabel = 'Nothing related yet', emptyDescription, loadingLabel = 'Loading related articles', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const grid = variant === 'grid';
    const layout = grid
        ? { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }
        : { gap: tokens.spacing.md };
    const cell = grid ? { flexBasis: '47%', flexGrow: 1 } : undefined;
    const heading = title != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "lg", weight: "bold", tone: "onSurface", style: { marginBottom: tokens.spacing.sm }, children: title })) : null;
    if (loading) {
        const placeholders = Array.from({ length: Math.max(1, loadingCount) });
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, accessibilityLiveRegion: "polite", style: layout, children: placeholders.map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: cell, children: (0, jsx_runtime_1.jsx)(ArticleCardV4_1.ArticleCardV4, { loading: true, loadingLabel: loadingLabel, variant: grid ? 'standard' : 'compact', article: { id: `skeleton-${i}`, title: '' } }) }, i))) })] }));
    }
    if (articles.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [heading, (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: style, children: [heading, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: layout, children: articles.map((article) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: cell, children: (0, jsx_runtime_1.jsx)(ArticleCardV4_1.ArticleCardV4, { article: article, onPress: onArticlePress, variant: grid ? 'standard' : 'compact' }) }, article.id))) })] }));
}
//# sourceMappingURL=RelatedArticlesV4.js.map