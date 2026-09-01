import * as React from 'react';
import type { ArticleCardProps } from './ArticleCard';
export interface ArticleCardV4Props extends ArticleCardProps {
    /** Announced while the card is still a skeleton. Default `'Loading article'`. */
    loadingLabel?: string;
}
/**
 * **V4 article card** — same props as {@link ArticleCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **A loading card cannot be tapped.** The web twin computed its
 *    interactivity before the loading branch and wrapped the skeleton in a
 *    `role="button"` with the live `onClick` still attached, so a reader could
 *    open an article that had not arrived. Both twins now return the inert
 *    skeleton, announced once as `loadingLabel`.
 * 2. **The image placeholder is the shared media ground.** This twin painted
 *    it `colors.border` — a hairline token spent as a fill — while the web
 *    twin painted a raw ramp step that ignored the seed entirely.
 * 3. **Press is a state layer, not a dim.** `opacity: 0.85` lightens the
 *    card's own content, which is the signal M3 spends on *disabled*; the card
 *    now tints its ground and leaves the headline at full strength.
 * 4. **Meta text takes `mutedText`.** `muted` is a fill slot with no contrast
 *    promise; the date and read length were set in it on every variant.
 * 5. **The card composes the V4 chip and byline**, so a feed does not mix two
 *    design lines inside one card.
 *
 * **Renders nothing without an article title** (§4.5).
 */
export declare function ArticleCardV4({ article, onPress, variant, loading, loadingLabel, style, }: ArticleCardV4Props): React.ReactElement | null;
//# sourceMappingURL=ArticleCardV4.d.ts.map