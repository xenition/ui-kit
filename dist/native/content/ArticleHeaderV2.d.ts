import * as React from 'react';
import type { ArticleHeaderProps } from './ArticleHeader';
/** Drop-in replacement for {@link ArticleHeader} — identical props. */
export type ArticleHeaderV2Props = ArticleHeaderProps;
/**
 * ArticleHeader — **centered hero** alternate design.
 *
 * A big display title, category eyebrow, and dek are centered *over* a
 * full-bleed cover image darkened by a gradient scrim, with the byline centered
 * beneath. Cinematic masthead rather than the v1 stacked layout. Same props as
 * {@link ArticleHeader}, so it is a drop-in swap.
 *
 * Token-pure: scrim is `withAlpha(ramps.neutral[900], …)`, reversed text is
 * `ramps.neutral[50]`. With no cover image it degrades to a centered header on
 * the normal surface with on-surface text.
 */
export declare function ArticleHeaderV2({ title, deck, category, coverImageUrl, author, date, readingTime, variant, loading, style, }: ArticleHeaderV2Props): React.ReactElement;
//# sourceMappingURL=ArticleHeaderV2.d.ts.map