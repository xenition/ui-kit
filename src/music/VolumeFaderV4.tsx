import * as React from 'react';
import { cn } from '../primitives/cn';
import { Slider } from '../primitives/Slider';
import { clamp } from './types';
import type { VolumeFaderProps } from './VolumeFader';

/** Drop-in for {@link VolumeFaderProps} — same props, the V4 "session" design. */
export type VolumeFaderV4Props = VolumeFaderProps;

/**
 * VolumeFader — **V4** "session" design (web parity of the native V4). The
 * tactile DAW take on a fader: a token well (`bg-primary/15`) wrapping the
 * `Slider` primitive so the track reads like a real mixing surface, with the
 * name and a **bold tabular-nums** read-out framing it. `muted` is surfaced in
 * both the dimming *and* the a11y label plus a `(muted)` marker (never color
 * alone). Honors both `variant`s (`labeled` / `bare`) and mirrors the base's
 * drop-in behavior exactly: it owns no audio and reports drags through the same
 * `onValueChange` / `onChange` callbacks (the original spelling wins when both
 * are passed). All colors from `--xen-*` token classes (no literals).
 */
export const VolumeFaderV4 = React.forwardRef<HTMLDivElement, VolumeFaderV4Props>(function VolumeFaderV4(
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
          <span className="text-xs font-bold tabular-nums text-on-surface">{readout}</span>
        </div>
      ) : null}
      {/* Token well — a tactile fader track that houses the Slider primitive. */}
      <div className="flex min-h-[var(--xen-space-lg)] items-center rounded-[var(--xen-radius-md)] border border-border bg-primary/15 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
        <Slider
          value={safe}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(v) => emit?.(v)}
        />
      </div>
    </div>
  );
});
