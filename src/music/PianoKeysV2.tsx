import * as React from 'react';
import { cn } from '../primitives/cn';
import { NOTE_NAMES, isBlackKey } from './types';
import type { PianoKeysProps } from './PianoKeys';

/** Same public contract as {@link PianoKeys} — a drop-in alternate design. */
export type PianoKeysV2Props = PianoKeysProps;

const WHITE = [0, 2, 4, 5, 7, 9, 11];

/**
 * PianoKeys, redesigned (v2): a **chunky rounded keyboard**. Taller white keys
 * with a small gap and fully rounded bottoms; held keys fill solid primary (with
 * an on-primary label) rather than a soft tint. Black keys are rounded caps. A
 * bolder, tactile skin vs. v1's flat keys. Same props, token-only.
 */
export const PianoKeysV2 = React.forwardRef<HTMLDivElement, PianoKeysV2Props>(function PianoKeysV2(
  { startOctave = 4, octaves = 1, highlightedNotes, variant = 'full', showLabels, disabled = false, onKeyPress, className, ...rest },
  ref
) {
  const count = Math.max(1, Math.trunc(Number.isFinite(octaves) ? octaves : 1));
  const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
  const held = new Set(highlightedNotes ?? []);
  const labels = showLabels ?? variant === 'full';

  const whiteKeys: { note: string; chroma: number; octave: number }[] = [];
  for (let o = 0; o < count; o += 1) {
    WHITE.forEach((chroma) => {
      whiteKeys.push({ note: `${NOTE_NAMES[chroma]}${base + o}`, chroma, octave: base + o });
    });
  }
  const whiteCount = Math.max(1, whiteKeys.length);
  const whiteW = 100 / whiteCount;

  const press = (note: string): void => {
    if (!disabled) onKeyPress?.(note);
  };

  return (
    <div
      ref={ref}
      className={cn('relative flex h-[152px] gap-1', disabled && 'opacity-50', className)}
      {...rest}
    >
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
              'relative flex h-full flex-1 flex-col items-center justify-end rounded-b-lg pb-2 shadow-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
              active ? 'bg-primary text-on-primary' : 'bg-surface text-muted hover:bg-primary/10'
            )}
          >
            {labels ? <span className="text-xs font-bold">{k.note}</span> : null}
          </button>
        );
      })}

      {whiteKeys.map((k, wi) => {
        const nextChroma = (k.chroma + 1) % 12;
        if (!isBlackKey(nextChroma)) return null;
        const note = `${NOTE_NAMES[nextChroma]}${k.octave}`;
        const active = held.has(note);
        const left = (wi + 1) * whiteW - whiteW * 0.28;
        return (
          <button
            key={note}
            type="button"
            disabled={disabled || !onKeyPress}
            aria-pressed={active}
            aria-label={`Key ${note}`}
            onClick={() => press(note)}
            style={{ left: `${left}%`, width: `${whiteW * 0.56}%` }}
            className={cn(
              'absolute top-0 flex h-[60%] items-end justify-center rounded-b-lg pb-1 shadow-md transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
              active ? 'bg-primary' : 'bg-on-surface hover:opacity-90'
            )}
          >
            {active ? <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-on-primary" /> : null}
          </button>
        );
      })}
    </div>
  );
});
