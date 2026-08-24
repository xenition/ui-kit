import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Slider, Spinner } from '../primitives';
import { LiveBadge } from './LiveBadge';
import { CastButton } from './CastButton';
import { formatTime, type PlaybackState } from './types';

export type VideoPlayerVariant = 'inline' | 'theater' | 'minimal';

export interface VideoPlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onSeek'> {
  /** Poster / thumbnail image shown behind the controls. */
  posterUrl?: string;
  /** Title overlaid on the scrim (top-left). */
  title?: string;
  /** Transport state — drives the center control + a11y label. Default `'paused'`. */
  state?: PlaybackState;
  /** Playback position in seconds. */
  position?: number;
  /** Total duration in seconds; when omitted the seek bar is hidden. */
  duration?: number;
  /** Live stream — shows a `LiveBadge` and hides the seek bar. */
  live?: boolean;
  /** Concurrent viewers, passed to the `LiveBadge` when `live`. */
  viewers?: number;
  /** Frame aspect ratio (default 16 / 9). */
  aspectRatio?: number;
  /**
   * - `inline`  — full control bar under the frame (default).
   * - `theater` — same controls, taller frame.
   * - `minimal` — center play/pause only, no bottom bar.
   */
  variant?: VideoPlayerVariant;
  /** Hide the controls overlay entirely (e.g. tap-to-reveal handled by app). */
  showControls?: boolean;
  /** Called with the next playing state when the center control is clicked. */
  onPlayToggle?: (next: boolean) => void;
  /** Called with a new position (seconds) when the seek bar changes. */
  onSeek?: (seconds: number) => void;
  /** Called when the fullscreen control is clicked. */
  onFullscreen?: () => void;
  /** Called when the cast control is clicked (shows a `CastButton` when set). */
  onCast?: () => void;
  /** Whether a cast target is connected (reflected by the `CastButton`). */
  casting?: boolean;
}

/**
 * A themed **video player UI shell** (web) — controls overlay only, with **no
 * playback dependency**. Wrap a real `<video>` behind this and drive it from
 * the emitted intents: `onPlayToggle(next)`, `onSeek(seconds)`, `onFullscreen`,
 * `onCast`. Renders a poster frame, a dark scrim, a center play/pause (or a
 * buffering `Spinner`) control, and a bottom bar with time labels + a `Slider`
 * seek bar. The center control's accessible label reflects `state`
 * ("Play" / "Pause"). Every color resolves from `--xen-*` tokens — no literal hex.
 */
export const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(function VideoPlayer(
  {
    posterUrl,
    title,
    state = 'paused',
    position = 0,
    duration,
    live = false,
    viewers,
    aspectRatio = 16 / 9,
    variant = 'inline',
    showControls = true,
    onPlayToggle,
    onSeek,
    onFullscreen,
    onCast,
    casting,
    className,
    style,
    ...rest
  },
  ref
) {
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
  const seekMax = duration && duration > 0 ? duration : 1;
  const showSeek = variant !== 'minimal' && !live && duration != null;

  return (
    <div
      ref={ref}
      data-xen-video-player=""
      className={cn(
        'relative flex w-full items-center justify-center overflow-hidden',
        'rounded-[var(--xen-radius-lg)] bg-neutral-900',
        className
      )}
      style={{ aspectRatio: String(aspectRatio), ...style }}
      {...rest}
    >
      {posterUrl ? (
        <img
          src={posterUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      {showControls ? (
        <>
          {/* Scrim for control legibility over the poster. */}
          <div className="absolute inset-0 bg-neutral-900" style={{ opacity: 0.35 }} />

          {/* Top-left title + live badge. */}
          <div className="absolute left-[var(--xen-space-sm)] right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] flex items-center gap-[var(--xen-space-sm)]">
            {live ? <LiveBadge viewers={viewers} /> : null}
            {title ? (
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-neutral-50">
                {title}
              </span>
            ) : null}
          </div>

          {/* Center play / pause / buffering. */}
          <div className="relative flex items-center justify-center">
            {isBuffering ? (
              <Spinner size="lg" />
            ) : (
              <button
                type="button"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                aria-pressed={isPlaying}
                disabled={!onPlayToggle}
                onClick={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
                className={cn(
                  'flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary',
                  'transition-opacity hover:opacity-90',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                  'disabled:pointer-events-none disabled:opacity-50'
                )}
              >
                <Icon glyph={isPlaying ? '❙❙' : '▶'} size="xl" color="onPrimary" />
              </button>
            )}
          </div>

          {/* Bottom control bar. */}
          {variant !== 'minimal' ? (
            <div className="absolute bottom-[var(--xen-space-sm)] left-[var(--xen-space-sm)] right-[var(--xen-space-sm)]">
              <div className="flex items-center gap-[var(--xen-space-sm)]">
                <span className="text-xs text-neutral-50">
                  {live ? 'LIVE' : formatTime(position)}
                </span>
                <div className="min-w-0 flex-1">
                  {showSeek ? (
                    <Slider
                      value={Math.min(position, seekMax)}
                      min={0}
                      max={seekMax}
                      disabled={!onSeek}
                      onChange={(v) => onSeek?.(v)}
                    />
                  ) : (
                    <div className="h-1 w-full rounded-full bg-border" />
                  )}
                </div>
                {!live ? (
                  <span className="text-xs text-neutral-50">{formatTime(duration)}</span>
                ) : null}
                {onCast ? (
                  <CastButton connected={casting} onClick={onCast} size="sm" className="text-neutral-50" />
                ) : null}
                {onFullscreen ? (
                  <button
                    type="button"
                    aria-label="Fullscreen"
                    onClick={onFullscreen}
                    className="inline-flex text-neutral-50 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
                  >
                    <Icon glyph="⤢" size="base" className="text-neutral-50" />
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
});
