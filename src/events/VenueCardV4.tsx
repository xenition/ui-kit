import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { RatingV4 } from '../primitives/RatingV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { ratingParts } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { VenueCardProps } from './VenueCard';
import { PLACEHOLDER_CLASS, spokenLine } from './internal/event-v4';

export interface VenueCardV4Props extends VenueCardProps {
  /** The directions control's copy. Default `'Directions'`. */
  directionsLabel?: string;
}

/** The media band, composed off the spacing scale rather than a literal height. */
const MEDIA_CLASS = 'h-[calc(var(--xen-space-2xl)_*_2_+_var(--xen-space-lg))]';

const CARD_STATE = stateGroundVars(
  'var(--xen-card)',
  'var(--xen-on-card)'
) as React.CSSProperties;

/**
 * **V4 venue card** — the web twin of the native `VenueCardV4`, same props as
 * {@link VenueCard} plus `directionsLabel`.
 *
 * ## Five changes
 *
 * 1. **Enter on "Directions" gives directions.** This is §1.2's defect and it
 *    is a live keyboard bug. The card guarded the *click* path with
 *    `e.stopPropagation()` and left the *key* path open, so the card's own
 *    `onKeyDown` caught the keydown bubbling out of the Directions button and
 *    ran `e.preventDefault(); currentTarget.click()` — cancelling Enter's
 *    default activation of the button and firing the card instead. A keyboard
 *    user pressing Enter on "Directions" **opened the venue**. The fix is
 *    structural: the card's activation is a real `<button>` around the media
 *    and the details, Directions is that button's **sibling**, and the
 *    synthesised `currentTarget.click()` is gone.
 * 2. **One accessible name carrying the venue.** `aria-label={name}` replaced
 *    the subtree — and `role="button"` makes a subtree presentational anyway —
 *    so the address, the rating, the capacity and the distance were all
 *    unreachable to a screen reader.
 * 3. **The photo placeholder is the shared placeholder ground**, not
 *    `bg-neutral-100`: a ramp step mirrors under `[data-theme="dark"]`, so an
 *    imageless venue drew a near-white plate across the top of a dark card.
 * 4. **Both controls clear 44.** "Directions" was a bare text button, and it is
 *    the one thing on this card somebody taps while walking.
 * 5. **Press is a state layer** — `hover:opacity-95` and `hover:opacity-70` dim
 *    the control's own content, which is the signal M3 reserves for *disabled*
 *    — and the focus ring is `--xen-ring`, not the `primary-300` ramp step.
 */
export const VenueCardV4 = React.forwardRef<HTMLDivElement, VenueCardV4Props>(
  function VenueCardV4(
    {
      name,
      address,
      distance,
      capacity,
      rating,
      imageUrl,
      imageAlt,
      variant = 'default',
      onDirections,
      directionsLabel = 'Directions',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!name) return null;

    const isCompact = variant === 'compact';
    const interactive = typeof onClick === 'function';

    // The base types `onClick` against the card's `div`; the activation is a
    // real `<button>` now, and the two element types are unrelated.
    const activate = onClick as unknown as React.MouseEventHandler<HTMLButtonElement> | undefined;

    const stars = typeof rating === 'number' ? ratingParts({ value: rating }) : undefined;
    const seats = typeof capacity === 'number' ? `Seats ${capacity}` : undefined;

    const media = !isCompact ? (
      <span className={cn('block w-full', MEDIA_CLASS)}>
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt ?? name} className="h-full w-full object-cover" />
        ) : (
          <span
            className={cn('flex h-full w-full items-center justify-center', PLACEHOLDER_CLASS)}
          >
            <span role="img" aria-label={imageAlt ?? name} className="text-2xl">
              🗺️
            </span>
          </span>
        )}
      </span>
    ) : null;

    const details = (
      <span className="flex min-w-0 flex-1 flex-col gap-xs p-md text-left">
        <span className="truncate text-base font-bold text-on-card">{name}</span>
        {address ? (
          <span className="flex items-center gap-xs truncate text-sm text-muted-text">
            <span aria-hidden="true">📍</span>
            <span className="min-w-0 flex-1 truncate">{address}</span>
          </span>
        ) : null}
        <span className="flex flex-row flex-wrap items-center gap-md">
          {stars && stars.text != null ? (
            <RatingV4
              value={Number(stars.text)}
              max={stars.total}
              size="sm"
              showValue
              label={stars.label}
            />
          ) : null}
          {seats ? <span className="text-xs text-muted-text">{seats}</span> : null}
          {distance ? <span className="text-xs text-muted-text">{distance}</span> : null}
        </span>
      </span>
    );

    const bodyClass = cn('flex w-full', isCompact ? 'flex-row' : 'flex-col');

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-card text-on-card',
          className
        )}
        {...rest}
      >
        {interactive ? (
          <button
            type="button"
            onClick={activate}
            aria-label={spokenLine([name, address, stars?.label, seats, distance])}
            data-xen-v4-state=""
            style={CARD_STATE}
            className={cn(
              bodyClass,
              MIN_TAP_CLASS,
              'text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {media}
            {details}
          </button>
        ) : (
          <div className={bodyClass}>
            {media}
            {details}
          </div>
        )}

        {/*
          A sibling of the card's activation, never a descendant. There is no
          ancestor handler left to fire, so Directions needs no
          `stopPropagation` and no key guard to do exactly one thing.
        */}
        {onDirections ? (
          <div className="px-md pb-md">
            <button
              type="button"
              aria-label={spokenLine([directionsLabel, name])}
              onClick={onDirections}
              data-xen-v4-state=""
              style={CARD_STATE}
              className={cn(
                'inline-flex items-center rounded-[var(--xen-radius-md)] px-sm text-sm font-semibold text-primary-text',
                MIN_TAP_CLASS,
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              {directionsLabel}
            </button>
          </div>
        ) : null}
      </div>
    );
  }
);
