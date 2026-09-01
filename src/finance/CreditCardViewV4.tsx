import * as React from 'react';
import { cn } from '../primitives/cn';
import { TABULAR_CLASS } from './internal/ledger-v4';
import { maskCardNumber } from './internal/mask';
import type { CardBrand, CreditCardVariant, CreditCardViewProps } from './CreditCardView';

export interface CreditCardViewV4Props extends CreditCardViewProps {
  /** Caption over the holder's name. Default `'Card holder'`. */
  holderLabel?: string;
  /** Caption over the expiry. Default `'Expires'`. */
  expiryLabel?: string;
  /** The word for each network. Defaults to {@link CARD_BRAND_LABEL}. */
  brandLabels?: Partial<Record<CardBrand, string>>;
}

/**
 * The network's word — the base's own table, exported so the payment-method
 * row spells a network the same way the card face does. Nothing in this module
 * had a shared home for it, and `PaymentMethodRow` consequently printed no
 * network at all.
 */
export const CARD_BRAND_LABEL: Record<CardBrand, string> = {
  visa: 'VISA',
  mastercard: 'Mastercard',
  amex: 'AMEX',
  generic: 'CARD',
};

/**
 * The face, as a **guaranteed pair**: a fill and the ink the compiler measured
 * against that fill.
 *
 * The base's `dark` variant paired `from-[var(--xen-neutral-700)]
 * to-[var(--xen-neutral-900)]` with `text-on-surface`, a token guaranteed
 * against `surface` and nothing else. In the light scheme `on-surface` is
 * near-black and the fill is near-black; in the dark scheme the web output
 * mirrors the neutral ramp, so the fill goes light at the same moment
 * `on-surface` does. Either way the number, the holder and the expiry sat near
 * 1:1 — the card was illegible in both schemes, in both directions.
 *
 * `dark` is now the **inverse** pair, `on-surface` over `surface` — a face that
 * is dark on a light page and light on a dark one, and whose ink is the other
 * half of a pair the compiler already checked.
 *
 * The gradient survives, but it can no longer break the promise: the far stop
 * is the fill mixed 16% toward its **own paired ink**, which is M3's state-layer
 * move applied to a surface. A ramp step is a different colour with no
 * relationship to the ink drawn on it; a 16% mix cannot outrun the contrast
 * that was measured at 0%.
 */
const FACE: Record<CreditCardVariant, string> = {
  primary:
    'bg-gradient-to-br from-[var(--xen-primary)] to-[color-mix(in_srgb,var(--xen-on-primary)_16%,var(--xen-primary))] text-on-primary',
  accent:
    'bg-gradient-to-br from-[var(--xen-accent)] to-[color-mix(in_srgb,var(--xen-on-accent)_16%,var(--xen-accent))] text-on-accent',
  dark: 'bg-gradient-to-br from-[var(--xen-on-surface)] to-[color-mix(in_srgb,var(--xen-surface)_16%,var(--xen-on-surface))] text-surface',
};

/**
 * **V4 credit-card face** — the web twin of the native `CreditCardViewV4`,
 * same props as {@link CreditCardView} plus `holderLabel`, `expiryLabel` and
 * `brandLabels`.
 *
 * ## Four changes
 *
 * 1. **The face is legible in both schemes** — see {@link FACE}.
 * 2. **The card is not a picture.** `role="img"` is children-presentational,
 *    so it pruned the number, the holder and the expiry from the accessibility
 *    tree and announced only "VISA card ending 4242" — the *fallback* for an
 *    unreadable face was closed at the same time as the face became
 *    unreadable. It is a named group now, and its content is read.
 * 3. **The chip stops being `warn`.** A status colour was spent on a piece of
 *    decoration, next to money whose colours mean something. It is drawn from
 *    the face's own ink instead, so it works on all three variants and means
 *    nothing anywhere.
 * 4. **The caption hierarchy is type, not `opacity: 0.8`.** The captions were
 *    the *same colour* as the values under them, dimmed by an invented alpha —
 *    which is the one gesture M3 reserves for disabled content. They are a
 *    step smaller and a weight lighter, and both sit at full strength.
 */
export const CreditCardViewV4 = React.forwardRef<HTMLDivElement, CreditCardViewV4Props>(
  function CreditCardViewV4(
    {
      holder,
      number,
      expiry,
      brand = 'generic',
      variant = 'primary',
      holderLabel = 'Card holder',
      expiryLabel = 'Expires',
      brandLabels,
      className,
      ...rest
    },
    ref
  ) {
    const brandLabel = brandLabels?.[brand] ?? CARD_BRAND_LABEL[brand];
    const masked = maskCardNumber(number);
    // The base's own name, kept — it is the right length for a group, and the
    // number, holder and expiry are read from the content now rather than
    // having to be crammed into it.
    const last4 = number.replace(/\D+/g, '').slice(-4) || 'unknown';
    const upperHolder = holder.toUpperCase();

    return (
      <div
        ref={ref}
        role="group"
        aria-label={`${brandLabel} card ending ${last4}`}
        className={cn(
          'flex flex-col justify-between rounded-[var(--xen-radius-lg)] p-lg',
          'min-h-[calc(var(--xen-space-2xl)*4)]',
          FACE[variant],
          className
        )}
        {...rest}
      >
        <div className="flex items-center justify-between">
          <span
            aria-hidden="true"
            // The face's own ink at a low alpha: decoration that reads on all
            // three variants and carries no status.
            className="h-lg w-xl rounded-[var(--xen-radius-sm)] bg-[color-mix(in_srgb,currentColor_35%,transparent)]"
          />
          <span className="text-base font-bold tracking-widest">{brandLabel}</span>
        </div>

        <span className={cn('text-xl font-semibold tracking-widest', TABULAR_CLASS)}>{masked}</span>

        <div className="flex items-end justify-between gap-md">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide">{holderLabel}</p>
            <p className="truncate text-sm font-bold">{upperHolder}</p>
          </div>
          {expiry != null ? (
            <div className="shrink-0 text-right">
              <p className="text-xs font-medium uppercase tracking-wide">{expiryLabel}</p>
              <p className={cn('text-sm font-bold', TABULAR_CLASS)}>{expiry}</p>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);
