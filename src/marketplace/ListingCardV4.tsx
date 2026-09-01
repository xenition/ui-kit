import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TextV4 } from '../primitives/TextV4';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import { stateGroundVars, V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { PriceTagV4 } from '../commerce/PriceTagV4';
import { GenerativeCoverV4 } from '../commerce/GenerativeCoverV4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import type { MoneyFormatter } from '../commerce/money';
import { ConditionBadgeV4, CONDITION_V4_LABEL } from './ConditionBadgeV4';
import { activateOnKey } from './internal';
import type { ListingCardProps, ListingCardVariant } from './ListingCard';

export type { ListingCardVariant };

/**
 * The media box's proportion — **the same four names `ProductCardV4` uses.**
 *
 * That card's own doc comment asks for this by name: "four ratios, no
 * free-form number, because `ListingCardV4` in `marketplace` mirrors this card
 * and the two must be able to agree by name — a storefront and a marketplace
 * have to read as one product."
 *
 * The union is restated here rather than imported so that neither module
 * depends on the other's build order; the values are identical and a shared
 * type is a reasonable thing for the barrel pass to hoist later.
 */
export type ListingCardV4Aspect = '1:1' | '4:5' | '3:4' | '16:9';

/** The named ratios as a CSS `aspect-ratio`. */
const ASPECT_CLASS: Record<ListingCardV4Aspect, string> = {
  '1:1': 'aspect-square',
  '4:5': 'aspect-[4/5]',
  '3:4': 'aspect-[3/4]',
  '16:9': 'aspect-[16/9]',
};

/**
 * The default ratio per layout, so a caller who says nothing still gets the
 * right shape: a grid tile mirrors `ProductCardV4`'s `4:5`, a featured card is
 * a banner, and a list row's thumbnail is a square because the *row* owns the
 * height.
 */
const DEFAULT_ASPECT: Record<ListingCardVariant, ListingCardV4Aspect> = {
  grid: '4:5',
  list: '1:1',
  featured: '16:9',
};

export interface ListingCardV4Props extends ListingCardProps {
  /**
   * The media box's proportion. Defaults per {@link ListingCardProps.variant} —
   * `4:5` for `grid` (the storefront tile's shape), `16:9` for `featured`,
   * `1:1` for the `list` thumbnail.
   *
   * A **fixed** ratio is the point, and it is the fix for a real twin
   * divergence: the web base pinned the grid at `aspect-[4/3]` while its
   * native twin gave the same variant a fixed height of `160`, so one prop
   * produced two shapes.
   */
  aspect?: ListingCardV4Aspect;
  /**
   * Carry `elevation.card`. Default `true` — §4.6 gives a shadow to "a card
   * sitting on the page", and a listing in a browse grid is exactly that.
   * Pass `false` for a listing card nested inside another card; §4.6 forbids
   * nesting a shadow in a shadow.
   */
  raised?: boolean;
  /**
   * Locale override for the price, handed straight to `PriceTagV4`.
   *
   * Rule 1 asks that every amount go through `formatMoney` **and** stay
   * overridable per call; the base card composed `PriceTag` without exposing
   * the override, so a card inside a locale-aware page could not be told about
   * it while the tag it contained could.
   */
  formatMoney?: MoneyFormatter;
  /**
   * The card's **one** badge slot, drawn over the top-left of the media —
   * the same slot, in the same corner, as `ProductCardV4`'s. Defaults to a
   * `ConditionBadgeV4` built from {@link ListingCardProps.condition}.
   *
   * One slot, deliberately: a tile that can carry three badges gets three
   * badges, and a page of tiles each shouting two things has no hierarchy left
   * for the thing it is selling (§7). Passing this **replaces** the condition
   * chip rather than adding to it.
   */
  badge?: React.ReactNode;
}

/** The one `<style>` id this component injects its own sheet from. Idempotent. */
export const LISTING_CARD_V4_STYLE_ID = 'xen-v4-listing-card-styles';

/**
 * §4.2's headline fix, and the reason it cannot be a class.
 *
 * `CardV4` hard-codes `bg-surface text-on-surface` in its own class list and
 * `cn()` is a plain string join with no `tailwind-merge` behind it, so passing
 * `bg-card` in `className` would put both utilities on the element and let the
 * generated stylesheet's ordering pick the winner — and Tailwind sorts
 * background utilities alphabetically, which puts `.bg-card` *before*
 * `.bg-surface` and makes the override lose. Two attributes (0-2-0) beat one
 * class (0-1-0) wherever the two sheets happen to land.
 */
export const LISTING_CARD_V4_CSS = `
[data-xen-v4-card][data-xen-v4-listing-card] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
`;

/**
 * **V4 listing card** — the marketplace's product card, and deliberately
 * indistinguishable from the storefront's.
 *
 * Brief §3 Group C: "`ListingCardV4` mirrors `ProductCardV4` — same ground,
 * same image ratio — so a storefront and a marketplace read as one product."
 * The anatomy below is that card's, slot for slot, read off
 * `commerce/ProductCardV4` rather than guessed:
 *
 * ```
 * [ media at a FIXED ratio, one badge over its top-left ]   ← edge to edge
 * [ title, at most two lines                            ]   ┐
 * [ PriceTagV4                                          ]   │ padding md
 * [ condition / location line                           ]   ┘
 * ```
 *
 * The card is `padding="none"` and the body carries the inset, so the photo
 * runs to the card's corners exactly as the storefront tile's does. The one
 * slot the storefront card does not have is the **watch toggle**, top-right,
 * opposite the badge — a marketplace affordance with no catalogue equivalent.
 *
 * That anatomy settles the one thing the base got backwards. **The price moved
 * below the title.** The base led with the price and put the title under it,
 * which reads as a price list rather than a catalogue: a shopper scanning a
 * grid is looking for *what a thing is*, then what it costs. It is also the
 * order `ProductCardV4` is built in, and the whole point of this component is
 * that the two are one card.
 *
 * The rest:
 *
 * 1. **The ground is `card`** (§4.2). The base painted `surface` — the colour
 *    of the page — so a grid on a dark page was a flat sheet of same-coloured
 *    rectangles held apart by hairlines.
 * 2. **The price is `PriceTagV4`** (rule 7), which carries the tabular figures
 *    (rule 2), the display face, the step up the type scale, and the announced
 *    `Was …` on a compare-at. Nothing here draws a number.
 * 3. **The watch chip clears the tap floor.** It was a 32 square — a control a
 *    shopper taps repeatedly, drawn below the 44 HIG floor, which is the same
 *    defect §2 records against `QuantityStepper`.
 * 4. **A watched listing is not in danger.** The base painted the filled heart
 *    `danger`; rule 3 reserves that tone for *bad*, and saving something you
 *    like is the opposite. It takes the brand.
 * 5. **The accessible name says the grade in words.** The base announced the
 *    raw slug — "Vintage camera, $125.00, like-new". See
 *    {@link CONDITION_V4_LABEL}.
 * 6. **Loading is a skeleton at the card's own footprint**, not the string
 *    "Loading listing…", which is a sentence where a card should be.
 * 7. **Press feedback is the state layer** (§4.3), given the opaque
 *    `card`/`onCard` pair because the title's contrast promise is made against
 *    the fill the card actually wears.
 *
 * ## The one place it diverges from `ProductCardV4`, and why
 *
 * That card carries **no** container state layer, and its note explains why: on
 * web it is not itself a control — its anchors are — and a plain `<div>` cannot
 * take `:focus-visible`, so a layer on it would be a hover-only affordance a
 * keyboard user never meets.
 *
 * This card *is* the control. Its base contract is `onClick` **on the card**,
 * which makes it a `role="button"` with `tabIndex={0}` — focusable, so the
 * layer is reachable from the keyboard as well as the pointer, and it comes
 * with a real focus ring. Same rule, opposite answer, because the premise
 * differs. A card that is not interactive gets neither.
 *
 * Composes `CardV4`, `PriceTagV4`, `ConditionBadgeV4`, `IconV4`, `TextV4` and
 * `SkeletonV4` (rule 7). Renders **nothing** without a title (§4.5).
 */
export const ListingCardV4 = React.forwardRef<HTMLDivElement, ListingCardV4Props>(
  function ListingCardV4(
    {
      title,
      priceCents,
      currency = 'USD',
      compareAtCents,
      imageUrl,
      condition,
      subtitle,
      watched = false,
      onToggleWatch,
      variant = 'grid',
      loading = false,
      aspect,
      raised = true,
      formatMoney = defaultFormatMoney,
      badge,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(LISTING_CARD_V4_STYLE_ID, LISTING_CARD_V4_CSS);
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const horizontal = variant === 'list';
    const interactive = onClick != null;

    // A listing with no headline is the blank bordered box §4.5 rules out.
    if (title === undefined || title === null || title === '') return null;

    const ratio = aspect ?? DEFAULT_ASPECT[variant];

    const chip =
      badge !== undefined ? (
        badge
      ) : condition !== undefined ? (
        <ConditionBadgeV4 condition={condition} size="sm" />
      ) : null;

    const watchChip =
      onToggleWatch != null ? (
        <button
          type="button"
          aria-label={watched ? `Unwatch ${title}` : `Watch ${title}`}
          aria-pressed={watched}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatch(!watched);
          }}
          data-xen-v4-listing-watch=""
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
          className={cn(
            'absolute right-sm top-sm z-10 inline-flex items-center justify-center',
            // The HIG tap floor, not a 32 square: this is a control a shopper
            // taps repeatedly.
            MIN_TAP_SQUARE_CLASS,
            'rounded-[var(--xen-radius-full)] bg-card',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {/*
            `heart` is in the named set; its hollow twin is not, so the
            unwatched state takes `glyph` — the escape hatch `IconV4` documents
            for "a one-off glyph the named set has no name for". Rule 3: a
            saved listing is emphasis, so the filled heart is `primary`, never
            `danger`.
          */}
          <IconV4
            name={watched ? 'heart' : undefined}
            glyph={watched ? undefined : '♡'}
            size="base"
            color={watched ? 'primary' : 'muted'}
          />
        </button>
      ) : null;

    const media = (
      <div
        data-xen-v4-listing-media=""
        className={cn(
          'relative shrink-0 overflow-hidden',
          /*
            `muted`, not `bg-neutral-100`. The neutral ramp carries the LIGHT
            orientation in both schemes, so the base's placeholder was a pale
            rectangle punched into a dark page. `ProductCardV4` reaches for the
            same semantic slot, which is half of why the two wells look alike.
          */
          'bg-muted',
          ASPECT_CLASS[ratio],
          horizontal ? 'h-auto w-[calc(var(--xen-space-2xl)_*_2)]' : 'w-full'
        )}
      >
        {imageUrl !== undefined && imageUrl !== '' ? (
          <img src={imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          /*
            The same plate `ProductCardV4` falls back to, from the same seed —
            so a listing with no photo and a catalogue product with no photo are
            the same picture rather than two different apologies.

            Deliberately unlabelled: it is a placeholder, not a picture of the
            item, and the title is printed directly beneath it. Labelling it
            would announce the listing twice.
          */
          <GenerativeCoverV4 seed={title} className="h-full w-full" />
        )}
        {/* One badge, top-left — the same slot, in the same corner, as `ProductCardV4`'s. */}
        {chip !== null ? <div className="absolute left-sm top-sm">{chip}</div> : null}
      </div>
    );

    const info = (
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-xs p-md">
        {loading ? (
          <SkeletonV4 variant="text" lines={3} />
        ) : (
          <>
            <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={2}>
              {title}
            </TextV4>
            <PriceTagV4
              cents={priceCents}
              currency={currency}
              compareAtCents={compareAtCents}
              formatMoney={formatMoney}
              size={variant === 'featured' ? 'lg' : 'md'}
            />
            {subtitle !== undefined && subtitle !== '' ? (
              <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
                {subtitle}
              </TextV4>
            ) : null}
          </>
        )}
      </div>
    );

    const shared = {
      'data-xen-v4-listing-card': variant,
      variant: (raised ? 'elevated' : 'outlined') as 'elevated' | 'outlined',
      radius: 'lg' as const,
      // The media runs to the card's corners; the body carries the inset.
      padding: 'none' as const,
      className: cn(
        'relative overflow-hidden',
        horizontal ? 'flex flex-row' : 'flex flex-col',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      ),
    };

    if (!interactive) {
      return (
        <CardV4 ref={ref} {...shared} {...rest}>
          {media}
          {info}
          {watchChip}
        </CardV4>
      );
    }

    const priceLabel = formatMoney(priceCents, currency);
    const grade = condition !== undefined ? (CONDITION_V4_LABEL[condition] ?? condition) : undefined;

    /*
      A `role="button"` container rather than a real `<button>`: the state layer
      has to sit on the element that owns the ground, and the watch chip is a
      real `<button>` *inside* it, which a `<button>` parent cannot legally
      contain.
    */
    return (
      <CardV4
        ref={ref}
        {...shared}
        {...rest}
        role="button"
        tabIndex={0}
        aria-label={`${title}, ${priceLabel}${grade !== undefined ? `, ${grade}` : ''}`}
        data-xen-v4-state=""
        style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
        onClick={onClick}
        onKeyDown={activateOnKey}
      >
        {media}
        {info}
        {watchChip}
      </CardV4>
    );
  }
);
