import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { AvatarGroup } from '../primitives/AvatarGroup';
import { Icon } from '../primitives/Icon';
import type { SessionCardProps } from './SessionCard';

/** Drop-in replacement for {@link SessionCard} — identical props. */
export type SessionCardV2Props = SessionCardProps;

/**
 * SessionCard — **timeline card** alternate design (web / React DOM).
 *
 * A fixed left gutter renders the session time above a node dot and a vertical
 * connector, so a stack of these reads as an agenda rail. The elevated body on
 * the right keeps the track badge, title, room, abstract, speaker cluster and
 * the seat-capacity meter. `highlight` fills the node and tints the body with
 * the primary token. Same props as {@link SessionCard} — a drop-in swap.
 * Token-pure.
 */
export const SessionCardV2 = React.forwardRef<HTMLDivElement, SessionCardV2Props>(function SessionCardV2(
  { title, time, room, track, abstract, speakers = [], capacity, seatsTaken, bookmarked = false, onBookmark, variant = 'default', onClick, onKeyDown, className, ...rest },
  ref
) {
  const isHighlight = variant === 'highlight';
  const clickable = typeof onClick === 'function';

  const hasMeter = typeof capacity === 'number' && capacity > 0 && typeof seatsTaken === 'number';
  const fillRatio = hasMeter ? Math.max(0, Math.min(1, (seatsTaken as number) / (capacity as number))) : 0;
  const isFull = hasMeter && (seatsTaken as number) >= (capacity as number);
  const speakerNames = speakers.map((s) => s.name).join(', ');

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
        'flex flex-row gap-sm bg-transparent',
        clickable && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      onClick={onClick}
      onKeyDown={clickable ? handleKeyDown : onKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? title : undefined}
      {...rest}
    >
      {/* Timeline gutter: time, node dot, connector. */}
      <div className="flex w-16 shrink-0 flex-col items-center">
        <span className="text-center text-sm font-extrabold text-on-surface">{time ?? '—'}</span>
        <span
          className={cn(
            'mt-sm h-3.5 w-3.5 rounded-full border-2',
            isHighlight ? 'border-primary bg-primary' : 'border-border bg-surface'
          )}
        />
        <span className="mt-xs w-0.5 flex-1 bg-border" />
      </div>

      {/* Elevated body. */}
      <div
        className={cn(
          'flex flex-1 flex-col gap-sm rounded-md p-md shadow-sm transition duration-200',
          isHighlight ? 'bg-primary/5' : 'bg-surface',
          clickable && 'hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:transform-none'
        )}
      >
        <div className="flex flex-row items-start gap-sm">
          <div className="flex flex-1 flex-col gap-xs">
            {track ? (
              <span className="self-start">
                <Badge tone={isHighlight ? 'primary' : 'neutral'}>{track}</Badge>
              </span>
            ) : null}
            <h3 className="font-heading text-lg font-bold text-on-surface">{title}</h3>
            {room ? <p className="text-sm text-muted">{room}</p> : null}
          </div>
          {onBookmark ? (
            <button
              type="button"
              aria-pressed={bookmarked}
              aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark session'}
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(!bookmarked);
              }}
              className="p-xs transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              <Icon glyph={bookmarked ? '★' : '☆'} size="lg" color={bookmarked ? 'primary' : 'muted'} />
            </button>
          ) : null}
        </div>

        {abstract ? <p className="line-clamp-3 text-sm text-on-surface">{abstract}</p> : null}

        {speakers.length > 0 ? (
          <div className="flex flex-row items-center gap-sm">
            <AvatarGroup avatars={speakers.map((s) => ({ src: s.avatarUrl, name: s.name }))} size="sm" max={3} />
            <span className="flex-1 truncate text-sm text-muted">{speakerNames}</span>
          </div>
        ) : null}

        {hasMeter ? (
          <div className="flex flex-col gap-xs">
            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200">
              <div className={cn('h-full', isFull ? 'bg-danger' : 'bg-primary')} style={{ width: `${Math.round(fillRatio * 100)}%` }} />
            </div>
            <span className={cn('text-xs font-semibold', isFull ? 'text-danger' : 'text-muted')}>
              {isFull ? 'Session full' : `${seatsTaken} / ${capacity} seats taken`}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
});
