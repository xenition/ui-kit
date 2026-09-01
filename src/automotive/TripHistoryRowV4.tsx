import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { RatingV4 } from '../primitives/RatingV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  rowEdgeClass,
} from '../dashboard/internal/row-v4';
import { formatMoney } from '../commerce/money';
import { metaLine, type ToneV4 } from './internal/fleet-v4';
import type { TripHistoryEmptyProps, TripHistoryRowProps, TripOutcome } from './TripHistoryRow';

export interface TripHistoryRowV4Props extends TripHistoryRowProps {
  /** Override the outcome words — three English phrases lived inside. */
  outcomeLabels?: Partial<Record<TripOutcome, string>>;
  /** Separator between the two endpoints. Default `'→'`. */
  routeSeparator?: string;
  /** Draw the separator under the row. Default `false`. */
  last?: boolean;
}

export interface TripHistoryEmptyV4Props extends TripHistoryEmptyProps {
  /** Glyph above the message. Default `'🚗'`. */
  glyph?: string;
}

const OUTCOME_META: Record<TripOutcome, { label: string; tone: ToneV4 }> = {
  completed: { label: 'Completed', tone: 'success' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
  'no-show': { label: 'No-show', tone: 'warn' },
};

/**
 * **V4 trip history row** — the web twin of the native `TripHistoryRowV4`,
 * same props as {@link TripHistoryRow} plus `outcomeLabels`, `routeSeparator`
 * and `last`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line**, so its height, padding, hover
 *    fill and separator inset are the kit's decisions rather than its own.
 * 2. **The fare is tabular** — a trip history is a column of money and the
 *    base left it proportional.
 * 3. **The route reads as one string to a screen reader** — "Bank St to
 *    Airport" — rather than two labels either side of an arrow announced as
 *    "rightwards arrow".
 * 4. **The rating carries its number.**
 *
 * **Renders nothing without both endpoints** (§4.5).
 */
export const TripHistoryRowV4 = React.forwardRef<HTMLDivElement, TripHistoryRowV4Props>(
  function TripHistoryRowV4(
    {
      from,
      to,
      dateLabel,
      fareCents,
      currency = 'USD',
      outcome = 'completed',
      rating,
      variant = 'default',
      outcomeLabels,
      routeSeparator = '→',
      last = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    if (!from || !to) return null;

    const meta = OUTCOME_META[outcome];
    const word = outcomeLabels?.[outcome] ?? meta.label;
    const compact = variant === 'compact';
    const caption = metaLine([dateLabel, compact ? null : word]);
    const name = metaLine([
      `${from} to ${to}`,
      dateLabel,
      word,
      typeof fareCents === 'number' ? formatMoney(fareCents, currency) : null,
    ]);

    return (
      <div
        ref={ref}
        data-xen-trip-history-row={outcome}
        data-xen-v4-chrome={onClick ? 'on-surface' : undefined}
        role={onClick ? 'button' : undefined}
        onClick={onClick}
        aria-label={name}
        className={cn(
          ROW_V4_BASE_CLASS,
          rowHeightClass(Boolean(caption)),
          !last && rowEdgeClass(),
          className
        )}
        {...rest}
      >
        <div className={ROW_V4_TEXT_CLASS}>
          <span className="flex items-center gap-xs">
            <span className="truncate text-base font-semibold text-on-card">{from}</span>
            {/* Decoration: a reader meeting it says "rightwards arrow". */}
            <span aria-hidden className="text-sm text-muted-text">
              {routeSeparator}
            </span>
            <span className="truncate text-base font-semibold text-on-card">{to}</span>
          </span>
          {caption ? <span className="truncate text-xs text-muted-text">{caption}</span> : null}
        </div>

        <div className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-0')}>
          {typeof fareCents === 'number' ? (
            <span className="font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]">
              {formatMoney(fareCents, currency)}
            </span>
          ) : null}
          {typeof rating === 'number' ? <RatingV4 value={rating} size="sm" showValue /> : null}
        </div>

        {compact ? (
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {word}
          </BadgeV4>
        ) : null}
      </div>
    );
  }
);

/**
 * **V4 empty trip history** — the web twin of the native
 * `TripHistoryEmptyV4`, same props as {@link TripHistoryEmpty} plus `glyph`.
 *
 * The base centred a title and a message in `text-muted`. V4 gives it the
 * glyph the rest of the kit's empty states carry and moves the message to
 * `muted-text` — the slot with a contrast promise, on the only copy the
 * screen has.
 */
export const TripHistoryEmptyV4 = React.forwardRef<HTMLDivElement, TripHistoryEmptyV4Props>(
  function TripHistoryEmptyV4(
    {
      title = 'No trips yet',
      message = 'Your completed rides will appear here.',
      glyph = '🚗',
      className,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        role="status"
        data-xen-trip-history-empty=""
        className={cn('flex flex-col items-center gap-sm p-xl text-center', className)}
        {...rest}
      >
        <IconV4 glyph={glyph} size="3xl" />
        <p className="text-base font-semibold text-on-surface">{title}</p>
        {message ? <p className="text-sm text-muted-text">{message}</p> : null}
      </div>
    );
  }
);
