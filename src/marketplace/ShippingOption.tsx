import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { formatMoney } from '../commerce';

export interface ShippingOptionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect' | 'onClick'> {
  /** Carrier / method name (e.g. "Standard", "Express"). */
  label: string;
  /**
   * Shipping cost in integer minor units (cents). `0` renders as "Free"; omit
   * for methods without a price (e.g. local pickup).
   */
  priceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Delivery estimate line (e.g. "3–5 business days"). */
  eta?: string;
  /** Optional leading glyph. */
  glyph?: string;
  /** Whether this option is currently selected (radio semantics). */
  selected?: boolean;
  /** Disables selection (e.g. unavailable to this address). */
  disabled?: boolean;
  /** Fires when the option is chosen. */
  onSelect?: () => void;
}

/**
 * A selectable shipping/delivery method row — method name, price ("Free" at
 * zero), an ETA line, and a radio indicator. Rendered as a real `<button
 * role="radio">`: `selected` drives an accent ring, a filled radio dot, and
 * `aria-checked` (never color alone); `disabled` dims it and blocks selection.
 * Reuses `Icon` and the shared `formatMoney`; token-only colors.
 */
export const ShippingOption = React.forwardRef<HTMLButtonElement, ShippingOptionProps>(function ShippingOption(
  { label, priceCents, currency = 'USD', eta, glyph, selected = false, disabled = false, onSelect, className, ...rest },
  ref
) {
  const priceText =
    priceCents === undefined ? undefined : priceCents === 0 ? 'Free' : formatMoney(priceCents, currency);

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${label}${priceText ? `, ${priceText}` : ''}${eta ? `, ${eta}` : ''}`}
      disabled={disabled || !onSelect}
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-left',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        selected ? 'border-primary bg-primary-50' : 'border-border bg-surface',
        className
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] border-2',
          selected ? 'border-primary' : 'border-border'
        )}
      >
        {selected ? <span className="h-2.5 w-2.5 rounded-[var(--xen-radius-full)] bg-primary" /> : null}
      </span>
      {glyph ? <Icon glyph={glyph} size="lg" color={selected ? 'primary' : 'muted'} /> : null}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-base font-semibold text-on-surface">{label}</span>
        {eta ? <span className="text-sm text-muted">{eta}</span> : null}
      </span>
      {priceText ? <span className="text-base font-bold text-on-surface">{priceText}</span> : null}
    </button>
  );
});
