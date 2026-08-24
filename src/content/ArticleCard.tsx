import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Skeleton } from '../primitives/Skeleton';
import { AuthorByline } from './AuthorByline';
import { CategoryChip } from './CategoryChip';
import type { ArticleSummary } from './types';

export type ArticleCardVariant = 'standard' | 'featured' | 'compact';

export interface ArticleCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The article to render. */
  article: ArticleSummary;
  /** Called when the card is clicked (open the article) — web mirror of native `onPress`. */
  onClick?: (article: ArticleSummary) => void;
  /**
   * - `standard` — image on top, title + excerpt + byline (default).
   * - `featured` — larger image, big headline, for the top of a feed.
   * - `compact`  — horizontal row (thumbnail left, text right), for lists.
   */
  variant?: ArticleCardVariant;
  /** Show a placeholder skeleton instead of content. */
  loading?: boolean;
}

/**
 * A feed card for one article — the web (React DOM) mirror of the native
 * `ArticleCard`. Composes `Card`, `CategoryChip`, and `AuthorByline`; every
 * color comes from `--xen-*` token classes. Three variants: `standard`
 * (image-top), `featured` (large hero headline), and `compact` (horizontal list
 * row). Supports a `loading` skeleton and fires `onClick(article)` when clicked
 * (rendered as a keyboard-activatable `role="button"` when interactive).
 */
export const ArticleCard = React.forwardRef<HTMLDivElement, ArticleCardProps>(
  function ArticleCard(
    { article, onClick, variant = 'standard', loading = false, className, ...rest },
    ref
  ) {
    const compact = variant === 'compact';
    const featured = variant === 'featured';
    const interactive = !!onClick;

    let body: React.ReactNode;

    if (loading) {
      body = compact ? (
        <div className="flex gap-[var(--xen-space-md)]">
          <Skeleton variant="rect" width={88} height={88} />
          <div className="flex flex-1 flex-col gap-[var(--xen-space-sm)]">
            <Skeleton variant="rect" width="90%" height={18} />
            <Skeleton variant="rect" width="60%" height={14} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-[var(--xen-space-sm)]">
          <Skeleton variant="rect" width="100%" height={featured ? 200 : 150} />
          <Skeleton variant="rect" width="90%" height={20} />
          <Skeleton variant="rect" width="70%" height={14} />
        </div>
      );
    } else if (compact) {
      body = (
        <div className="flex items-center gap-[var(--xen-space-md)]">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt=""
              loading="lazy"
              className="h-[88px] w-[88px] shrink-0 rounded-[var(--xen-radius-md)] bg-neutral-100 object-cover"
            />
          ) : null}
          <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]">
            {article.category ? <CategoryChip label={article.category} variant="soft" /> : null}
            <h3 className="line-clamp-3 text-base font-bold leading-snug text-on-surface">
              {article.title}
            </h3>
            {article.readingTime || article.date ? (
              <p className="text-xs text-muted">
                {[article.date, article.readingTime].filter(Boolean).join('  ·  ')}
              </p>
            ) : null}
          </div>
        </div>
      );
    } else {
      body = (
        <div className="flex flex-col gap-[var(--xen-space-sm)]">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt=""
              loading="lazy"
              className={cn(
                'w-full rounded-[var(--xen-radius-md)] bg-neutral-100 object-cover',
                featured ? 'h-[200px]' : 'h-[160px]'
              )}
            />
          ) : null}
          {article.category ? <CategoryChip label={article.category} variant="soft" /> : null}
          <h3
            className={cn(
              'font-extrabold leading-tight text-on-surface',
              featured ? 'line-clamp-3 text-xl' : 'line-clamp-2 text-lg'
            )}
          >
            {article.title}
          </h3>
          {article.excerpt ? (
            <p className={cn('text-sm leading-relaxed text-muted', featured ? 'line-clamp-3' : 'line-clamp-2')}>
              {article.excerpt}
            </p>
          ) : null}
          {article.author ? (
            <AuthorByline
              author={article.author}
              date={article.date}
              readingTime={article.readingTime}
              variant="compact"
            />
          ) : article.date || article.readingTime ? (
            <p className="text-xs text-muted">
              {[article.date, article.readingTime].filter(Boolean).join('  ·  ')}
            </p>
          ) : null}
        </div>
      );
    }

    return (
      <Card
        ref={ref}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? article.title : undefined}
        onClick={interactive ? () => onClick?.(article) : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.(article);
                }
              }
            : undefined
        }
        className={cn(interactive && 'cursor-pointer transition-opacity hover:opacity-90', className)}
        {...rest}
      >
        {body}
      </Card>
    );
  }
);
