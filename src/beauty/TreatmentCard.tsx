import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { formatMoney, type MoneyFormatter } from '../commerce';

export type TreatmentVariant = 'facial' | 'massage' | 'body' | 'nails' | 'hair' | 'wellness';

interface TreatmentMeta {
  glyph: string;
  label: string;
  /** Token `text-*` class for the price accent. */
  text: string;
}

const TREATMENT_META: Record<TreatmentVariant, TreatmentMeta> = {
  facial: { glyph: '🧖', label: 'Facial', text: 'text-success' },
  massage: { glyph: '💆', label: 'Massage', text: 'text-primary' },
  body: { glyph: '🌿', label: 'Body', text: 'text-accent' },
  nails: { glyph: '💅', label: 'Nails', text: 'text-accent' },
  hair: { glyph: '💇', label: 'Hair', text: 'text-primary' },
  wellness: { glyph: '🧘', label: 'Wellness', text: 'text-success' },
};

export interface TreatmentCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Treatment name, e.g. "Deep-tissue massage". */
  name: string;
  /** Price in integer cents. */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Category; drives icon, tag, and accent. Falls back to `wellness`. */
  variant?: TreatmentVariant;
  /** Duration in minutes. */
  durationMin?: number;
  /** Short description. */
  description?: string;
  /** Hero image URL; a token-tinted band shows when absent. */
  imageUrl?: string;
  /** Override the cents → string money formatter. */
  formatMoney?: MoneyFormatter;
  /** CTA label (default "Book"). Hidden when no `onBook`. */
  bookLabel?: string;
  /** Fires when the CTA is pressed. */
  onBook?: () => void;
  /** Fires when the card body is activated. */
  onClick?: () => void;
}

/**
 * A spa/salon treatment card: a hero image band with a category tag, the
 * treatment name, a duration · price meta line, an optional description, and a
 * "Book" CTA. `variant` sets the icon/tag/accent; a missing image degrades to a
 * token-tinted band with the category glyph. When `onClick` is set the body is a
 * `role="button"` with keyboard support. Prices are integer cents via
 * {@link formatMoney}. Token-only colors.
 */
export const TreatmentCard = React.forwardRef<HTMLDivElement, TreatmentCardProps>(
  function TreatmentCard(
    {
      name,
      priceCents,
      currency = 'USD',
      variant = 'wellness',
      durationMin,
      description,
      imageUrl,
      formatMoney: format = formatMoney,
      bookLabel = 'Book',
      onBook,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const meta = TREATMENT_META[variant] ?? TREATMENT_META.wellness;
    const priceText = format(priceCents, currency);
    const interactive = !!onClick;

    return (
      <div
        ref={ref}
        data-xen-treatment-card=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={`${meta.label}: ${name}${
          durationMin != null ? `, ${durationMin} minutes` : ''
        }, ${priceText}`}
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
          'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          interactive && 'cursor-pointer transition-opacity hover:opacity-95',
          className
        )}
        {...rest}
      >
        <div className="relative flex h-[132px] items-center justify-center bg-neutral-100">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <span aria-hidden="true" className="text-3xl">
              {meta.glyph}
            </span>
          )}
          <span className="absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)] rounded-full bg-on-surface px-[var(--xen-space-sm)] py-0.5 text-xs font-bold text-surface opacity-80">
            {meta.label}
          </span>
        </div>

        <div className="flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]">
          <span className="truncate text-lg font-bold text-on-surface">{name}</span>
          <span className="flex items-center gap-[var(--xen-space-sm)]">
            {durationMin != null ? (
              <span className="text-sm text-muted">{durationMin} min</span>
            ) : null}
            <span className={cn('text-base font-bold', meta.text)}>{priceText}</span>
          </span>
          {description ? (
            <span className="line-clamp-2 text-sm text-muted">{description}</span>
          ) : null}
          {onBook ? (
            <Button
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                onBook();
              }}
            >
              {bookLabel}
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
);
