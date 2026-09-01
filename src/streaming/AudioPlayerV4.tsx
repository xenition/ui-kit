import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Slider, Spinner } from '../primitives';
import { formatTime } from './types';
import type { AudioPlayerProps } from './AudioPlayer';

/** Drop-in for {@link AudioPlayerProps} — same props, the V4 "spotlight" design. */
export type AudioPlayerV4Props = AudioPlayerProps;

const ART_SIZE: Record<NonNullable<AudioPlayerProps['variant']>, number> = {
  card: 64,
  compact: 44,
  expanded: 88,
};

/**
 * AudioPlayer — **V4** "spotlight" design (web parity of the native V4). A
 * compact audio transport card: small artwork, title/artist, a clean
 * soft-primary scrubber with time labels, and big round **primary** transport
 * controls (play/pause framed by prev/next in `expanded`). When a cover is
 * present it sits on a subtle brand-gradient glow — the V4 signature — kept
 * light so the card stays a clean surface. Same props/behavior as
 * {@link AudioPlayerProps} (buffering swaps play for a `Spinner`); every color
 * resolves from `--xen-*` token classes — no literal hex.
 */
export const AudioPlayerV4 = React.forwardRef<HTMLDivElement, AudioPlayerV4Props>(function AudioPlayerV4(
  {
    track,
    state = 'paused',
    position = 0,
    duration,
    variant = 'card',
    onPlayToggle,
    onSeek,
    onPrev,
    onNext,
    className,
    ...rest
  },
  ref
) {
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
  const total = duration ?? track.duration;
  const seekMax = total && total > 0 ? total : 1;
  const compact = variant === 'compact';
  const expanded = variant === 'expanded';
  const art = ART_SIZE[variant];

  const meta = [track.artist, track.album].filter(Boolean).join(' · ');

  const playControl = (
    <span className="inline-flex h-11 w-11 items-center justify-center">
      {isBuffering ? (
        <Spinner size="sm" />
      ) : (
        <button
          type="button"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          aria-pressed={isPlaying}
          disabled={!onPlayToggle}
          onClick={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full bg-primary text-on-primary shadow-md',
            'transition-opacity hover:opacity-90',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="onPrimary" />
        </button>
      )}
    </span>
  );

  return (
    <div
      ref={ref}
      data-xen-audio-player=""
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-lg',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        {track.artworkUrl ? (
          // Cover on a subtle gradient glow — the V4 spotlight signature.
          <span
            aria-hidden="true"
            className="shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-accent-400 to-primary-600 p-[var(--xen-space-xs)]"
            style={{ width: art, height: art }}
          >
            <img
              src={track.artworkUrl}
              alt=""
              aria-hidden="true"
              className="h-full w-full rounded-[var(--xen-radius-sm)] object-cover"
            />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-accent-400 to-primary-600"
            style={{ width: art, height: art }}
          >
            <Icon glyph="♪" size="xl" color="onPrimary" />
          </span>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-extrabold text-on-surface">{track.title}</span>
          {meta ? <span className="truncate text-sm text-muted">{meta}</span> : null}
        </div>

        {expanded && onPrev ? (
          <button
            type="button"
            aria-label="Previous"
            onClick={onPrev}
            className="inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <Icon glyph="⏮" size="lg" color="onSurface" />
          </button>
        ) : null}
        {playControl}
        {expanded && onNext ? (
          <button
            type="button"
            aria-label="Next"
            onClick={onNext}
            className="inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <Icon glyph="⏭" size="lg" color="onSurface" />
          </button>
        ) : null}
      </div>

      {!compact ? (
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          <Slider
            value={Math.min(position, seekMax)}
            min={0}
            max={seekMax}
            disabled={!onSeek}
            onChange={(v) => onSeek?.(v)}
          />
          <div className="flex justify-between">
            <span className="text-xs text-muted">{formatTime(position)}</span>
            <span className="text-xs text-muted">{formatTime(total)}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
});
