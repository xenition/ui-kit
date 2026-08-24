import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import type { ContentAuthor } from './types';

export type AuthorBylineVariant = 'full' | 'compact';

export interface AuthorBylineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The credited author. */
  author: ContentAuthor;
  /** Human-readable publish date, e.g. `'Aug 24, 2026'`. */
  date?: string;
  /** Human-readable read length, e.g. `'6 min read'`. */
  readingTime?: string;
  /**
   * Layout:
   * - `full`    — avatar + name + role, with date/time on a second line (default).
   * - `compact` — small avatar + name · date · time on one line.
   */
  variant?: AuthorBylineVariant;
}

/** Joins the non-empty meta fragments with a middot separator. */
function metaLine(parts: Array<string | undefined>): string {
  return parts.filter((p): p is string => !!p && p.length > 0).join('  ·  ');
}

/**
 * The "by {author} · {date} · {read time}" credit line under a headline — the
 * web (React DOM) mirror of the native `AuthorByline`. Composes the `Avatar`
 * primitive (initials fallback when there's no photo) and styles exclusively via
 * `--xen-*` token classes. Two variants: a stacked `full` byline for article
 * headers and a single-line `compact` byline for cards.
 */
export const AuthorByline = React.forwardRef<HTMLDivElement, AuthorBylineProps>(
  function AuthorByline({ author, date, readingTime, variant = 'full', className, ...rest }, ref) {
    const meta = metaLine([date, readingTime]);

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          aria-label={`By ${author.name}${meta ? `, ${meta}` : ''}`}
          className={cn('flex items-center gap-[var(--xen-space-sm)]', className)}
          {...rest}
        >
          <Avatar src={author.avatarUrl} name={author.name} size="sm" />
          <span className="truncate text-sm text-muted">
            <span className="font-semibold text-on-surface">{author.name}</span>
            {meta ? `  ·  ${meta}` : ''}
          </span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        aria-label={`By ${author.name}${author.role ? `, ${author.role}` : ''}${
          meta ? `, ${meta}` : ''
        }`}
        className={cn('flex items-center gap-[var(--xen-space-md)]', className)}
        {...rest}
      >
        <Avatar src={author.avatarUrl} name={author.name} size="md" />
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-on-surface">{author.name}</p>
          {author.role ? <p className="truncate text-xs text-muted">{author.role}</p> : null}
          {meta ? <p className="truncate text-xs text-muted">{meta}</p> : null}
        </div>
      </div>
    );
  }
);
