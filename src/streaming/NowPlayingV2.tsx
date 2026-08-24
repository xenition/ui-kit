import * as React from 'react';
import { cn } from '../primitives/cn';
import { Slider, Spinner } from '../primitives';
import type { NowPlayingProps } from './NowPlaying';

/** Same public contract as {@link NowPlaying} — a drop-in alternate design. */
export type NowPlayingV2Props = NowPlayingProps;

function fmt(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

/**
 * NowPlaying, redesigned (v2): a **big hero player**. Large square artwork over
 * centered title/artist/album, a full-width scrubber with time labels, and a
 * prev/play/next transport row with an optional cast — the immersive layout. Same
 * props, token-only.
 */
export const NowPlayingV2 = React.forwardRef<HTMLDivElement, NowPlayingV2Props>(function NowPlayingV2(
  { track, state = 'paused', position = 0, duration, peaks, variant, onPlayToggle, onSeek, onPrev, onNext, onCast, casting = false, className, ...rest },
  ref
) {
  void variant;
  void peaks;
  const playing = state === 'playing';
  const buffering = state === 'buffering';
  const total = duration ?? track.duration ?? 0;

  return (
    <div ref={ref} data-xen-now-playing="" className={cn('flex flex-col items-center gap-4 p-md', className)} {...rest}>
      <div className="aspect-square w-full max-w-xs overflow-hidden rounded-lg bg-neutral-100 shadow-md">
        {track.artworkUrl ? <img src={track.artworkUrl} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-5xl">🎵</div>}
      </div>
      <div className="text-center">
        <p className="text-lg font-bold text-on-surface">{track.title}</p>
        {track.artist ? <p className="text-sm text-muted">{track.artist}</p> : null}
        {track.album ? <p className="text-xs text-muted">{track.album}</p> : null}
      </div>
      <div className="w-full">
        <Slider value={position} min={0} max={total || 1} onChange={(v) => onSeek?.(v)} />
        <div className="mt-1 flex justify-between text-xs tabular-nums text-muted">
          <span>{fmt(position)}</span>
          <span>{fmt(total)}</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        {onPrev ? <button type="button" aria-label="Previous" onClick={onPrev} className="text-2xl text-on-surface">⏮</button> : null}
        <button
          type="button"
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={() => onPlayToggle?.(!playing)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg text-on-primary"
        >
          {buffering ? <Spinner size="sm" /> : playing ? '❚❚' : '▶'}
        </button>
        {onNext ? <button type="button" aria-label="Next" onClick={onNext} className="text-2xl text-on-surface">⏭</button> : null}
      </div>
      {onCast ? (
        <button type="button" aria-label="Cast" aria-pressed={casting} onClick={onCast} className={cn('text-sm', casting ? 'text-primary' : 'text-muted')}>
          📺 {casting ? 'Casting' : 'Cast'}
        </button>
      ) : null}
    </div>
  );
});
