import * as React from 'react';
import { cn } from '../primitives/cn';
import { Slider } from '../primitives/Slider';
import { clamp } from './types';

export type VolumeFaderVariant = 'labeled' | 'bare';

// `onChange` is reclaimed from the inherited div props (as `Tabs` and
// `FilterChips` do) so it can mean the kit's "the value changed", not a form
// event nobody attaches to a wrapper div.
export interface VolumeFaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current fader position in `[min, max]`. */
  value: number;
  /** Range bounds (default `0`…`100`). */
  min?: number;
  max?: number;
  /** Snap step (default `1`). */
  step?: number;
  /** Channel / control name shown above the track. */
  label?: string;
  /**
   * - `labeled` — name + numeric read-out around the track (default).
   * - `bare` — just the track (for dense strips).
   */
  variant?: VolumeFaderVariant;
  /** Muted state — dims the fader and appends a muted note to a11y. */
  muted?: boolean;
  /** Suffix for the numeric read-out, e.g. `'dB'`, `'%'`. */
  unit?: string;
  /** Disable the fader. */
  disabled?: boolean;
  /**
   * Fires with the new value as the user drags. Prefer `onChange` — that is the
   * kit's one canonical name for "the value changed". `onValueChange` is this
   * component's original spelling, kept so existing callers keep working; if
   * both are passed this one wins.
   */
  onValueChange?: (value: number) => void;
  /** Canonical spelling of `onValueChange` (see it for the precedence rule). */
  onChange?: (value: number) => void;
}

/**
 * A labelled volume fader — a thin wrapper over the `Slider` primitive that adds
 * a name and a live numeric read-out, plus a `muted` state surfaced in both the
 * dimming *and* the a11y label (never color alone). The DOM parity of
 * `native/music`'s `VolumeFader`: it owns no audio; drags report out through
 * `onValueChange`. Token-only styling.
 */
export const VolumeFader = React.forwardRef<HTMLDivElement, VolumeFaderProps>(function VolumeFader(
  {
    value,
    min = 0,
    max = 100,
    step = 1,
    label,
    variant = 'labeled',
    muted = false,
    unit,
    disabled = false,
    onValueChange,
    onChange,
    className,
    ...rest
  },
  ref
) {
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onValueChange ?? onChange;
  const safe = clamp(value, min, max);
  const readout = `${Math.round(safe)}${unit ? ` ${unit}` : ''}`;

  return (
    <div
      ref={ref}
      aria-label={label ? `${label} volume ${Math.round(safe)}${muted ? ', muted' : ''}` : undefined}
      className={cn('flex flex-col gap-[var(--xen-space-xs)]', (muted || disabled) && 'opacity-55', className)}
      {...rest}
    >
      {variant === 'labeled' ? (
        <div className="flex items-center justify-between">
          {label ? (
            <span className="truncate text-sm font-semibold text-on-surface">
              {muted ? `${label} (muted)` : label}
            </span>
          ) : (
            <span />
          )}
          <span className="text-xs font-semibold text-muted">{readout}</span>
        </div>
      ) : null}
      <Slider
        value={safe}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(v) => emit?.(v)}
      />
    </div>
  );
});
