import * as React from 'react';
import { cn } from '../primitives/cn';
import type { PricingToggleProps } from './PricingToggle';

/** Drop-in for {@link PricingToggleProps} — same props, the V4 "showcase" design. */
export type PricingToggleV4Props = PricingToggleProps;

/**
 * PricingToggle — **V4** "showcase" design (web parity of the native V4). A
 * tactile segmented control: a soft-neutral track with a pill-shaped selected
 * segment in `bg-primary text-on-primary` and an optional soft-primary "save X%"
 * chip per option. Reports the active key via `value`/`onChange`, ≥44px targets.
 * Same props/behavior as {@link PricingToggleProps}; token-only colors, no
 * literals.
 */
export const PricingToggleV4 = React.forwardRef<HTMLDivElement, PricingToggleV4Props>(
  function PricingToggleV4(
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
          'inline-flex items-center gap-1 rounded-[var(--xen-radius-full)] border border-border bg-neutral-100 p-1',
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
                'inline-flex min-h-[44px] items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-full)] px-5 text-sm font-semibold transition-colors',
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
