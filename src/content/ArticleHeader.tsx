import * as React from 'react';
import { cn } from '../primitives/cn';
import { Skeleton } from '../primitives/Skeleton';
import { AuthorByline } from './AuthorByline';
import { CategoryChip } from './CategoryChip';
import type { ContentAuthor } from './types';

export type ArticleHeaderVariant = 'standard' | 'hero';

export interface ArticleHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Headline. */
  title: string;
  /** Optional dek / standfirst under the title. */
  deck?: string;
  /** Section / category label (rendered as a `CategoryChip`). */
  category?: string;
  /** Cover / hero image URL. */
  coverImageUrl?: string;
  /** Credited author (rendered as an `AuthorByline`). */
  author?: ContentAuthor;
  /** Human-readable publish date. */
  date?: string;
  /** Human-readable read length. */
  readingTime?: string;
  /**
   * - `standard` — cover image above stacked title/byline (default).
   * - `hero`     — larger display title, category eyebrow on top.
   */
  variant?: ArticleHeaderVariant;
  /** Show a placeholder skeleton instead of content. */
  loading?: boolean;
}

/**
 * The masthead of an article page — category eyebrow, headline, dek, cover
 * image, and author byline. Web (React DOM) mirror of the native `ArticleHeader`.
 * Composes `CategoryChip` + `AuthorByline` and reads every color from `--xen-*`
 * token classes. Two variants (`standard` / `hero`) and a `loading` skeleton.
 */
export const ArticleHeader = React.forwardRef<HTMLElement, ArticleHeaderProps>(
  function ArticleHeader(
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
        <header ref={ref} className={cn('flex flex-col gap-[var(--xen-space-md)]', className)} {...rest}>
          <Skeleton variant="rect" width={100} height={20} />
          <Skeleton variant="rect" width="90%" height={hero ? 44 : 36} />
          <Skeleton variant="rect" width="70%" height={hero ? 44 : 36} />
          <Skeleton variant="rect" width="100%" height={200} />
          <Skeleton variant="rect" width={180} height={40} />
        </header>
      );
    }

    const cover =
      coverImageUrl && !hero ? (
        <img
          src={coverImageUrl}
          alt=""
          loading="lazy"
          className="h-[220px] w-full rounded-[var(--xen-radius-lg)] bg-neutral-100 object-cover"
        />
      ) : null;

    const heroCover =
      coverImageUrl && hero ? (
        <img
          src={coverImageUrl}
          alt=""
          loading="lazy"
          className="h-[260px] w-full rounded-[var(--xen-radius-lg)] bg-neutral-100 object-cover"
        />
      ) : null;

    return (
      <header ref={ref} className={cn('flex flex-col gap-[var(--xen-space-md)]', className)} {...rest}>
        {cover}
        {category ? <CategoryChip label={category} variant={hero ? 'solid' : 'soft'} /> : null}
        <h1
          className={cn('font-extrabold leading-tight text-on-surface', hero ? 'text-3xl' : 'text-2xl')}
        >
          {title}
        </h1>
        {deck ? <p className="text-lg leading-relaxed text-muted">{deck}</p> : null}
        {heroCover}
        {author ? (
          <AuthorByline author={author} date={date} readingTime={readingTime} variant="full" />
        ) : date || readingTime ? (
          <p className="text-sm text-muted">{[date, readingTime].filter(Boolean).join('  ·  ')}</p>
        ) : null}
      </header>
    );
  }
);
