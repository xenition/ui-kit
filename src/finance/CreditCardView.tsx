import * as React from 'react';
import { cn } from '../primitives/cn';
import { maskCardNumber } from './internal/mask';

/** Card network — drives only the corner label, never a literal brand color. */
export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'generic';

/** Which token ramp paints the gradient face. */
export type CreditCardVariant = 'primary' | 'accent' | 'dark';

export interface CreditCardViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Cardholder name (rendered upper-cased). */
  holder: string;
  /** Full or partial card number; displayed masked to the last four. */
  number: string;
  /** Expiry string, already formatted (e.g. `"08/28"`). */
  expiry?: string;
  /** Card network label (default `generic`). */
  brand?: CardBrand;
  /** Gradient ramp for the face (default `primary`). */
  variant?: CreditCardVariant;
}

const BRAND_LABEL: Record<CardBrand, string> = {
  visa: 'VISA',
  mastercard: 'Mastercard',
  amex: 'AMEX',
  generic: 'CARD',
};

// Two-stop diagonal gradients painted from **theme ramp tokens** (CSS custom
// properties) — never literal brand colors.
const GRADIENT: Record<CreditCardVariant, string> = {
  primary: 'bg-gradient-to-br from-[var(--xen-primary)] to-[var(--xen-primary-700)]',
  accent: 'bg-gradient-to-br from-[var(--xen-accent)] to-[var(--xen-accent-700)]',
  dark: 'bg-gradient-to-br from-[var(--xen-neutral-700)] to-[var(--xen-neutral-900)]',
};

// On the saturated fill the ramp's on-color token reads best.
const INK: Record<CreditCardVariant, string> = {
  primary: 'text-on-primary',
  accent: 'text-on-accent',
  dark: 'text-on-surface',
};

/**
 * A realistic card face: a token-gradient background (`--xen-*` ramp vars, no
 * literal hex), the masked number in a tabular row, and a holder / expiry /
 * network footer. `variant` picks the ramp (`primary` / `accent` / `dark`); the
 * number is masked to the last four via {@link maskCardNumber}. Foreground text
 * uses the ramp's on-color token so it stays legible on the fill. Web parity of
 * the native `CreditCardView`.
 */
export const CreditCardView = React.forwardRef<HTMLDivElement, CreditCardViewProps>(
  function CreditCardView(
    { holder, number, expiry, brand = 'generic', variant = 'primary', className, ...rest },
    ref
  ) {
    const last4 = number.replace(/\D+/g, '').slice(-4) || 'unknown';

    return (
      <div
        ref={ref}
        role="img"
        aria-label={`${BRAND_LABEL[brand]} card ending ${last4}`}
        className={cn(
          'flex min-h-[190px] flex-col justify-between rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
          GRADIENT[variant],
          INK[variant],
          className
        )}
        {...rest}
      >
        <div className="flex items-center justify-between">
          <span
            aria-hidden="true"
            className="h-7 w-10 rounded-[var(--xen-radius-sm)] bg-warn opacity-90"
          />
          <span className="text-base font-bold tracking-widest">{BRAND_LABEL[brand]}</span>
        </div>

        <span className="text-xl font-semibold tracking-[0.15em] tabular-nums">
          {maskCardNumber(number)}
        </span>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs opacity-80">CARD HOLDER</p>
            <p className="truncate text-sm font-semibold">{holder.toUpperCase()}</p>
          </div>
          {expiry != null ? (
            <div>
              <p className="text-xs opacity-80">EXPIRES</p>
              <p className="text-sm font-semibold">{expiry}</p>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);
