import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Slider } from '../primitives';
import { MediaFigure } from '../media';
import type { MediaItem } from '../media';
import { WaveformScrubber } from './WaveformScrubber';
import { CastButton } from './CastButton';
import { clamp01, formatTime } from './types';
import type { MediaTrack, PlaybackState } from './types';

/**
 * Props for {@link FullScreenPlayer} — the immersive, full-screen now-playing
 * surface (web). A presentational shell only: it takes shaped track data plus
 * transport callbacks and never touches a playback engine. Position/duration
 * are passed in; seek/toggle intents come back out.
 */
export interface FullScreenPlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSeek'> {
  /** The track on the deck (title, artist, artwork, optional duration). */
  track: MediaTrack;
  /** Transport state reflected in the play control + its a11y label. */
  state?: PlaybackState;
  /** Current playback position in **seconds**. */
  position?: number;
  /** Total length in **seconds**; falls back to `track.duration`. */
  duration?: number;
  /** Precomputed waveform amplitudes in `[0, 1]`; renders a {@link WaveformScrubber} instead of a linear slider. */
  peaks?: number[];
  /** Fires with the desired play state when the big play/pause control is pressed. */
  onPlayToggle?: (playing: boolean) => void;
  /** Fires with the new position in **seconds** when the scrubber is moved. */
  onSeek?: (seconds: number) => void;
  /** Fires when the previous-track control is pressed. */
  onPrev?: () => void;
  /** Fires when the next-track control is pressed. */
  onNext?: () => void;
  /** Fires when the close/dismiss control is pressed; hidden when unset. */
  onClose?: () => void;
  /** Whether the track is favorited (controlled); tints the favorite tile. */
  favorite?: boolean;
  /** Fires with the desired favorite state when the favorite tile is pressed; hidden when unset. */
  onFavorite?: (favorite: boolean) => void;
  /** Fires when the queue tile is pressed; hidden when unset. */
  onQueue?: () => void;
  /** Fires when the cast tile is pressed; hidden when unset. */
  onCast?: () => void;
  /** Whether a cast target is currently connected (controlled). */
  casting?: boolean;
}

/**
 * FullScreenPlayer — the **V4 "spotlight"** peak moment (web). The immersive,
 * artwork-forward full-screen now-playing surface: a full brand-gradient ground
 * (`from-primary-500 to-primary-700`), a big centered cover in a frosted frame,
 * title/artist in near-white ink, an on-gradient scrubber (linear `Slider`, or a
 * {@link WaveformScrubber} when `peaks` are given), a large near-white round play
 * control framed by prev/next, and secondary glassy tiles (favorite / queue /
 * cast). All colors derive from the brand ramp via `--xen-*` classes + gradient
 * utilities — no literal hex; dark-mode safe.
 */
export const FullScreenPlayer = React.forwardRef<HTMLDivElement, FullScreenPlayerProps>(
  function FullScreenPlayer(
    {
      track,
      state = 'paused',
      position = 0,
      duration,
      peaks,
      onPlayToggle,
      onSeek,
      onPrev,
      onNext,
      onClose,
      favorite,
      onFavorite,
      onQueue,
      onCast,
      casting,
      className,
      ...rest
    },
    ref
  ) {
    const isPlaying = state === 'playing';
    const total = duration ?? track.duration;
    const seekMax = total && total > 0 ? total : 1;
    const frac = clamp01(seekMax > 0 ? position / seekMax : 0);

    const artItem: MediaItem = {
      url: track.artworkUrl ?? '',
      alt: track.album ? `${track.title} — ${track.album}` : track.title,
      width: 1,
      height: 1,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)] gap-[var(--xen-space-xl)]',
          className
        )}
        {...rest}
      >
        {/* Top bar: close + now-playing context. */}
        <div className="flex items-center justify-between gap-[var(--xen-space-md)]">
          {onClose ? (
            <button
              type="button"
              aria-label="Close player"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50/15 border border-primary-50/30 text-primary-50 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
            >
              <Icon glyph="⌄" size="lg" color="onPrimary" />
            </button>
          ) : (
            <span className="h-11 w-11" aria-hidden />
          )}
          <span className="min-w-0 flex-1 truncate text-center text-xs font-semibold uppercase tracking-wide text-primary-100">
            {track.album ?? 'Now playing'}
          </span>
          <span className="h-11 w-11" aria-hidden />
        </div>

        {/* Hero artwork in a frosted frame — the spotlight centerpiece. */}
        <div className="mx-auto w-[80%] overflow-hidden rounded-[var(--xen-radius-lg)] bg-primary-50/15 border border-primary-50/30 p-[var(--xen-space-md)]">
          {track.artworkUrl ? (
            <div className="overflow-hidden rounded-[var(--xen-radius-md)]">
              <MediaFigure item={artItem} reserveAspect />
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center">
              <Icon glyph="♪" size="3xl" color="onPrimary" />
            </div>
          )}
        </div>

        {/* Title + artist. */}
        <div className="flex flex-col gap-[var(--xen-space-xs)] text-center">
          <span className="truncate text-2xl font-extrabold text-primary-50">{track.title}</span>
          {track.artist ? (
            <span className="truncate text-base text-primary-100">{track.artist}</span>
          ) : null}
        </div>

        {/* Scrubber + time labels on the gradient. */}
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          {peaks ? (
            <WaveformScrubber
              peaks={peaks}
              progress={frac}
              onSeek={onSeek ? (f) => onSeek(f * seekMax) : undefined}
            />
          ) : (
            <div className="rounded-full bg-primary-50/15 px-[var(--xen-space-xs)]">
              <Slider
                value={Math.min(position, seekMax)}
                min={0}
                max={seekMax}
                disabled={!onSeek}
                onChange={(v) => onSeek?.(v)}
              />
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-xs text-primary-100">{formatTime(position)}</span>
            <span className="text-xs text-primary-100">{formatTime(total)}</span>
          </div>
        </div>

        {/* Transport: prev · big play · next. */}
        <div className="flex items-center justify-center gap-[var(--xen-space-xl)]">
          <button
            type="button"
            aria-label="Previous"
            disabled={!onPrev}
            onClick={onPrev}
            className="inline-flex text-primary-50 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 disabled:pointer-events-none disabled:opacity-40"
          >
            <Icon glyph="⏮" size="2xl" color="onPrimary" />
          </button>

          <button
            type="button"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            aria-pressed={isPlaying}
            disabled={!onPlayToggle}
            onClick={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
            className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-on-primary text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 disabled:opacity-50"
          >
            <Icon glyph={isPlaying ? '❙❙' : '▶'} size="2xl" color="primary" />
          </button>

          <button
            type="button"
            aria-label="Next"
            disabled={!onNext}
            onClick={onNext}
            className="inline-flex text-primary-50 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 disabled:pointer-events-none disabled:opacity-40"
          >
            <Icon glyph="⏭" size="2xl" color="onPrimary" />
          </button>
        </div>

        {/* Secondary glassy controls: favorite · queue · cast. */}
        {onFavorite || onQueue || onCast ? (
          <div className="flex items-center justify-center gap-[var(--xen-space-md)]">
            {onFavorite ? (
              <button
                type="button"
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                aria-pressed={!!favorite}
                onClick={() => onFavorite(!favorite)}
                className={cn(
                  'flex h-11 min-w-11 items-center justify-center rounded-full border border-primary-50/30 px-[var(--xen-space-md)] text-primary-50 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100',
                  favorite ? 'bg-primary-50/30' : 'bg-primary-50/15'
                )}
              >
                <Icon glyph={favorite ? '♥' : '♡'} size="lg" color="onPrimary" />
              </button>
            ) : null}
            {onQueue ? (
              <button
                type="button"
                aria-label="Open queue"
                onClick={onQueue}
                className="flex h-11 min-w-11 items-center justify-center rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] text-primary-50 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
              >
                <Icon glyph="☰" size="lg" color="onPrimary" />
              </button>
            ) : null}
            {onCast ? (
              <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)]">
                <CastButton connected={casting} onClick={onCast} />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
