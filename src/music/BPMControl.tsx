import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { clamp, formatBpm } from './types';

export type BPMControlVariant = 'stepper' | 'inline' | 'tap';

export interface BPMControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current tempo in BPM. */
  value: number;
  /** Range bounds (default `40`…`300`). */
  min?: number;
  max?: number;
  /** Increment per step press (default `1`). */
  step?: number;
  /**
   * - `stepper` — big read-out with −/＋ buttons (default).
   * - `inline` — compact single-row −/＋.
   * - `tap` — stepper plus a "Tap" tempo button.
   */
  variant?: BPMControlVariant;
  /** Whether the transport is playing (adds a non-color "playing" dot). */
  playing?: boolean;
  /** Disable the control. */
  disabled?: boolean;
  /** Fires with the new BPM when stepped. */
  onChange?: (bpm: number) => void;
  /** Fires each time the "Tap" button is pressed (tap-tempo intent). */
  onTap?: () => void;
}

/**
 * A tempo (BPM) control — a UI shell only, it drives no clock, and the DOM
 * parity of `native/music`'s `BPMControl`. Shows the tempo read-out with −/＋
 * steppers (clamped to `[min, max]`) and, in the `tap` variant, a "Tap" button
 * that fires `onTap` for an app to time. The `playing` flag adds a non-color
 * "playing" dot beside the value. Token-only styling.
 */
export const BPMControl = React.forwardRef<HTMLDivElement, BPMControlProps>(function BPMControl(
  {
    value,
    min = 40,
    max = 300,
    step = 1,
    variant = 'stepper',
    playing = false,
    disabled = false,
    onChange,
    onTap,
    className,
    ...rest
  },
  ref
) {
  const safe = clamp(value, min, max);
  const compact = variant === 'inline';

  const bump = (delta: number): void => {
    if (disabled) return;
    onChange?.(clamp(safe + delta, min, max));
  };

  return (
    <div
      ref={ref}
      className={cn('flex items-center justify-center gap-[var(--xen-space-sm)]', className)}
      {...rest}
    >
      <Button
        variant="outline"
        size="sm"
        aria-label="Decrease tempo"
        disabled={disabled || safe <= min}
        onClick={() => bump(-step)}
        className="h-10 w-10 rounded-full p-0 text-lg"
      >
        −
      </Button>
      <div className={cn('flex flex-col items-center', compact ? 'min-w-[56px]' : 'min-w-[96px]')}>
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          {playing ? (
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success" />
          ) : null}
          <span
            aria-label={`Tempo ${formatBpm(safe)} beats per minute${playing ? ', playing' : ''}`}
            className={cn('font-extrabold text-on-surface', compact ? 'text-lg' : 'text-3xl')}
          >
            {formatBpm(safe)}
          </span>
        </div>
        {!compact ? <span className="text-xs font-semibold text-muted">BPM</span> : null}
      </div>
      <Button
        variant="outline"
        size="sm"
        aria-label="Increase tempo"
        disabled={disabled || safe >= max}
        onClick={() => bump(step)}
        className="h-10 w-10 rounded-full p-0 text-lg"
      >
        ＋
      </Button>
      {variant === 'tap' ? (
        <Button
          variant="secondary"
          size="sm"
          aria-label="Tap tempo"
          disabled={disabled}
          onClick={() => onTap?.()}
        >
          Tap
        </Button>
      ) : null}
    </div>
  );
});
