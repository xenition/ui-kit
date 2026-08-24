import * as React from 'react';
import { cn } from '../primitives/cn';

export interface QuantityStepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current quantity. */
  value: number;
  /** Lower bound (default 1). Decrement is disabled at this value. */
  min?: number;
  /** Upper bound (default none). Increment is disabled at this value. */
  max?: number;
  /** Increment/decrement amount (default 1). */
  step?: number;
  /** Called with the clamped next value. */
  onChange?: (value: number) => void;
  /** Disable the whole control. */
  disabled?: boolean;
  /** Accessible label for the group (default `Quantity`). */
  label?: string;
  /** Accessible label for the − button (default `Decrease quantity`). */
  decrementLabel?: string;
  /** Accessible label for the + button (default `Increase quantity`). */
  incrementLabel?: string;
}

const clamp = (n: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, n));

/**
 * A −/n/+ quantity control. Values are clamped to `[min, max]`; the boundary
 * button disables itself at each end so `onChange` never fires an out-of-range
 * value. Token-only, keyboard-native (real `<button>`s), and labelled as a
 * group.
 */
export const QuantityStepper = React.forwardRef<HTMLDivElement, QuantityStepperProps>(
  function QuantityStepper(
    {
      value,
      min = 1,
      max = Number.POSITIVE_INFINITY,
      step = 1,
      onChange,
      disabled = false,
      label = 'Quantity',
      decrementLabel = 'Decrease quantity',
      incrementLabel = 'Increase quantity',
      className,
      ...rest
    },
    ref
  ) {
    const atMin = value <= min;
    const atMax = value >= max;

    const emit = (next: number): void => {
      const clamped = clamp(next, min, max);
      if (clamped !== value) onChange?.(clamped);
    };

    const btn =
      'inline-flex h-8 w-8 items-center justify-center text-on-surface transition-colors ' +
      'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ' +
      'disabled:pointer-events-none disabled:opacity-40';

    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        data-xen-quantity-stepper=""
        className={cn(
          'inline-flex items-center overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-surface',
          className
        )}
        {...rest}
      >
        <button
          type="button"
          aria-label={decrementLabel}
          disabled={disabled || atMin}
          onClick={() => emit(value - step)}
          className={cn(btn, 'border-r border-border')}
        >
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 7h8" />
          </svg>
        </button>
        <span
          data-xen-quantity-value=""
          aria-live="polite"
          className="min-w-8 px-[var(--xen-space-sm)] text-center text-sm font-medium tabular-nums text-on-surface"
        >
          {value}
        </span>
        <button
          type="button"
          aria-label={incrementLabel}
          disabled={disabled || atMax}
          onClick={() => emit(value + step)}
          className={cn(btn, 'border-l border-border')}
        >
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 3v8M3 7h8" />
          </svg>
        </button>
      </div>
    );
  }
);
