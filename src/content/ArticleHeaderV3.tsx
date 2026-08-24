import * as React from 'react';
import { cn } from '../primitives/cn';
import { Skeleton } from '../primitives/Skeleton';
import { AuthorByline } from './AuthorByline';
import type { ArticleHeaderProps } from './ArticleHeader';

/** Drop-in replacement for {@link ArticleHeader} — identical props. */
export type ArticleHeaderV3Props = ArticleHeaderProps;

/**
 * ArticleHeader — **left-aligned editorial** alternate design (web / React DOM).
 *
 * Text-forward masthead: a category eyebrow led by a short accent rule, a large
 * left-aligned headline, a dek, then a full-width divider and the full byline —
 * with the cover image dropped in last as a figure. Reads like a longform
 * feature opener. Same props as {@link ArticleHeader}, so it is a drop-in swap.
 *
 * Token-pure: the eyebrow rule and label use `bg-accent` / `text-accent`, the
 * divider uses `bg-border`. No literal colors.
 */
export const ArticleHeaderV3 = React.forwardRef<HTMLElement, ArticleHeaderV3Props>(
  function ArticleHeaderV3(
    {
      title,
      deck,
      category,
      coverImageUrl,
      author,
      date,
      readingTime,
      variant = 'standard',
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    const hero = variant === 'hero';

    if (loading) {
      return (
        <header
          ref={ref}
          className={cn('flex flex-col items-start gap-[var(--xen-space-md)]', className)}
          {...rest}
        >
          <Skeleton variant="rect" width={120} height={16} />
          <Skeleton variant="rect" width="92%" height={hero ? 44 : 36} />
          <Skeleton variant="rect" width="70%" height={hero ? 44 : 36} />
          <Skeleton variant="rect" width="100%" height={1} />
          <Skeleton variant="rect" width={180} height={40} />
          <Skeleton variant="rect" width="100%" height={hero ? 240 : 200} />
        </header>
      );
    }

    const meta = [date, readingTime]
      .filter((p): p is string => !!p && p.length > 0)
      .join('  ·  ');

    return (
      <header
        ref={ref}
        className={cn('flex flex-col items-start gap-[var(--xen-space-md)]', className)}
        {...rest}
      >
        {category ? (
          <span className="flex items-center gap-[var(--xen-space-sm)]">
            <span aria-hidden className="h-[3px] w-7 rounded-full bg-accent" />
            <span className="text-sm font-extrabold uppercase tracking-wide text-accent">
              {category}
            </span>
          </span>
        ) : null}

        <h1
          className={cn(
            'text-left font-extrabold leading-tight text-on-surface',
            hero ? 'text-3xl' : 'text-2xl'
          )}
        >
          {title}
        </h1>

        {deck ? <p className="text-lg leading-relaxed text-muted">{deck}</p> : null}

        {/* Full-width divider separates the standfirst from the credit block. */}
        <div aria-hidden className="h-px w-full self-stretch bg-border" />

        {author ? (
          <AuthorByline author={author} date={date} readingTime={readingTime} variant="full" />
        ) : meta ? (
          <p className="text-sm text-muted">{meta}</p>
        ) : null}

        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt=""
            loading="lazy"
            className={cn(
              'w-full rounded-[var(--xen-radius-lg)] bg-neutral-100 object-cover',
              hero ? 'h-[240px]' : 'h-[200px]'
            )}
          />
        ) : null}
      </header>
    );
  }
);
