import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives';
import type { VideoLessonRowProps } from './VideoLessonRow';

/** V4 layout choices for the "campus" design. */
export type VideoLessonRowLayout = 'full' | 'compact';

/** Drop-in for {@link VideoLessonRowProps} — same props, the V4 "campus" design. */
export interface VideoLessonRowV4Props extends VideoLessonRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: VideoLessonRowLayout;
}

/**
 * VideoLessonRow — **V4** "campus" design (web parity of the native V4). An
 * elevated rounded row with a soft shadow, a thumbnail with a play / watched
 * overlay, the title, a section · duration meta line, an optional watch-progress
 * bar, and a "Now playing" pill when active. The playing state is carried by a
 * word + pill (never color alone). Rendered as a keyboard-operable `role="button"`
 * when `onPlay` is set. Honors the V4 `variant` — `full` (default) and `compact`
 * (a denser single line that hides the meta + progress). All colors from
 * `--xen-*` token classes (no literals).
 */
export const VideoLessonRowV4 = React.forwardRef<HTMLDivElement, VideoLessonRowV4Props>(function VideoLessonRowV4(
  { title, durationLabel, thumbnail, watchProgress, playing = false, watched = false, meta, variant = 'full', onPlay, className, ...rest },
  ref
) {
  const stateWord = playing ? 'now playing' : watched ? 'watched' : 'not watched';
  const interactive = !!onPlay;
  const compact = variant === 'compact';

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
      data-xen-video-lesson-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`Video: ${title}${durationLabel ? `, ${durationLabel}` : ''}, ${stateWord}`}
      aria-current={playing || undefined}
      onClick={interactive ? onPlay : undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-sm)]',
        playing && 'ring-2 ring-primary',
        interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...rest}
    >
      <div className={cn('relative flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-primary/10', compact ? 'h-10 w-14' : 'h-12 w-[72px]')}>
        {thumbnail ? <img src={thumbnail} alt="" className="h-full w-full object-cover" /> : null}
        <span aria-hidden="true" className={cn('absolute text-lg', watched ? 'text-success' : 'text-primary')}>
          {watched ? '✓' : '▶'}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="line-clamp-2 text-sm font-semibold text-on-surface">{title}</span>
        {!compact && (meta || durationLabel) ? (
          <span className="truncate text-xs tabular-nums text-muted">{[meta, durationLabel].filter(Boolean).join(' · ')}</span>
        ) : null}
        {!compact && watchProgress != null ? <Progress value={watchProgress} tone="primary" size="sm" /> : null}
      </div>

      {playing ? (
        <span className="shrink-0 rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold text-primary">▶ Now playing</span>
      ) : null}
    </div>
  );
});
