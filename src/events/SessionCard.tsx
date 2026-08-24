import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { AvatarGroup } from '../primitives/AvatarGroup';
import { Icon } from '../primitives/Icon';

/** Emphasis of a {@link SessionCard}. */
export type SessionCardVariant = 'default' | 'highlight';

export interface SessionSpeaker {
  name: string;
  avatarUrl?: string;
}

export interface SessionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Session title. */
  title: string;
  /** Pre-formatted time range, e.g. `14:00 – 14:45`. */
  time?: string;
  /** Room / stage. */
  room?: string;
  /** Track label, rendered as a badge. */
  track?: string;
  /** Short abstract. */
  abstract?: string;
  /** Speakers, shown as an avatar cluster + names. */
  speakers?: SessionSpeaker[];
  /** Capacity, for a `seatsTaken / capacity` meter. */
  capacity?: number;
  /** Seats already taken. */
  seatsTaken?: number;
  /** Whether the session is bookmarked. */
  bookmarked?: boolean;
  /** Fires with the desired next bookmark state. */
  onBookmark?: (next: boolean) => void;
  /** `highlight` adds a primary rail for keynotes/featured sessions. */
  variant?: SessionCardVariant;
}

/**
 * A rich conference session card: track badge, title, time / room meta, an
 * abstract, a speaker cluster, an optional seat-capacity meter, and a bookmark
 * toggle. `highlight` adds a primary left rail for keynotes. The bookmark state
 * uses a filled/outline glyph (★/☆) plus `aria-pressed`, and its clicks don't
 * trigger the card's `onClick`. Colors come from the `--xen-*` tokens; no
 * literal colors.
 */
export const SessionCard = React.forwardRef<HTMLDivElement, SessionCardProps>(function SessionCard(
  { title, time, room, track, abstract, speakers = [], capacity, seatsTaken, bookmarked = false, onBookmark, variant = 'default', onClick, onKeyDown, className, ...rest },
  ref
) {
  const isHighlight = variant === 'highlight';
  const clickable = typeof onClick === 'function';

  const hasMeter = typeof capacity === 'number' && capacity > 0 && typeof seatsTaken === 'number';
  const fillRatio = hasMeter ? Math.max(0, Math.min(1, (seatsTaken as number) / (capacity as number))) : 0;
  const isFull = hasMeter && (seatsTaken as number) >= (capacity as number);

  const speakerNames = speakers.map((s) => s.name).join(', ');
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
        'overflow-hidden rounded-lg border bg-surface text-on-surface',
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
      <div className="flex flex-row">
        {isHighlight ? <div className="w-1 shrink-0 bg-primary" /> : null}
        <div className="flex flex-1 flex-col gap-sm p-lg">
          <div className="flex flex-row items-start gap-sm">
            <div className="flex flex-1 flex-col gap-xs">
              {track ? (
                <span className="self-start">
                  <Badge tone={isHighlight ? 'primary' : 'neutral'}>{track}</Badge>
                </span>
              ) : null}
              <h3 className="font-heading text-lg font-bold text-on-surface">{title}</h3>
              {metaLine ? <p className="text-sm text-muted">{metaLine}</p> : null}
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
                <div
                  className={cn('h-full', isFull ? 'bg-danger' : 'bg-primary')}
                  style={{ width: `${Math.round(fillRatio * 100)}%` }}
                />
              </div>
              <span className={cn('text-xs font-semibold', isFull ? 'text-danger' : 'text-muted')}>
                {isFull ? 'Session full' : `${seatsTaken} / ${capacity} seats taken`}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
});
