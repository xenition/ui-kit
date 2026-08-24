import * as React from 'react';
import { cn } from '../primitives/cn';
import { Skeleton } from '../primitives/Skeleton';
import type { ArticleCardProps } from './ArticleCard';

/** Drop-in replacement for {@link ArticleCard} — identical props. */
export type ArticleCardV3Props = ArticleCardProps;

/**
 * ArticleCard — **minimal, text-first** alternate design (web / React DOM).
 *
 * No card surface and no big image: a thin top rule, a colored category eyebrow,
 * the headline, a muted excerpt, and a small square thumbnail tucked to the
 * right. Reads like an index / digest entry rather than a hero card. Same props
 * as {@link ArticleCard}, so it is a drop-in swap.
 *
 * Token-pure: the rule is `bg-border`, the eyebrow is `text-primary`, body text
 * is `text-on-surface` / `text-muted`. No literal colors.
 */
export const ArticleCardV3 = React.forwardRef<HTMLDivElement, ArticleCardV3Props>(
  function ArticleCardV3(
    { article, onClick, variant = 'standard', loading = false, className, ...rest },
    ref
  ) {
    const featured = variant === 'featured';
    const interactive = !!onClick;
    const thumbClass = featured ? 'h-[72px] w-[72px]' : 'h-[56px] w-[56px]';

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn('flex flex-col gap-[var(--xen-space-sm)] py-[var(--xen-space-md)]', className)}
          {...rest}
        >
          <div className="h-px w-full bg-border" />
          <div className="flex gap-[var(--xen-space-md)]">
            <div className="flex flex-1 flex-col gap-[var(--xen-space-sm)]">
              <Skeleton variant="rect" width="40%" height={12} />
              <Skeleton variant="rect" width="92%" height={18} />
              <Skeleton variant="rect" width="70%" height={14} />
            </div>
            <Skeleton variant="rect" width={featured ? 72 : 56} height={featured ? 72 : 56} />
          </div>
        </div>
      );
    }

    const meta = [article.author?.name, article.date, article.readingTime]
      .filter((p): p is string => !!p && p.length > 0)
      .join('  ·  ');

    return (
      <div
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
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)] py-[var(--xen-space-md)]',
          interactive &&
            'cursor-pointer transition-opacity duration-200 hover:opacity-70 motion-reduce:transition-none',
          className
        )}
        {...rest}
      >
        {/* Thin top rule — the whole design leans on this hairline for structure. */}
        <div aria-hidden className="h-px w-full bg-border" />

        <div className="flex items-start gap-[var(--xen-space-md)]">
          <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]">
            {article.category ? (
              <span className="text-xs font-extrabold uppercase tracking-wide text-primary">
                {article.category}
              </span>
            ) : null}
            <h3
              className={cn(
                'font-bold leading-snug text-on-surface',
                featured ? 'line-clamp-4 text-lg' : 'line-clamp-3 text-base'
              )}
            >
              {article.title}
            </h3>
            {article.excerpt ? (
              <p className="line-clamp-2 text-sm leading-relaxed text-muted">{article.excerpt}</p>
            ) : null}
            {meta ? <p className="line-clamp-1 text-xs text-muted">{meta}</p> : null}
          </div>

          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt=""
              loading="lazy"
              className={cn(
                'shrink-0 rounded-[var(--xen-radius-sm)] bg-neutral-100 object-cover',
                thumbClass
              )}
            />
          ) : null}
        </div>
      </div>
    );
  }
);
