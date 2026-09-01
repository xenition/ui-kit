import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  rowEdgeClass,
} from '../dashboard/internal/row-v4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { metaLine, type ToneV4 } from './internal/salon-v4';
import type { GiftCardRowProps, GiftCardStatus } from './GiftCardRow';

export interface GiftCardRowV4Props extends GiftCardRowProps {
  /** Override the status words — four English words lived inside. */
  statusLabels?: Partial<Record<GiftCardStatus, string>>;
  /** Label on the remaining-balance meter. Default `'Remaining'`. */
  balanceLabel?: string;
  /** Draw the separator under the row. Default `false`. */
  last?: boolean;
}

const STATUS_META: Record<GiftCardStatus, { label: string; tone: ToneV4 }> = {
  active: { label: 'Active', tone: 'success' },
  redeemed: { label: 'Redeemed', tone: 'neutral' },
  expired: { label: 'Expired', tone: 'danger' },
  pending: { label: 'Pending', tone: 'warn' },
};

/**
 * **V4 gift card row** — the web twin of the native `GiftCardRowV4`, same
 * props as {@link GiftCardRow} plus `statusLabels`, `balanceLabel` and `last`.
 *
 * ## Four changes
 *
 * 1. **The balance is shown against the face value.** The base printed two
 *    money figures side by side and left the reader to do the division; a
 *    meter answers the only question anyone asks of a gift card.
 * 2. **The code is tabular.** A redemption code is read aloud character by
 *    character and typed into a field.
 * 3. **It is a row from the shared row line.**
 * 4. **Status is a word beside the tone**, and all four words are props.
 *
 * **Renders nothing without an `amountCents`** (§4.5).
 */
export const GiftCardRowV4 = React.forwardRef<HTMLDivElement, GiftCardRowV4Props>(
  function GiftCardRowV4(
    {
      amountCents,
      balanceCents,
      currency = 'USD',
      code,
      status = 'active',
      expires,
      note,
      formatMoney = defaultFormatMoney,
      statusLabels,
      balanceLabel = 'Remaining',
      last = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    if (typeof amountCents !== 'number' || !Number.isFinite(amountCents)) return null;

    const meta = STATUS_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const face = formatMoney(amountCents, currency);
    const hasBalance =
      typeof balanceCents === 'number' && Number.isFinite(balanceCents) && amountCents > 0;
    const balance = hasBalance ? formatMoney(balanceCents as number, currency) : null;
    const pct = hasBalance
      ? Math.max(0, Math.min(100, ((balanceCents as number) / amountCents) * 100))
      : null;
    const caption = metaLine([code, expires, note]);

    return (
      <div
        ref={ref}
        data-xen-gift-card={status}
        data-xen-v4-chrome={onClick ? 'on-surface' : undefined}
        role={onClick ? 'button' : undefined}
        onClick={onClick}
        aria-label={metaLine([balance ?? face, balance ? `of ${face}` : null, word, caption])}
        className={cn(
          ROW_V4_BASE_CLASS,
          rowHeightClass(true),
          !last && rowEdgeClass(),
          className
        )}
        {...rest}
      >
        <div className={ROW_V4_TEXT_CLASS}>
          <span className="flex items-baseline gap-sm">
            <span className="font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]">
              {balance ?? face}
            </span>
            {balance ? (
              <span className="text-xs text-muted-text [font-variant-numeric:tabular-nums]">
                / {face}
              </span>
            ) : null}
          </span>
          {caption ? (
            <span className="truncate text-xs text-muted-text [font-variant-numeric:tabular-nums]">
              {caption}
            </span>
          ) : null}
          {pct != null ? (
            <span className="mt-xs flex flex-col gap-0.5">
              <ProgressV4 value={pct} tone={meta.tone === 'danger' ? 'danger' : 'primary'} />
              <span className="text-xs text-muted-text">{balanceLabel}</span>
            </span>
          ) : null}
        </div>

        <div className={ROW_V4_TRAILING_CLASS}>
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {word}
          </BadgeV4>
        </div>
      </div>
    );
  }
);
