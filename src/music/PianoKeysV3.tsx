import * as React from 'react';
import { cn } from '../primitives/cn';
import { NOTE_NAMES, isBlackKey } from './types';
import type { PianoKeysProps } from './PianoKeys';

/** Same public contract as {@link PianoKeys} — a drop-in alternate design. */
export type PianoKeysV3Props = PianoKeysProps;

const WHITE = [0, 2, 4, 5, 7, 9, 11];

/**
 * PianoKeys, redesigned (v3): a **mini keyboard strip**. Very short, label-less
 * keys for a tight inline control; held keys light with an accent fill + a marker
 * dot (never color alone). The opposite of v2's chunky keyboard. `showLabels`
 * still honored if explicitly set. Same props, token-only.
 */
export const PianoKeysV3 = React.forwardRef<HTMLDivElement, PianoKeysV3Props>(function PianoKeysV3(
  { startOctave = 4, octaves = 1, highlightedNotes, variant, showLabels = false, disabled = false, onKeyPress, className, ...rest },
  ref
) {
  void variant;
  const count = Math.max(1, Math.trunc(Number.isFinite(octaves) ? octaves : 1));
  const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
  const held = new Set(highlightedNotes ?? []);

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
    <div ref={ref} className={cn('relative flex h-16', disabled && 'opacity-50', className)} {...rest}>
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
              'relative flex h-full flex-1 items-end justify-center border-r border-border pb-0.5 transition-colors last:border-r-0',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
              active ? 'bg-accent/30' : 'bg-surface hover:bg-accent/10'
            )}
          >
            {active ? <span aria-hidden className="mb-0.5 h-1 w-1 rounded-full bg-accent" /> : null}
            {showLabels ? <span className="text-[10px] text-muted">{k.note}</span> : null}
          </button>
        );
      })}

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
              'absolute top-0 h-[58%] rounded-b-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent',
              active ? 'bg-accent' : 'bg-on-surface hover:opacity-90'
            )}
          />
        );
      })}
    </div>
  );
});
