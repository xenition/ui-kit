import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';
import { formatMoney, type MoneyFormatter } from '../commerce';

export type GiftCardStatus = 'active' | 'redeemed' | 'expired' | 'pending';

interface StatusMeta {
  label: string;
  tone: BadgeTone;
}

const STATUS_META: Record<GiftCardStatus, StatusMeta> = {
  active: { label: 'Active', tone: 'success' },
  redeemed: { label: 'Redeemed', tone: 'muted' },
  expired: { label: 'Expired', tone: 'danger' },
  pending: { label: 'Pending', tone: 'warn' },
};

export interface GiftCardRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Face value / original amount in integer cents. */
  amountCents: number;
  /** Remaining balance in cents. Defaults to `amountCents`. */
  balanceCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Gift-card code (partially shown; use a masked value if sensitive). */
  code?: string;
  /** Lifecycle status; drives the badge + accent. Falls back to `active`. */
  status?: GiftCardStatus;
  /** Expiry date string (e.g. "Exp 12/26"). */
  expires?: string;
  /** Recipient / sender note. */
  note?: string;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  /** Fires when the row is activated. */
  onClick?: () => void;
}

/**
 * A gift-card wallet row: a gift glyph, the face value with remaining balance,
 * the (masked) code and expiry, and a status `Badge`. `status` carries the state
 * word and tone (never color alone) — `redeemed`/`expired` dim the row. When
 * balance differs from the face value both are shown. Amounts are integer cents
 * via {@link formatMoney}. Token-only colors.
 */
export const GiftCardRow = React.forwardRef<HTMLDivElement, GiftCardRowProps>(
  function GiftCardRow(
    {
      amountCents,
      balanceCents,
      currency = 'USD',
      code,
      status = 'active',
      expires,
      note,
      formatMoney: format = formatMoney,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const meta = STATUS_META[status] ?? STATUS_META.active;
    const balance = typeof balanceCents === 'number' ? balanceCents : amountCents;
    const spent = balance < amountCents;
    const dim = status === 'redeemed' || status === 'expired';
    const interactive = !!onClick;

    return (
      <div
        ref={ref}
        data-xen-gift-card-row={status}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`Gift card ${format(balance, currency)}${
          spent ? ` of ${format(amountCents, currency)}` : ''
        }, ${meta.label}${expires ? `, ${expires}` : ''}`}
        aria-disabled={dim || undefined}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }
            : undefined
        }
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          interactive && !dim && 'cursor-pointer transition-opacity hover:opacity-95',
          dim && 'opacity-60',
          className
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-neutral-100 text-lg"
        >
          🎁
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex items-baseline gap-[var(--xen-space-xs)]">
            <span className="text-base font-extrabold text-on-surface">
              {format(balance, currency)}
            </span>
            {spent ? (
              <span className="text-xs text-muted">of {format(amountCents, currency)}</span>
            ) : null}
          </span>
          {code ? <span className="text-xs font-semibold text-muted">{code}</span> : null}
          {note ? <span className="truncate text-xs text-muted">{note}</span> : null}
        </div>

        <div className="flex flex-col items-end gap-0.5">
          <Badge tone={meta.tone}>{meta.label}</Badge>
          {expires ? <span className="text-xs text-muted">{expires}</span> : null}
        </div>
      </div>
    );
  }
);
