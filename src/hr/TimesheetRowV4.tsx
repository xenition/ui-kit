import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import { StatusPillV4 } from './StatusPillV4';
import { hoursParts, isAdverse } from './workforce-v4';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  metaLine,
  MIN_TAP_CLASS,
  spokenLine,
  TABULAR_CLASS,
  toneInkClass,
} from './internal/tone-v4';
import { formatHours, TIMESHEET_STATUS_META } from './internal';
import type { TimesheetRowProps } from './TimesheetRow';

export interface TimesheetRowV4Props extends TimesheetRowProps {
  /**
   * Why the entry was rejected.
   *
   * `rejected` is the adverse member of this union and the row had nowhere to
   * put the approver's answer, so a week of work came back marked "✕ Rejected"
   * and silent.
   */
  decisionReason?: string;
  /** Who approved or rejected the entry, shown once it has been decided. */
  approver?: string;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/** Said when `overtimeHours` is larger than the total it is documented to be part of. */
const INCONSISTENT_LABEL = 'Overtime exceeds hours worked';

/**
 * **V4 timesheet row** — the web twin of the native `TimesheetRowV4`, same
 * props as {@link TimesheetRow} plus `decisionReason`, `approver` and
 * `testID`.
 *
 * ## Six changes
 *
 * 1. **"2h 0m" with "+10h OT" under it is now called what it is.** Overtime is
 *    documented as *included in* `hours`, and the row only ever tested it for
 *    `> 0` — never against the total — so `hours={2} overtimeHours={10}`
 *    rendered two impossible figures with a straight face, on a row somebody's
 *    pay is calculated from. `hoursParts()` clamps the overtime into the total
 *    and reports the contradiction, and the row says so out loud.
 * 2. **A rejection can say why, and by whom.** See `decisionReason` and
 *    `approver`.
 * 3. **The row is one accessible name carrying the status.** `Timesheet Mon
 *    Aug 24, 7h 30m` dropped the project, the overtime and — on a row whose
 *    entire purpose is approval — whether it had been rejected.
 * 4. **The status pill is a sibling of the activation.** The row was a `<div
 *    role="button">` with the pill nested inside it; interactive content
 *    inside `role="button"` is invalid ARIA whatever the pill happens to be,
 *    and it flattened the row to a single leaf.
 * 5. **Press and hover are a state layer.** `hover:bg-neutral-100` is a ramp
 *    step: it mirrors under `[data-theme="dark"]` and paints a near-white slab
 *    across a dark page.
 * 6. **It joins the shared row family** and inks the overtime flag with the
 *    `warn-text` slot rather than `text-warn`, the fill.
 */
export const TimesheetRowV4 = React.forwardRef<HTMLDivElement, TimesheetRowV4Props>(
  function TimesheetRowV4(
    {
      date,
      hours,
      status,
      clockIn,
      clockOut,
      project,
      overtimeHours = 0,
      variant = 'default',
      onClick,
      decisionReason,
      approver,
      testID,
      className,
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    const compact = variant === 'compact';
    const clock = clockIn && clockOut ? `${clockIn} – ${clockOut}` : (clockIn ?? clockOut);
    const meta = metaLine([clock, project]);
    const parts = hoursParts(hours, overtimeHours);
    const totalText = formatHours(parts.total);
    const overtimeText = parts.overtime > 0 ? `+${formatHours(parts.overtime)} OT` : undefined;
    const statusMeta = status ? TIMESHEET_STATUS_META[status] : undefined;
    const interactive = onClick != null;
    const adverseReason = status && isAdverse(status) ? decisionReason : undefined;
    const decidedBy =
      approver && (status === 'approved' || status === 'rejected')
        ? `${statusMeta?.label ?? ''} by ${approver}`.trim()
        : undefined;

    const summary = (
      <span className={ROW_V4_TEXT_CLASS}>
        <span className="truncate text-sm font-semibold text-on-card">{date}</span>
        {!compact ? (
          <span className="truncate text-xs text-muted-text">{meta || '—'}</span>
        ) : null}
      </span>
    );

    return (
      <div
        ref={ref}
        data-testid={testID}
        className={cn(
          'flex flex-col rounded-[var(--xen-radius-md)] border border-border bg-card',
          className
        )}
      >
        <div className={cn(ROW_V4_BASE_CLASS, rowHeightClass(!compact))}>
          {interactive ? (
            <button
              type="button"
              aria-label={spokenLine([
                'Timesheet',
                date,
                totalText,
                overtimeText,
                parts.inconsistent ? INCONSISTENT_LABEL : undefined,
                clock,
                project,
                statusMeta?.label,
                decidedBy,
                adverseReason,
              ])}
              onClick={onClick}
              data-xen-v4-state=""
              style={cardStateVars()}
              className={cn(
                'flex min-w-0 flex-1 items-center rounded-[var(--xen-radius-md)] text-left',
                MIN_TAP_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              {summary}
            </button>
          ) : (
            <div className="flex min-w-0 flex-1 items-center">{summary}</div>
          )}

          <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
            <span className={cn('text-base font-bold text-on-card', TABULAR_CLASS)}>{totalText}</span>
            {overtimeText ? (
              <span className={cn('text-xs font-semibold', toneInkClass('warn'))}>{overtimeText}</span>
            ) : null}
          </span>

          {/* Beside the activation, never inside it. */}
          {statusMeta ? (
            <StatusPillV4 meta={statusMeta} size="sm" aria-hidden={interactive || undefined} />
          ) : null}
        </div>

        {parts.inconsistent ? (
          // The input is wrong and somebody's pay depends on it, so the row
          // says so rather than quietly drawing the corrected figure.
          <p className={cn('px-md pb-sm text-xs font-semibold', toneInkClass('warn'))}>
            <span aria-hidden="true">⚠ </span>
            {INCONSISTENT_LABEL}
          </p>
        ) : null}

        {adverseReason ? (
          <p className="px-md pb-sm text-xs font-semibold text-danger-text">{adverseReason}</p>
        ) : null}

        {decidedBy && !adverseReason ? (
          <p className="px-md pb-sm text-xs text-muted-text">{decidedBy}</p>
        ) : null}
      </div>
    );
  }
);
