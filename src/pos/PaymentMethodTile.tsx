import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  formatMoney,
  TONE_TEXT,
  TONE_BORDER,
  TONE_SOFT_BG,
  PAYMENT_METHOD_META,
  type PaymentMethod,
} from './internal';

export type PaymentMethodTileVariant = 'grid' | 'list';

export interface PaymentMethodTileProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Tender type — drives the glyph, label, and accent tone. */
  method: PaymentMethod;
  /** Override the default label (e.g. "Visa •4242"). */
  label?: string;
  /** Selected state — accent ring + fill (also announced to a11y). */
  selected?: boolean;
  /** Optional amount to charge with this tender, in integer **cents**. */
  amountCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** `grid` (default) is a square tap target; `list` is a full-width row. */
  variant?: PaymentMethodTileVariant;
  /** Parity alias for `data-testid`. */
  testID?: string;
}

/**
 * A selectable tender tile for the payment screen — the DOM parity of the native
 * `PaymentMethodTile`. A real `<button>`: glyph + word (never color alone) with
 * an optional amount. Selection is carried in `aria-pressed` and drawn as an
 * accent ring + token-tinted fill. `grid` is a compact square; `list` is a
 * labelled full-width row. Money is integer **cents**. Token-only: accent from
 * the method tone.
 */
export const PaymentMethodTile = React.forwardRef<HTMLButtonElement, PaymentMethodTileProps>(
  function PaymentMethodTile(
    {
      method,
      label,
      selected = false,
      amountCents,
      currency = 'USD',
      variant = 'grid',
      disabled = false,
      testID,
      className,
      ...rest
    },
    ref
  ) {
    const meta = PAYMENT_METHOD_META[method];
    const isList = variant === 'list';

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        aria-label={label ?? meta.label}
        disabled={disabled}
        data-xen-payment-method-tile=""
        data-testid={testID}
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-md)] text-left transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          'disabled:pointer-events-none disabled:opacity-45',
          isList ? 'min-h-[56px] flex-row justify-start' : 'min-h-[88px] flex-col justify-center',
          selected
            ? cn('border-2', TONE_BORDER[meta.tone], TONE_SOFT_BG[meta.tone])
            : 'border-border bg-surface hover:bg-neutral-100',
          className
        )}
        {...rest}
      >
        <span aria-hidden="true" className="text-2xl">
          {meta.glyph}
        </span>
        <span className={cn('flex flex-col', isList ? 'flex-1 items-start' : 'items-center')}>
          <span
            className={cn(
              'truncate text-sm font-semibold',
              selected ? TONE_TEXT[meta.tone] : 'text-on-surface'
            )}
          >
            {label ?? meta.label}
          </span>
          {typeof amountCents === 'number' ? (
            <span className="text-xs tabular-nums text-muted">
              {formatMoney(amountCents, currency)}
            </span>
          ) : null}
        </span>
        {selected ? (
          <span aria-hidden="true" className={cn('text-sm font-bold', TONE_TEXT[meta.tone])}>
            ✓
          </span>
        ) : null}
      </button>
    );
  }
);
