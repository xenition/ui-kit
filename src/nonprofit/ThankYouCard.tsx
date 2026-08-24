import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { formatMoney } from './internal';

/** Visual treatment of a {@link ThankYouCard}. */
export type ThankYouCardVariant = 'default' | 'celebratory';

export interface ThankYouCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Recipient of the thanks; omit for an anonymous gift. */
  donorName?: string;
  /** The gift amount, integer **cents** (rendered when provided). */
  amountCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Custom headline (defaults to a thank-you built from the name). */
  headline?: string;
  /** Supporting message / mission line. */
  message?: string;
  /** Optional concrete impact line, e.g. `Funds 40 meals`. */
  impactLabel?: string;
  /** Visual treatment. `celebratory` adds a tinted accent panel. */
  variant?: ThankYouCardVariant;
  /** Fires when the share action is clicked (rendered when provided). */
  onShare?: () => void;
  /** Fires when the receipt action is clicked (rendered when provided). */
  onViewReceipt?: () => void;
}

/**
 * Web parity of the native `ThankYouCard`: a post-donation confirmation card — a
 * celebratory glyph, a thank-you headline (optionally naming the donor and their
 * gift amount in integer cents), a mission message, an optional concrete impact
 * line, and share / receipt actions. `celebratory` renders on a tinted primary
 * panel. All colors come from the `--xen-*` token classes — no literal colors.
 */
export const ThankYouCard = React.forwardRef<HTMLDivElement, ThankYouCardProps>(
  function ThankYouCard(
    {
      donorName,
      amountCents,
      currency = 'USD',
      headline,
      message,
      impactLabel,
      variant = 'default',
      onShare,
      onViewReceipt,
      className,
      ...rest
    },
    ref
  ) {
    const celebratory = variant === 'celebratory';
    const resolvedHeadline =
      headline ?? (donorName ? `Thank you, ${donorName}!` : 'Thank you for your gift!');

    return (
      <div
        ref={ref}
        role="group"
        aria-label={resolvedHeadline}
        className={cn(
          'flex flex-col items-center gap-sm rounded-lg p-lg text-center',
          celebratory ? 'bg-primary-50' : 'border border-border bg-surface',
          className
        )}
        {...rest}
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success text-on-success">
          <Icon glyph="🎉" size="xl" />
        </span>

        <span className="text-xl font-extrabold text-on-surface">{resolvedHeadline}</span>

        {typeof amountCents === 'number' ? (
          <span className="text-2xl font-extrabold text-primary">{formatMoney(amountCents, currency)}</span>
        ) : null}

        {message ? <span className="text-sm text-muted">{message}</span> : null}

        {impactLabel ? (
          <span className="inline-flex items-center gap-xs rounded-full bg-success px-md py-xs text-sm font-semibold text-on-success">
            <Icon glyph="🌱" size="sm" />
            {impactLabel}
          </span>
        ) : null}

        {onShare || onViewReceipt ? (
          <div className="mt-xs flex gap-sm">
            {onShare ? (
              <Button variant="primary" onClick={onShare}>
                Share
              </Button>
            ) : null}
            {onViewReceipt ? (
              <Button variant="outline" onClick={onViewReceipt}>
                View receipt
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
