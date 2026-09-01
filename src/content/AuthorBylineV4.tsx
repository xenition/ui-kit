import * as React from 'react';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import type { AuthorBylineProps } from './AuthorByline';
import { metaLine, spokenLine, TONE_INK } from './internal/reading-v4';

export interface AuthorBylineV4Props extends AuthorBylineProps {
  /**
   * Build the credit from the author's name. Default ``(name) => `By ${name}` ``.
   *
   * `'By '` was English welded into the component, on a kit that ships an
   * `i18n` module.
   */
  formatByline?: (name: string) => string;
}

/**
 * **V4 author byline** — the web twin of the native `AuthorBylineV4`, same
 * props as {@link AuthorByline} plus `formatByline`.
 *
 * ## Three changes
 *
 * 1. **The byline's name finally lands.** The base hung `aria-label` on a
 *    roleless `<div>`, where ARIA says it is ignored — so where native read one
 *    labelled stop, web read the avatar, the name, the role and the meta line
 *    as separate fragments and left the reader to reassemble the credit. The
 *    container is now a `group`, a role that takes a name, and the name is one
 *    comma-joined line built with `spokenLine`.
 * 2. **The avatar is decorative and says so.** It repeats the name it sits
 *    beside; `aria-hidden` keeps it out of the reading order.
 * 3. **`'By '` is a prop**, and the role and meta lines take `mutedText` — the
 *    contrast-corrected ink — rather than the `muted` fill slot.
 */
export const AuthorBylineV4 = React.forwardRef<HTMLDivElement, AuthorBylineV4Props>(
  function AuthorBylineV4(
    {
      author,
      date,
      readingTime,
      variant = 'full',
      formatByline = (name: string) => `By ${name}`,
      className,
      ...rest
    },
    ref
  ) {
    if (!author?.name) return null;

    // The visible meta line keeps its middle dot; the spoken one takes commas.
    const meta = metaLine([date, readingTime]);
    const credit = formatByline(author.name);

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          role="group"
          aria-label={spokenLine([credit, date, readingTime])}
          className={cn('flex items-center gap-sm', className)}
          {...rest}
        >
          <span aria-hidden>
            <AvatarV4 src={author.avatarUrl} name={author.name} alt="" size="sm" />
          </span>
          <span className={cn('truncate text-sm', TONE_INK.muted)}>
            <span className="font-semibold text-on-surface">{author.name}</span>
            {meta ? `  ·  ${meta}` : ''}
          </span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="group"
        aria-label={spokenLine([credit, author.role, date, readingTime])}
        className={cn('flex items-center gap-md', className)}
        {...rest}
      >
        <span aria-hidden>
          <AvatarV4 src={author.avatarUrl} name={author.name} alt="" size="md" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-on-surface">{author.name}</p>
          {author.role ? (
            <p className={cn('truncate text-xs', TONE_INK.muted)}>{author.role}</p>
          ) : null}
          {meta ? <p className={cn('truncate text-xs', TONE_INK.muted)}>{meta}</p> : null}
        </div>
      </div>
    );
  }
);
