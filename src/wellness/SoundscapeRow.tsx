import * as React from 'react';
import { cn } from '../primitives/cn';
import { Slider } from '../primitives';
import { CARD_SHELL, SLOT_BG, SLOT_BORDER, SLOT_ON, SLOT_TEXT, SLOT_TINT, type WellnessSlot } from './_tokens';

export type Soundscape =
  | 'rain'
  | 'ocean'
  | 'forest'
  | 'fire'
  | 'wind'
  | 'stream'
  | 'thunder'
  | 'white-noise';

interface SoundMeta {
  glyph: string;
  label: string;
  color: WellnessSlot;
}

const SOUND_META: Record<Soundscape, SoundMeta> = {
  rain: { glyph: '🌧️', label: 'Rain', color: 'primary' },
  ocean: { glyph: '🌊', label: 'Ocean', color: 'primary' },
  forest: { glyph: '🌲', label: 'Forest', color: 'success' },
  fire: { glyph: '🔥', label: 'Fireplace', color: 'danger' },
  wind: { glyph: '🍃', label: 'Wind', color: 'accent' },
  stream: { glyph: '🏞️', label: 'Stream', color: 'success' },
  thunder: { glyph: '⛈️', label: 'Thunder', color: 'accent' },
  'white-noise': { glyph: '📻', label: 'White noise', color: 'muted' },
};

export interface SoundscapeRowProps {
  /** Which soundscape — drives the icon, label, and accent tone. */
  variant: Soundscape;
  /** Override the default display name. */
  name?: string;
  /** Whether this soundscape is playing. */
  playing?: boolean;
  /** Volume 0–1; shows a slider when `onVolumeChange` is provided. */
  volume?: number;
  /** Fires when the play toggle is tapped, with the next playing state. */
  onToggle?: (next: boolean) => void;
  /** Fires as the volume slider moves. */
  onVolumeChange?: (volume: number) => void;
  className?: string;
}

/**
 * A soundscape mixer row (web parity of the native block): icon + name, a round
 * play / pause toggle rendered as a real `<button>`, and an optional volume
 * slider that appears only while playing. `playing` fills the toggle, tints the
 * card border, and updates `aria-pressed` + the label (state, not color alone).
 * Token-only colors.
 */
export const SoundscapeRow = React.forwardRef<HTMLDivElement, SoundscapeRowProps>(function SoundscapeRow(
  { variant, name, playing = false, volume = 0.5, onToggle, onVolumeChange, className },
  ref
) {
  const meta = SOUND_META[variant] ?? SOUND_META.rain;
  const displayName = name ?? meta.label;

  return (
    <div
      ref={ref}
      data-xen-soundscape-row=""
      className={cn(
        'bg-surface text-on-surface border rounded-[var(--xen-radius-lg)] p-[var(--xen-space-md)]',
        'flex flex-col gap-[var(--xen-space-sm)]',
        playing ? SLOT_BORDER[meta.color] : 'border-border',
        className
      )}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <div
          aria-hidden="true"
          className={cn('flex h-10 w-10 items-center justify-center rounded-full text-lg', SLOT_TINT[meta.color])}
        >
          {meta.glyph}
        </div>
        <span className="flex-1 text-base font-semibold text-on-surface">{displayName}</span>
        <button
          type="button"
          aria-pressed={playing}
          aria-label={`${playing ? 'Stop' : 'Play'} ${displayName}`}
          onClick={() => onToggle?.(!playing)}
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base transition-opacity',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            playing ? cn(SLOT_BG[meta.color], SLOT_ON[meta.color]) : cn(SLOT_TINT[meta.color], SLOT_TEXT[meta.color])
          )}
        >
          {playing ? '⏸' : '▶'}
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
