import * as React from 'react';
import type { ArticleSummary } from './types';
export type ArticleCardVariant = 'standard' | 'featured' | 'compact';
export interface ArticleCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The article to render. */
    article: ArticleSummary;
    /** Called when the card is clicked (open the article) — web mirror of native `onPress`. */
    onClick?: (article: ArticleSummary) => void;
    /**
     * - `standard` — image on top, title + excerpt + byline (default).
     * - `featured` — larger image, big headline, for the top of a feed.
     * - `compact`  — horizontal row (thumbnail left, text right), for lists.
     */
    variant?: ArticleCardVariant;
    /** Show a placeholder skeleton instead of content. */
    loading?: boolean;
}
/**
 * A feed card for one article — the web (React DOM) mirror of the native
 * `ArticleCard`. Composes `Card`, `CategoryChip`, and `AuthorByline`; every
 * color comes from `--xen-*` token classes. Three variants: `standard`
 * (image-top), `featured` (large hero headline), and `compact` (horizontal list
 * row). Supports a `loading` skeleton and fires `onClick(article)` when clicked
 * (rendered as a keyboard-activatable `role="button"` when interactive).
 */
export declare const ArticleCard: React.ForwardRefExoticComponent<ArticleCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ArticleCard.d.ts.map