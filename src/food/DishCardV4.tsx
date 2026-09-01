import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { RatingV4 } from '../primitives/RatingV4';
import { PriceTagV4 } from '../commerce/PriceTagV4';
import { formatMoney as defaultFormat } from '../commerce';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { ratingParts } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { PLACEHOLDER_CLASS, TABULAR_CLASS, spokenLine } from './internal/menu-v4';
import type { DishCardProps } from './DishCard';

export interface DishCardV4Props extends DishCardProps {
  /** The busy card's accessible name. Default `'Loading dish'`. */
  loadingLabel?: string;
}

/**
 * The photo, per variant — composed off the spacing scale rather than typed as
 * `88`/`140`/`180`, so a denser seed re-scales the card with the rest of the
 * product. `2xl * 3` and `2xl * 4` are the same two covers `EventCardV4` uses.
 */
const MEDIA_LIST =
  'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-xl)_+_var(--xen-space-sm))] shrink-0';
const MEDIA_GRID = 'h-[calc(var(--xen-space-2xl)_*_3)] w-full';
const MEDIA_FEATURED = 'h-[calc(var(--xen-space-2xl)_*_4)] w-full';

/** The card's own pair, so its state layer is opaque against the card. */
const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;

/** The add button's pair — the layer is computed against `primary`, not the card. */
const PRIMARY_STATE = stateGroundVars(
  'var(--xen-primary)',
  'var(--xen-on-primary)'
) as React.CSSProperties;

/**
 * **V4 dish card** — the web twin of the native `DishCardV4`, same props as
 * {@link DishCard} plus `loadingLabel`.
 *
 * ## Six changes
 *
 * 1. **A screen reader hears more than the dish's name.** `aria-label={name}`
 *    sat on a `role="button"` root, and that role is children-presentational —
 *    so the price, the rating and, worst of all, the allergen and dietary
 *    badges were pruned out of the accessibility tree. Someone with a coeliac
 *    or nut allergy got a bare list of dish names while the sighted view beside
 *    them showed every marker. The price and the rating are now folded into the
 *    activation's name through `spokenLine`, and the badges are lifted **out**
 *    of the activation so their own text is reached — `badges` is an opaque
 *    `ReactNode`, and no string could honestly carry it.
 * 2. **The add button is a sibling of the card's activation, not a child.**
 *    Nesting it inside `role="button"` was invalid ARIA and it double-fired:
 *    0.8.0 landed `stopPropagation` in the V2/V3 variants and left the classic
 *    unguarded, and the key path could not be guarded that way at all — the
 *    card's `onKeyDown` ran `preventDefault()`, which cancels the very click
 *    Enter was about to perform on the button. A keyboard user added nothing
 *    and navigated away instead.
 * 3. **`soldOut` genuinely blocks activation.** The base set `aria-disabled`
 *    and then called `onClick` anyway, so the user who could not hear that a
 *    dish contains gluten could also add a sold-out one to their cart.
 * 4. **Sold-out and hover stop fighting, and the words stay legible.** The dim
 *    and `hover:opacity-90` sat on one element, so a sold-out dish got
 *    *brighter* under the pointer — and the dim covered the whole card, which
 *    made "Sold out", the text that *explains* the state, the least readable
 *    thing on it. The photo dims; the name, the price and `soldOutLabel` are at
 *    full strength. Not 0.38: that is M3's *disabled* band, and a sold-out dish
 *    is a dish you can still open and read.
 * 5. **The skeleton is the shared opaque placeholder**, not `bg-neutral-200` —
 *    a neutral ramp step mirrors under `[data-theme="dark"]`, so the loading
 *    card was a near-white slab on a dark menu.
 * 6. **The card is inked with the contrast-corrected slots.** The body ran on
 *    `text-muted` — a *fill* — over `surface`, under a raised card.
 */
export const DishCardV4 = React.forwardRef<HTMLDivElement, DishCardV4Props>(function DishCardV4(
  {
    name,
    description,
    priceCents,
    currency = 'USD',
    imageUrl,
    rating,
    badges,
    variant = 'list',
    soldOut = false,
    loading = false,
    onClick,
    onAdd,
    addLabel = 'Add',
    soldOutLabel = 'Sold out',
    loadingLabel = 'Loading dish',
    formatMoney,
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  const horizontal = variant === 'list';
  const containerClass = cn(
    'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-card text-on-card',
    className
  );
  const layoutClass = horizontal ? 'flex flex-row items-start gap-md p-md' : 'flex flex-col';

  if (loading) {
    return (
      <div
        ref={ref}
        role="status"
        aria-busy="true"
        aria-label={loadingLabel}
        className={containerClass}
        {...rest}
      >
        {/* The shape it is about to be, not a spinner that collapses the card. */}
        <div className={layoutClass}>
          <div className={cn(PLACEHOLDER_CLASS, horizontal ? MEDIA_LIST : MEDIA_GRID)} />
          <div className={cn('flex flex-1 flex-col gap-sm', !horizontal && 'p-md')}>
            <div className={cn('h-[var(--xen-text-lg)] w-3/5', PLACEHOLDER_CLASS)} />
            <div className={cn('h-[var(--xen-text-sm)] w-11/12', PLACEHOLDER_CLASS)} />
          </div>
        </div>
      </div>
    );
  }

  if (!name) return null;

  const money = formatMoney ?? defaultFormat;
  const priceText = typeof priceCents === 'number' ? money(priceCents, currency) : undefined;
  const rated = typeof rating === 'number' ? ratingParts({ value: rating }) : undefined;

  /*
    Everything a sighted user can read off the card, in one name. The badges
    cannot join it — there is no honest way to turn an arbitrary element into a
    string — so they are rendered outside the activation instead, where a
    reader reaches their own text.
  */
  const spoken = spokenLine([
    name,
    description,
    priceText,
    rated?.label,
    soldOut ? soldOutLabel : undefined,
  ]);

  const media = (
    <span
      aria-hidden="true"
      className={cn(
        'relative block overflow-hidden rounded-[var(--xen-radius-md)]',
        horizontal ? MEDIA_LIST : variant === 'featured' ? MEDIA_FEATURED : MEDIA_GRID,
        /*
          The one dim, on the decorative element and nothing else: it has no
          hover of its own, so no opacity ever shares a node with a `hover:`
          variant again, and the copy explaining the state keeps full contrast.
          0.6 rather than M3's 0.38 — that band means *disabled*, and this dish
          is unavailable, not inoperable. The native twin dims by the same
          amount.
        */
        soldOut && 'opacity-60'
      )}
    >
      {/*
        The ground is a child rather than a class on the frame:
        `PLACEHOLDER_CLASS` carries its own radius, and two arbitrary
        `rounded-[…]` values on one element resolve by stylesheet order.
      */}
      <span className={cn('absolute inset-0', PLACEHOLDER_CLASS)} />
      {imageUrl ? (
        <img src={imageUrl} alt="" loading="lazy" className="relative h-full w-full object-cover" />
      ) : null}
    </span>
  );

  const text = (
    <span className={cn('flex min-w-0 flex-1 flex-col gap-xs', !horizontal && 'p-md')}>
      <span
        className={cn(
          'font-heading font-semibold text-on-card',
          horizontal ? 'truncate' : 'line-clamp-2'
        )}
      >
        {name}
      </span>
      {description ? (
        <span className="line-clamp-2 text-sm text-muted-text">{description}</span>
      ) : null}
      {rated ? <RatingV4 value={rating as number} size="sm" showValue label={rated.label} /> : null}
      {typeof priceCents === 'number' ? (
        <span className={cn('mt-xs', TABULAR_CLASS)}>
          <PriceTagV4 cents={priceCents} currency={currency} formatMoney={formatMoney} />
        </span>
      ) : null}
    </span>
  );

  const interactive = typeof onClick === 'function';

  return (
    <div ref={ref} className={containerClass} {...rest}>
      {interactive ? (
        <button
          type="button"
          // Rule E: sold out means the handler does not fire, and the card
          // leaves the tab order rather than lying about being disabled.
          disabled={soldOut}
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
          {text}
        </button>
      ) : (
        <div className={layoutClass}>
          {media}
          {text}
        </div>
      )}

      {/*
        Badges and the add action are SIBLINGS of the activation. Inside it the
        badges were presentational — the module's headline defect — and the add
        button was a nested control in a `role="button"`.
      */}
      {badges || soldOut || onAdd ? (
        <div className="flex flex-wrap items-center justify-between gap-sm px-md pb-md">
          <div className="flex min-w-0 flex-wrap items-center gap-xs">{badges}</div>
          {soldOut ? (
            <span className="text-sm font-semibold text-danger-text">{soldOutLabel}</span>
          ) : onAdd ? (
            <button
              type="button"
              // A bare "Add" in a list of twenty dishes names nothing.
              aria-label={spokenLine([addLabel, name])}
              onClick={onAdd}
              data-xen-v4-state=""
              style={PRIMARY_STATE}
              className={cn(
                'inline-flex shrink-0 items-center justify-center px-md',
                MIN_TAP_CLASS,
                'rounded-[var(--xen-radius-md)] bg-primary text-sm font-semibold text-on-primary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              {addLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
