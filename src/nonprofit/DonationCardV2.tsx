import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { formatMoney } from './internal';
import type { DonationCardProps } from './DonationCard';

/** Same public contract as {@link DonationCard} — a drop-in alternate design. */
export type DonationCardV2Props = DonationCardProps;

/**
 * DonationCard, redesigned (v2): a **bold gift card**. A large title/blurb over a
 * two-column grid of big preset amount tiles (the chosen one fills primary), with
 * a full-width Donate CTA that names the active amount. Distinct from v1's inline
 * chips. Same props, token-only.
 */
export const DonationCardV2 = React.forwardRef<HTMLDivElement, DonationCardV2Props>(
  function DonationCardV2(
    { title, description, presets = [], selected, currency = 'USD', ctaLabel = 'Donate', variant, onSelectAmount, onDonate, loading = false, disabled = false, className, ...rest },
    ref
  ) {
    void variant;
    const active = selected ?? presets[0];

    return (
      <div ref={ref} data-xen-donation-card="" className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', className)} {...rest}>
        <div>
          <p className="text-lg font-bold text-on-surface">{title}</p>
          {description ? <p className="mt-0.5 text-sm text-muted">{description}</p> : null}
        </div>
        {presets.length > 0 ? (
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Gift amount">
            {presets.map((cents) => {
              const isActive = cents === active;
              return (
                <button
                  key={cents}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onSelectAmount?.(cents)}
                  className={cn(
                    'rounded-md border-2 p-3 text-center text-sm font-bold transition-colors',
                    isActive ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-on-surface hover:bg-primary/10'
                  )}
                >
                  {formatMoney(cents, currency)}
                </button>
              );
            })}
          </div>
        ) : null}
        <Button
          size="lg"
          variant="primary"
          className="w-full"
          disabled={disabled || loading || typeof active !== 'number'}
          onClick={() => typeof active === 'number' && onDonate?.(active)}
        >
          {typeof active === 'number' ? `${ctaLabel} ${formatMoney(active, currency)}` : ctaLabel}
        </Button>
      </div>
    );
  }
);
