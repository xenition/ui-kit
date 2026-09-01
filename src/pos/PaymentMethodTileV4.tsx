import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  formatMoney,
  TONE_TEXT,
  TONE_BORDER,
  TONE_SOFT_BG,
  PAYMENT_METHOD_META,
} from './internal';
import type { PaymentMethodTileProps } from './PaymentMethodTile';

/** Drop-in for {@link PaymentMethodTileProps} — same props, the V4 "register" design. */
export type PaymentMethodTileV4Props = PaymentMethodTileProps;

/**
 * PaymentMethodTile — **V4** "register" design (web parity of the native V4). A
 * tactile tender tile: the method glyph sits in a **soft-tint disc**, the word
 * beside/under it (never color alone), with an optional amount in `tabular-nums`.
 * A big (≥44px) tap target; `selected` lifts with an accent ring + soft tint and
 * a `✓`, all carried in `aria-pressed`. Same props/behavior as
 * {@link PaymentMethodTileProps}; accent from the method tone, all colors from
 * `--xen-*` token classes (no literals).
 */
export const PaymentMethodTileV4 = React.forwardRef<HTMLButtonElement, PaymentMethodTileV4Props>(
  function PaymentMethodTileV4(
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
          'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-md)] text-left transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          'disabled:pointer-events-none disabled:opacity-45',
          isList ? 'min-h-[56px] flex-row justify-start' : 'min-h-[96px] flex-col justify-center',
          selected
            ? cn('border-2 shadow-md', TONE_BORDER[meta.tone], TONE_SOFT_BG[meta.tone])
            : 'border-border bg-surface hover:bg-neutral-100 active:scale-[0.98]',
          className
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl',
            selected ? TONE_SOFT_BG[meta.tone] : 'bg-neutral-100'
          )}
        >
          {meta.glyph}
        </span>
        <span className={cn('flex min-w-0 flex-col', isList ? 'flex-1 items-start' : 'items-center')}>
          <span
            className={cn(
              'truncate text-sm font-bold',
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
