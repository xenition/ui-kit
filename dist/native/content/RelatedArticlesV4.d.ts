import * as React from 'react';
import type { RelatedArticlesProps } from './RelatedArticles';
export interface RelatedArticlesV4Props extends RelatedArticlesProps {
    /** The next-step sentence under `emptyLabel`. */
    emptyDescription?: string;
    /** Announced while the section loads. Default `'Loading related articles'`. */
    loadingLabel?: string;
}
/**
 * **V4 related articles** — same props as {@link RelatedArticles} plus
 * `emptyDescription` and `loadingLabel`.
 *
 * ## Three changes
 *
 * 1. **The empty state is the shared `EmptyState`.** The web twin composed it
 *    and this one hand-rolled a bordered box with a single muted line in it,
 *    even though `EmptyState` has been in native primitives all along — so on
 *    a phone the section could never have an icon, a description or a "browse
 *    the archive" action, and the two platforms drew a different component for
 *    the same state.
 * 2. **The empty state explains itself.** `emptyDescription` is the next-step
 *    sentence a lone grey line cannot carry.
 * 3. **The loading region says it is loading.** The base showed a silent grid
 *    of skeleton cards.
 */
export declare function RelatedArticlesV4({ articles, onArticlePress, title, variant, loading, loadingCount, emptyLabel, emptyDescription, loadingLabel, style, }: RelatedArticlesV4Props): React.ReactElement;
//# sourceMappingURL=RelatedArticlesV4.d.ts.map