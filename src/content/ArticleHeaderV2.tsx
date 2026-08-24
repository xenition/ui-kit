import * as React from 'react';
import { cn } from '../primitives/cn';
import { Skeleton } from '../primitives/Skeleton';
import { AuthorByline } from './AuthorByline';
import type { ArticleHeaderProps } from './ArticleHeader';

/** Drop-in replacement for {@link ArticleHeader} — identical props. */
export type ArticleHeaderV2Props = ArticleHeaderProps;

/**
 * ArticleHeader — **centered hero** alternate design (web / React DOM).
 *
 * A big display title, category eyebrow, and dek are centered *over* a
 * full-bleed cover image darkened by a gradient scrim, with the byline centered
 * beneath. Cinematic masthead rather than the base stacked layout. Same props as
 * {@link ArticleHeader}, so it is a drop-in swap.
 *
 * Token-pure: the scrim is a `neutral-900` overlay, reversed text is
 * `text-neutral-50`. With no cover image it degrades to a centered header on the
 * normal surface with on-surface text.
 */
export const ArticleHeaderV2 = React.forwardRef<HTMLElement, ArticleHeaderV2Props>(
  function ArticleHeaderV2(
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
    const hasCover = !!coverImageUrl;
    const minHeightClass = hero ? 'min-h-[360px]' : 'min-h-[300px]';

    if (loading) {
      return (
        <header
          ref={ref}
          className={cn('overflow-hidden rounded-[var(--xen-radius-lg)]', className)}
          {...rest}
        >
          <Skeleton variant="rect" width="100%" height={hero ? 360 : 300} />
        </header>
      );
    }

    const meta = [date, readingTime]
      .filter((p): p is string => !!p && p.length > 0)
      .join('  ·  ');

    return (
      <header
        ref={ref}
        className={cn(
          'relative flex flex-col items-center justify-center gap-[var(--xen-space-md)] overflow-hidden rounded-[var(--xen-radius-lg)] p-[var(--xen-space-xl)] text-center',
          minHeightClass,
          hasCover ? 'bg-neutral-200' : 'border border-border bg-surface',
          className
        )}
        {...rest}
      >
        {hasCover ? (
          <>
            <img
              src={coverImageUrl}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-neutral-900/55" />
          </>
        ) : null}

        {category ? (
          <span
            className={cn(
              'relative text-sm font-extrabold uppercase tracking-widest',
              hasCover ? 'text-neutral-100' : 'text-primary'
            )}
          >
            {category}
          </span>
        ) : null}

        <h1
          className={cn(
            'relative font-extrabold leading-tight',
            hero ? 'text-3xl' : 'text-2xl',
            hasCover ? 'text-neutral-50' : 'text-on-surface'
          )}
        >
          {title}
        </h1>

        {deck ? (
          <p
            className={cn(
              'relative text-lg leading-relaxed',
              hasCover ? 'text-neutral-100' : 'text-muted'
            )}
          >
            {deck}
          </p>
        ) : null}

        {author && hasCover ? (
          <p className="relative text-sm font-semibold text-neutral-100">
            {[author.name, meta].filter(Boolean).join('  ·  ')}
          </p>
        ) : author ? (
          <AuthorByline author={author} date={date} readingTime={readingTime} variant="compact" />
        ) : meta ? (
          <p className={cn('relative text-sm', hasCover ? 'text-neutral-100' : 'text-muted')}>
            {meta}
          </p>
        ) : null}
      </header>
    );
  }
);
