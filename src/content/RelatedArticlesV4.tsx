import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { ArticleCardV4 } from './ArticleCardV4';
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
export const RelatedArticlesV4 = React.forwardRef<HTMLElement, RelatedArticlesV4Props>(
  function RelatedArticlesV4(
    {
      articles,
      onArticleClick,
      title = 'Related',
      variant = 'list',
      loading = false,
      loadingCount = 3,
      emptyLabel = 'Nothing related yet',
      emptyDescription,
      loadingLabel = 'Loading related articles',
      className,
      ...rest
    },
    ref
  ) {
    const grid = variant === 'grid';

    const heading =
      title != null ? (
        <h2 className="mb-sm text-lg font-bold text-on-surface">{title}</h2>
      ) : null;

    const layout = grid ? 'flex flex-wrap gap-md' : 'flex flex-col gap-md';

    if (loading) {
      const placeholders = Array.from({ length: Math.max(1, loadingCount) });
      return (
        <section ref={ref} className={className} {...rest}>
          {heading}
          <div
            role="status"
            aria-busy="true"
            aria-label={loadingLabel}
            className={layout}
          >
            {placeholders.map((_, index) => (
              // The region is the one thing that announces; each card would
              // otherwise report its own busy state and the reader would hear
              // "loading article" three times over.
              <div key={index} aria-hidden className={grid ? 'grow basis-[47%]' : undefined}>
                <ArticleCardV4
                  loading
                  variant={grid ? 'standard' : 'compact'}
                  article={{ id: `skeleton-${index}`, title: '' }}
                />
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (articles.length === 0) {
      return (
        <section ref={ref} className={className} {...rest}>
          {heading}
          <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
        </section>
      );
    }

    return (
      <section ref={ref} className={className} {...rest}>
        {heading}
        <div className={layout}>
          {articles.map((article) => (
            <div key={article.id} className={grid ? 'grow basis-[47%]' : undefined}>
              <ArticleCardV4
                article={article}
                onClick={onArticleClick}
                variant={grid ? 'standard' : 'compact'}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }
);
