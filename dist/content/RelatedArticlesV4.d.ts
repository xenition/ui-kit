import * as React from 'react';
import type { RelatedArticlesProps } from './RelatedArticles';
export interface RelatedArticlesV4Props extends RelatedArticlesProps {
    /** A sentence under the empty title — an empty rail needs a next step. */
    emptyDescription?: string;
    /**
     * The busy name announced while the placeholders are up. Default
     * `'Loading related articles'`.
     */
    loadingLabel?: string;
}
/**
 * **V4 related articles** — the web twin of the native `RelatedArticlesV4`,
 * same props as {@link RelatedArticles} plus `emptyDescription` and
 * `loadingLabel`.
 *
 * ## Three changes
 *
 * 1. **Both twins compose the shared empty state.** Web composed `EmptyState`
 *    and native hand-rolled a bordered box, though `EmptyState` has existed in
 *    the native primitives all along — so the native empty rail could never
 *    carry an icon, a description or an action, and the two platforms drew the
 *    same prop two different ways.
 * 2. **The empty state gets a next step.** A title alone tells a reader that
 *    nothing is there and nothing about what to do; `emptyDescription` is the
 *    sentence under it.
 * 3. **Loading announces itself.** The base drew three silent grey cards. And
 *    the shim import is gone: this composes the primitives' `EmptyStateV4`, not
 *    the deprecated `../commerce/EmptyState` re-export the base reached for.
 */
export declare const RelatedArticlesV4: React.ForwardRefExoticComponent<RelatedArticlesV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=RelatedArticlesV4.d.ts.map