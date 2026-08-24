import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Button, type ButtonVariant } from '../primitives/Button';
import { Spinner } from '../primitives/Spinner';
import { formatMoney, type MoneyFormatter } from './internal/format';

/** Urgency of the renewal — an ordered, non-color signal. */
export type RenewalUrgency = 'upcoming' | 'due' | 'overdue';

interface UrgencyDescriptor {
  glyph: string;
  heading: string;
  /** Tinted border + background token classes for the banner container. */
  container: string;
  /** Renew button variant. */
  button: ButtonVariant;
}

const URGENCY: Record<RenewalUrgency, UrgencyDescriptor> = {
  upcoming: { glyph: '🗓️', heading: 'Renewal coming up', container: 'border-primary bg-primary-50', button: 'primary' },
  due: { glyph: '⏰', heading: 'Renewal due', container: 'border-warn bg-warn/10', button: 'primary' },
  overdue: { glyph: '⚠️', heading: 'Renewal overdue', container: 'border-danger bg-danger/10', button: 'danger' },
};

export interface RenewalBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Localized renewal date string (already formatted by the caller). */
  renewalDate: string;
  /** Urgency level — drives glyph + tint + heading (default `due`). */
  urgency?: RenewalUrgency;
  /** Renewal premium in integer **cents** (shown when provided). */
  premiumCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Renew button label (default "Renew now"). Hidden when no `onRenew`. */
  renewLabel?: string;
  /** Show a spinner and block the renew button. */
  loading?: boolean;
  /** Fires when the renew action is pressed. */
  onRenew?: () => void;
}

/**
 * A call-to-action banner prompting a policy renewal. Urgency is conveyed by
 * **glyph + heading + a tint that traces to a semantic token slot** (upcoming →
 * primary, overdue → danger) — never color alone. The optional renewal premium
 * is integer cents via `formatMoney`. The renew `Button` (a real `<button>`) is
 * only rendered when `onRenew` is supplied. Token-bound throughout. Web parity
 * of the native `RenewalBanner` (`loading` shows an inline `Spinner`, since the
 * web `Button` has no `loading` prop).
 */
export const RenewalBanner = React.forwardRef<HTMLDivElement, RenewalBannerProps>(
  function RenewalBanner(
    {
      renewalDate,
      urgency = 'due',
      premiumCents,
      currency = 'USD',
      formatMoney: format = formatMoney,
      renewLabel = 'Renew now',
      loading = false,
      onRenew,
      className,
      ...rest
    },
    ref
  ) {
    const ud = URGENCY[urgency] ?? URGENCY.due;

    return (
      <div
        ref={ref}
        aria-label={`${ud.heading}, ${renewalDate}`}
        className={cn(
          'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-lg)]',
          ud.container,
          className
        )}
        {...rest}
      >
        <div className="flex items-start gap-[var(--xen-space-md)]">
          <Icon glyph={ud.glyph} size="xl" aria-label={ud.heading} />
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-on-surface">{ud.heading}</p>
            <p className="text-sm text-muted">
              Your policy renews on {renewalDate}
              {premiumCents != null ? ` · ${format(Math.max(0, Math.trunc(premiumCents)), currency)}` : ''}
            </p>
          </div>
        </div>
        {onRenew != null ? (
          <Button
            variant={ud.button}
            onClick={onRenew}
            disabled={loading}
            aria-busy={loading || undefined}
          >
            {loading ? <Spinner size="sm" className="mr-2" /> : null}
            {renewLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);
