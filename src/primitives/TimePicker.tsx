import * as React from 'react';
import { cn } from './cn';
import { useDismiss } from './useDismiss';

export interface TimeValue {
  /** Hour of day, 0–23. */
  h: number;
  /** Minute, 0–59. */
  m: number;
}

export interface TimePickerProps {
  /** Controlled time. */
  value?: TimeValue | null;
  /** Fires with the chosen `{ h, m }`. */
  onChange?: (value: TimeValue) => void;
  /** Minute granularity for the minute column (default 5). */
  minuteStep?: number;
  /** Shown on the trigger when no time is selected. */
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  /** Accessible label for the trigger. */
  accessibilityLabel?: string;
  className?: string;
}

const pad = (n: number): string => String(n).padStart(2, '0');

/**
 * Zero-asset time field — a token-bound trigger showing `HH:MM` that opens a
 * popover with side-by-side hour (0–23) and minute (stepped by `minuteStep`)
 * columns. Web parity of the native `TimePicker`; `invalid` swaps the border to
 * `danger`. No literal colors (kit lint rule).
 */
export function TimePicker({
  value,
  onChange,
  minuteStep = 5,
  placeholder = 'Select a time',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  className,
}: TimePickerProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  const hours = React.useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = React.useMemo(() => {
    const step = Math.max(1, Math.min(60, Math.round(minuteStep)));
    const out: number[] = [];
    for (let m = 0; m < 60; m += step) out.push(m);
    return out;
  }, [minuteStep]);

  const current: TimeValue = value ?? { h: 0, m: 0 };
  const pick = (next: TimeValue): void => onChange?.(next);

  const column = (
    label: string,
    items: number[],
    active: number,
    onPick: (n: number) => void
  ): React.ReactElement => (
    <div className="flex-1">
      <div className="pb-xs text-center text-xs font-semibold text-muted">{label}</div>
      <div className="max-h-[200px] overflow-auto">
        {items.map((n) => {
          const isActive = n === active;
          return (
            <button
              key={n}
              type="button"
              aria-label={`${label} ${n}`}
              aria-pressed={isActive}
              onClick={() => onPick(n)}
              className={cn(
                'block w-full rounded-[var(--xen-radius-md)] py-sm text-center text-base transition-colors',
                isActive
                  ? 'bg-primary font-bold text-on-primary'
                  : 'text-on-surface hover:bg-neutral-100'
              )}
            >
              {pad(n)}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <button
        type="button"
        aria-label={accessibilityLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex w-full items-center justify-between bg-surface',
          'border rounded-[var(--xen-radius-sm)] px-md py-sm text-base transition-colors',
          'focus:outline-none focus:ring-1',
          invalid
            ? 'border-danger focus:border-danger focus:ring-danger'
            : 'border-border focus:border-primary focus:ring-primary',
          'disabled:pointer-events-none disabled:opacity-50'
        )}
      >
        <span className={value ? 'text-on-surface' : 'text-muted'}>
          {value ? `${pad(current.h)}:${pad(current.m)}` : placeholder}
        </span>
        <span aria-hidden className="text-sm text-muted">
          ▾
        </span>
      </button>
      {open ? (
        <div className="absolute z-50 mt-1 w-60 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-md shadow-lg">
          <div className="flex gap-md">
            {column('Hour', hours, current.h, (h) => pick({ h, m: current.m }))}
            {column('Min', minutes, current.m, (m) => pick({ h: current.h, m }))}
          </div>
          <button
            type="button"
            aria-label="Done"
            onClick={() => setOpen(false)}
            className="mt-md w-full rounded-[var(--xen-radius-md)] bg-primary py-sm text-center text-base font-semibold text-on-primary hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            Done
          </button>
        </div>
      ) : null}
    </div>
  );
}
