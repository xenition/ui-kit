import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { formatMoney } from './internal';
import type { DonationCardProps } from './DonationCard';

/** Same public contract as {@link DonationCard} — a drop-in alternate design. */
export type DonationCardV3Props = DonationCardProps;

/**
 * DonationCard, redesigned (v3): a **compact inline ask**. The title on one line,
 * a horizontal strip of small preset pills, and a right-aligned Donate button —
 * borderless and tight for embedding in a feed. The opposite of v2's bold grid
 * card. Same props, token-only.
 */
export const DonationCardV3 = React.forwardRef<HTMLDivElement, DonationCardV3Props>(
  function DonationCardV3(
    { title, description, presets = [], selected, currency = 'USD', ctaLabel = 'Donate', variant, onSelectAmount, onDonate, loading = false, disabled = false, className, ...rest },
    ref
  ) {
    void variant;
    void description;
    const active = selected ?? presets[0];

    return (
      <div ref={ref} data-xen-donation-card="" className={cn('flex flex-col gap-2 border-b border-border py-3', className)} {...rest}>
        <p className="text-sm font-semibold text-on-surface">{title}</p>
        <div className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 flex-wrap gap-1.5" role="group" aria-label="Gift amount">
            {presets.map((cents) => {
              const isActive = cents === active;
              return (
                <button
                  key={cents}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onSelectAmount?.(cents)}
                  className={cn(
                    'rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors',
                    isActive ? 'border-primary bg-primary/10 text-primary' : 'border-border text-on-surface hover:bg-neutral-50'
                  )}
                >
                  {formatMoney(cents, currency)}
                </button>
              );
            })}
          </div>
          <Button
            size="sm"
            variant="primary"
            disabled={disabled || loading || typeof active !== 'number'}
            onClick={() => typeof active === 'number' && onDonate?.(active)}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    );
  }
);
