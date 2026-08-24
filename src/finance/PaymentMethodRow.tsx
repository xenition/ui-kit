import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Badge } from '../primitives/Badge';
import type { CardBrand } from './CreditCardView';

/** Payment instrument kind. */
export type PaymentMethodKind = 'card' | 'bank' | 'wallet';

export interface PaymentMethodRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Primary label (e.g. "Visa" or "Chase Checking"). */
  label: string;
  /** Instrument kind — selects the default glyph (default `card`). */
  kind?: PaymentMethodKind;
  /** Card network, when `kind === 'card'` (affects the glyph only). */
  brand?: CardBrand;
  /** Last four digits, shown as `•• 4242`. */
  last4?: string;
  /** Expiry caption (e.g. `"08/28"`). */
  expiry?: string;
  /** Override the leading glyph. */
  icon?: string;
  /** Marks this method as the default (shows a badge). */
  isDefault?: boolean;
  /** Selected state — draws the primary ring + check (for a picker list). */
  selected?: boolean;
  /** Fires on row click (selection) — makes the row a keyboard-operable radio. */
  onClick?: () => void;
}

const KIND_GLYPH: Record<PaymentMethodKind, string> = {
  card: '💳',
  bank: '🏦',
  wallet: '👛',
};

/**
 * A selectable payment-method row for a wallet / checkout picker: leading glyph,
 * label with a masked `•• last4` and expiry sub-line, an optional "Default"
 * badge, and a trailing selection check. `selected` draws a `border-primary`
 * ring; unselected rows use the `border` token. Becomes a radio-style button
 * when `onClick` is supplied. Token-bound throughout. Web parity of the native
 * `PaymentMethodRow`.
 */
export const PaymentMethodRow = React.forwardRef<HTMLDivElement, PaymentMethodRowProps>(
  function PaymentMethodRow(
    { label, kind = 'card', brand: _brand, last4, expiry, icon, isDefault = false, selected = false, onClick, className, ...rest },
    ref
  ) {
    const sub = [last4 != null ? `•• ${last4}` : null, expiry != null ? `exp ${expiry}` : null]
      .filter(Boolean)
      .join('  ·  ');

    const interactive = onClick
      ? {
          role: 'radio' as const,
          'aria-checked': selected,
          tabIndex: 0,
          onClick,
          onKeyDown: (event: React.KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onClick();
            }
          },
        }
      : undefined;

    return (
      <div
        ref={ref}
        aria-label={interactive ? label : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border bg-surface p-[var(--xen-space-md)]',
          selected ? 'border-primary' : 'border-border',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...interactive}
        {...rest}
      >
        <Icon glyph={icon ?? KIND_GLYPH[kind]} color={selected ? 'primary' : 'onSurface'} size="xl" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <span className="text-base font-semibold text-on-surface">{label}</span>
            {isDefault ? <Badge tone="success">Default</Badge> : null}
          </div>
          {sub.length > 0 ? <span className="text-xs text-muted">{sub}</span> : null}
        </div>
        {selected ? <Icon glyph="✓" color="primary" size="lg" aria-label="Selected" /> : null}
      </div>
    );
  }
);
