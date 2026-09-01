import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Slider } from '../primitives';
import { MediaFigure } from '../media';
import type { MediaItem } from '../media';
import { WaveformScrubber } from './WaveformScrubber';
import { CastButton } from './CastButton';
import { clamp01, formatTime } from './types';
import type { NowPlayingProps } from './NowPlaying';

/** Drop-in for {@link NowPlayingProps} — same props, the V4 "spotlight" design. */
export type NowPlayingV4Props = NowPlayingProps;

/**
 * NowPlaying — **V4** "spotlight" design (web parity of the native V4). The
 * artwork-forward take on the now-playing surface: the hero cover sits on a
 * brand-gradient glow backdrop (the signature immersive touch), with a big round
 * primary play control framed by prev/next. Same scrubber (linear `Slider`, or a
 * {@link WaveformScrubber} when `peaks` are given), time labels, and optional
 * cast button. Same props/behavior as {@link NowPlayingProps}; all colors from
 * `--xen-*` token classes (no literal hex). `variant="compact"` tightens it.
 */
export const NowPlayingV4 = React.forwardRef<HTMLDivElement, NowPlayingV4Props>(function NowPlayingV4(
  { track, state = 'paused', position = 0, duration, peaks, variant = 'full', onPlayToggle, onSeek, onPrev, onNext, onCast, casting, style },
  ref
) {
  const isPlaying = state === 'playing';
  const total = duration ?? track.duration;
  const seekMax = total && total > 0 ? total : 1;
  const frac = clamp01(seekMax > 0 ? position / seekMax : 0);
  const compact = variant === 'compact';

  const artItem: MediaItem = {
    url: track.artworkUrl ?? '',
    alt: track.album ? `${track.title} — ${track.album}` : track.title,
    width: 1,
    height: 1,
  };

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        'flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-lg',
        compact ? 'gap-[var(--xen-space-md)] p-[var(--xen-space-md)]' : 'gap-[var(--xen-space-xl)] p-[var(--xen-space-lg)]'
      )}
    >
      {/* Hero artwork on a gradient glow backdrop — the V4 spotlight signature. */}
      <div
        className={cn(
          'mx-auto overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600',
          compact ? 'w-[68%] p-[var(--xen-space-md)]' : 'w-[88%] p-[var(--xen-space-lg)]'
        )}
      >
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
      <div className="flex flex-col gap-[var(--xen-space-xs)]">
        <span className="text-xl font-extrabold text-on-surface">{track.title}</span>
        {track.artist ? <span className="text-base text-muted">{track.artist}</span> : null}
      </div>

      {/* Scrubber + time labels. */}
      <div className="flex flex-col gap-[var(--xen-space-xs)]">
        {peaks ? (
          <WaveformScrubber peaks={peaks} progress={frac} onSeek={onSeek ? (f) => onSeek(f * seekMax) : undefined} />
        ) : (
          <Slider value={Math.min(position, seekMax)} min={0} max={seekMax} disabled={!onSeek} onChange={(v) => onSeek?.(v)} />
        )}
        <div className="flex justify-between">
          <span className="text-xs text-muted">{formatTime(position)}</span>
          <span className="text-xs text-muted">{formatTime(total)}</span>
        </div>
      </div>

      {/* Transport. */}
      <div className="flex items-center justify-center gap-[var(--xen-space-xl)]">
        <button
          type="button"
          aria-label="Previous"
          disabled={!onPrev}
          onClick={onPrev}
          className="inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none disabled:opacity-40"
        >
          <Icon glyph="⏮" size="2xl" color="onSurface" />
        </button>

        <button
          type="button"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          aria-pressed={isPlaying}
          disabled={!onPlayToggle}
          onClick={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
          className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary text-on-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:opacity-50"
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="2xl" color="onPrimary" />
        </button>

        <button
          type="button"
          aria-label="Next"
          disabled={!onNext}
          onClick={onNext}
          className="inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none disabled:opacity-40"
        >
          <Icon glyph="⏭" size="2xl" color="onSurface" />
        </button>
      </div>

      {onCast ? (
        <div className="flex justify-center">
          <CastButton variant="labeled" connected={casting} onClick={onCast} />
        </div>
      ) : null}
    </div>
  );
});
