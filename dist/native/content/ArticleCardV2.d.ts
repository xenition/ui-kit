import * as React from 'react';
import type { ArticleCardProps } from './ArticleCard';
/** Drop-in replacement for {@link ArticleCard} — identical props. */
export type ArticleCardV2Props = ArticleCardProps;
/**
 * ArticleCard — **magazine full-bleed** alternate design.
 *
 * Where the v1 card stacks image → text on a bordered surface, this variant
 * fills the whole card with the cover image and overlays a bottom gradient
 * scrim with the category, headline, and byline reversed out in near-white.
 * Same props as {@link ArticleCard}, so it is a drop-in swap.
 *
 * Token-pure: the scrim is `withAlpha(ramps.neutral[900], …)` and the reversed
 * text is `ramps.neutral[50]` — both real compiled-theme hexes, never literals.
 * When no cover image is supplied it degrades to a soft-tinted panel with the
 * normal on-surface text so the headline stays legible.
 */
export declare function ArticleCardV2({ article, onPress, variant, loading, style, }: ArticleCardV2Props): React.ReactElement;
//# sourceMappingURL=ArticleCardV2.d.ts.map