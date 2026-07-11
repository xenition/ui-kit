import * as React from 'react';
import { cn } from '../primitives/cn';

export interface PricingToggleOption {
  /** Visible label ("Monthly", "Yearly", …). */
  label: React.ReactNode;
  /** Value reported via `onChange` when selected. */
  value: string;
  /** Optional small "save %" (or any) badge shown beside the label. */
  badge?: React.ReactNode;
}

export interface PricingToggleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Segments to switch between (2+ supported). */
  options: PricingToggleOption[];
  /** Currently active option value (controlled). */
  value: string;
  /** Fires with the newly selected value. */
  onChange: (value: string) => void;
  /** Accessible label for the switch group. */
  label?: string;
}

/**
 * Monthly/yearly (or N-option) segmented switch that reports the active key
 * via `value`/`onChange`, with a per-option "save %" badge slot. Pairs with
 * `PricingTable` to swap billing periods.
 */
export const PricingToggle = React.forwardRef<HTMLDivElement, PricingToggleProps>(
  function PricingToggle(
    { options, value, onChange, label = 'Billing period', className, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-xen-pricing-toggle=""
        role="radiogroup"
        aria-label={label}
        className={cn(
          'inline-flex items-center gap-1 rounded-[var(--xen-radius-full)] border border-border bg-neutral-50 p-1',
          className
        )}
        {...rest}
      >
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              data-active={active ? 'true' : 'false'}
              onClick={() => onChange(option.value)}
              className={cn(
                'inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-full)] px-4 py-1.5 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                active
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-muted hover:text-on-surface'
              )}
            >
              <span>{option.label}</span>
              {option.badge !== undefined ? (
                <span
                  data-xen-pricing-toggle-badge=""
                  className={cn(
                    'rounded-[var(--xen-radius-full)] px-2 py-0.5 text-xs font-semibold',
                    active ? 'bg-on-primary text-primary' : 'bg-primary-100 text-primary-700'
                  )}
                >
                  {option.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    );
  }
);
