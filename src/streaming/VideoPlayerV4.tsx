import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Slider, Spinner } from '../primitives';
import { LiveBadge } from './LiveBadge';
import { CastButton } from './CastButton';
import { formatTime } from './types';
import type { VideoPlayerProps } from './VideoPlayer';

/** Drop-in for {@link VideoPlayerProps} — same props, the V4 "spotlight" design. */
export type VideoPlayerV4Props = VideoPlayerProps;

/**
 * VideoPlayer — **V4** "spotlight" design (web parity of the native V4). The
 * video surface shell: a brand-gradient poster/backdrop sits behind the
 * (placeholder) video frame — the V4 signature — with a big centered round
 * **primary** play control and a bottom control bar (scrubber + time labels +
 * mute/cast/fullscreen glyphs) on a subtle scrim. A `posterUrl` overlays the
 * gradient when given. Controls-only, no `<video>` engine: drive a real element
 * from `onPlayToggle(next)`, `onSeek(seconds)`, `onFullscreen`, `onCast`. Same
 * props/behavior as {@link VideoPlayerProps} (buffering swaps play for a
 * `Spinner`); every color resolves from `--xen-*` tokens — no literal hex.
 */
export const VideoPlayerV4 = React.forwardRef<HTMLDivElement, VideoPlayerV4Props>(function VideoPlayerV4(
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
        // Gradient poster/backdrop — the V4 spotlight signature.
        'rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600',
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
          {/* Scrim for control legibility over the poster / gradient. */}
          <div className="absolute inset-0 bg-neutral-900" style={{ opacity: 0.3 }} />

          {/* Top-left title + live badge. */}
          <div className="absolute left-[var(--xen-space-sm)] right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] flex items-center gap-[var(--xen-space-sm)]">
            {live ? <LiveBadge viewers={viewers} /> : null}
            {title ? (
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-neutral-50">
                {title}
              </span>
            ) : null}
          </div>

          {/* Center play / pause / buffering — big round primary. */}
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
                  'flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary text-on-primary shadow-lg',
                  'transition-opacity hover:opacity-90',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                  'disabled:pointer-events-none disabled:opacity-50'
                )}
              >
                <Icon glyph={isPlaying ? '❙❙' : '▶'} size="2xl" color="onPrimary" />
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
