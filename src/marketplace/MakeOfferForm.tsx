import * as React from 'react';
import { cn } from '../primitives/cn';
import { Input, Button } from '../primitives';
import { formatMoney } from '../commerce';

export interface MakeOfferFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  /** The listing's asking price in cents; shown as context when provided. */
  listPriceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Minimum acceptable offer in cents; offers below are rejected inline. */
  minOfferCents?: number;
  /** Include a free-text message field. Default `false`. */
  withMessage?: boolean;
  /** Submit button label (default "Send offer"). */
  submitLabel?: string;
  /** Block submission and show a pending label (web `Button` has no spinner). */
  loading?: boolean;
  /**
   * Fires with the parsed offer in integer cents (and the optional message)
   * once the input is a valid amount at/above `minOfferCents`.
   */
  onSubmit?: (offerCents: number, message?: string) => void;
  /** `data-testid` applied to the amount input (defaults to `xen-mkt-offer-amount`). */
  testId?: string;
}

/** Parse a currency string ("1,250.50") into integer cents, or null. */
function parseCents(raw: string): number | null {
  const cleaned = raw.replace(/[^0-9.]/g, '');
  if (cleaned === '' || cleaned === '.') return null;
  const value = Number.parseFloat(cleaned);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value * 100);
}

/**
 * A make-an-offer form for a listing — an amount field (major units, parsed to
 * integer cents), an optional message, and a submit action. Self-contained
 * validation: empty/invalid amounts and amounts below `minOfferCents` disable
 * submit and surface an inline, token-styled error (state carried by text, not
 * color alone). Presentational: nothing is sent; a valid submit calls
 * `onSubmit(offerCents, message?)`. Reuses `Input`, `Button`, and the shared
 * `formatMoney`; token-only colors.
 */
export const MakeOfferForm = React.forwardRef<HTMLDivElement, MakeOfferFormProps>(function MakeOfferForm(
  {
    listPriceCents,
    currency = 'USD',
    minOfferCents,
    withMessage = false,
    submitLabel = 'Send offer',
    loading = false,
    onSubmit,
    testId = 'xen-mkt-offer-amount',
    className,
    ...rest
  },
  ref
) {
  const [amount, setAmount] = React.useState('');
  const [message, setMessage] = React.useState('');

  const cents = parseCents(amount);
  const belowMin = cents != null && typeof minOfferCents === 'number' && cents < minOfferCents;
  const valid = cents != null && !belowMin;
  const error =
    amount.length > 0 && cents == null
      ? 'Enter a valid amount'
      : belowMin && typeof minOfferCents === 'number'
        ? `Offer must be at least ${formatMoney(minOfferCents, currency)}`
        : undefined;

  const submit = (): void => {
    if (!valid || loading || cents == null) return;
    onSubmit?.(cents, withMessage && message.trim() ? message.trim() : undefined);
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      {typeof listPriceCents === 'number' ? (
        <p className="text-sm text-muted">{`Asking ${formatMoney(listPriceCents, currency)}`}</p>
      ) : null}
      <label className="flex flex-col gap-[var(--xen-space-xs)]">
        <span className="text-sm font-medium text-on-surface">Your offer</span>
        <Input
          data-testid={testId}
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          invalid={error != null}
          aria-label="Offer amount"
        />
      </label>
      {withMessage ? (
        <label className="flex flex-col gap-[var(--xen-space-xs)]">
          <span className="text-sm font-medium text-on-surface">Message (optional)</span>
          <Input
            data-testid="xen-mkt-offer-message"
            placeholder="Add a note to the seller"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      ) : null}
      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
      <Button variant="primary" onClick={submit} disabled={!valid || loading}>
        {loading ? 'Sending…' : submitLabel}
      </Button>
    </div>
  );
});
