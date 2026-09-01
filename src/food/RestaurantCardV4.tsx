import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { RatingV4 } from '../primitives/RatingV4';
import { metaLine, ratingParts } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { BADGE_V4, PLACEHOLDER_CLASS, spokenLine } from './internal/menu-v4';
import type { RestaurantCardProps, RestaurantOpenState } from './RestaurantCard';
import type { ToneV4 } from './internal/menu-v4';

export interface RestaurantCardV4Props extends RestaurantCardProps {
  /** Override the availability words. */
  openLabels?: Partial<Record<RestaurantOpenState, string>>;
  /**
   * The **spoken** form of the price level. `$$$` announces as three currency
   * symbols — "dollar dollar dollar" — which is not what it means. The glyphs
   * stay on screen and are hidden from the reader; this is what it says
   * instead. Default `'Price level 3 of 4'`.
   */
  formatPriceLevel?: (level: number) => string;
}

const OPEN_LABEL: Record<RestaurantOpenState, string> = {
  open: 'Open',
  closed: 'Closed',
  busy: 'Busy',
};

/** Availability IS a status, so a status tone is what it is entitled to. */
const OPEN_TONE: Record<RestaurantOpenState, ToneV4> = {
  open: 'success',
  busy: 'warn',
  closed: 'neutral',
};

const MEDIA_LIST =
  'h-[calc(var(--xen-space-2xl)_*_2)] w-[calc(var(--xen-space-2xl)_*_2)] shrink-0';
const MEDIA_GRID = 'h-[calc(var(--xen-space-2xl)_*_2_+_var(--xen-space-lg))] w-full';
const MEDIA_HERO = 'h-[calc(var(--xen-space-2xl)_*_4)] w-full';

const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;

/** The maximum the base's `$`…`$$$$` scale runs to. */
const PRICE_LEVELS = 4;

/**
 * **V4 restaurant card** — the web twin of the native `RestaurantCardV4`, same
 * props as {@link RestaurantCard} plus `openLabels` and `formatPriceLevel`.
 *
 * ## Five changes
 *
 * 1. **The name carries the card.** `aria-label` was name, cuisine and the
 *    open state on a `role="button"` root, and that role is
 *    children-presentational — so the rating, the rating count, the price
 *    level, the ETA and the delivery fee were drawn and then pruned. Choosing
 *    a restaurant on those five figures is the entire task this card exists
 *    for.
 * 2. **`$$$` says what it means.** Three currency glyphs announce as three
 *    currency glyphs; `formatPriceLevel` gives the reader a sentence and the
 *    glyphs become decorative.
 * 3. **A closed restaurant stops getting brighter when you point at it — and
 *    the badge saying so stays legible.** The base compounded `opacity-70` on
 *    the photo inside `opacity-75` on the card — 0.525, most of the way to
 *    invisible — with `hover:opacity-90` on the same node, so hovering
 *    *un-dimmed* it. One dim now, on the photo alone; the name and the
 *    availability badge are at full strength, and press is the M3 state layer.
 * 4. **`busy` is not the same as `closed`.** Both resolved to a `neutral`
 *    badge, so a restaurant that is open and slammed looked exactly like one
 *    that is shut.
 * 5. **The card is a real button on the card tokens.** A `div` with
 *    `role="button"` and a hand-written Enter/Space handler, ringed in
 *    `primary-300` and painted on `surface`, becomes a `<button>` on
 *    `card`/`on-card` ringed in `ring`.
 */
export const RestaurantCardV4 = React.forwardRef<HTMLDivElement, RestaurantCardV4Props>(
  function RestaurantCardV4(
    {
      name,
      cuisine,
      rating,
      ratingCount,
      priceLevel,
      etaText,
      feeText,
      imageUrl,
      openState = 'open',
      variant = 'list',
      openLabels,
      formatPriceLevel,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!name) return null;

    const horizontal = variant === 'list';
    const dimmed = openState !== 'open';
    const openWord = openLabels?.[openState] ?? OPEN_LABEL[openState];

    const level = priceLevel ? Math.min(PRICE_LEVELS, Math.max(1, priceLevel)) : undefined;
    const priceGlyphs = level ? '$'.repeat(level) : undefined;
    const priceSpoken =
      level !== undefined
        ? (formatPriceLevel ?? ((l: number) => `Price level ${l} of ${PRICE_LEVELS}`))(level)
        : undefined;

    const rated =
      typeof rating === 'number' ? ratingParts({ value: rating, count: ratingCount }) : undefined;

    const spoken = spokenLine([
      name,
      cuisine,
      priceSpoken,
      rated?.label,
      etaText,
      feeText,
      openWord,
    ]);

    const media = (
      <span
        aria-hidden="true"
        className={cn(
          'relative block overflow-hidden rounded-[var(--xen-radius-md)]',
          horizontal ? MEDIA_LIST : variant === 'hero' ? MEDIA_HERO : MEDIA_GRID,
          /*
            One dim, on the decorative element and nothing else — it has no
            hover of its own, and the badge that explains the state keeps full
            contrast. 0.6 rather than M3's 0.38: a closed restaurant is still
            openable, so the *disabled* band would be a lie. Same value as the
            native twin, and as `DishCardV4`.
          */
          dimmed && 'opacity-60'
        )}
      >
        <span className={cn('absolute inset-0', PLACEHOLDER_CLASS)} />
        {imageUrl ? (
          <img src={imageUrl} alt="" loading="lazy" className="relative h-full w-full object-cover" />
        ) : null}
      </span>
    );

    const meta = metaLine([priceGlyphs, cuisine]);

    const body = (
      <span className={cn('flex min-w-0 flex-1 flex-col gap-xs', !horizontal && 'p-md')}>
        <span className="flex items-center justify-between gap-sm">
          <span className="min-w-0 flex-1 truncate font-heading font-bold text-on-card">{name}</span>
          <BadgeV4 {...BADGE_V4} tone={OPEN_TONE[openState]}>
            {openWord}
          </BadgeV4>
        </span>
        {meta !== '' ? (
          // The `$$$` half of this line is a glyph; the sentence is in the name.
          <span aria-hidden="true" className="truncate text-sm text-muted-text">
            {meta}
          </span>
        ) : null}
        {rated ? (
          <span className="flex items-center gap-xs">
            <RatingV4 value={rating as number} size="sm" showValue label={rated.label} />
            {typeof ratingCount === 'number' ? (
              <span className="text-xs text-muted-text">({ratingCount})</span>
            ) : null}
          </span>
        ) : null}
        {etaText || feeText ? (
          <span className="text-sm text-on-card">{metaLine([etaText, feeText])}</span>
        ) : null}
      </span>
    );

    const containerClass = cn(
      'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-card text-on-card',
      className
    );
    const layoutClass = horizontal ? 'flex flex-row items-start gap-md p-md' : 'flex flex-col';
    const interactive = typeof onClick === 'function';

    return (
      <div ref={ref} className={containerClass} {...rest}>
        {interactive ? (
          <button
            type="button"
            aria-label={spoken}
            onClick={onClick}
            data-xen-v4-state=""
            style={CARD_STATE}
            className={cn(
              'text-left',
              layoutClass,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {media}
            {body}
          </button>
        ) : (
          <div className={layoutClass}>
            {media}
            {body}
          </div>
        )}
      </div>
    );
  }
);
