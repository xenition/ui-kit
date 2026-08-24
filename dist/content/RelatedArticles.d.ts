import * as React from 'react';
import type { ArticleSummary } from './types';
export type RelatedArticlesVariant = 'list' | 'grid';
export interface RelatedArticlesProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    /** The related / recommended articles. May be empty. */
    articles: ArticleSummary[];
    /** Called when a related article is clicked — web mirror of native `onArticlePress`. */
    onArticleClick?: (article: ArticleSummary) => void;
    /** Section heading. Pass `null` to hide. */
    title?: string | null;
    /**
     * - `list` — full-width `compact` rows (default).
     * - `grid` — two-column standard cards.
     */
    variant?: RelatedArticlesVariant;
    /** Show N skeleton placeholders instead of content. */
    loading?: boolean;
    /** How many skeletons to show when `loading`. Default 3. */
    loadingCount?: number;
    /** Message shown when `articles` is empty and not loading. */
    emptyLabel?: string;
}
/**
 * A "Related / Read next" section that renders a set of {@link ArticleCard}s.
 * Web (React DOM) mirror of the native `RelatedArticles`. Handles the three
 * real-world states: `loading` (skeleton cards), empty (a token-styled
 * {@link EmptyState}), and populated. Two layouts — a vertical `list` of compact
 * rows or a two-column `grid`. Colors come from `--xen-*` tokens (via the
 * composed cards).
 */
export declare const RelatedArticles: React.ForwardRefExoticComponent<RelatedArticlesProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=RelatedArticles.d.ts.map