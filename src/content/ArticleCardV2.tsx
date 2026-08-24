import * as React from 'react';
import { cn } from '../primitives/cn';
import { Skeleton } from '../primitives/Skeleton';
import { CategoryChip } from './CategoryChip';
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
export const ArticleCardV2 = React.forwardRef<HTMLDivElement, ArticleCardV2Props>(
  function ArticleCardV2(
    { article, onClick, variant = 'standard', loading = false, className, ...rest },
    ref
  ) {
    const featured = variant === 'featured';
    const compact = variant === 'compact';
    const interactive = !!onClick;
    const hasImage = !!article.imageUrl;
    const heightClass = featured ? 'h-[288px]' : compact ? 'h-[168px]' : 'h-[224px]';

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn('overflow-hidden rounded-[var(--xen-radius-lg)]', className)}
          {...rest}
        >
          <Skeleton variant="rect" width="100%" height={compact ? 168 : featured ? 288 : 224} />
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
          'relative flex flex-col justify-end overflow-hidden rounded-[var(--xen-radius-lg)] shadow-md',
          heightClass,
          hasImage ? 'bg-neutral-200' : 'border border-border bg-primary/10',
          interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none',
          className
        )}
        {...rest}
      >
        {hasImage ? (
          <>
            <img
              src={article.imageUrl}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-neutral-900/85 via-neutral-900/30 to-transparent"
            />
          </>
        ) : null}

        <div className="relative flex flex-col gap-[var(--xen-space-xs)] p-[var(--xen-space-lg)]">
          {article.category ? <CategoryChip label={article.category} variant="solid" /> : null}
          <h3
            className={cn(
              'font-extrabold leading-tight',
              featured ? 'line-clamp-3 text-xl' : 'line-clamp-2 text-lg',
              hasImage ? 'text-neutral-50' : 'text-on-surface'
            )}
          >
            {article.title}
          </h3>
          {meta ? (
            <p
              className={cn(
                'line-clamp-1 text-xs font-semibold',
                hasImage ? 'text-neutral-100' : 'text-muted'
              )}
            >
              {meta}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
);
