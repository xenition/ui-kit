import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';

export type PaymentMethodKind = 'card' | 'bank' | 'wallet';

export interface PaymentMethodCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Which kind of instrument this is — picks the leading glyph. */
  kind: PaymentMethodKind;
  /** Primary label (e.g. "Visa" / "Checking" / "Apple Pay"). */
  label: string;
  /** Secondary line (e.g. "•••• 4242", "ACH ••6789"). */
  detail?: string;
  /** Marks this as the default method — shows a success "Default" badge. */
  isDefault?: boolean;
  /** Current selection state (drives the radio + the accent border). */
  selected?: boolean;
  /** When set, the whole row becomes a selectable radio. */
  onSelect?: () => void;
  /** When set, shows a manage affordance on the trailing edge. */
  onManage?: () => void;
}

const KIND_GLYPH: Record<PaymentMethodKind, string> = {
  card: '💳',
  bank: '🏦',
  wallet: '📱',
};

/**
 * A saved payment method (web parity) — the clean, trust-first row on a money
 * surface: the instrument glyph in a small brand-gradient disc (the signature V4
 * touch), the `label` + `detail`, an optional "Default" badge (success tone),
 * and a manage affordance. When `onSelect` is set the whole row becomes a
 * `role="radio"` carrying `aria-checked`; a selected row gains a 2px primary
 * ring. All colors trace to tokens — no literals.
 */
export const PaymentMethodCard = React.forwardRef<HTMLDivElement, PaymentMethodCardProps>(
  function PaymentMethodCard(
    { kind, label, detail, isDefault = false, selected = false, onSelect, onManage, className, ...rest },
    ref
  ) {
    const interactive = onSelect != null;

    const body = (
      <div className="flex items-center gap-[var(--xen-space-md)]">
        {interactive ? (
          <span
            aria-hidden="true"
            className={cn(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
              selected ? 'border-primary' : 'border-border'
            )}
          >
            {selected ? <span className="h-2.5 w-2.5 rounded-full bg-primary" /> : null}
          </span>
        ) : null}

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
          <Icon glyph={KIND_GLYPH[kind] ?? KIND_GLYPH.card} color="onPrimary" size="lg" />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-bold text-on-surface">{label}</span>
          {detail ? <span className="truncate text-sm text-muted">{detail}</span> : null}
        </div>

        <div className="flex items-center gap-[var(--xen-space-sm)]">
          {isDefault ? (
            <Badge tone="success" variant="soft">
              Default
            </Badge>
          ) : null}
          {onManage ? (
            <button
              type="button"
              aria-label={`Manage ${label}`}
              onClick={(e) => {
                e.stopPropagation();
                onManage();
              }}
              className="rounded-[var(--xen-radius-sm)] px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              Manage
            </button>
          ) : null}
        </div>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5',
          selected && 'ring-2 ring-primary',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...(interactive
          ? {
              role: 'radio',
              tabIndex: 0,
              'aria-checked': selected,
              'aria-label': detail ? `${label}, ${detail}` : label,
              onClick: onSelect,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect?.();
                }
              },
            }
          : {})}
        {...rest}
      >
        {body}
      </div>
    );
  }
);
