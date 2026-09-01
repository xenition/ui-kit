import * as React from 'react';
import { cn } from '../primitives/cn';
import { AuthStickyFooterV4 } from '../primitives/AuthStickyFooterV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { metaLine } from './internal/salon-v4';
import type { SalonBookingBarProps } from './SalonBookingBar';

export interface SalonBookingBarV4Props extends SalonBookingBarProps {
  /**
   * Pay the bottom safe-area inset. Default `true`.
   *
   * The reason this component needed the pass most: it is a **pinned bottom
   * bar** and it read no inset at all, so on a notched phone the one button
   * that takes the money sat under the home indicator.
   */
  safeArea?: boolean;
}

/**
 * **V4 salon booking bar** — the web twin of the native `SalonBookingBarV4`,
 * same props as {@link SalonBookingBar} plus `safeArea`.
 *
 * ## Four changes
 *
 * 1. **It clears the safe-area inset**, via `AuthStickyFooterV4` — the same
 *    band every other pinned CTA in the kit uses, and it also pins and stacks
 *    correctly, which the base's plain bar did not.
 * 2. **The price stops being `text-primary` at `font-weight: 800`.** A fill
 *    slot used as ink, at a weight the scale does not have.
 * 3. **The CTA is the §5 shape** — the one loud thing in the band.
 * 4. **The empty state is announced copy**, not a disabled button alone.
 */
export const SalonBookingBarV4 = React.forwardRef<HTMLDivElement, SalonBookingBarV4Props>(
  function SalonBookingBarV4(
    {
      serviceName,
      totalCents,
      currency = 'USD',
      detail,
      formatMoney = defaultFormatMoney,
      ctaLabel = 'Book now',
      disabled = false,
      loading = false,
      emptyLabel = 'Select a service to book',
      safeArea = true,
      onBook,
      className,
      ...rest
    },
    ref
  ) {
    const hasSelection = Boolean(serviceName);
    const price =
      typeof totalCents === 'number' && Number.isFinite(totalCents)
        ? formatMoney(totalCents, currency)
        : null;
    const blocked = disabled || loading || !hasSelection;

    return (
      <div ref={ref} data-xen-salon-booking-bar="" {...rest}>
        <AuthStickyFooterV4 safeArea={safeArea} className={className}>
          <div
            aria-label={hasSelection ? metaLine([serviceName, price, detail]) : emptyLabel}
            className="flex items-center gap-md"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              {hasSelection ? (
                <>
                  <span className="flex items-baseline gap-sm">
                    <span className="truncate font-heading text-base font-bold text-on-surface">
                      {serviceName}
                    </span>
                    {price ? (
                      <span className="font-heading text-base font-bold text-on-surface [font-variant-numeric:tabular-nums]">
                        {price}
                      </span>
                    ) : null}
                  </span>
                  {detail ? (
                    <span className="truncate text-xs text-muted-text">{detail}</span>
                  ) : null}
                </>
              ) : (
                <span className="text-sm text-muted-text">{emptyLabel}</span>
              )}
            </div>

            <ButtonV4
              variant="primary"
              size="md"
              disabled={blocked}
              aria-busy={loading || undefined}
              onClick={onBook}
              aria-label={ctaLabel}
              className={cn('shrink-0')}
              style={{ borderRadius: 'var(--xen-radius-full)' }}
            >
              {ctaLabel}
            </ButtonV4>
          </div>
        </AuthStickyFooterV4>
      </div>
    );
  }
);
