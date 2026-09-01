import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import { resolveIconGlyph } from '../primitives/icon-names';
import { MIN_TAP_CLASS } from '../primitives/internal/nav-v4';
import { stateGroundVars, V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { activateOnKey } from './internal';
import type { SellerCardProps, SellerCardVariant } from './SellerCard';

export type { SellerCardVariant };

export interface SellerCardV4Props extends SellerCardProps {
  /**
   * Carry `elevation.card`. Default `true` for the `card` variant — §4.6 gives
   * a shadow to "a card sitting on the page", and this is one. Ignored by
   * `inline`, which has no card to raise.
   *
   * Pass `false` for a seller card nested inside another card; §4.6 forbids
   * nesting a shadow in a shadow.
   */
  raised?: boolean;
  /**
   * The word beside the verified mark. Default `Verified`.
   *
   * A prop rather than a constant because it is the one string in this
   * component a marketplace will want to say in its own vocabulary — "ID
   * checked", "Trusted shop" — and because it has to be translatable. It is
   * **not** a way to turn the word off: rule 6 makes the word mandatory, and
   * an empty string falls back to the default rather than leaving a bare tick.
   */
  verifiedLabel?: string;
  /**
   * What the trust line says when there is no rating yet.
   * Default `No ratings yet`.
   *
   * Silence is the wrong answer here. A seller with no history is a *fact* a
   * buyer needs, and omitting the line makes an unrated seller and a seller
   * whose rating failed to load look identical.
   */
  emptyRatingLabel?: string;
}

/** The one `<style>` id this component injects its own sheet from. Idempotent. */
export const SELLER_CARD_V4_STYLE_ID = 'xen-v4-seller-card-styles';

/**
 * §4.2's headline fix. `CardV4` hard-codes `bg-surface text-on-surface` in its
 * own class list and `cn()` is a plain string join with no `tailwind-merge`
 * behind it, so `bg-card` in `className` would put both utilities on the
 * element and let stylesheet order pick the winner — and Tailwind sorts
 * background utilities alphabetically, which puts `.bg-card` *before*
 * `.bg-surface` and makes the override lose. Two attributes (0-2-0) beat one
 * class (0-1-0) wherever the sheets land.
 */
export const SELLER_CARD_V4_CSS = `
[data-xen-v4-card][data-xen-v4-seller-card] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
`;

/**
 * **V4 seller card** — half of the trust pair, with `RatingBreakdownV4`, and
 * the highest-stakes read in the kit.
 *
 * Brief §3 Group C: "rating as a number *and* stars *and* a count, never stars
 * alone", and rule 6: "a verified seller… ships an icon **and** a label".
 * Everything below is one of those two sentences.
 *
 * 1. **The rating is three channels, not one.** The base composed
 *    `Rating showValue` — glyphs with a small number tucked inside them — and
 *    a parenthesised count beside it. V4 pulls the figure out as its own
 *    tabular text at a step the eye lands on first, keeps `RatingV4` beside it
 *    as the shape, and spells the count as words (`1,204 reviews`) rather than
 *    as `(1,204)`, which reads as a footnote marker when announced.
 * 2. **A missing rating says so.** See
 *    {@link SellerCardV4Props.emptyRatingLabel}.
 * 3. **Verified is a mark and a word**, and the mark is not announced —
 *    "check Verified" is noise, so the badge carries `Verified seller` as its
 *    accessible name and the tick stays visual. Same call `PriceTagV4` makes
 *    for its struck compare-at price.
 * 4. **The ground is `card`** (§4.2) for the `card` variant; `inline` keeps no
 *    container at all, because an identity block dropped into a listing detail
 *    is a *row*, and §4.3 gives a row a transparent ground so the container
 *    owns the surface.
 * 5. **The identity block clears the tap floor** (44) and takes the state
 *    layer instead of `hover:opacity`/`pressed ? 0.85` — dimming fades the
 *    card's own content, which is the signal M3 spends `0.38` on to mean
 *    *disabled*, so a hovered seller and a suspended one looked alike.
 * 6. **The contact button stays outside the press target**, as the base
 *    already had it right, so contacting never also navigates.
 *
 * Composes `CardV4`, `AvatarV4`, `RatingV4`, `BadgeV4`, `ButtonV4` and
 * `TextV4` (rule 7). Renders **nothing** without a name (§4.5) — an identity
 * block with no identity is a blank bordered box.
 */
export const SellerCardV4 = React.forwardRef<HTMLDivElement, SellerCardV4Props>(
  function SellerCardV4(
    {
      name,
      avatarUrl,
      rating,
      reviewCount,
      salesCount,
      location,
      verified = false,
      actionLabel = 'Contact',
      onContact,
      variant = 'card',
      raised = true,
      verifiedLabel = 'Verified',
      emptyRatingLabel = 'No ratings yet',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(SELLER_CARD_V4_STYLE_ID, SELLER_CARD_V4_CSS);
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const inline = variant === 'inline';
    const interactive = onClick != null;

    // An identity block with no identity is the blank bordered box §4.5 rules
    // out.
    if (name === undefined || name === null || name === '') return null;

    const word = verifiedLabel === '' ? 'Verified' : verifiedLabel;
    const rated = typeof rating === 'number';
    const counted = typeof reviewCount === 'number';

    const meta: string[] = [];
    if (typeof salesCount === 'number') meta.push(`${salesCount.toLocaleString()} sales`);
    if (location !== undefined && location !== '') meta.push(location);

    const trust = rated ? (
      <div data-xen-v4-seller-trust="" className="flex items-center gap-xs">
        {/* The number first: it is the fact, and the stars are its picture. */}
        <TextV4 size="sm" weight="semibold" tone="onCard" numeric="tabular">
          {rating.toFixed(1)}
        </TextV4>
        <RatingV4 value={rating} size="sm" />
        <TextV4 size="sm" tone="mutedText" numeric="tabular" numberOfLines={1}>
          {counted
            ? `${(reviewCount as number).toLocaleString()} ${reviewCount === 1 ? 'review' : 'reviews'}`
            : emptyRatingLabel}
        </TextV4>
      </div>
    ) : (
      <TextV4 data-xen-v4-seller-trust="" size="sm" tone="mutedText" numberOfLines={1}>
        {emptyRatingLabel}
      </TextV4>
    );

    const identity = (
      <div className="flex min-w-0 flex-1 items-center gap-md">
        <AvatarV4 src={avatarUrl} name={name} size={inline ? 'md' : 'lg'} />
        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <div className="flex min-w-0 items-center gap-sm">
            <TextV4
              size="base"
              weight="bold"
              tone={inline ? 'onSurface' : 'onCard'}
              numberOfLines={1}
              className="min-w-0"
            >
              {name}
            </TextV4>
            {verified ? (
              <BadgeV4
                tone="primary"
                variant="soft"
                size="sm"
                data-xen-v4-seller-verified=""
                aria-label={`${word} seller`}
                className="shrink-0"
              >
                {`${resolveIconGlyph('check')} ${word}`}
              </BadgeV4>
            ) : null}
          </div>
          {trust}
          {meta.length > 0 ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {meta.join(' · ')}
            </TextV4>
          ) : null}
        </div>
      </div>
    );

    const a11yLabel =
      `${name}${verified ? `, ${word.toLowerCase()} seller` : ''}` +
      `${rated ? `, rated ${rating.toFixed(1)} of 5` : ''}` +
      `${counted ? `, ${(reviewCount as number).toLocaleString()} reviews` : ''}`;

    const identityBlock = interactive ? (
      <div
        role="button"
        tabIndex={0}
        aria-label={a11yLabel}
        onClick={onClick}
        onKeyDown={activateOnKey}
        data-xen-v4-state=""
        style={
          stateGroundVars(
            inline ? 'var(--xen-surface)' : 'var(--xen-card)',
            inline ? 'var(--xen-on-surface)' : 'var(--xen-on-card)'
          ) as React.CSSProperties
        }
        className={cn(
          'flex flex-1 cursor-pointer items-center rounded-[var(--xen-radius-md)]',
          MIN_TAP_CLASS,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
      >
        {identity}
      </div>
    ) : (
      identity
    );

    const action =
      onContact != null ? (
        <ButtonV4 variant="outline" size="sm" onClick={onContact} className="shrink-0">
          {actionLabel}
        </ButtonV4>
      ) : null;

    const row = cn('flex w-full items-center gap-md', className);

    if (inline) {
      return (
        <div ref={ref} data-xen-v4-seller-card="inline" className={row} {...rest}>
          {identityBlock}
          {action}
        </div>
      );
    }

    return (
      <CardV4
        ref={ref}
        data-xen-v4-seller-card="card"
        variant={raised ? 'elevated' : 'outlined'}
        radius="lg"
        padding="lg"
        className={row}
        {...rest}
      >
        {identityBlock}
        {action}
      </CardV4>
    );
  }
);
