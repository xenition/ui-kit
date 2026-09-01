import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { RatingV4 } from '../primitives/RatingV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { ratingParts } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { GameCardProps } from './GameCard';
import {
  ART_INK,
  ART_SCRIM,
  BADGE_V4,
  IDENTITY_TONE,
  PLACEHOLDER_CLASS,
  spokenLine,
} from './internal/arcade-v4';

export interface GameCardV4Props extends GameCardProps {
  /** The primary action's copy while the title is installed. Default `'Play'`. */
  playLabel?: string;
  /** The primary action's copy while it is not. Default `'Install'`. */
  installLabel?: string;
}

const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;

/**
 * **V4 game card** — same props as {@link GameCard} plus `playLabel` and
 * `installLabel`.
 *
 * ## Four changes
 *
 * 1. **Play works from the keyboard.** This is a live bug, not a nicety. The
 *    card was a `role="button"` `<div>` with a hand-written key handler, and
 *    Play was *inside* it: the button guarded the click path with
 *    `stopPropagation()` and left the key path open, so the card's `onKeyDown`
 *    caught the keydown bubbling out of Play and ran
 *    `e.preventDefault(); onClick(game)`. Enter's default action on a
 *    `<button>` **is** the click that had just been cancelled, and Space's
 *    click fires on keyup, already cancelled too — so pressing Enter on Play
 *    opened the store page and installed nothing, and Space did nothing but
 *    open the store page. The fix is structural: the card is a plain `<div>`,
 *    the activation is a real `<button>` around the art and the copy, and Play
 *    is that button's **sibling**. There is no ancestor handler left to fire,
 *    so no guard is needed and none is written.
 * 2. **The card's name carries the card.** `aria-label={game.title}` on a
 *    `role="button"` made the genre, the installed state, the rating and the
 *    price presentational — every one of them drawn on the card and none of
 *    them reachable. The activation's name is the whole line.
 * 3. **The featured cover's scrim stops inverting.** `GameCardV2` built it out
 *    of `from-neutral-900/75` with `text-neutral-50`, and the web neutral ramp
 *    *mirrors* under `[data-theme="dark"]` while a JPEG does not — so in a dark
 *    theme the darkest step resolved to the lightest and the bottom of every
 *    key art washed near-white with white text on it. `ART_SCRIM` and
 *    `ART_INK` are fixed in both schemes, because the artwork is. The missing
 *    cover is `PLACEHOLDER_CLASS` rather than `bg-neutral-200`, for the same
 *    reason, and rather than a full-bleed slab of brand `primary`.
 * 4. **A genre is identity, not status.** It wore `primary` — the brand — so
 *    every genre chip in a store grid was the same colour as every primary
 *    action on the screen, and a status slot was spent on a category. It is a
 *    neutral chip carrying its own word. "Installed" keeps `success`: owning a
 *    title is an affirmative state of the title, not a name for it. Press is a
 *    state layer instead of `hover:opacity-90`, which is M3's *disabled*
 *    signal, and the activation clears 44.
 */
export const GameCardV4 = React.forwardRef<HTMLDivElement, GameCardV4Props>(function GameCardV4(
  {
    game,
    variant = 'grid',
    loading = false,
    onClick,
    onPlay,
    playLabel = 'Play',
    installLabel = 'Install',
    className,
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  if (!game?.title) return null;

  const list = variant === 'list';
  const featured = variant === 'featured';
  const interactive = typeof onClick === 'function';

  const rating =
    game.rating != null && Number.isFinite(game.rating)
      ? ratingParts({ value: game.rating })
      : null;

  const actionWord = game.installed ? playLabel : installLabel;
  const thumb = 'h-[calc(var(--xen-space-2xl)_*_1.5)] w-[calc(var(--xen-space-2xl)_*_1.5)]';
  const shape = list ? thumb : cn('w-full', featured ? 'aspect-video' : 'aspect-[3/4]');

  const art = game.coverUrl ? (
    <img
      src={game.coverUrl}
      alt=""
      loading="lazy"
      className={cn('rounded-[var(--xen-radius-md)] object-cover', PLACEHOLDER_CLASS, shape)}
    />
  ) : (
    <span
      aria-hidden="true"
      className={cn(
        'flex items-center justify-center rounded-[var(--xen-radius-md)]',
        PLACEHOLDER_CLASS,
        shape
      )}
    >
      <IconV4 glyph="🎮" size="2xl" color="muted" />
    </span>
  );

  // Only `featured` lays the title over the art; the other two draw it in the
  // copy block, where it can wrap without covering the key art.
  const cover = featured ? (
    <span className="relative block w-full overflow-hidden rounded-[var(--xen-radius-md)]">
      {art}
      <span
        style={{ backgroundImage: `linear-gradient(to top, ${ART_SCRIM}, transparent)` }}
        className="absolute inset-x-0 bottom-0 block p-md"
      >
        <span style={{ color: ART_INK }} className="line-clamp-2 font-heading text-lg font-bold">
          {game.title}
        </span>
      </span>
    </span>
  ) : (
    art
  );

  const meta = (
    <span className={cn('flex flex-col gap-xs', list && 'min-w-0 flex-1')}>
      {featured ? null : (
        <span className="line-clamp-2 font-heading text-base font-bold text-on-card">
          {game.title}
        </span>
      )}
      {game.genre != null || game.installed ? (
        <span className="flex flex-wrap items-center gap-xs">
          {game.genre ? (
            <BadgeV4 {...BADGE_V4} tone={IDENTITY_TONE}>
              {game.genre}
            </BadgeV4>
          ) : null}
          {game.installed ? (
            // Owned is an affirmative state of the title, not an identity —
            // one of the module's only two remaining status badges.
            <BadgeV4 {...BADGE_V4} tone="success">
              Installed
            </BadgeV4>
          ) : null}
        </span>
      ) : null}
      {rating && game.rating != null ? (
        // The raw value, not `ratingParts`' rounded glyph count: `RatingV4`
        // clips the row at the exact fraction, and a pre-rounded input throws
        // that away. `showValue` puts the numeral beside it, which is what a
        // low-vision user actually compares.
        <RatingV4 value={game.rating} size="sm" showValue label={rating.label} />
      ) : null}
    </span>
  );

  const body = (
    <>
      {cover}
      {meta}
    </>
  );

  const bodyShape = list
    ? 'min-w-0 flex-1 flex-row items-center gap-md'
    : 'w-full flex-col items-stretch gap-sm';

  const activation = interactive ? (
    <button
      type="button"
      onClick={() => onClick?.(game)}
      aria-label={spokenLine([
        game.title,
        game.genre,
        game.installed ? 'Installed' : undefined,
        rating?.label,
        game.price,
      ])}
      data-xen-v4-state=""
      style={CARD_STATE}
      className={cn(
        'flex rounded-[var(--xen-radius-md)] text-left',
        MIN_TAP_CLASS,
        bodyShape,
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      )}
    >
      {body}
    </button>
  ) : (
    <div className={cn('flex', bodyShape)}>{body}</div>
  );

  return (
    <div
      ref={ref}
      className={cn(
        'flex rounded-[var(--xen-radius-lg)] border border-border bg-card p-lg text-on-card',
        list ? 'flex-row items-center gap-md' : 'flex-col gap-sm',
        className
      )}
    >
      {activation}

      {/*
        A sibling of the activation, never a descendant — see change 1. Nesting
        a control inside a `role="button"` is invalid ARIA even before the
        keyboard bug it caused here.
      */}
      {onPlay ? (
        <div className={cn(!list && (featured ? 'self-stretch [&>*]:w-full' : 'self-start'))}>
          <ButtonV4
            variant={game.installed ? 'secondary' : 'primary'}
            size="sm"
            disabled={loading}
            aria-busy={loading || undefined}
            onClick={() => onPlay(game)}
            aria-label={`${actionWord} ${game.title}`}
          >
            {game.installed ? playLabel : (game.price ?? installLabel)}
          </ButtonV4>
        </div>
      ) : null}
    </div>
  );
});
