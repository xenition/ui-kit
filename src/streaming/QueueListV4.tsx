import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { EmptyState } from '../commerce';
import { formatTime } from './types';
import type { QueueListProps } from './QueueList';

/** Drop-in for {@link QueueListProps} — same props, the V4 "spotlight" design. */
export type QueueListV4Props = QueueListProps;

/**
 * QueueList — **V4** "spotlight" design (web parity of the native V4). An ordered
 * now/next queue of calm surface rows: each row is a small rounded artwork plus
 * title/artist, with a trailing duration and per-row remove affordance. The row
 * matching `nowPlayingId` gets a soft-`primary` tint and a leading **primary**
 * now-playing glyph (the one accent), announced via `aria-current`. Rows are
 * clean surface (no gradient — that is reserved for the artwork-hero moments);
 * tap targets are ≥44px. When `tracks` is empty it renders an `EmptyState` (from
 * `commerce`). Same props/behavior as {@link QueueListProps}; all colors from
 * `--xen-*` token classes (no literal hex).
 */
export const QueueListV4 = React.forwardRef<HTMLDivElement, QueueListV4Props>(function QueueListV4(
  {
    tracks,
    nowPlayingId,
    state = 'paused',
    title = 'Up Next',
    rowVariant: _rowVariant = 'standard',
    onSelect,
    onRemove,
    emptyLabel = 'Your queue is empty',
    className,
    ...rest
  },
  ref
) {
  if (tracks.length === 0) {
    return (
      <div
        ref={ref}
        data-xen-queue-list=""
        className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
        {...rest}
      >
        <EmptyState
          icon={<Icon glyph="🎵" size="2xl" color="muted" aria-label="Queue" />}
          title={emptyLabel}
          description="Add songs to build up your queue."
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-queue-list=""
      role="list"
      className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)}
      {...rest}
    >
      {title ? (
        <p className="mb-[var(--xen-space-xs)] px-[var(--xen-space-sm)] text-xs font-bold uppercase tracking-wide text-muted">
          {title}
        </p>
      ) : null}
      {tracks.map((track, index) => {
        const active = nowPlayingId != null && track.id === nowPlayingId;
        const isPlaying = active && state === 'playing';
        const interactive = !!onSelect;
        return (
          <div key={track.id} role="listitem" className="flex items-stretch">
            <div
              role={interactive ? 'button' : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={interactive ? track.title : undefined}
              aria-current={active ? 'true' : undefined}
              onClick={interactive ? () => onSelect!(track, index) : undefined}
              onKeyDown={
                interactive
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelect!(track, index);
                      }
                    }
                  : undefined
              }
              className={cn(
                'flex min-h-[44px] flex-1 items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
                active ? 'bg-primary-50' : 'bg-transparent',
                interactive &&
                  'cursor-pointer transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
              )}
            >
              {/* Leading artwork with an overlaid now-playing glyph when active. */}
              <span className="relative shrink-0" style={{ width: 44, height: 44 }}>
                {track.artworkUrl ? (
                  <img
                    src={track.artworkUrl}
                    alt=""
                    aria-hidden="true"
                    className="h-11 w-11 rounded-[var(--xen-radius-sm)] bg-border object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-sm)] bg-accent"
                  >
                    <Icon glyph="♪" size="base" color="onPrimary" />
                  </span>
                )}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center rounded-[var(--xen-radius-sm)] bg-primary-50/80"
                  >
                    <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="primary" />
                  </span>
                ) : null}
              </span>

              <div className="flex min-w-0 flex-1 flex-col">
                <span
                  className={cn(
                    'truncate text-base',
                    active ? 'font-bold text-primary' : 'font-semibold text-on-surface'
                  )}
                >
                  {track.title}
                  {active ? <span className="sr-only"> (now playing)</span> : null}
                </span>
                {track.artist ? (
                  <span className="truncate text-xs text-muted">{track.artist}</span>
                ) : null}
              </div>

              {track.duration != null ? (
                <span className="text-xs text-muted">{formatTime(track.duration)}</span>
              ) : null}
            </div>

            {onRemove ? (
              <button
                type="button"
                aria-label={`Remove ${track.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(track, index);
                }}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-muted transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                <Icon glyph="⋯" size="lg" color="muted" />
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
});
