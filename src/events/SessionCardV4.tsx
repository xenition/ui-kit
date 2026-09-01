import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarGroupV4 } from '../primitives/AvatarGroupV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { SessionCardProps } from './SessionCard';
import { BADGE_V4, TABULAR_CLASS, TONE_INK, seatParts, spokenLine } from './internal/event-v4';

export interface SessionCardV4Props extends SessionCardProps {
  /** The bookmark action's name while the session is not bookmarked. */
  bookmarkLabel?: string;
  /** The bookmark action's name while it is. */
  unbookmarkLabel?: string;
  /** The seat meter's caption. Default `'12 / 100 seats taken'`. */
  formatSeats?: (taken: number, capacity: number) => string;
}

const CARD_STATE = stateGroundVars(
  'var(--xen-card)',
  'var(--xen-on-card)'
) as React.CSSProperties;

/**
 * **V4 session card** — the web twin of the native `SessionCardV4`, same props
 * as {@link SessionCard} plus `bookmarkLabel`, `unbookmarkLabel` and
 * `formatSeats`.
 *
 * ## Six changes
 *
 * 1. **Enter on the bookmark bookmarks the session.** This is the module's
 *    headline defect, and it is a live keyboard bug. The card guarded the
 *    *click* path with `e.stopPropagation()` and left the *key* path open, so
 *    the card's own `onKeyDown` caught the keydown bubbling out of the star and
 *    ran `e.preventDefault(); currentTarget.click()`. Enter's default action on
 *    a `<button>` is the click it had just cancelled, and Space's click fires
 *    on keyup, which is cancelled too — so a keyboard user pressed Enter on the
 *    star and **navigated to the session** without bookmarking it. The fix is
 *    structural, not another guard: the card's activation is a real `<button>`
 *    around the title, the star is that button's **sibling**, and the
 *    synthesised `currentTarget.click()` is gone entirely.
 * 2. **The seat meter is a real `progressbar`, and it stops printing negative
 *    seats.** It was a bare `div` with a width, invisible to a screen reader,
 *    and the base clamped the *bar* while printing the raw number — so
 *    `seatsTaken: -5` drew an empty meter beside the words "−5 / 100 seats
 *    taken". `seatParts()` clamps both. The meter is also a sibling of the
 *    activation: inside `role="button"` its value would be presentational.
 * 3. **One accessible name carrying the session.** `aria-label={title}`
 *    replaced the subtree, so the time, the room, the track, the speakers and
 *    the seat count were all unreachable.
 * 4. **The bookmarked star is the same tone on both twins.** It was `primary`
 *    here and `accent` on native, and this twin could not simply match —
 *    `IconColor` has no `accent`. Both draw the glyph as text in the
 *    contrast-corrected `primary` ink rather than through `Icon`'s fill slot.
 * 5. **A track is identity, so its badge does not change tone with the card.**
 *    The badge went `primary` on a highlighted card and `neutral` otherwise —
 *    the same track wearing two colours depending on the card around it.
 * 6. **Press is a state layer, and both controls clear 44.** `hover:opacity-95`
 *    on the card and `hover:opacity-70` on the star dim their own content,
 *    which is M3's *disabled* signal, and the star was a bare `p-xs` glyph.
 */
export const SessionCardV4 = React.forwardRef<HTMLDivElement, SessionCardV4Props>(
  function SessionCardV4(
    {
      title,
      time,
      room,
      track,
      abstract,
      speakers = [],
      capacity,
      seatsTaken,
      bookmarked = false,
      onBookmark,
      variant = 'default',
      bookmarkLabel = 'Bookmark session',
      unbookmarkLabel = 'Remove bookmark',
      formatSeats,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!title) return null;

    const isHighlight = variant === 'highlight';
    const interactive = typeof onClick === 'function';

    // The base types `onClick` against the card's `div`; the activation is a
    // real `<button>` now, and the two element types are unrelated.
    const activate = onClick as unknown as React.MouseEventHandler<HTMLButtonElement> | undefined;

    const seats = seatParts(seatsTaken, capacity);
    const seatText = seats
      ? seats.full
        ? 'Session full'
        : (formatSeats ?? ((t: number, c: number) => `${t} / ${c} seats taken`))(
            seats.taken,
            seats.capacity
          )
      : undefined;

    const speakerNames = speakers.map((s) => s.name).join(', ');
    const metaLine = [time, room].filter(Boolean).join(' · ');

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden rounded-[var(--xen-radius-lg)] border bg-card text-on-card',
          isHighlight ? 'border-primary' : 'border-border',
          className
        )}
        {...rest}
      >
        <div className="flex flex-row">
          {isHighlight ? <div aria-hidden="true" className="w-xs shrink-0 bg-primary" /> : null}
          <div className="flex flex-1 flex-col gap-sm p-lg">
            <div className="flex flex-row items-start gap-sm">
              <div className="flex min-w-0 flex-1 flex-col gap-xs">
                {track ? (
                  <span className="self-start">
                    {/* Identity, so the tone is the track's and not the card's. */}
                    <BadgeV4 {...BADGE_V4} tone="neutral">
                      {track}
                    </BadgeV4>
                  </span>
                ) : null}
                <h3 className="font-heading text-lg font-bold text-on-card">
                  {interactive ? (
                    <button
                      type="button"
                      onClick={activate}
                      aria-label={spokenLine([
                        title,
                        track,
                        time,
                        room,
                        speakerNames,
                        seatText,
                      ])}
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
                {metaLine ? (
                  <p className={cn('text-sm text-muted-text', TABULAR_CLASS)}>{metaLine}</p>
                ) : null}
              </div>

              {/*
                A sibling of the card's activation, never a descendant. That is
                the whole fix: there is no ancestor handler left to fire, so the
                star needs no `stopPropagation` and no key guard to do one thing.
              */}
              {onBookmark ? (
                <button
                  type="button"
                  aria-pressed={bookmarked}
                  aria-label={bookmarked ? unbookmarkLabel : bookmarkLabel}
                  onClick={() => onBookmark(!bookmarked)}
                  data-xen-v4-state=""
                  style={CARD_STATE}
                  className={cn(
                    'inline-flex shrink-0 items-center justify-center rounded-full',
                    MIN_TAP_SQUARE_CLASS,
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'text-lg',
                      bookmarked ? TONE_INK.primary : 'text-muted-text'
                    )}
                  >
                    {bookmarked ? '★' : '☆'}
                  </span>
                </button>
              ) : null}
            </div>

            {abstract ? (
              <p className="line-clamp-3 text-sm text-on-card">{abstract}</p>
            ) : null}

            {speakers.length > 0 ? (
              <div className="flex flex-row items-center gap-sm">
                <AvatarGroupV4
                  avatars={speakers.map((s) => ({ src: s.avatarUrl, name: s.name }))}
                  size="sm"
                  max={3}
                />
                <span className="min-w-0 flex-1 truncate text-sm text-muted-text">
                  {speakerNames}
                </span>
              </div>
            ) : null}

            {seats && seatText ? (
              <div className="flex flex-col gap-xs">
                <ProgressV4
                  value={seats.taken}
                  max={seats.capacity}
                  tone={seats.full ? 'danger' : 'primary'}
                  size="sm"
                  aria-label={seatText}
                />
                <span
                  className={cn(
                    'text-xs font-semibold',
                    TABULAR_CLASS,
                    seats.full ? TONE_INK.danger : 'text-muted-text'
                  )}
                >
                  {seatText}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
