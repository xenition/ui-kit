import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge, Button, type BadgeTone } from '../primitives';
import { formatMoney } from '../commerce';

/** Lifecycle state of an offer. */
export type OfferStatus = 'pending' | 'accepted' | 'declined' | 'countered' | 'expired';

export interface OfferRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Buyer / party display name. */
  party: string;
  /** Offered amount in integer minor units (cents). */
  amountCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Optional avatar image URL. */
  avatarUrl?: string;
  /** Offer status. Default `pending`. */
  status?: OfferStatus;
  /** Relative time label (e.g. "2h ago"). */
  timeLabel?: string;
  /** Optional message/note attached to the offer. */
  note?: string;
  /** Fires when Accept is clicked (only shown for `pending` offers). */
  onAccept?: () => void;
  /** Fires when Decline is clicked (only shown for `pending` offers). */
  onDecline?: () => void;
  /** Fires when Counter is clicked (only shown for `pending` offers). */
  onCounter?: () => void;
}

const STATUS_TONE: Record<OfferStatus, BadgeTone> = {
  pending: 'warn',
  accepted: 'success',
  declined: 'danger',
  countered: 'primary',
  expired: 'neutral',
};

const STATUS_LABEL: Record<OfferStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  declined: 'Declined',
  countered: 'Countered',
  expired: 'Expired',
};

/**
 * A row in an offers list on a listing — buyer, offered amount, a status chip,
 * an optional note, and Accept / Counter / Decline actions (real `<button>`s,
 * shown only while the offer is `pending`). Presentational: shaped data +
 * callbacks only. Status is carried by both the chip label and tone, never color
 * alone. Reuses `Avatar`, `Badge`, `Button`, and the shared `formatMoney`;
 * token-only colors.
 */
export const OfferRow = React.forwardRef<HTMLDivElement, OfferRowProps>(function OfferRow(
  {
    party,
    amountCents,
    currency = 'USD',
    avatarUrl,
    status = 'pending',
    timeLabel,
    note,
    onAccept,
    onDecline,
    onCounter,
    className,
    ...rest
  },
  ref
) {
  const tone = STATUS_TONE[status] ?? 'neutral';
  const statusLabel = STATUS_LABEL[status] ?? String(status);
  const showActions = status === 'pending' && (onAccept || onDecline || onCounter);

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-md)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <Avatar src={avatarUrl} name={party} size="sm" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-[var(--xen-space-sm)]">
            <span className="min-w-0 truncate text-base font-semibold text-on-surface">{party}</span>
            <Badge tone={tone}>{statusLabel}</Badge>
          </div>
          {timeLabel ? <span className="text-xs text-muted">{timeLabel}</span> : null}
        </div>
        <span className="text-lg font-bold text-on-surface">{formatMoney(amountCents, currency)}</span>
      </div>
      {note ? <p className="line-clamp-3 text-sm text-muted">{note}</p> : null}
      {showActions ? (
        <div className="flex gap-[var(--xen-space-sm)]">
          {onAccept ? (
            <Button variant="primary" size="sm" onClick={onAccept} className="flex-1">
              Accept
            </Button>
          ) : null}
          {onCounter ? (
            <Button variant="outline" size="sm" onClick={onCounter} className="flex-1">
              Counter
            </Button>
          ) : null}
          {onDecline ? (
            <Button variant="danger" size="sm" onClick={onDecline} className="flex-1">
              Decline
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
