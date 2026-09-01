import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { metaLine } from './internal/salon-v4';
import type { TreatmentCardProps, TreatmentVariant } from './TreatmentCard';

export interface TreatmentCardV4Props extends TreatmentCardProps {
  /** Override the treatment names — six English words lived inside. */
  variantLabels?: Partial<Record<TreatmentVariant, string>>;
  /** Format the duration. Default `'60 min'`. */
  formatDuration?: (minutes: number) => string;
}

/**
 * Treatment → glyph and default word.
 *
 * As with `ServiceMenuItemV4`: a treatment kind is not a status, so it does
 * not get a status colour. The base gave each one a `keyof SemanticColors`.
 */
const TREATMENT_META: Record<TreatmentVariant, { label: string; glyph: string }> = {
  facial: { label: 'Facial', glyph: '🧖' },
  massage: { label: 'Massage', glyph: '💆' },
  body: { label: 'Body', glyph: '🌿' },
  nails: { label: 'Nails', glyph: '💅' },
  hair: { label: 'Hair', glyph: '💇' },
  wellness: { label: 'Wellness', glyph: '🧘' },
};

/**
 * **V4 treatment card** — the web twin of the native `TreatmentCardV4`, same
 * props as {@link TreatmentCard} plus `variantLabels` and `formatDuration`.
 *
 * ## Four changes
 *
 * 1. **The category stops spending a status colour.**
 * 2. **The media box has a fixed 16:9 ratio and a `muted` ground**, so a grid
 *    does not reflow as images arrive and a missing image is not a pale
 *    rectangle on a dark page.
 * 3. **The price is in the display face and tabular.**
 * 4. **An interactive card is a real `<button>`**, and the whole card has one
 *    accessible name.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export const TreatmentCardV4 = React.forwardRef<HTMLDivElement, TreatmentCardV4Props>(
  function TreatmentCardV4(
    {
      name,
      priceCents,
      currency = 'USD',
      variant = 'facial',
      durationMin,
      description,
      imageUrl,
      formatMoney = defaultFormatMoney,
      bookLabel = 'Book',
      variantLabels,
      formatDuration,
      onBook,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    if (!name) return null;

    const meta = TREATMENT_META[variant] ?? TREATMENT_META.facial;
    const word = variantLabels?.[variant] ?? meta.label;
    const price = formatMoney(priceCents, currency);
    const duration =
      typeof durationMin === 'number'
        ? (formatDuration ?? ((m: number) => `${m} min`))(durationMin)
        : null;

    const body = (
      <>
        <span className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-muted">
          {imageUrl ? (
            <img src={imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <IconV4 glyph={meta.glyph} size="3xl" />
          )}
        </span>

        <div className="mt-md flex items-center gap-sm">
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <span className="truncate font-heading text-base font-bold text-on-card">{name}</span>
            {duration ? (
              <span className="text-xs text-muted-text [font-variant-numeric:tabular-nums]">
                {duration}
              </span>
            ) : null}
          </div>
          <BadgeV4 tone="neutral" variant="soft" size="sm">
            {word}
          </BadgeV4>
        </div>

        {description ? (
          <p className="mt-xs line-clamp-2 text-sm text-muted-text">{description}</p>
        ) : null}

        <div className="mt-md flex items-center justify-between gap-sm">
          <span className="font-heading text-lg font-bold text-on-card [font-variant-numeric:tabular-nums]">
            {price}
          </span>
          {onBook ? (
            <ButtonV4
              variant="primary"
              size="sm"
              onClick={onBook}
              aria-label={`${bookLabel}, ${name}`}
            >
              {bookLabel}
            </ButtonV4>
          ) : null}
        </div>
      </>
    );

    if (!onClick) {
      return (
        <CardV4 ref={ref} data-xen-treatment-card={variant} className={className} {...rest}>
          {body}
        </CardV4>
      );
    }

    return (
      <CardV4
        ref={ref}
        data-xen-treatment-card={variant}
        className={cn('p-0', className)}
        {...rest}
      >
        <button
          type="button"
          onClick={onClick}
          aria-label={metaLine([name, word, duration, price])}
          data-xen-v4-chrome="on-surface"
          className="flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left"
        >
          {body}
        </button>
      </CardV4>
    );
  }
);
