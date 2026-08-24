import * as React from 'react';
import { cn } from '../primitives/cn';
import { NOTE_NAMES, isBlackKey } from './types';

export type PianoKeysVariant = 'full' | 'compact';

export interface PianoKeysProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onKeyPress'> {
  /** Lowest octave number (default `4`). */
  startOctave?: number;
  /** How many octaves to render (default `1`). Clamped to `>= 1`. */
  octaves?: number;
  /** Note names currently held down, e.g. `['C4','E4','G4']` (playing state). */
  highlightedNotes?: string[];
  /**
   * - `full` — labelled white keys + overlaid black keys (default).
   * - `compact` — shorter keys, no labels.
   */
  variant?: PianoKeysVariant;
  /** Show the note name on each white key (default true in `full`). */
  showLabels?: boolean;
  /** Disable the whole keyboard. */
  disabled?: boolean;
  /** Fires with the note name (e.g. `'C#4'`) when a key is pressed. */
  onKeyPress?: (note: string) => void;
}

/** White-key pitch classes in order, with their chromatic index. */
const WHITE = [0, 2, 4, 5, 7, 9, 11];

/**
 * An on-screen keyboard — one or more octaves of piano keys, a UI shell only
 * (it makes no sound), and the DOM parity of `native/music`'s `PianoKeys`. White
 * keys lay out in a row of real `<button>`s with the black keys overlaid at the
 * correct positions; `highlightedNotes` lights held keys via a tint **and** a
 * filled marker (never color alone) plus `aria-pressed`. Pressing a key fires
 * `onKeyPress(note)` with a name like `'C#4'`. Token-only styling.
 */
export const PianoKeys = React.forwardRef<HTMLDivElement, PianoKeysProps>(function PianoKeys(
  {
    startOctave = 4,
    octaves = 1,
    highlightedNotes,
    variant = 'full',
    showLabels,
    disabled = false,
    onKeyPress,
    className,
    ...rest
  },
  ref
) {
  const count = Math.max(1, Math.trunc(Number.isFinite(octaves) ? octaves : 1));
  const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
  const held = new Set(highlightedNotes ?? []);
  const labels = showLabels ?? variant === 'full';
  const heightClass = variant === 'compact' ? 'h-24' : 'h-[140px]';

  // Flatten white keys across the requested octaves, preserving order.
  const whiteKeys: { note: string; chroma: number; octave: number }[] = [];
  for (let o = 0; o < count; o += 1) {
    WHITE.forEach((chroma) => {
      whiteKeys.push({ note: `${NOTE_NAMES[chroma]}${base + o}`, chroma, octave: base + o });
    });
  }
  const whiteCount = Math.max(1, whiteKeys.length);
  const whiteW = 100 / whiteCount;

  const press = (note: string): void => {
    if (disabled) return;
    onKeyPress?.(note);
  };

  return (
    <div
      ref={ref}
      className={cn('relative flex', heightClass, disabled && 'opacity-50', className)}
      {...rest}
    >
      {/* White keys */}
      {whiteKeys.map((k) => {
        const active = held.has(k.note);
        return (
          <button
            key={k.note}
            type="button"
            disabled={disabled || !onKeyPress}
            aria-pressed={active}
            aria-label={`Key ${k.note}`}
            onClick={() => press(k.note)}
            className={cn(
              'relative flex h-full flex-1 flex-col items-center justify-end pb-[var(--xen-space-xs)]',
              'rounded-b-[var(--xen-radius-sm)] border border-border transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
              active ? 'bg-primary/20' : 'bg-surface hover:bg-primary/10'
            )}
          >
            {active ? (
              <span
                aria-hidden="true"
                className="absolute top-[var(--xen-space-xs)] h-[7px] w-[7px] rounded-full bg-primary"
              />
            ) : null}
            {labels ? <span className="text-xs font-semibold text-muted">{k.note}</span> : null}
          </button>
        );
      })}

      {/* Black keys overlaid at chromatic offsets. */}
      {whiteKeys.map((k, wi) => {
        const nextChroma = (k.chroma + 1) % 12;
        if (!isBlackKey(nextChroma)) return null;
        const note = `${NOTE_NAMES[nextChroma]}${k.octave}`;
        const active = held.has(note);
        const left = (wi + 1) * whiteW - whiteW * 0.3;
        return (
          <button
            key={note}
            type="button"
            disabled={disabled || !onKeyPress}
            aria-pressed={active}
            aria-label={`Key ${note}`}
            onClick={() => press(note)}
            style={{ left: `${left}%`, width: `${whiteW * 0.6}%` }}
            className={cn(
              'absolute top-0 flex h-[62%] flex-col items-center justify-end pb-1',
              'rounded-b-[var(--xen-radius-sm)] transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
              active ? 'bg-primary' : 'bg-on-surface hover:opacity-90'
            )}
          >
            {active ? (
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-on-primary" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
});
