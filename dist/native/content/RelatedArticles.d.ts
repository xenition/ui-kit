import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { ArticleSummary } from './types';
export type RelatedArticlesVariant = 'list' | 'grid';
export interface RelatedArticlesProps {
    /** The related / recommended articles. May be empty. */
    articles: ArticleSummary[];
    /** Called when a related article is tapped. */
    onArticlePress?: (article: ArticleSummary) => void;
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A "Related / Read next" section that renders a set of {@link ArticleCard}s.
 * Handles the three real-world states: `loading` (skeleton cards), empty (a
 * muted `emptyLabel`), and populated. Two layouts — a vertical `list` of
 * compact rows or a two-column `grid`. Colors come from `SemanticColors` (via
 * the composed cards); no literal hex.
 */
export declare function RelatedArticles({ articles, onArticlePress, title, variant, loading, loadingCount, emptyLabel, style, }: RelatedArticlesProps): React.ReactElement;
//# sourceMappingURL=RelatedArticles.d.ts.map