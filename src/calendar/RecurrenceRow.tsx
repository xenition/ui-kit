import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export type RecurrenceFreq = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurrenceOption {
  value: RecurrenceFreq;
  label: string;
}

export interface RecurrenceRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The selected recurrence frequency. */
  value: RecurrenceFreq;
  /** Fires when a different frequency is chosen. */
  onChange?: (value: RecurrenceFreq) => void;
  /** Leading label (default "Repeat"). */
  label?: string;
  /**
   * `inline` (default) shows selectable preset chips; `summary` collapses to a
   * single tappable row (host opens its own picker via `onPress`).
   */
  variant?: 'inline' | 'summary';
  /** For `summary` variant — fires when the row is tapped. */
  onPress?: () => void;
  /** Override the preset list. */
  options?: RecurrenceOption[];
}

const DEFAULT_OPTIONS: RecurrenceOption[] = [
  { value: 'none', label: 'Does not repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

/**
 * The recurrence editor row for an event form. `inline` renders preset chips
 * (selection announced via `aria-checked`, not color-alone); `summary`
 * collapses to a single tappable row that shows the current rule and defers to a
 * host-owned picker. Token colors only.
 */
export const RecurrenceRow = React.forwardRef<HTMLDivElement, RecurrenceRowProps>(
  function RecurrenceRow(
    { value, onChange, label = 'Repeat', variant = 'inline', onPress, options = DEFAULT_OPTIONS, className, ...rest },
    ref
  ) {
    const current = options.find((o) => o.value === value) ?? options[0];

    if (variant === 'summary') {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement> as never}
          type="button"
          aria-label={`${label}: ${current?.label ?? 'None'}`}
          onClick={onPress}
          className={cn(
            'flex w-full items-center py-2 text-left transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-[var(--xen-radius-sm)]',
            className
          )}
        >
          <Icon glyph="🔁" size="sm" color="muted" />
          <span className="ml-2 text-base font-semibold text-on-surface">{label}</span>
          <span className="flex-1" />
          <span className="text-sm text-muted">{current?.label ?? 'None'}</span>
          <span className="ml-1 text-base text-muted">›</span>
        </button>
      );
    }

    return (
      <div ref={ref} className={className} {...rest}>
        <div className="mb-1 flex items-center">
          <Icon glyph="🔁" size="sm" color="muted" />
          <span className="ml-2 text-base font-semibold text-on-surface">{label}</span>
        </div>
        <div role="radiogroup" className="flex flex-wrap gap-1">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-label={o.label}
                aria-checked={active}
                onClick={() => onChange?.(o.value)}
                className={cn(
                  'rounded-full border px-2 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                  active
                    ? 'border-primary bg-primary-50 font-bold text-primary'
                    : 'border-border bg-surface font-medium text-on-surface hover:bg-neutral-100'
                )}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);
