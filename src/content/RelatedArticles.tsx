import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce/EmptyState';
import { ArticleCard } from './ArticleCard';
import type { ArticleSummary } from './types';

export type RelatedArticlesVariant = 'list' | 'grid';

export interface RelatedArticlesProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** The related / recommended articles. May be empty. */
  articles: ArticleSummary[];
  /** Called when a related article is clicked — web mirror of native `onArticlePress`. */
  onArticleClick?: (article: ArticleSummary) => void;
  /** Section heading. Pass `null` to hide. */
  title?: string | null;
  /**
   * - `list` — full-width `compact` rows (default).
   * - `grid` — two-column standard cards.
   */
  variant?: RelatedArticlesVariant;
  /** Show N skeleton placeholders instead of content. */
  loading?: boolean;
  /** How many skeletons to show when `loading`. Default 3. */
  loadingCount?: number;
  /** Message shown when `articles` is empty and not loading. */
  emptyLabel?: string;
}

/**
 * A "Related / Read next" section that renders a set of {@link ArticleCard}s.
 * Web (React DOM) mirror of the native `RelatedArticles`. Handles the three
 * real-world states: `loading` (skeleton cards), empty (a token-styled
 * {@link EmptyState}), and populated. Two layouts — a vertical `list` of compact
 * rows or a two-column `grid`. Colors come from `--xen-*` tokens (via the
 * composed cards).
 */
export const RelatedArticles = React.forwardRef<HTMLElement, RelatedArticlesProps>(
  function RelatedArticles(
    {
      articles,
      onArticleClick,
      title = 'Related',
      variant = 'list',
      loading = false,
      loadingCount = 3,
      emptyLabel = 'Nothing related yet',
      className,
      ...rest
    },
    ref
  ) {
    const grid = variant === 'grid';

    const heading =
      title != null ? (
        <h2 className="mb-[var(--xen-space-sm)] text-lg font-extrabold text-on-surface">{title}</h2>
      ) : null;

    const layout = grid ? 'flex flex-wrap gap-[var(--xen-space-md)]' : 'flex flex-col gap-[var(--xen-space-md)]';

    if (loading) {
      const placeholders = Array.from({ length: Math.max(1, loadingCount) });
      return (
        <section ref={ref} className={className} {...rest}>
          {heading}
          <div className={layout}>
            {placeholders.map((_, i) => (
              <div key={i} className={grid ? 'grow basis-[47%]' : undefined}>
                <ArticleCard loading variant={grid ? 'standard' : 'compact'} article={{ id: `skeleton-${i}`, title: '' }} />
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
          <EmptyState title={emptyLabel} />
        </section>
      );
    }

    return (
      <section ref={ref} className={className} {...rest}>
        {heading}
        <div className={layout}>
          {articles.map((article) => (
            <div key={article.id} className={grid ? 'grow basis-[47%]' : undefined}>
              <ArticleCard article={article} onClick={onArticleClick} variant={grid ? 'standard' : 'compact'} />
            </div>
          ))}
        </div>
      </section>
    );
  }
);
