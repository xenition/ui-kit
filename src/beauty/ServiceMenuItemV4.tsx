import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  rowEdgeClass,
} from '../dashboard/internal/row-v4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { metaLine } from './internal/salon-v4';
import type { ServiceCategory, ServiceMenuItemProps } from './ServiceMenuItem';

export interface ServiceMenuItemV4Props extends ServiceMenuItemProps {
  /** Override the category names — eight English words lived inside. */
  categoryLabels?: Partial<Record<ServiceCategory, string>>;
  /** Copy on the popular chip. Default `'Popular'`. */
  popularLabel?: string;
  /** Copy when the service cannot be booked. Default `'Unavailable'`. */
  unavailableLabel?: string;
  /** Format the duration. Default `'45 min'`. */
  formatDuration?: (minutes: number) => string;
  /** Draw the separator under the row. Default `false`. */
  last?: boolean;
}

/**
 * Category → glyph and default word.
 *
 * A treatment category is **not** a status: it does not mean good or bad, so
 * the glyph carries identity and the status colours stay free. The base
 * assigned each category a `keyof SemanticColors`, which spent `success` and
 * `warn` on "nails" and "waxing".
 */
const CATEGORY_META: Record<ServiceCategory, { label: string; glyph: string }> = {
  hair: { label: 'Hair', glyph: '💇' },
  nails: { label: 'Nails', glyph: '💅' },
  skin: { label: 'Skin', glyph: '🧴' },
  massage: { label: 'Massage', glyph: '💆' },
  makeup: { label: 'Makeup', glyph: '💄' },
  brows: { label: 'Brows', glyph: '👁' },
  waxing: { label: 'Waxing', glyph: '🕯' },
  spa: { label: 'Spa', glyph: '🧖' },
};

/**
 * **V4 service menu item** — the web twin of the native `ServiceMenuItemV4`,
 * same props as {@link ServiceMenuItem} plus five hooks.
 *
 * ## Four changes
 *
 * 1. **A category stops spending the status colours** — see
 *    {@link CATEGORY_META}.
 * 2. **An unavailable service is `aria-disabled` and inert**, where the base
 *    greyed it and kept the click live.
 * 3. **It is a row from the shared row line**, with tabular prices.
 * 4. **Nine English strings become props.**
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export const ServiceMenuItemV4 = React.forwardRef<HTMLDivElement, ServiceMenuItemV4Props>(
  function ServiceMenuItemV4(
    {
      name,
      priceCents,
      currency = 'USD',
      category,
      durationMin,
      description,
      popular = false,
      unavailable = false,
      pricePrefix,
      formatMoney = defaultFormatMoney,
      categoryLabels,
      popularLabel = 'Popular',
      unavailableLabel = 'Unavailable',
      formatDuration,
      last = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    if (!name) return null;

    const meta = category ? CATEGORY_META[category] : null;
    const categoryWord = category ? (categoryLabels?.[category] ?? meta!.label) : null;
    const price = formatMoney(priceCents, currency);
    const duration =
      typeof durationMin === 'number'
        ? (formatDuration ?? ((m: number) => `${m} min`))(durationMin)
        : null;
    const caption = metaLine([categoryWord, duration, description]);
    const live = Boolean(onClick) && !unavailable;

    return (
      <div
        ref={ref}
        data-xen-service-menu-item={category}
        data-xen-v4-chrome={live ? 'on-surface' : undefined}
        role={live ? 'button' : undefined}
        onClick={live ? onClick : undefined}
        aria-disabled={unavailable || undefined}
        aria-label={metaLine([name, caption, price, unavailable ? unavailableLabel : null])}
        className={cn(
          ROW_V4_BASE_CLASS,
          rowHeightClass(Boolean(caption)),
          !last && rowEdgeClass(),
          unavailable && 'opacity-[0.38]',
          className
        )}
        {...rest}
      >
        {meta ? <IconV4 glyph={meta.glyph} size="lg" /> : null}

        <div className={ROW_V4_TEXT_CLASS}>
          <span className="flex items-center gap-sm">
            <span className="truncate text-base font-semibold text-on-card">{name}</span>
            {popular && !unavailable ? (
              <BadgeV4 tone="accent" variant="soft" size="sm">
                {popularLabel}
              </BadgeV4>
            ) : null}
            {unavailable ? (
              <BadgeV4 tone="neutral" variant="soft" size="sm">
                {unavailableLabel}
              </BadgeV4>
            ) : null}
          </span>
          {caption ? <span className="truncate text-xs text-muted-text">{caption}</span> : null}
        </div>

        <div className={cn(ROW_V4_TRAILING_CLASS, 'items-baseline')}>
          {pricePrefix ? <span className="text-xs text-muted-text">{pricePrefix}</span> : null}
          <span className="font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]">
            {price}
          </span>
        </div>
      </div>
    );
  }
);
