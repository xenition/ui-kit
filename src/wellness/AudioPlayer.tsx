import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { GlassPanel } from '../primitives';

export type AudioPlayerVariant = 'bar' | 'full';

export interface AudioPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Track title (session name). */
  title: string;
  /** Secondary line — teacher, category, or narrator. */
  subtitle?: string;
  /** Leading glyph shown on the gradient cover. Default `'🎧'`. */
  coverGlyph?: string;
  /** Playing vs paused (controlled). */
  isPlaying?: boolean;
  /** Elapsed position, in seconds. */
  position?: number;
  /** Total duration, in seconds. */
  duration?: number;
  /** Compact `bar` (default) or the full `full` player. */
  variant?: AudioPlayerVariant;
  onPlayPause?: () => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  className?: string;
}

function fmt(sec?: number): string {
  if (sec == null || !Number.isFinite(sec) || sec < 0) return '0:00';
  const s = Math.floor(sec);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r < 10 ? '0' : ''}${r}`;
}

/**
 * AudioPlayer (web parity) — a frosted "glass" transport for a
 * meditation/soundscape track. A `GlassPanel` ground carries a gradient cover
 * tile, the title/teacher, a progress track (`bg-neutral-200` track with a
 * `bg-primary` fill via inline width %), and a gradient play/pause button.
 * `variant='full'` expands to a large cover with skip controls. Only the cover
 * and the play button are colored; everything else stays calm on the glass, on
 * tokens.
 */
export const AudioPlayer = React.forwardRef<HTMLDivElement, AudioPlayerProps>(function AudioPlayer(
  {
    title,
    subtitle,
    coverGlyph = '🎧',
    isPlaying = false,
    position = 0,
    duration = 0,
    variant = 'bar',
    onPlayPause,
    onSkipBack,
    onSkipForward,
    className,
    ...rest
  },
  ref
) {
  const pct = duration > 0 ? Math.max(0, Math.min(1, position / duration)) : 0;
  const a11y = `${title}${subtitle ? ', ' + subtitle : ''}, ${isPlaying ? 'playing' : 'paused'}`;

  const Track = (
    <div className="flex flex-col gap-[var(--xen-space-xs)]">
      <div className="h-1 rounded-full bg-neutral-200">
        <div className="h-1 rounded-full bg-primary" style={{ width: `${pct * 100}%` }} />
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-muted">{fmt(position)}</span>
        <span className="text-xs text-muted">{fmt(duration)}</span>
      </div>
    </div>
  );

  const PlayButton = ({ size }: { size: number }) => (
    <button
      type="button"
      aria-label={isPlaying ? 'Pause' : 'Play'}
      onClick={onPlayPause}
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
      style={{ width: size, height: size }}
    >
      <Icon glyph={isPlaying ? '⏸' : '▶'} size={Math.round(size * 0.42)} color="onPrimary" />
    </button>
  );

  const Cover = ({ dim }: { dim: number }) => (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700"
      style={{ width: dim, height: dim }}
    >
      <Icon glyph={coverGlyph} size={Math.round(dim * 0.42)} color="onPrimary" />
    </div>
  );

  if (variant === 'full') {
    return (
      <GlassPanel
        ref={ref}
        intensity="regular"
        role="group"
        aria-label={a11y}
        data-xen-audio-player=""
        className={cn(
          'flex flex-col items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
          className
        )}
        {...rest}
      >
        <Cover dim={168} />
        <div className="flex flex-col items-center gap-0.5">
          <p className="text-lg font-extrabold text-on-surface">{title}</p>
          {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
        </div>
        <div className="self-stretch">{Track}</div>
        <div className="flex items-center gap-[var(--xen-space-xl)]">
          <button type="button" aria-label="Skip back" onClick={onSkipBack}>
            <Icon glyph="⏮" size="xl" color="onSurface" />
          </button>
          <PlayButton size={72} />
          <button type="button" aria-label="Skip forward" onClick={onSkipForward}>
            <Icon glyph="⏭" size="xl" color="onSurface" />
          </button>
        </div>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel
      ref={ref}
      intensity="regular"
      role="group"
      aria-label={a11y}
      data-xen-audio-player=""
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] p-[var(--xen-space-md)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <Cover dim={52} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-on-surface">{title}</p>
          {subtitle ? <p className="truncate text-xs text-muted">{subtitle}</p> : null}
        </div>
        <PlayButton size={44} />
      </div>
      {Track}
    </GlassPanel>
  );
});
