import * as React from 'react';
import type { ArticleHeaderProps } from './ArticleHeader';
/** Drop-in replacement for {@link ArticleHeader} — identical props. */
export type ArticleHeaderV3Props = ArticleHeaderProps;
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
 */
export declare function ArticleHeaderV3({ title, deck, category, coverImageUrl, author, date, readingTime, variant, loading, style, }: ArticleHeaderV3Props): React.ReactElement;
//# sourceMappingURL=ArticleHeaderV3.d.ts.map