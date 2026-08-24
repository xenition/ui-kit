import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Spinner } from '../primitives';
import { formatMoney, type MoneyFormatter } from '../commerce';

export interface SalonBookingBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Primary line — the selected service(s) summary. */
  serviceName?: string;
  /** Total price in integer cents. Hidden when omitted. */
  totalCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Secondary line (e.g. "with Ana · Today 3:00 PM · 45 min"). */
  detail?: string;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  /** CTA label (default "Book now"). */
  ctaLabel?: string;
  /** Disables the CTA (e.g. nothing selected). */
  disabled?: boolean;
  /** Shows a spinner and blocks the CTA (web `Button` has no `loading` → disabled). */
  loading?: boolean;
  /** Empty-state copy shown when no service is selected. */
  emptyLabel?: string;
  /** Fires when the CTA is pressed. */
  onBook?: () => void;
}

/**
 * A sticky salon booking bar for the bottom of a service/stylist screen: a
 * two-line summary (service + price on the left, detail beneath) and a dominant
 * "Book now" CTA. With no `serviceName` it shows an empty prompt and disables
 * the CTA; `loading` shows a spinner and disables the CTA (web `Button` has no
 * `loading` prop). Prices are integer cents via {@link formatMoney}. Token-only
 * colors.
 */
export const SalonBookingBar = React.forwardRef<HTMLDivElement, SalonBookingBarProps>(
  function SalonBookingBar(
    {
      serviceName,
      totalCents,
      currency = 'USD',
      detail,
      formatMoney: format = formatMoney,
      ctaLabel = 'Book now',
      disabled = false,
      loading = false,
      emptyLabel = 'Select a service to book',
      onBook,
      className,
      ...rest
    },
    ref
  ) {
    const hasSelection = !!serviceName;
    const priceText = totalCents != null ? format(totalCents, currency) : undefined;
    const isDisabled = disabled || loading || !hasSelection;

    return (
      <div
        ref={ref}
        data-xen-salon-booking-bar=""
        aria-label={
          hasSelection
            ? `${serviceName}${priceText ? `, ${priceText}` : ''}${detail ? `, ${detail}` : ''}`
            : emptyLabel
        }
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] border-t border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-on-surface',
          className
        )}
        {...rest}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          {hasSelection ? (
            <>
              <div className="flex items-baseline gap-[var(--xen-space-sm)]">
                <span className="truncate text-base font-bold text-on-surface">{serviceName}</span>
                {priceText ? (
                  <span className="text-base font-extrabold text-primary">{priceText}</span>
                ) : null}
              </div>
              {detail ? <span className="truncate text-sm text-muted">{detail}</span> : null}
            </>
          ) : (
            <span className="text-sm text-muted">{emptyLabel}</span>
          )}
        </div>

        <Button
          variant="primary"
          disabled={isDisabled}
          onClick={onBook}
          className="gap-[var(--xen-space-xs)]"
        >
          {loading ? <Spinner size="sm" /> : null}
          {ctaLabel}
        </Button>
      </div>
    );
  }
);
