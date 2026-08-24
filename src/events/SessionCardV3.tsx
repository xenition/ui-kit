import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { AvatarGroup } from '../primitives/AvatarGroup';
import { Icon } from '../primitives/Icon';
import type { SessionCardProps } from './SessionCard';

/** Drop-in replacement for {@link SessionCard} — identical props. */
export type SessionCardV3Props = SessionCardProps;

/**
 * SessionCard — **dense schedule line** alternate design (web / React DOM).
 *
 * The time leads a single compact row, then the title with an inline track
 * badge, a small speaker cluster, a terse `taken/cap` seat count, and the
 * bookmark star at the trailing edge — one or two lines total, no abstract, no
 * meter bar. Sized for a packed agenda list; `highlight` adds a thin primary
 * left rail. Same props as {@link SessionCard} — a drop-in swap. Token-pure.
 */
export const SessionCardV3 = React.forwardRef<HTMLDivElement, SessionCardV3Props>(function SessionCardV3(
  { title, time, room, track, speakers = [], capacity, seatsTaken, bookmarked = false, onBookmark, variant = 'default', onClick, onKeyDown, className, ...rest },
  ref
) {
  const isHighlight = variant === 'highlight';
  const clickable = typeof onClick === 'function';

  const hasMeter = typeof capacity === 'number' && capacity > 0 && typeof seatsTaken === 'number';
  const isFull = hasMeter && (seatsTaken as number) >= (capacity as number);
  const metaLine = [time, room].filter(Boolean).join(' · ');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(e);
    if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
      e.preventDefault();
      (e.currentTarget as HTMLDivElement).click();
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-row items-stretch overflow-hidden rounded-md border bg-surface text-on-surface',
        isHighlight ? 'border-primary' : 'border-border',
        clickable && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      onClick={onClick}
      onKeyDown={clickable ? handleKeyDown : onKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? title : undefined}
      {...rest}
    >
      {isHighlight ? <span className="w-0.5 shrink-0 self-stretch bg-primary" /> : null}
      <div className="flex flex-1 flex-row items-center gap-sm px-md py-sm">
        <span className="w-14 shrink-0 truncate text-sm font-extrabold text-on-surface">{time ?? '—'}</span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex flex-row items-center gap-xs">
            <span className="min-w-0 flex-shrink truncate text-base font-bold text-on-surface">{title}</span>
            {track ? <Badge tone={isHighlight ? 'primary' : 'neutral'} size="sm">{track}</Badge> : null}
          </div>
          {metaLine ? <p className="truncate text-xs text-muted">{metaLine}</p> : null}
        </div>

        {speakers.length > 0 ? (
          <AvatarGroup avatars={speakers.map((s) => ({ src: s.avatarUrl, name: s.name }))} size="xs" max={2} />
        ) : null}

        {hasMeter ? (
          <span className={cn('shrink-0 text-xs font-bold', isFull ? 'text-danger' : 'text-muted')}>
            {isFull ? 'Full' : `${seatsTaken}/${capacity}`}
          </span>
        ) : null}

        {onBookmark ? (
          <button
            type="button"
            aria-pressed={bookmarked}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark session'}
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(!bookmarked);
            }}
            className="shrink-0 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <Icon glyph={bookmarked ? '★' : '☆'} size="base" color={bookmarked ? 'primary' : 'muted'} />
          </button>
        ) : null}
      </div>
    </div>
  );
});
