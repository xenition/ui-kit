import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { TONE_INK } from './internal/mail-v4';
import type { InboxHeaderProps } from './InboxHeader';

export interface InboxHeaderV4Props extends InboxHeaderProps {
  /** How the unread count is spoken. Default `` (n) => `${n} unread` ``. */
  formatUnread?: (count: number) => string;
  /** Copy on the sync caption. Default `'Syncing…'`. */
  syncingLabel?: string;
}

/** Above this the count reads `999+` — four digits push the title out. */
const COUNT_CAP = 999;

/** 44 on both axes for a glyph action, composed from the spacing scale. */
const TAP_SQUARE = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';

/**
 * **V4 inbox header** — same props as {@link InboxHeader} plus `formatUnread`
 * and `syncingLabel`.
 *
 * ## Four changes
 *
 * 1. **The unread count says what it is counting.** A reader heard "Inbox"
 *    and then "42", with nothing anywhere saying 42 of what — the number was a
 *    bare numeral beside a title. The numeral stays on screen and the spoken
 *    form carries the unit.
 * 2. **Syncing is announced.** It was a caption that appeared and vanished
 *    with no role and no live region, so the one state the header exists to
 *    report was invisible to the only users who cannot see it happening.
 * 3. **The action buttons clear 44.** `p-xs` around a glyph is roughly a 28px
 *    target in the corner of the screen, which is where a thumb is least
 *    accurate.
 * 4. **Press is a state layer and the ink is the corrected slot** — the
 *    actions dimmed themselves on hover at M3's *disabled* band, and the count
 *    and caption were drawn in `muted`, a ramp step with no contrast promise.
 */
export const InboxHeaderV4 = React.forwardRef<HTMLElement, InboxHeaderV4Props>(
  function InboxHeaderV4(
    {
      title,
      unreadCount = 0,
      onBack,
      actions,
      syncing = false,
      formatUnread = (value: number) => `${value} unread`,
      syncingLabel = 'Syncing…',
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const safeActions = actions ?? [];
    const shown = unreadCount > COUNT_CAP ? `${COUNT_CAP}+` : String(unreadCount);
    const actionClass = cn(
      'inline-flex shrink-0 items-center justify-center rounded-full',
      MIN_TAP_CLASS,
      TAP_SQUARE,
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
    );
    const actionStyle = stateGroundVars(
      'var(--xen-surface)',
      'var(--xen-on-surface)'
    ) as React.CSSProperties;

    return (
      <header
        ref={ref}
        className={cn(
          'flex items-center gap-sm border-b border-border bg-surface px-md py-sm',
          className
        )}
      >
        {onBack ? (
          <button
            type="button"
            aria-label="Back"
            onClick={onBack}
            data-xen-v4-state=""
            style={actionStyle}
            className={actionClass}
          >
            <span aria-hidden="true" className="text-2xl leading-none text-on-surface">
              ‹
            </span>
          </button>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-xs">
            <h1 className="truncate text-xl font-bold text-on-surface">{title}</h1>
            {unreadCount > 0 ? (
              <>
                {/*
                  The numeral is drawn; the unit is spoken. Splitting them keeps
                  the header compact without leaving a reader with a bare "42".
                */}
                <span aria-hidden="true" className={cn('text-base font-semibold', TONE_INK.muted)}>
                  {shown}
                </span>
                <span className="sr-only">{formatUnread(unreadCount)}</span>
              </>
            ) : null}
          </div>
          {syncing ? (
            <p role="status" aria-live="polite" className={cn('text-xs', TONE_INK.muted)}>
              {syncingLabel}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-xs">
          {safeActions.map((action) => (
            <button
              key={action.id}
              type="button"
              aria-label={action.label}
              onClick={action.onClick}
              data-xen-v4-state=""
              style={actionStyle}
              className={actionClass}
            >
              <span aria-hidden="true" className="text-xl leading-none text-on-surface">
                {action.glyph}
              </span>
            </button>
          ))}
        </div>
      </header>
    );
  }
);
