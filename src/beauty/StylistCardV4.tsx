import * as React from 'react';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { RatingV4 } from '../primitives/RatingV4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { metaLine, SKELETON_CLASS } from './internal/salon-v4';
import type { StylistCardProps } from './StylistCard';

export interface StylistCardV4Props extends StylistCardProps {
  /** Copy on the fully-booked chip. Default `'Fully booked'`. */
  fullyBookedLabel?: string;
  /** Prefix on the from-price. Default `'from'`. */
  fromLabel?: string;
  /** Build the review count. Default `'128 reviews'`. */
  formatReviewCount?: (count: number) => string;
  /** At most this many specialty chips are drawn. Default `3`. */
  maxSpecialties?: number;
}

/**
 * **V4 stylist card** — the web twin of the native `StylistCardV4`, same props
 * as {@link StylistCard} plus four hooks.
 *
 * ## Five changes
 *
 * 1. **The rating carries its number and its count** — a stylist list is
 *    exactly where a client compares 4.9 against 4.6.
 * 2. **Fully booked disables the CTA.** The base showed the chip and left
 *    "Book" live, so a client could tap through to a stylist with no slots.
 * 3. **The specialty chips are capped and wrap** — seven of them pushed the
 *    price off the row, and §7 says chips wrap and are never clipped.
 * 4. **The from-price is tabular** with its prefix as a separate muted
 *    element.
 * 5. **The skeleton is opaque**, and an interactive card is a real `<button>`.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export const StylistCardV4 = React.forwardRef<HTMLDivElement, StylistCardV4Props>(
  function StylistCardV4(
    {
      name,
      role,
      specialties = [],
      avatarUrl,
      rating,
      reviewCount,
      priceFromCents,
      currency = 'USD',
      formatMoney = defaultFormatMoney,
      availability,
      fullyBooked = false,
      variant = 'detailed',
      loading = false,
      bookLabel = 'Book',
      fullyBookedLabel = 'Fully booked',
      fromLabel = 'from',
      formatReviewCount,
      maxSpecialties = 3,
      onBook,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    if (loading) {
      return (
        <CardV4 ref={ref} className={cn('flex gap-sm', className)} {...rest}>
          <div className={cn('h-12 w-12 rounded-full', SKELETON_CLASS)} />
          <div className="flex flex-1 flex-col gap-xs">
            <div className={cn('h-4 w-1/2', SKELETON_CLASS)} />
            <div className={cn('h-3 w-3/4', SKELETON_CLASS)} />
          </div>
        </CardV4>
      );
    }

    if (!name) return null;

    const compact = variant === 'compact';
    const chips = specialties.filter(Boolean).slice(0, Math.max(0, maxSpecialties));
    const price =
      typeof priceFromCents === 'number' && Number.isFinite(priceFromCents)
        ? formatMoney(priceFromCents, currency)
        : null;
    const reviews =
      typeof reviewCount === 'number'
        ? (formatReviewCount ?? ((n: number) => `${n.toLocaleString()} reviews`))(reviewCount)
        : null;

    const body = (
      <>
        <div className="flex items-center gap-sm">
          <AvatarV4 src={avatarUrl} name={name} size={compact ? 'sm' : 'md'} />
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <span className="truncate font-heading text-base font-bold text-on-card">{name}</span>
            {role ? <span className="truncate text-xs text-muted-text">{role}</span> : null}
            {typeof rating === 'number' ? (
              <span className="flex items-center gap-xs">
                <RatingV4 value={rating} size="sm" showValue />
                {reviews ? (
                  <span className="text-xs text-muted-text [font-variant-numeric:tabular-nums]">
                    {reviews}
                  </span>
                ) : null}
              </span>
            ) : null}
          </div>
          {fullyBooked ? (
            <BadgeV4 tone="neutral" variant="soft" size="sm">
              {fullyBookedLabel}
            </BadgeV4>
          ) : availability ? (
            <BadgeV4 tone="success" variant="soft" size="sm">
              {availability}
            </BadgeV4>
          ) : null}
        </div>

        {/* §7: chips wrap and are never clipped, and the list is capped. */}
        {!compact && chips.length > 0 ? (
          <div className="mt-sm flex flex-wrap gap-xs">
            {chips.map((s) => (
              <BadgeV4 key={s} tone="neutral" variant="outline" size="sm">
                {s}
              </BadgeV4>
            ))}
          </div>
        ) : null}

        {price || onBook ? (
          <div className="mt-md flex items-center justify-between gap-sm">
            {price ? (
              <span className="flex items-baseline gap-xs">
                <span className="text-xs text-muted-text">{fromLabel}</span>
                <span className="font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]">
                  {price}
                </span>
              </span>
            ) : (
              <span className="flex-1" />
            )}
            {onBook ? (
              <ButtonV4
                variant="primary"
                size="sm"
                // Fully booked DISABLES the CTA.
                disabled={fullyBooked}
                onClick={onBook}
                aria-label={`${bookLabel}, ${name}`}
              >
                {bookLabel}
              </ButtonV4>
            ) : null}
          </div>
        ) : null}
      </>
    );

    if (!onClick) {
      return (
        <CardV4 ref={ref} data-xen-stylist-card="" className={className} {...rest}>
          {body}
        </CardV4>
      );
    }

    return (
      <CardV4 ref={ref} data-xen-stylist-card="" className={cn('p-0', className)} {...rest}>
        <button
          type="button"
          onClick={onClick}
          aria-label={metaLine([
            name,
            role,
            typeof rating === 'number' ? `rated ${rating}` : null,
            reviews,
            fullyBooked ? fullyBookedLabel : availability,
          ])}
          data-xen-v4-chrome="on-surface"
          className="flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left"
        >
          {body}
        </button>
      </CardV4>
    );
  }
);
