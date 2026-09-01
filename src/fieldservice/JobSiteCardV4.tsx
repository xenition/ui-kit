import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { BADGE_V4, discGround, spokenLine, type ToneV4 } from './internal/job-v4';
import type { JobSiteCardProps, JobSiteStatus } from './JobSiteCard';

export interface JobSiteCardV4Props extends JobSiteCardProps {
  /** The directions action's label. Default `'Directions'`. */
  directionsLabel?: string;
}

const SITE_STATUS_V4: Record<JobSiteStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  active: { label: 'On site', glyph: '▶', tone: 'primary' },
  scheduled: { label: 'Scheduled', glyph: '📅', tone: 'neutral' },
  completed: { label: 'Completed', glyph: '✓', tone: 'success' },
  blocked: { label: 'Blocked', glyph: '⚠', tone: 'danger' },
};

/**
 * **V4 job-site card** — the web twin of the native `JobSiteCardV4`, same
 * props as {@link JobSiteCard} plus `directionsLabel`.
 *
 * ## Four changes
 *
 * 1. **Enter on "Directions" gets directions.** The card's `onKeyDown` caught
 *    the keydown bubbling out of the nested Directions `<button>` and ran
 *    `e.preventDefault()` followed by a synthesised `currentTarget.click()` —
 *    and Enter's default action on a button *is* the click it had just
 *    cancelled, so a keyboard user pressed Enter on Directions and opened the
 *    site card instead. The `stopPropagation` on the click handler covered
 *    only the pointer path. Directions is now a **sibling** of the card's
 *    activation rather than a descendant of it, which is the shape that cannot
 *    have the bug: there is nothing left to bubble, nothing to stop, and no
 *    synthesised click.
 * 2. **The activation is a real `<button>`.** A `div` with `role="button"`, a
 *    `tabIndex` and a hand-written Enter/Space handler is three approximations
 *    of what a button already does — including the one it got wrong above.
 * 3. **The card's name carries the site's payload** — the crew count, the open
 *    orders and the distance, all of which the short label replaced.
 * 4. **`scheduled` and `active` stop wearing status colours** (a stage is not
 *    an outcome), the disc is decorative rather than a second reader stop, and
 *    Directions clears 44.
 */
export const JobSiteCardV4 = React.forwardRef<HTMLDivElement, JobSiteCardV4Props>(
  function JobSiteCardV4(
    {
      name,
      address,
      status,
      crewCount,
      openOrders,
      distance,
      glyph = '🏗',
      onNavigate,
      onClick,
      directionsLabel = 'Directions',
      className,
      style,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const sd = SITE_STATUS_V4[status] ?? SITE_STATUS_V4.scheduled;
    const crew = crewCount != null ? `${Math.max(0, Math.trunc(crewCount))} crew` : null;
    const open = openOrders != null ? `${Math.max(0, Math.trunc(openOrders))} open` : null;

    const header = (
      <div className="flex items-center gap-md">
        <span
          aria-hidden
          className="flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]"
          style={{ background: discGround('accent') }}
        >
          <IconV4 glyph={glyph} size="xl" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <span className="truncate font-heading text-lg font-bold text-on-card">{name}</span>
          <span className="truncate text-sm text-muted-text">{address}</span>
        </div>
        <BadgeV4 tone={sd.tone} {...BADGE_V4}>
          {`${sd.glyph} ${sd.label}`}
        </BadgeV4>
      </div>
    );

    return (
      <CardV4 ref={ref} padding="none" className={className} style={style}>
        {onClick == null ? (
          <div className="p-lg pb-md">{header}</div>
        ) : (
          <button
            type="button"
            onClick={onClick}
            aria-label={spokenLine([name, address, sd.label, crew, open, distance])}
            data-xen-v4-state=""
            style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
            className="flex w-full flex-col rounded-t-[var(--xen-radius-lg)] p-lg pb-md text-left"
          >
            {header}
          </button>
        )}

        {/*
          The footer sits OUTSIDE the card's activation. That is the whole fix:
          a control inside a card is a sibling of the activation, never a
          descendant, because guarding the click path leaves the key path open
          and the keydown still bubbles.
        */}
        <div className="flex items-center justify-between gap-md border-t border-border px-lg pb-lg pt-md">
          <div className="flex flex-wrap gap-md">
            {crew != null ? <span className="text-xs text-muted-text">👷 {crew}</span> : null}
            {open != null ? <span className="text-xs text-muted-text">🗒 {open}</span> : null}
            {distance != null ? (
              <span className="text-xs text-muted-text">📍 {distance}</span>
            ) : null}
          </div>
          {onNavigate ? (
            <ButtonV4 variant="outline" size="md" onClick={onNavigate}>
              {directionsLabel}
            </ButtonV4>
          ) : null}
        </div>
      </CardV4>
    );
  }
);
