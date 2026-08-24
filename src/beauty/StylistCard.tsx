import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Rating, Button } from '../primitives';
import { formatMoney, type MoneyFormatter } from '../commerce';

export type StylistCardVariant = 'detailed' | 'compact';

export interface StylistCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Stylist / practitioner name. */
  name: string;
  /** Role or title, e.g. "Senior Colorist". */
  role?: string;
  /** Specialties / tags (e.g. `['Balayage', 'Bridal']`). Guarded when empty. */
  specialties?: string[];
  /** Avatar image URL; initials fall back when absent. */
  avatarUrl?: string;
  /** Average rating (0–5). Hidden when omitted. */
  rating?: number;
  /** Number of reviews backing the rating. */
  reviewCount?: number;
  /** "From" price in integer cents. */
  priceFromCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  /** Availability note (e.g. "Next: Today 3pm"). */
  availability?: string;
  /** Marks the stylist fully booked; disables the CTA. */
  fullyBooked?: boolean;
  /** Density. `compact` drops specialties + CTA. */
  variant?: StylistCardVariant;
  /** Loading skeleton (ignores data). */
  loading?: boolean;
  /** CTA label (default "Book"). */
  bookLabel?: string;
  /** Fires when the CTA is pressed. */
  onBook?: () => void;
  /** Fires when the card body is activated. */
  onClick?: () => void;
}

/**
 * A stylist / practitioner profile card: avatar, name + role, an optional star
 * rating with review count, specialty chips, a "from" price and availability
 * line, plus a "Book" CTA. `variant="compact"` drops the chips and CTA for list
 * rows; `loading` shows a token-tinted skeleton; `fullyBooked` disables the CTA
 * and swaps its label. When `onClick` is set the body is a `role="button"` with
 * keyboard support. Token-only colors.
 */
export const StylistCard = React.forwardRef<HTMLDivElement, StylistCardProps>(
  function StylistCard(
    {
      name,
      role,
      specialties,
      avatarUrl,
      rating,
      reviewCount,
      priceFromCents,
      currency = 'USD',
      formatMoney: format = formatMoney,
      availability,
      fullyBooked = false,
      variant = 'detailed',
      loading = false,
      bookLabel = 'Book',
      onBook,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const tags = specialties ?? [];

    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-stylist-card=""
          aria-label="Loading stylist"
          aria-busy="true"
          className={cn(
            'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
            className
          )}
          {...rest}
        >
          <span className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-neutral-200" />
          <div className="flex flex-1 flex-col gap-[var(--xen-space-sm)]">
            <span className="h-3.5 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
            <span className="h-3 w-3/4 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          </div>
        </div>
      );
    }

    const compact = variant === 'compact';
    const priceText = priceFromCents != null ? `from ${format(priceFromCents, currency)}` : undefined;
    const interactive = !!onClick;
    const a11yLabel = `${name}${role ? `, ${role}` : ''}${
      rating != null ? `, rated ${rating} out of 5` : ''
    }${fullyBooked ? ', fully booked' : ''}`;

    return (
      <div
        ref={ref}
        data-xen-stylist-card=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11yLabel}
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
          'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          interactive && 'cursor-pointer transition-opacity hover:opacity-95',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <Avatar src={avatarUrl} name={name} size="lg" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-base font-bold text-on-surface">{name}</span>
            {role ? <span className="truncate text-sm text-muted">{role}</span> : null}
            {rating != null ? (
              <span className="flex items-center gap-[var(--xen-space-xs)]">
                <Rating value={rating} size="sm" />
                {reviewCount != null ? (
                  <span className="text-xs text-muted">({reviewCount})</span>
                ) : null}
              </span>
            ) : null}
          </div>
          {priceText ? (
            <span className="shrink-0 text-sm font-bold text-on-surface">{priceText}</span>
          ) : null}
        </div>

        {!compact && tags.length > 0 ? (
          <div className="flex flex-wrap gap-[var(--xen-space-xs)]">
            {tags.map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="rounded-full bg-primary-50 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {availability ? (
          <span
            className={cn(
              'text-xs font-semibold',
              fullyBooked ? 'text-warn' : 'text-success'
            )}
          >
            {availability}
          </span>
        ) : null}

        {!compact && onBook ? (
          <Button
            variant="primary"
            disabled={fullyBooked}
            onClick={(e) => {
              e.stopPropagation();
              onBook();
            }}
          >
            {fullyBooked ? 'Fully booked' : bookLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);
