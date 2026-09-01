import * as React from 'react';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { RatingV4 } from '../primitives/RatingV4';
import { metaLine } from './internal/salon-v4';
import type { ReviewCardProps } from './ReviewCard';

export interface ReviewCardV4Props extends ReviewCardProps {
  /** Copy on the verified chip. Default `'Verified visit'`. */
  verifiedLabel?: string;
  /** Label above the salon's reply. Default `'Reply from the salon'`. */
  replyLabel?: string;
}

/**
 * **V4 review card** — the web twin of the native `ReviewCardV4`, same props
 * as {@link ReviewCard} plus `verifiedLabel` and `replyLabel`.
 *
 * ## Four changes
 *
 * 1. **The rating carries its number**, and the card is one announced object
 *    rather than three loose fragments.
 * 2. **The reply is attributed.** An indented paragraph under a review does
 *    not say who wrote it, and the reply is the *business* answering a
 *    customer.
 * 3. **`verified` is a chip with a word**, not a bare checkmark glyph.
 * 4. **The review is a real `<blockquote>` with a `<cite>`**, which is what a
 *    quoted opinion with an attributed author actually is.
 *
 * **Renders nothing without an `author`** (§4.5).
 */
export const ReviewCardV4 = React.forwardRef<HTMLDivElement, ReviewCardV4Props>(
  function ReviewCardV4(
    {
      author,
      rating,
      text,
      date,
      service,
      avatarUrl,
      verified = false,
      variant = 'default',
      reply,
      verifiedLabel = 'Verified visit',
      replyLabel = 'Reply from the salon',
      className,
      ...rest
    },
    ref
  ) {
    if (!author) return null;

    const compact = variant === 'compact';
    const caption = metaLine([service, date]);

    return (
      <CardV4
        ref={ref}
        data-xen-review-card=""
        aria-label={metaLine([
          author,
          typeof rating === 'number' ? `rated ${rating}` : null,
          verified ? verifiedLabel : null,
          caption,
        ])}
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        <div className="flex items-center gap-sm">
          <AvatarV4 src={avatarUrl} name={author} size={compact ? 'xs' : 'sm'} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="flex items-center gap-sm">
              <cite className="truncate text-sm font-semibold not-italic text-on-card">
                {author}
              </cite>
              {verified ? (
                <BadgeV4 tone="success" variant="soft" size="sm">
                  {verifiedLabel}
                </BadgeV4>
              ) : null}
            </span>
            {caption ? <span className="truncate text-xs text-muted-text">{caption}</span> : null}
          </div>
          <RatingV4 value={rating} size="sm" showValue />
        </div>

        {text ? (
          <blockquote className={cn('text-sm text-on-card', compact && 'line-clamp-3')}>
            {text}
          </blockquote>
        ) : null}

        {reply ? (
          <div className="flex flex-col gap-0.5 rounded-[var(--xen-radius-md)] border-l-2 border-primary bg-selected p-sm">
            <span className="flex items-center gap-xs text-xs font-semibold text-muted-text">
              <IconV4 name="send" size="xs" className="text-primary-text" />
              {replyLabel}
            </span>
            <p className="text-sm text-on-selected">{reply}</p>
          </div>
        ) : null}
      </CardV4>
    );
  }
);
