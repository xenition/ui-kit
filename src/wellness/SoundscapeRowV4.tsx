import * as React from 'react';
import { cn } from '../primitives/cn';
import { Slider } from '../primitives';
import { Icon } from '../primitives/Icon';
import { type SoundscapeRowProps } from './SoundscapeRow';

export type SoundscapeRowV4Props = SoundscapeRowProps;

type Soundscape = SoundscapeRowProps['variant'];

interface SoundMeta {
  glyph: string;
  label: string;
}

const SOUND_META: Record<Soundscape, SoundMeta> = {
  rain: { glyph: '🌧️', label: 'Rain' },
  ocean: { glyph: '🌊', label: 'Ocean' },
  forest: { glyph: '🌲', label: 'Forest' },
  fire: { glyph: '🔥', label: 'Fireplace' },
  wind: { glyph: '🍃', label: 'Wind' },
  stream: { glyph: '🏞️', label: 'Stream' },
  thunder: { glyph: '⛈️', label: 'Thunder' },
  'white-noise': { glyph: '📻', label: 'White noise' },
};

/**
 * SoundscapeRowV4 — the calm redesign of {@link SoundscapeRow}. Same props,
 * defaults, toggle a11y state/label, and volume slider (shown only while playing
 * with `onVolumeChange`). Only the visuals change: a clean row with a gradient
 * icon badge and a round gradient play/pause toggle as the calm accents.
 */
export const SoundscapeRowV4 = React.forwardRef<HTMLDivElement, SoundscapeRowV4Props>(function SoundscapeRowV4(
  { variant, name, playing = false, volume = 0.5, onToggle, onVolumeChange, className, ...rest },
  ref
) {
  const meta = SOUND_META[variant] ?? SOUND_META.rain;
  const displayName = name ?? meta.label;

  return (
    <div
      ref={ref}
      data-xen-soundscape-row=""
      className={cn(
        'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5',
        'flex flex-col gap-[var(--xen-space-sm)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700"
        >
          <Icon glyph={meta.glyph} size="lg" color="onPrimary" />
        </div>
        <span className="flex-1 text-base font-semibold text-on-surface">{displayName}</span>
        <button
          type="button"
          aria-pressed={playing}
          aria-label={`${playing ? 'Stop' : 'Play'} ${displayName}`}
          onClick={() => onToggle?.(!playing)}
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 transition-opacity',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          )}
        >
          <Icon glyph={playing ? '⏸' : '▶'} size="base" color="onPrimary" />
        </button>
      </div>

      {playing && onVolumeChange ? (
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <span aria-hidden="true" className="text-sm">
            🔉
          </span>
          <div className="flex-1">
            <Slider value={volume} min={0} max={1} step={0.05} onChange={onVolumeChange} />
          </div>
        </div>
      ) : null}
    </div>
  );
});
