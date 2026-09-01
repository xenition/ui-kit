import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { formatTime } from './types';
import type { MediaTrack } from './types';

export interface UpNextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect' | 'title'> {
  /** The next few upcoming tracks, in play order. An empty array renders nothing. */
  tracks: readonly MediaTrack[];
  /** Header label above the queue preview. */
  title?: string;
  /** Called with a track `id` when a row is tapped — jump to that track. */
  onSelect?: (id: string) => void;
  /** When provided, a subtle "Clear" affordance appears in the header. */
  onClear?: () => void;
}

/**
 * UpNext — **V4** "spotlight" design (web parity of the native V4). A compact
 * "playing next" queue preview: a clean elevated card listing the next few
 * tracks (small artwork thumb + title/artist, with the duration via
 * {@link formatTime}), each row tappable to jump ahead. The header carries the
 * label and an optional Clear affordance. The surface stays clean — the V4
 * gradient is reserved for the immersive/artwork moments. Presentational only;
 * all colors from `--xen-*` token classes (no literal hex). Dark-mode safe.
 */
export const UpNext = React.forwardRef<HTMLDivElement, UpNextProps>(function UpNext(
  { tracks, title = 'Up next', onSelect, onClear, className, ...rest },
  ref
) {
  if (tracks.length === 0) return null;
  const thumb = 44;

  return (
    <div
      ref={ref}
      data-xen-up-next=""
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-lg',
        className
      )}
      {...rest}
    >
      {/* Header: label + optional Clear. */}
      <div className="flex items-center justify-between px-[var(--xen-space-xs)]">
        <span className="text-xs font-bold uppercase tracking-wide text-muted">{title}</span>
        {onClear ? (
          <button
            type="button"
            aria-label="Clear up next"
            onClick={onClear}
            className="inline-flex items-center gap-[var(--xen-space-xs)] text-xs font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-[var(--xen-radius-sm)]"
          >
            Clear
          </button>
        ) : null}
      </div>

      {/* Queue rows. */}
      <ul role="list" className="flex flex-col gap-[var(--xen-space-xs)]">
        {tracks.map((track) => {
          const interactive = !!onSelect;
          const meta = track.artist;
          return (
            <li key={track.id} role="listitem">
              <button
                type="button"
                disabled={!interactive}
                aria-label={track.artist ? `${track.title} — ${track.artist}` : track.title}
                onClick={interactive ? () => onSelect!(track.id) : undefined}
                className={cn(
                  'flex w-full min-h-[44px] items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] p-[var(--xen-space-xs)] text-left',
                  'transition-colors',
                  interactive &&
                    'hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                  !interactive && 'cursor-default'
                )}
              >
                {track.artworkUrl ? (
                  <img
                    src={track.artworkUrl}
                    alt=""
                    aria-hidden="true"
                    className="shrink-0 rounded-[var(--xen-radius-sm)] bg-border object-cover"
                    style={{ width: thumb, height: thumb }}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] bg-accent"
                    style={{ width: thumb, height: thumb }}
                  >
                    <Icon glyph="♪" size="sm" color="onPrimary" />
                  </span>
                )}

                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-semibold text-on-surface">{track.title}</span>
                  {meta ? <span className="truncate text-xs text-muted">{meta}</span> : null}
                </span>

                {track.duration != null ? (
                  <span className="shrink-0 text-xs tabular-nums text-muted">{formatTime(track.duration)}</span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
