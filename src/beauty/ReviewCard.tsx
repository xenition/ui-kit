import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Rating } from '../primitives';

export type ReviewCardVariant = 'default' | 'compact';

export interface ReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Reviewer name. */
  author: string;
  /** Star rating (0–5). */
  rating: number;
  /** Review body text. */
  text?: string;
  /** Human date string (e.g. "2 weeks ago"). */
  date?: string;
  /** Service the review is about (e.g. "Balayage"). Shown as a chip. */
  service?: string;
  /** Reviewer avatar URL; initials fall back. */
  avatarUrl?: string;
  /** Marks a verified booking with a success note. */
  verified?: boolean;
  /** Density. `compact` hides the body text. */
  variant?: ReviewCardVariant;
  /** Salon reply text, shown as a nested block. */
  reply?: string;
}

/**
 * A customer review card: avatar + author, a star `Rating`, an optional service
 * chip and verified badge, the review body, and an optional salon reply block.
 * `variant="compact"` drops the body for dense lists. The verified state is a
 * spoken/labelled note with a glyph (not color alone). Token-only colors.
 */
export const ReviewCard = React.forwardRef<HTMLDivElement, ReviewCardProps>(
  function ReviewCard(
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
      className,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';

    return (
      <div
        ref={ref}
        data-xen-review-card=""
        aria-label={`Review by ${author}, ${rating} out of 5 stars${
          verified ? ', verified' : ''
        }${service ? `, for ${service}` : ''}`}
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <Avatar src={avatarUrl} name={author} size="sm" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-sm font-bold text-on-surface">{author}</span>
            <span className="flex items-center gap-[var(--xen-space-xs)]">
              <Rating value={rating} size="sm" />
              {date ? <span className="text-xs text-muted">· {date}</span> : null}
            </span>
          </div>
          {verified ? (
            <span className="shrink-0 rounded-[var(--xen-radius-sm)] bg-success px-[var(--xen-space-xs)] py-px text-xs font-bold text-on-success">
              ✓ Verified
            </span>
          ) : null}
        </div>

        {service ? (
          <span className="self-start rounded-full bg-primary-50 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold text-primary">
            {service}
          </span>
        ) : null}

        {!compact && text ? (
          <p className="text-sm leading-relaxed text-on-surface">{text}</p>
        ) : null}

        {reply ? (
          <div className="flex flex-col gap-0.5 rounded-[var(--xen-radius-md)] bg-neutral-100 p-[var(--xen-space-sm)]">
            <span className="text-xs font-bold text-muted">Response from salon</span>
            <span className="text-sm text-on-surface">{reply}</span>
          </div>
        ) : null}
      </div>
    );
  }
);
