import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { CheckInRowProps } from './CheckInRow';
import { BADGE_V4, spokenLine } from './internal/event-v4';

export interface CheckInRowV4Props extends CheckInRowProps {
  /** The action, while the attendee is not yet in. Default `'Check in'`. */
  checkInLabel?: string;
  /** The state, once they are. Default `'Checked in'`. */
  checkedInLabel?: string;
  /** The action that reverses it. Default `'Undo check-in'`. */
  undoLabel?: string;
}

/**
 * **V4 check-in row** — the web twin of the native `CheckInRowV4`, same props
 * as {@link CheckInRow} plus `checkInLabel`, `checkedInLabel` and `undoLabel`.
 *
 * ## Four changes
 *
 * 1. **The only control on the row clears 44.** It was about 28 points tall —
 *    and this is a staff surface, worked one-handed at a door, at speed, with a
 *    queue behind it. Missing the target costs an attendee, not a scroll.
 * 2. **The button says who it is about.** `Check in Ada` was already right; it
 *    now carries the ticket type and the check-in time as well, so a scanner
 *    hears what they are confirming rather than just a verb and a name.
 * 3. **Press is a state layer and disabled is 0.38.** `hover:opacity-90` fades
 *    the button's own label, which is M3's *disabled* signal, and
 *    `disabled:opacity-50` is a rounder number than the one the theme ships.
 * 4. **The state's word is a prop.** `Check in` / `In` / `Undo check-in` were
 *    three hard-coded English strings on a screen staff read hundreds of times
 *    a night; and the visible word and the spoken one now agree.
 */
export const CheckInRowV4 = React.forwardRef<HTMLDivElement, CheckInRowV4Props>(
  function CheckInRowV4(
    {
      name,
      avatarUrl,
      ticketType,
      checkedInAt,
      checkedIn = false,
      onToggle,
      disabled = false,
      checkInLabel = 'Check in',
      checkedInLabel = 'Checked in',
      undoLabel = 'Undo check-in',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!name) return null;

    const stateWord = checkedIn ? checkedInLabel : 'Not in';
    const badgeText = checkedIn && checkedInAt ? `${checkedInLabel} · ${checkedInAt}` : stateWord;

    // The toggle wears a filled tone, so its state layer is that fill and its
    // own paired ink rather than the page's.
    const toggleState = stateGroundVars(
      checkedIn ? 'var(--xen-success)' : 'var(--xen-primary)',
      checkedIn ? 'var(--xen-on-success)' : 'var(--xen-on-primary)'
    ) as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-row items-center gap-md rounded-[var(--xen-radius-md)] border border-border bg-card p-md text-on-card',
          className
        )}
        {...rest}
      >
        <AvatarV4 src={avatarUrl} name={name} alt="" size="sm" />
        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <p className="truncate text-base font-semibold text-on-card">{name}</p>
          <div className="flex flex-row flex-wrap items-center gap-sm">
            {ticketType ? <span className="text-sm text-muted-text">{ticketType}</span> : null}
            <BadgeV4 {...BADGE_V4} tone={checkedIn ? 'success' : 'neutral'}>
              {badgeText}
            </BadgeV4>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={checkedIn}
          aria-label={spokenLine([
            checkedIn ? undoLabel : checkInLabel,
            name,
            ticketType,
            checkedIn ? checkedInAt : undefined,
          ])}
          disabled={disabled}
          onClick={() => onToggle?.(!checkedIn)}
          data-xen-v4-state=""
          style={toggleState}
          className={cn(
            'inline-flex shrink-0 flex-row items-center justify-center gap-xs rounded-full px-md text-sm font-bold',
            MIN_TAP_CLASS,
            checkedIn ? 'bg-success text-on-success' : 'bg-primary text-on-primary',
            V4_DISABLED_CLASS,
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          <span aria-hidden="true">{checkedIn ? '✓' : '+'}</span>
          <span aria-hidden="true">{checkedIn ? checkedInLabel : checkInLabel}</span>
        </button>
      </div>
    );
  }
);
