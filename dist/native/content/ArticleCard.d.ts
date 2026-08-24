import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { ArticleSummary } from './types';
export type ArticleCardVariant = 'standard' | 'featured' | 'compact';
export interface ArticleCardProps {
    /** The article to render. */
    article: ArticleSummary;
    /** Called when the card is tapped (open the article). */
    onPress?: (article: ArticleSummary) => void;
    /**
     * - `standard` — image on top, title + excerpt + byline (default).
     * - `featured` — larger image, big headline, for the top of a feed.
     * - `compact`  — horizontal row (thumbnail left, text right), for lists.
     */
    variant?: ArticleCardVariant;
    /** Show a placeholder skeleton instead of content. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A feed card for one article — the native mirror of a web article card.
 * Composes `Card`, `CategoryChip`, and `AuthorByline`; every color comes from
 * `SemanticColors`. Three variants: `standard` (image-top), `featured` (large
 * hero headline), and `compact` (horizontal list row). Supports a `loading`
 * skeleton and fires `onPress(article)` when tapped. No literal hex.
 */
export declare function ArticleCard({ article, onPress, variant, loading, style, }: ArticleCardProps): React.ReactElement;
//# sourceMappingURL=ArticleCard.d.ts.map