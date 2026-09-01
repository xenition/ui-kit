import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import type { IconName } from '../primitives/icon-names';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import { PriceTagV4 } from '../commerce/PriceTagV4';
import { ConditionBadgeV4 } from './ConditionBadgeV4';
import { activateOnKey } from './internal';
import type { WatchlistRowProps } from './WatchlistRow';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';

export interface WatchlistRowV4Props extends WatchlistRowProps {
  /**
   * The mark drawn where a thumbnail would be when `imageUrl` is missing.
   * Default `'image'`.
   *
   * The base wrote the words "No photo" into the 64px square — a caption
   * standing in for a picture, in a slot the eye reads as a picture. A tinted
   * `IconV4` badge is the §4.7 answer and it is also what every other empty
   * leading slot in the kit does.
   */
  placeholderIcon?: IconName;
  /**
   * Paint §4.3's `selected` ground — the row family's one exception to a
   * transparent row, for a watchlist in a multi-select mode. Default `false`.
   */
  selected?: boolean;
}

/**
 * **V4 watchlist row** — a saved listing: what it is, what it costs now, and
 * the one control that removes it.
 *
 * The anatomy is §4.3's, in §4.3's order — `[44 leading] [title / supporting]
 * [trailing value] [affordance]` — which for a watchlist means the thumbnail,
 * the title over its condition chips, **the price in the trailing column**, and
 * the watch toggle. Putting the price where the family puts its value is what
 * makes a watchlist scannable: brief rule 2 asks for tabular figures so a
 * column of prices has an edge, and a price buried mid-row under the title has
 * no column to be tabular *in*. `PriceTagV4` already sets tabular figures and
 * announces the struck compare-at price as "Was …", so it is composed rather
 * than redrawn (rules 1 and 7).
 *
 * What else changes against the base:
 *
 * 1. **The row metric, and no card of its own.** `rounded border bg-surface
 *    p-md` goes; the container owns the card. The thumbnail moves from a
 *    hand-written 64 square to the family's 44 leading slot, so a watchlist row
 *    and a settings row put their text on the same vertical line.
 * 2. **`bg-neutral-100` goes** — a ramp step used as a placeholder ground, and
 *    a literal brief §1 names outright. The empty thumbnail is an `IconV4`
 *    soft badge instead.
 * 3. **The heart is not `danger`.** The base painted the watched heart in the
 *    error tone. Brief rule 3: `danger` means danger, and a saved item is not a
 *    problem — it is the most positive thing on the row. Watched is `primary`
 *    and **filled**; unwatched is `muted` and **hollow**, so the state survives
 *    a colour-blind reading (rule 6) as it did not before. The glyphs are
 *    `IconV4`, not the bare `♥`/`♡` characters §1 rules out; `♡` has no name in
 *    the kit's set, so it takes the documented `glyph` escape hatch.
 * 4. **The toggle clears 44.** It was `p-xs` around a text glyph — roughly 24
 *    square, for the one destructive-ish control on the row.
 * 5. **`ended` stops being an opacity.** `opacity-60` on the whole row dims the
 *    *price* too, which is the fact a watcher came back for. A sold item now
 *    reads through its "Sold" chip and a `mutedText` title, and the price stays
 *    at full strength.
 * 6. **The title keeps two lines.** The family truncates a title at one, but a
 *    listing title *is* the identity of a watchlist row and one line of it is
 *    often nothing but the brand. The row metric is a `min-height` — a floor —
 *    so the row grows rather than clipping.
 *
 * The toggle stays outside the row's press target, as in the base, so
 * un-watching never also navigates.
 */
export const WatchlistRowV4 = React.forwardRef<HTMLDivElement, WatchlistRowV4Props>(
  function WatchlistRowV4(
    {
      title,
      priceCents,
      currency = 'USD',
      compareAtCents,
      imageUrl,
      condition,
      watched = true,
      ended = false,
      onToggleWatch,
      onClick,
      placeholderIcon = 'image',
      selected = false,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);

    // §4.5: an untitled listing is a thumbnail and a price with nothing to say
    // what they are.
    if (title.trim() === '') return null;

    const interactive = onClick != null;
    const ink = ended ? 'mutedText' : 'onSurface';

    const body = (
      <>
        <span
          className={cn(
            ROW_V4_LEADING_CLASS,
            'overflow-hidden rounded-[var(--xen-radius-md)]'
          )}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <IconV4 name={placeholderIcon} badge="soft" badgeShape="rounded" size="base" color="muted" />
          )}
        </span>
        <span className={ROW_V4_TEXT_CLASS}>
          <TextV4 size="base" weight="semibold" tone={ink} numberOfLines={2}>
            {title}
          </TextV4>
          {condition !== undefined || ended ? (
            <span className="flex items-center gap-sm">
              {condition !== undefined ? <ConditionBadgeV4 condition={condition} size="sm" /> : null}
              {ended ? (
                // Rule 6: a sold-out badge ships a mark AND a word.
                <BadgeV4 tone="neutral" variant="soft" size="sm">
                  <span className="inline-flex items-center gap-xs">
                    <IconV4 name="close" size="xs" />
                    <TextV4 size="xs" weight="medium" tone="onSurface">
                      Sold
                    </TextV4>
                  </span>
                </BadgeV4>
              ) : null}
            </span>
          ) : null}
        </span>
        <span className={ROW_V4_TRAILING_CLASS}>
          <PriceTagV4
            cents={priceCents}
            currency={currency}
            compareAtCents={compareAtCents}
            size="sm"
          />
        </span>
      </>
    );

    return (
      <div
        ref={ref}
        data-xen-v4-row=""
        data-xen-watchlist-row=""
        className={cn(
          ROW_V4_BASE_CLASS,
          rowHeightClass(true),
          rowGroundClass(selected),
          className
        )}
        {...rest}
      >
        {interactive ? (
          <div
            role="button"
            tabIndex={0}
            data-xen-v4-state=""
            onClick={onClick}
            onKeyDown={activateOnKey}
            aria-label={title}
            className={cn(
              'flex min-w-0 flex-1 cursor-pointer items-center gap-md rounded-[var(--xen-radius-md)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
            style={rowStateVars()}
          >
            {body}
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-md">{body}</div>
        )}
        {onToggleWatch != null ? (
          <button
            type="button"
            data-xen-v4-state=""
            data-xen-watch-toggle=""
            aria-label={watched ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`}
            aria-pressed={watched}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatch(!watched);
            }}
            className={cn(
              'inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-full)]',
              MIN_TAP_SQUARE_CLASS,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
            style={rowStateVars()}
          >
            {watched ? (
              <IconV4 name="heart" size="lg" color="primary" />
            ) : (
              // The hollow heart has no name in the kit's set; `glyph` is the
              // documented escape hatch for exactly that.
              <IconV4 glyph="♡" size="lg" color="muted" />
            )}
          </button>
        ) : null}
      </div>
    );
  }
);
