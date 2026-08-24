import * as React from 'react';
import type { ArticleCardProps } from './ArticleCard';
/** Drop-in replacement for {@link ArticleCard} — identical props. */
export type ArticleCardV3Props = ArticleCardProps;
/**
 * ArticleCard — **minimal, text-first** alternate design.
 *
 * No card surface and no big image: a thin top rule, a colored category
 * eyebrow, the headline, a muted excerpt, and a small square thumbnail tucked
 * to the right. Reads like an index / digest entry rather than a hero card.
 * Same props as {@link ArticleCard}, so it is a drop-in swap.
 *
 * Token-pure: the rule is `colors.border`, the eyebrow is `colors.primaryText`,
 * body text is `onSurface` / `muted`. No literal colors.
 */
export declare function ArticleCardV3({ article, onPress, variant, loading, style, }: ArticleCardV3Props): React.ReactElement;
//# sourceMappingURL=ArticleCardV3.d.ts.map