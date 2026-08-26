import * as React from 'react';
import type { ArticleHeaderProps } from './ArticleHeader';
/** Drop-in replacement for {@link ArticleHeader} — identical props. */
export type ArticleHeaderV2Props = ArticleHeaderProps;
/**
 * ArticleHeader — **centered hero** alternate design (web / React DOM).
 *
 * A big display title, category eyebrow, and dek are centered *over* a
 * full-bleed cover image darkened by a gradient scrim, with the byline centered
 * beneath. Cinematic masthead rather than the base stacked layout. Same props as
 * {@link ArticleHeader}, so it is a drop-in swap.
 *
 * Token-pure: the scrim is a `neutral-900` overlay, reversed text is
 * `text-neutral-50`. With no cover image it degrades to a centered header on the
 * normal surface with on-surface text.
 * Stays inside its own design line: the byline is {@link AuthorBylineV2}, not
 * the base one, because an app that picks V2 picks it for every surface it sees.
 */
export declare const ArticleHeaderV2: React.ForwardRefExoticComponent<ArticleHeaderProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=ArticleHeaderV2.d.ts.map