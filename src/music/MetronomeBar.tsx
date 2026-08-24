import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { clamp } from './types';

export type MetronomeBarVariant = 'dots' | 'bars';

export interface MetronomeBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Beats per bar (default `4`). Clamped to `1`…`16`. */
  beatsPerBar?: number;
  /** The currently sounding beat (1-based); `0`/undefined = none lit. */
  currentBeat?: number;
  /** Whether the transport is running. */
  playing?: boolean;
  /** Optional tempo shown alongside, in BPM. */
  bpm?: number;
  /**
   * - `dots` — a row of beat dots (default).
   * - `bars` — a row of taller bars.
   */
  variant?: MetronomeBarVariant;
  /** Disable the transport toggle. */
  disabled?: boolean;
  /** Fires with the next playing state when the transport toggle is pressed. */
  onToggle?: (playing: boolean) => void;
}

/**
 * A metronome / beat indicator — a UI shell only, it keeps no clock, and the
 * DOM parity of `native/music`'s `MetronomeBar`. Renders `beatsPerBar` beat
 * markers with the downbeat (beat 1) emphasized in size and ring, and lights
 * `currentBeat` via fill **and** scale (never color alone). The optional
 * transport toggle reports through `onToggle`; its state is in the button's
 * `aria-pressed`/label. Token-only styling.
 */
export const MetronomeBar = React.forwardRef<HTMLDivElement, MetronomeBarProps>(
  function MetronomeBar(
    { beatsPerBar = 4, currentBeat, playing = false, bpm, variant = 'dots', disabled = false, onToggle, className, ...rest },
    ref
  ) {
    const beats = clamp(Math.trunc(Number.isFinite(beatsPerBar) ? beatsPerBar : 4), 1, 16);
    const current = currentBeat == null ? 0 : clamp(Math.trunc(currentBeat), 0, beats);
    const isDots = variant === 'dots';

    return (
      <div ref={ref} className={cn('flex items-center gap-[var(--xen-space-sm)]', className)} {...rest}>
        {onToggle ? (
          <button
            type="button"
            disabled={disabled}
            aria-pressed={playing}
            aria-label={playing ? 'Stop metronome' : 'Start metronome'}
            onClick={() => onToggle(!playing)}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
              disabled && 'opacity-50',
              playing ? 'bg-primary' : 'bg-primary/10 hover:bg-primary/20'
            )}
          >
            <Icon glyph={playing ? '⏸' : '▶'} size="sm" color={playing ? 'onPrimary' : 'primary'} />
          </button>
        ) : null}

        <div
          role="img"
          aria-label={
            current > 0 ? `Beat ${current} of ${beats}${playing ? ', playing' : ''}` : `${beats} beats per bar`
          }
          className="flex flex-1 items-center gap-[var(--xen-space-xs)]"
        >
          {Array.from({ length: beats }).map((_, i) => {
            const beat = i + 1;
            const downbeat = beat === 1;
            const lit = playing && beat === current;
            const base = isDots ? 10 : 14;
            const size = lit ? base + 6 : downbeat ? base + 2 : base;
            return (
              <span
                key={beat}
                aria-hidden="true"
                className={cn(
                  isDots ? 'rounded-full' : 'rounded-[var(--xen-radius-sm)]',
                  downbeat && 'border-2 border-accent',
                  lit ? 'bg-primary' : downbeat ? 'bg-primary/30' : 'bg-border'
                )}
                style={{
                  width: isDots ? size : Math.max(6, size - 6),
                  height: isDots ? size : size + 8,
                }}
              />
            );
          })}
        </div>

        {bpm != null ? (
          <span className="text-xs font-bold text-muted">{Math.round(bpm)} BPM</span>
        ) : null}
      </div>
    );
  }
);
