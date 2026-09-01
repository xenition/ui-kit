import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { PriceTagV4 } from './PriceTagV4';
import { GenerativeCoverV4 } from './GenerativeCoverV4';
import type { ProductCardProps } from './ProductCard';

/**
 * The image box's proportion. A **fixed** ratio is the point: a grid whose
 * tiles are each as tall as whatever photo the seller uploaded is the single
 * loudest "nobody laid this out" signal a storefront can send, and it is what
 * makes an add button land at a different height in every column.
 *
 * Four ratios, no free-form string, because `ListingCardV4` in `marketplace`
 * mirrors this card and the two must be able to agree by name — a storefront
 * and a marketplace have to read as one product.
 */
export type ProductCardV4Aspect = '1:1' | '4:5' | '3:4' | '16:9';

/**
 * Static class strings so Tailwind's scanner can see every variant. `4:5` is
 * the base's ratio and stays the default — V4 changes the design line, not the
 * shape of a catalog someone already shipped.
 */
const ASPECT_CLASS: Record<ProductCardV4Aspect, string> = {
  '1:1': 'aspect-square',
  '4:5': 'aspect-[4/5]',
  '3:4': 'aspect-[3/4]',
  '16:9': 'aspect-[16/9]',
};

export interface ProductCardV4Props extends ProductCardProps {
  /**
   * One badge, drawn over the top-left of the media — "Sale", "Sold out",
   * "New". Takes a `BadgeV4` or a `StatusBadgeV4`.
   *
   * **One** slot on purpose. A tile that can carry three badges gets three
   * badges, and a catalog page of tiles each shouting two things has no
   * hierarchy left for the thing it is actually selling (§5, §7).
   */
  badge?: React.ReactNode;
  /** The media box's proportion. Default `'4:5'`. */
  aspect?: ProductCardV4Aspect;
  /**
   * Whether the card carries `elevation.card`. Default `true` — a product tile
   * is the on-page card.
   *
   * Pass `false` when the grid sits **inside** another card: §4.6 is explicit
   * that a card inside a card is flat, and never nesting a shadow in a shadow
   * is the whole of that section.
   */
  raised?: boolean;
}

/** The one `<style>` id this component injects from. Idempotent. */
export const PRODUCT_CARD_V4_STYLE_ID = 'xen-v4-product-card-styles';

/**
 * The card ground, and why it is a sheet rather than a class.
 *
 * §4.2's headline fix: this card paints `--xen-card`, not `--xen-surface`, so a
 * tile reads as raised on the page in **both** schemes. `CardV4` hard-codes
 * `bg-surface text-on-surface` in its own class list, and `cn()` is a plain
 * string join with no `tailwind-merge` behind it — passing `bg-card` through
 * `className` would put both utilities on the element and let the generated
 * stylesheet's ordering pick the winner. Tailwind sorts background utilities
 * alphabetically, which puts `.bg-card` *before* `.bg-surface`: the override
 * would lose, silently, and the most visible bug in the module would survive
 * the pass that exists to fix it.
 *
 * So the override is made by **specificity**: two attributes (0-2-0) against a
 * single class (0-1-0) wins wherever the sheets land. Identical to the trick
 * `StatCardV4` uses, for the identical reason.
 */
export const PRODUCT_CARD_V4_CSS = `
[data-xen-v4-card][data-xen-v4-product-card] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
`;

/**
 * **V4 product card** — the flagship of the `commerce` module, and the
 * anatomy `ListingCardV4` mirrors so that a storefront and a marketplace read
 * as one product.
 *
 * Same props as {@link ProductCard} plus three, a different design line.
 *
 * ## The anatomy, top to bottom
 *
 * ```
 * [ media at a FIXED ratio, one badge over it ]
 * [ title, at most two lines                  ]
 * [ PriceTagV4                                ]
 * [ optional add button, full width           ]
 * ```
 *
 * Nothing else. Every slot a catalog tile is tempted to grow — a rating, a
 * seller, a colour swatch row, a second badge — is a thing the grid has to
 * make room for in every column, and §7 asks for subtraction first.
 *
 * ## Six changes
 *
 * 1. **The ground is `card`, not `surface`.** The single most visible fix in
 *    the pass. Every card in this module paints the same colour as the page it
 *    sits on, which is why the border was doing all the work and why a product
 *    grid on a dark page read as a flat sheet of identical rectangles. See
 *    {@link PRODUCT_CARD_V4_CSS} for why the override is a sheet.
 * 2. **The media ratio is fixed and named.** The base pinned `aspect-[4/5]`
 *    with no way to say otherwise; `aspect` names four, and `ListingCardV4`
 *    reads the same four.
 * 3. **The title is capped at two lines.** The base let it run, so one product
 *    with a long name pushed its price down and broke the row it was in. Two
 *    lines with an ellipsis, via `TextV4`'s `numberOfLines` — the prop the
 *    native twin has always had, on both twins now.
 * 4. **The price is the price.** `PriceTagV4`, which sets it a step up the
 *    scale in tabular figures on the display face, rather than the base line's
 *    caption-sized number. A discounted price still does not turn red (§35.4).
 * 5. **The media placeholder is a semantic slot.** `bg-muted`, not
 *    `bg-neutral-100` — the neutral ramp carries the *light* orientation in
 *    both schemes, so the base's placeholder was a pale rectangle on a dark
 *    page. And the fallback art is `GenerativeCoverV4`, so a card with no
 *    photo is the same plate on both platforms (§10.5).
 * 6. **One link, one accessible name.** The base rendered two anchors to the
 *    same `href` — one round the image carrying `aria-label={title}`, one
 *    round the title — so a screen reader met the product twice and a keyboard
 *    user tabbed through it twice. V4 keeps the image clickable (a shopper
 *    expects that) but makes it `aria-hidden` and unfocusable, and lets the
 *    title anchor be the one name.
 *
 * **Renders nothing when `title` is empty.** §4.5: a component with nothing to
 * show renders nothing or an empty state, never a blank bordered box — and a
 * product tile with no product is exactly that box.
 *
 * ## What it does not do
 *
 * There is no container hover layer. On web this card is not itself a control
 * — the anchors are — and a `<div>` cannot take `:focus-visible`, so a state
 * layer on it would be a hover-only affordance that a keyboard user never
 * sees. The title anchor underlines instead. (The native twin *is* one
 * pressable, so it does get the state layer; see that file.)
 */
export const ProductCardV4 = React.forwardRef<HTMLDivElement, ProductCardV4Props>(
  function ProductCardV4(
    {
      title,
      priceCents,
      currency = 'USD',
      compareAtCents,
      imageUrl,
      imageAlt,
      slug,
      href,
      onAdd,
      addLabel = 'Add to cart',
      formatMoney,
      badge,
      aspect = '4:5',
      raised = true,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(PRODUCT_CARD_V4_STYLE_ID, PRODUCT_CARD_V4_CSS);

    // A tile with no product is a blank bordered box (§4.5).
    if (!title) return null;

    const media = imageUrl ? (
      <img
        src={imageUrl}
        alt={imageAlt ?? title}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    ) : (
      // Deliberately unlabelled: the generated plate is a placeholder, not a
      // picture of the product, and the title is printed directly beneath it.
      // Labelling it would announce the product name twice.
      <GenerativeCoverV4 seed={slug ?? title} className="h-full w-full" />
    );

    return (
      <CardV4
        ref={ref}
        data-xen-product-card=""
        data-xen-v4-product-card=""
        variant={raised ? 'elevated' : 'outlined'}
        radius="lg"
        padding="none"
        className={cn('flex flex-col overflow-hidden', className)}
        {...rest}
      >
        <div
          data-xen-product-media=""
          className={cn('relative w-full overflow-hidden bg-muted', ASPECT_CLASS[aspect])}
        >
          {href ? (
            // Clickable, but neither focusable nor announced: the title anchor
            // below is the one name for this destination.
            <a href={href} aria-hidden="true" tabIndex={-1} className="block h-full w-full">
              {media}
            </a>
          ) : (
            media
          )}
          {badge ? (
            <div
              data-xen-product-badge=""
              className="absolute left-[var(--xen-space-sm)] top-[var(--xen-space-sm)]"
            >
              {badge}
            </div>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-xs p-md">
          <h3 className="m-0 min-w-0">
            {href ? (
              <a href={href} className="no-underline hover:underline focus-visible:underline">
                <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={2}>
                  {title}
                </TextV4>
              </a>
            ) : (
              <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={2}>
                {title}
              </TextV4>
            )}
          </h3>
          <PriceTagV4
            cents={priceCents}
            currency={currency}
            compareAtCents={compareAtCents}
            formatMoney={formatMoney}
          />
          {onAdd ? (
            <ButtonV4 type="button" size="sm" onClick={onAdd} className="mt-xs w-full">
              {addLabel}
            </ButtonV4>
          ) : null}
        </div>
      </CardV4>
    );
  }
);
