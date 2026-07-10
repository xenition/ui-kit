import * as React from 'react';
import { cn } from './cn';

export interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

/** Number input with −/+ steppers, bound to the theme tokens. Clamps to [min, max]. */
export function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled,
  className,
}: NumberInputProps): React.ReactElement {
  const clamp = (v: number) => Math.max(min ?? -Infinity, Math.min(max ?? Infinity, v));
  const set = (v: number) => onChange(clamp(v));
  const btn =
    'flex h-9 w-9 shrink-0 items-center justify-center text-on-surface transition-colors hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40';
  return (
    <div className={cn('inline-flex items-center rounded-[var(--xen-radius-sm)] border border-border bg-surface', className)}>
      <button
        type="button"
        aria-label="Decrease"
        className={btn}
        disabled={disabled || (min != null && value <= min)}
        onClick={() => set(value - step)}
      >
        −
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => set(Number(e.target.value))}
        className="w-14 border-x border-border bg-transparent px-2 py-1.5 text-center text-sm text-on-surface outline-none"
      />
      <button
        type="button"
        aria-label="Increase"
        className={btn}
        disabled={disabled || (max != null && value >= max)}
        onClick={() => set(value + step)}
      >
        +
      </button>
    </div>
  );
}
