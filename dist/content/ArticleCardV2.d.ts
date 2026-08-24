import * as React from 'react';
import type { ArticleCardProps } from './ArticleCard';
/** Drop-in replacement for {@link ArticleCard} — identical props. */
export type ArticleCardV2Props = ArticleCardProps;
/**
 * ArticleCard — **magazine full-bleed** alternate design (web / React DOM).
 *
 * Where the base card stacks image → text on a bordered surface, this variant
 * fills the whole card with the cover image and overlays a bottom gradient scrim
 * with the category, headline, and byline reversed out in near-white. Elevated
 * and media-forward. Same props as {@link ArticleCard}, so it is a drop-in swap.
 *
 * Token-pure: the scrim is a `neutral-900` → transparent gradient and the
 * reversed text is `text-neutral-50` — every color traces to a `--xen-*` token.
 * With no cover image it degrades to a soft primary-tinted panel with normal
 * on-surface text so the headline stays legible.
 */
export declare const ArticleCardV2: React.ForwardRefExoticComponent<ArticleCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ArticleCardV2.d.ts.map