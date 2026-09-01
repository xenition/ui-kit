import * as React from 'react';
import { cn } from '../primitives/cn';
import { NOTE_NAMES, isBlackKey } from './types';
import type { PianoKeysProps } from './PianoKeys';

/** Drop-in for {@link PianoKeysProps} — same props, the V4 "session" design. */
export type PianoKeysV4Props = PianoKeysProps;

/** White-key pitch classes in order, with their chromatic index. */
const WHITE = [0, 2, 4, 5, 7, 9, 11];

/**
 * PianoKeys — **V4** "session" design (web parity of the native V4). The tactile
 * take on an on-screen keyboard: white keys read as satisfying `bg-surface`
 * controls with a rounded token base, black keys sit on a token-dark
 * (`bg-on-surface`) fill, and a held key lights with a soft-primary tint **plus**
 * a filled marker dot (never color alone) and `aria-pressed`. No gradient —
 * performance surfaces stay clean and tactile. Honors both `variant`s (`full` /
 * `compact`), the `showLabels`, `disabled`, black-vs-white layout and
 * `onKeyPress(note)` behavior identical to {@link PianoKeysProps}. All colors
 * from `--xen-*` token classes (no literals).
 */
export const PianoKeysV4 = React.forwardRef<HTMLDivElement, PianoKeysV4Props>(function PianoKeysV4(
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
      className={cn(
        'relative flex gap-px rounded-[var(--xen-radius-md)] bg-border p-1',
        heightClass,
        disabled && 'opacity-50',
        className
      )}
      {...rest}
    >
      {/* White keys — tactile token tiles. */}
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
              'relative flex h-full flex-1 flex-col items-center justify-end pb-[var(--xen-space-sm)]',
              'rounded-b-[var(--xen-radius-md)] rounded-t-[var(--xen-radius-sm)] border transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
              active
                ? 'border-primary bg-primary/20 shadow-sm'
                : 'border-border bg-surface hover:bg-primary/10'
            )}
          >
            {active ? (
              // Non-color "held" affordance: a filled marker dot on the key.
              <span
                aria-hidden="true"
                className="absolute top-[var(--xen-space-sm)] h-2 w-2 rounded-full bg-primary"
              />
            ) : null}
            {labels ? (
              <span className={cn('text-xs font-bold', active ? 'text-primary' : 'text-muted')}>
                {k.note}
              </span>
            ) : null}
          </button>
        );
      })}

      {/* Black keys overlaid at chromatic offsets — token-dark tactile caps. */}
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
              'absolute top-1 flex h-[60%] flex-col items-center justify-end pb-1.5',
              'rounded-b-[var(--xen-radius-md)] rounded-t-[var(--xen-radius-sm)] border border-border shadow-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
              active ? 'bg-primary' : 'bg-on-surface hover:opacity-90'
            )}
          >
            {active ? (
              // Non-color "held" affordance on the dark cap.
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-on-primary" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
});
