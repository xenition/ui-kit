import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { clamp } from './types';
import type { MetronomeBarProps } from './MetronomeBar';

/** Drop-in for {@link MetronomeBarProps} — same props, the V4 "session" design. */
export type MetronomeBarV4Props = MetronomeBarProps;

/**
 * MetronomeBar — **V4** "session" design (web parity of the native V4). The
 * tactile beat strip: `beatsPerBar` cells sit on a rounded token surface, each
 * ≥44px tall in the `bars` variant / a chunky dot in `dots`. The downbeat
 * (beat 1) is emphasized with an accent ring, and the `currentBeat` lights via
 * a primary fill **and** an inset marker dot (never color alone) — only while
 * `playing`. The optional transport toggle reports through `onToggle`; state is
 * in `aria-pressed`/label. The optional `bpm` shows in bold tabular-nums. No
 * gradient — clean/tactile. All colors from `--xen-*` token classes.
 */
export const MetronomeBarV4 = React.forwardRef<HTMLDivElement, MetronomeBarV4Props>(function MetronomeBarV4(
  { beatsPerBar = 4, currentBeat, playing = false, bpm, variant = 'dots', disabled = false, onToggle, className, ...rest },
  ref
) {
  const beats = clamp(Math.trunc(Number.isFinite(beatsPerBar) ? beatsPerBar : 4), 1, 16);
  const current = currentBeat == null ? 0 : clamp(Math.trunc(currentBeat), 0, beats);
  const isDots = variant === 'dots';

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-sm)]',
        className
      )}
      {...rest}
    >
      {onToggle ? (
        <button
          type="button"
          disabled={disabled}
          aria-pressed={playing}
          aria-label={playing ? 'Stop metronome' : 'Start metronome'}
          onClick={() => onToggle(!playing)}
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
            disabled && 'opacity-50',
            playing ? 'bg-primary' : 'bg-primary/15 hover:bg-primary/25'
          )}
        >
          <Icon glyph={playing ? '⏸' : '▶'} size="sm" color={playing ? 'onPrimary' : 'primary'} />
        </button>
      ) : null}

      <div
        role="img"
        aria-label={current > 0 ? `Beat ${current} of ${beats}${playing ? ', playing' : ''}` : `${beats} beats per bar`}
        className="flex flex-1 items-center justify-center gap-[var(--xen-space-xs)]"
      >
        {Array.from({ length: beats }).map((_, i) => {
          const beat = i + 1;
          const downbeat = beat === 1;
          const lit = playing && beat === current;
          return (
            <span
              key={beat}
              aria-hidden="true"
              className={cn(
                'relative flex items-center justify-center transition-colors',
                isDots ? 'rounded-full' : 'rounded-[var(--xen-radius-sm)]',
                downbeat && 'border-2 border-accent',
                lit ? 'bg-primary shadow-sm' : downbeat ? 'bg-primary/30' : 'bg-border'
              )}
              style={{
                width: isDots ? (lit ? 22 : downbeat ? 18 : 14) : lit ? 16 : 12,
                height: isDots ? (lit ? 22 : downbeat ? 18 : 14) : 44,
              }}
            >
              {/* Inset marker dot on the lit beat — a shape cue, never color alone. */}
              {lit ? <span className="h-1.5 w-1.5 rounded-full bg-on-primary" /> : null}
            </span>
          );
        })}
      </div>

      {bpm != null ? (
        <span className="text-xs font-bold tabular-nums text-muted">{Math.round(bpm)} BPM</span>
      ) : null}
    </div>
  );
});
