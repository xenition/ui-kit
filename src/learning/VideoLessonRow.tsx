import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives';

export interface VideoLessonRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Lesson title. */
  title: string;
  /** Duration label, e.g. "12:30". */
  durationLabel?: string;
  /** Remote thumbnail URL. */
  thumbnail?: string;
  /** Watch progress 0–100; renders a thin progress bar when set. */
  watchProgress?: number;
  /** Whether this lesson is the one currently playing. */
  playing?: boolean;
  /** Whether the lesson is fully watched. */
  watched?: boolean;
  /** Optional section / index label, e.g. "3.2". */
  meta?: string;
  /** Fires when the row (play affordance) is clicked. */
  onPlay?: () => void;
}

/**
 * A video lesson list row: a thumbnail with a play overlay, the title, a
 * duration / meta line, an optional watch-progress bar, and playing / watched
 * indicators. Rendered as a `role="button"` element (Enter/Space activation)
 * announced with its play state. Token-only colors (`--xen-*`).
 */
export const VideoLessonRow = React.forwardRef<HTMLDivElement, VideoLessonRowProps>(
  function VideoLessonRow(
    { title, durationLabel, thumbnail, watchProgress, playing = false, watched = false, meta, onPlay, className, ...rest },
    ref
  ) {
    const stateWord = playing ? 'now playing' : watched ? 'watched' : 'not watched';
    const interactive = !!onPlay;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (!interactive) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onPlay?.();
      }
    };

    return (
      <div
        ref={ref}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`Video: ${title}${durationLabel ? `, ${durationLabel}` : ''}, ${stateWord}`}
        aria-current={playing || undefined}
        onClick={interactive ? onPlay : undefined}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center gap-3 rounded-[var(--xen-radius-md)] p-2',
          playing ? 'bg-accent' : 'bg-surface',
          interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...rest}
      >
        <div className="relative flex h-12 w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-sm)] bg-border">
          {thumbnail ? <img src={thumbnail} alt="" className="h-full w-full object-cover" /> : null}
          <span aria-hidden="true" className="absolute text-lg text-on-surface">
            {watched ? '✓' : '▶'}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="line-clamp-2 text-sm font-semibold text-on-surface">{title}</span>
          {meta || durationLabel ? (
            <span className="text-xs text-muted">{[meta, durationLabel].filter(Boolean).join(' · ')}</span>
          ) : null}
          {watchProgress != null ? <Progress value={watchProgress} tone="primary" size="sm" /> : null}
        </div>
      </div>
    );
  }
);
