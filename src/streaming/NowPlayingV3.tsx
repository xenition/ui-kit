import * as React from 'react';
import { cn } from '../primitives/cn';
import { Slider, Spinner } from '../primitives';
import type { NowPlayingProps } from './NowPlaying';

/** Same public contract as {@link NowPlaying} — a drop-in alternate design. */
export type NowPlayingV3Props = NowPlayingProps;

function fmt(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

/**
 * NowPlaying, redesigned (v3): a **compact bar player**. Small artwork left, the
 * title/artist and an inline scrubber stacked in the middle, and a single play
 * control on the right — a lean player for a sidebar. The opposite of v2's hero.
 * Same props, token-only.
 */
export const NowPlayingV3 = React.forwardRef<HTMLDivElement, NowPlayingV3Props>(function NowPlayingV3(
  { track, state = 'paused', position = 0, duration, peaks, variant, onPlayToggle, onSeek, onPrev, onNext, onCast, casting, className, ...rest },
  ref
) {
  void variant;
  void peaks;
  void onPrev;
  void onNext;
  void onCast;
  void casting;
  const playing = state === 'playing';
  const buffering = state === 'buffering';
  const total = duration ?? track.duration ?? 0;

  return (
    <div ref={ref} data-xen-now-playing="" className={cn('flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm', className)} {...rest}>
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl">
        {track.artworkUrl ? <img src={track.artworkUrl} alt="" className="h-full w-full object-cover" /> : '🎵'}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{track.title}</p>
        {track.artist ? <p className="truncate text-xs text-muted">{track.artist}</p> : null}
        <div className="mt-1 flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <Slider value={position} min={0} max={total || 1} onChange={(v) => onSeek?.(v)} />
          </div>
          <span className="shrink-0 text-[10px] tabular-nums text-muted">{fmt(position)}</span>
        </div>
      </div>
      <button
        type="button"
        aria-label={playing ? 'Pause' : 'Play'}
        onClick={() => onPlayToggle?.(!playing)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary"
      >
        {buffering ? <Spinner size="sm" /> : playing ? '❚❚' : '▶'}
      </button>
    </div>
  );
});
