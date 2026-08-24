import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import type { AuthorBylineProps } from './AuthorByline';

/** Drop-in replacement for {@link AuthorByline} — identical props. */
export type AuthorBylineV2Props = AuthorBylineProps;

/** Joins the non-empty meta fragments with a middot separator. */
function metaLine(parts: Array<string | undefined>): string {
  return parts.filter((p): p is string => !!p && p.length > 0).join('  ·  ');
}

/**
 * AuthorByline — **enclosed author chip** alternate design (web / React DOM).
 *
 * The credit sits inside a soft primary-tinted rounded card: avatar, then a
 * "Written by" label over the name, with role and date/read-time on a meta line.
 * A contained attribution block versus the base bare row. Same props as
 * {@link AuthorByline}, so it is a drop-in swap.
 *
 * Token-pure: the fill/border are `bg-primary/10` / `border-primary/20`, the
 * label is `text-primary`. No literal colors.
 */
export const AuthorBylineV2 = React.forwardRef<HTMLDivElement, AuthorBylineV2Props>(
  function AuthorBylineV2({ author, date, readingTime, variant = 'full', className, ...rest }, ref) {
    const meta = metaLine([date, readingTime]);
    const compact = variant === 'compact';

    return (
      <div
        ref={ref}
        aria-label={`By ${author.name}${author.role ? `, ${author.role}` : ''}${
          meta ? `, ${meta}` : ''
        }`}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-primary/20 bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          className
        )}
        {...rest}
      >
        <Avatar src={author.avatarUrl} name={author.name} size={compact ? 'sm' : 'md'} />
        <div className="min-w-0">
          {!compact ? (
            <p className="text-xs font-extrabold uppercase tracking-wide text-primary">Written by</p>
          ) : null}
          <p className="truncate text-base font-bold text-on-surface">{author.name}</p>
          {author.role || meta ? (
            <p className="truncate text-xs text-muted">
              {[author.role, meta].filter(Boolean).join('  ·  ')}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
);
