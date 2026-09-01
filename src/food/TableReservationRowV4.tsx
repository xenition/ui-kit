import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { metaLine } from '../primitives/internal/tone-v4';
import { ROW_V4_TEXT_CLASS, ROW_V4_TRAILING_CLASS } from '../dashboard/internal/row-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { BADGE_V4, TABULAR_CLASS, spokenLine } from './internal/menu-v4';
import type { ReservationStatus, TableReservationRowProps } from './TableReservationRow';
import type { ToneV4 } from './internal/menu-v4';

export interface TableReservationRowV4Props extends TableReservationRowProps {
  /** Override the status words — five English strings lived inside the file. */
  statusLabels?: Partial<Record<ReservationStatus, string>>;
}

const STATUS_LABEL: Record<ReservationStatus, string> = {
  requested: 'Requested',
  confirmed: 'Confirmed',
  seated: 'Seated',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

/** A reservation's lifecycle is genuinely a status, so it keeps status tones. */
const STATUS_TONE: Record<ReservationStatus, ToneV4> = {
  requested: 'warn',
  confirmed: 'primary',
  seated: 'success',
  completed: 'neutral',
  cancelled: 'danger',
};

const PARTY_CLASS =
  'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';

const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;

/**
 * **V4 table reservation row** — the web twin of the native
 * `TableReservationRowV4`, same props as {@link TableReservationRow} plus
 * `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The table number joins the row's name.** `aria-label` carried the
 *    guest, the party size, the date/time and the status on a `role="button"`
 *    root — children-presentational — so `tableLabel`, the one fact a host
 *    walking the floor needs, was rendered and pruned.
 * 2. **The party glyph stops being a reader stop.** `Icon aria-label="Party of
 *    4"` made the 👥 its own focusable-adjacent announcement, repeating what
 *    the row's own name already says. It is decorative now, and the words are
 *    in the name.
 * 3. **The words are props.** Five English status strings were compiled into
 *    the component with no way past them.
 * 4. **A real button on the card tokens.** The `div` + `role="button"` +
 *    hand-rolled Enter/Space handler is a `<button>`; `hover:opacity-90` — M3's
 *    *disabled* signal, spent on hover — is the state layer; `primary-300` is
 *    the `ring` token; and the party chip's `bg-neutral-100`, a ramp step that
 *    inverts under `[data-theme="dark"]`, is a hairline on the card.
 */
export const TableReservationRowV4 = React.forwardRef<
  HTMLDivElement,
  TableReservationRowV4Props
>(function TableReservationRowV4(
  {
    name,
    partySize,
    dateText,
    timeText,
    tableLabel,
    status = 'requested',
    statusLabels,
    onClick,
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  if (!name) return null;

  const statusWord = statusLabels?.[status] ?? STATUS_LABEL[status] ?? STATUS_LABEL.requested;
  const tone = STATUS_TONE[status] ?? STATUS_TONE.requested;
  const when = metaLine([dateText, timeText]);
  const spoken = spokenLine([
    name,
    `Party of ${partySize}`,
    when !== '' ? when : undefined,
    tableLabel,
    statusWord,
  ]);

  const party = (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 flex-col items-center justify-center rounded-[var(--xen-radius-md)] border border-border bg-card',
        PARTY_CLASS
      )}
    >
      <span className="text-sm leading-none">👥</span>
      <span className={cn('text-xs font-bold text-on-card', TABULAR_CLASS)}>{partySize}</span>
    </span>
  );

  const text = (
    <span className={ROW_V4_TEXT_CLASS}>
      <span className="truncate font-heading text-base font-semibold text-on-card">{name}</span>
      {when !== '' ? <span className="text-sm text-muted-text">{when}</span> : null}
      {tableLabel ? <span className="text-xs text-muted-text">{tableLabel}</span> : null}
    </span>
  );

  const badge = (
    <span className={ROW_V4_TRAILING_CLASS}>
      <BadgeV4 {...BADGE_V4} tone={tone}>
        {statusWord}
      </BadgeV4>
    </span>
  );

  const interactive = typeof onClick === 'function';

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-card p-md text-on-card',
        className
      )}
      {...rest}
    >
      {interactive ? (
        <button
          type="button"
          aria-label={spoken}
          onClick={onClick}
          data-xen-v4-state=""
          style={CARD_STATE}
          className={cn(
            'flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {party}
          {text}
        </button>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-md">
          {party}
          {text}
        </div>
      )}
      {badge}
    </div>
  );
});
