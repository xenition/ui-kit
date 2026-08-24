import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import type { AuthorBylineProps } from './AuthorByline';

/** Drop-in replacement for {@link AuthorByline} — identical props. */
export type AuthorBylineV3Props = AuthorBylineProps;

/** Joins the non-empty meta fragments with a middot separator. */
function metaLine(parts: Array<string | undefined>): string {
  return parts.filter((p): p is string => !!p && p.length > 0).join('  ·  ');
}

/**
 * AuthorByline — **centered stacked** alternate design (web / React DOM).
 *
 * A vertically centered credit: the avatar sits on top, the name below it, then
 * the role, then a middot-joined date/read-time line — the layout you see under
 * a centered article title or at the end of a feature. Same props as
 * {@link AuthorByline}, so it is a drop-in swap.
 *
 * Token-pure: name is `text-on-surface`, role/meta are `text-muted`. No literal
 * colors.
 */
export const AuthorBylineV3 = React.forwardRef<HTMLDivElement, AuthorBylineV3Props>(
  function AuthorBylineV3({ author, date, readingTime, variant = 'full', className, ...rest }, ref) {
    const meta = metaLine([date, readingTime]);
    const compact = variant === 'compact';

    return (
      <div
        ref={ref}
        aria-label={`By ${author.name}${author.role ? `, ${author.role}` : ''}${
          meta ? `, ${meta}` : ''
        }`}
        className={cn(
          'flex flex-col items-center gap-[var(--xen-space-xs)] text-center',
          className
        )}
        {...rest}
      >
        <Avatar src={author.avatarUrl} name={author.name} size={compact ? 'md' : 'lg'} />
        <p className="truncate text-base font-bold text-on-surface">{author.name}</p>
        {author.role ? <p className="truncate text-sm text-muted">{author.role}</p> : null}
        {meta ? <p className="truncate text-xs text-muted">{meta}</p> : null}
      </div>
    );
  }
);
