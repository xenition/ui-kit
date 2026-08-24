import * as React from 'react';
import type { ArticleHeaderProps } from './ArticleHeader';
/** Drop-in replacement for {@link ArticleHeader} — identical props. */
export type ArticleHeaderV3Props = ArticleHeaderProps;
/**
 * ArticleHeader — **left-aligned editorial** alternate design (web / React DOM).
 *
 * Text-forward masthead: a category eyebrow led by a short accent rule, a large
 * left-aligned headline, a dek, then a full-width divider and the full byline —
 * with the cover image dropped in last as a figure. Reads like a longform
 * feature opener. Same props as {@link ArticleHeader}, so it is a drop-in swap.
 *
 * Token-pure: the eyebrow rule and label use `bg-accent` / `text-accent`, the
 * divider uses `bg-border`. No literal colors.
 */
export declare const ArticleHeaderV3: React.ForwardRefExoticComponent<ArticleHeaderProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ArticleHeaderV3.d.ts.map