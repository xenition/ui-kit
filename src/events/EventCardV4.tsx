import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { EventCardProps } from './EventCard';
import { BADGE_V4, PLACEHOLDER_CLASS, spokenLine } from './internal/event-v4';

export interface EventCardV4Props extends EventCardProps {
  /** Announced while the skeleton is up. Default `'Loading event'`. */
  loadingLabel?: string;
}

/** The cover band, composed from the spacing scale: 4x and 3x the 48 step. */
const COVER_FEATURED = 'h-[calc(var(--xen-space-2xl)_*_4)]';
const COVER_DEFAULT = 'h-[calc(var(--xen-space-2xl)_*_3)]';

const CARD_STATE = stateGroundVars(
  'var(--xen-card)',
  'var(--xen-on-card)'
) as React.CSSProperties;

/**
 * **V4 event card** — the web twin of the native `EventCardV4`, same props as
 * {@link EventCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The card's activation is a real `<button>`, and the heading survives
 *    it.** The base was a `div` with `role="button"`, a `tabIndex` and a
 *    hand-written Enter/Space handler that ended in
 *    `e.preventDefault(); currentTarget.click()` — three approximations of what
 *    a button already does. Worse, `role="button"` makes its whole subtree
 *    presentational, so the `<h3>` was erased from the accessibility tree: a
 *    screen-reader user browsing an events page by heading found none. The
 *    heading is now the button's **parent**, not its child.
 * 2. **The name carries the event.** `aria-label={title}` replaced everything
 *    the card drew, so the date, the time, the venue and the attendee count
 *    were unreachable. `spokenLine()` joins them.
 * 3. **The compact skeleton keeps its row layout.** `compact` is a row and its
 *    loading state was a column, so the card changed shape and jumped as the
 *    data landed — and the skeleton's `bg-neutral-100`/`200` are ramp steps
 *    that mirror under `[data-theme="dark"]` into pale plates on a dark page.
 * 4. **Loading announces.** The base put `aria-label` on a role-less `div`,
 *    where it is ignored; `role="status"` gives it somewhere to land.
 * 5. **Press is a state layer**, not `hover:opacity-95` — dimming a card's own
 *    content is M3's *disabled* signal — and the focus ring is `--xen-ring`,
 *    the slot corrected to 3:1 against the page, rather than `primary-300`.
 */
export const EventCardV4 = React.forwardRef<HTMLDivElement, EventCardV4Props>(
  function EventCardV4(
    {
      title,
      date,
      time,
      location,
      imageUrl,
      imageAlt,
      category,
      attendeeCount,
      variant = 'default',
      loading = false,
      loadingLabel = 'Loading event',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    // A card with no event on it is the empty bordered box the line rules out.
    if (!title) return null;

    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';
    const interactive = typeof onClick === 'function' && !loading;

    // The base types `onClick` against the card's own `div`; the activation is
    // a real `<button>` now, and the two element types are unrelated.
    const activate = onClick as unknown as React.MouseEventHandler<HTMLButtonElement> | undefined;

    const container = cn(
      'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-card text-on-card',
      isCompact ? 'flex flex-row' : 'flex flex-col',
      className
    );

    if (loading) {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          aria-label={loadingLabel}
          className={container}
          {...rest}
        >
          {/*
            `compact` is a row, so its skeleton is a row too — a column here is
            what made the card change shape the moment the data landed.
          */}
          {isCompact ? (
            <div className={cn('h-2xl w-2xl shrink-0', PLACEHOLDER_CLASS)} />
          ) : (
            <div className={cn('w-full', isFeatured ? COVER_FEATURED : COVER_DEFAULT, PLACEHOLDER_CLASS)} />
          )}
          <div className="flex flex-1 flex-col gap-sm p-md">
            <div className={cn('h-md w-8/12', PLACEHOLDER_CLASS)} />
            <div className={cn('h-sm w-5/12', PLACEHOLDER_CLASS)} />
          </div>
        </div>
      );
    }

    const metaLine = [date, time].filter(Boolean).join(' · ');
    const attendees = typeof attendeeCount === 'number' ? `${attendeeCount} going` : undefined;
    const spoken = spokenLine([title, category, date, time, location, attendees]);

    const cover = !isCompact ? (
      <div className={cn('relative w-full', isFeatured ? COVER_FEATURED : COVER_DEFAULT)}>
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt ?? title} className="h-full w-full object-cover" />
        ) : (
          <div className={cn('flex h-full w-full items-center justify-center', PLACEHOLDER_CLASS)}>
            <span role="img" aria-label={imageAlt ?? title} className="text-2xl">
              🎟️
            </span>
          </div>
        )}
        {category ? (
          <span className="absolute left-sm top-sm">
            <BadgeV4 {...BADGE_V4} tone="primary">
              {category}
            </BadgeV4>
          </span>
        ) : null}
      </div>
    ) : null;

    const heading = (
      <h3
        className={cn(
          'font-heading font-bold text-on-card',
          isFeatured ? 'text-xl' : 'text-base'
        )}
      >
        {interactive ? (
          <button
            type="button"
            aria-label={spoken}
            onClick={activate}
            data-xen-v4-state=""
            style={CARD_STATE}
            className={cn(
              'flex w-full items-center rounded-[var(--xen-radius-md)] text-left',
              MIN_TAP_CLASS,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {title}
          </button>
        ) : (
          title
        )}
      </h3>
    );

    return (
      <div ref={ref} className={container} {...rest}>
        {cover}
        <div className="flex flex-1 flex-col gap-xs p-md">
          {isCompact && category ? (
            <span className="self-start">
              <BadgeV4 {...BADGE_V4} tone="primary">
                {category}
              </BadgeV4>
            </span>
          ) : null}
          {heading}
          {metaLine ? (
            <p className="flex items-center gap-xs text-sm text-muted-text">
              <span aria-hidden="true">🗓️</span>
              {metaLine}
            </p>
          ) : null}
          {location ? (
            <p className="flex items-center gap-xs truncate text-sm text-muted-text">
              <span aria-hidden="true">📍</span>
              {location}
            </p>
          ) : null}
          {attendees ? (
            <p className="flex items-center gap-xs text-sm text-muted-text">
              <span aria-hidden="true">👥</span>
              {attendees}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
);
