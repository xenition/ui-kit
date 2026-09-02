import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { StatusPillV4 } from './StatusPillV4';
import { isAdverse, pluralizeCount } from './workforce-v4';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  LEAVE_TYPE_META_V4,
  MIN_TAP_CLASS,
  spokenLine,
} from './internal/tone-v4';
import { LEAVE_STATUS_META } from './internal';
import type { LeaveRequestProps } from './LeaveRequest';

export interface LeaveRequestV4Props extends LeaveRequestProps {
  /**
   * Why the request was denied.
   *
   * `denied` is a decision a person has to act on and the card had no field to
   * carry the manager's sentence, so the employee saw "✕ Denied" and nothing
   * else. Rendered whenever the status is an adverse one.
   */
  decisionReason?: string;
  /** Copy on the approve action. Default `'Approve'`. */
  approveLabel?: string;
  /** Copy on the deny action. Default `'Deny'`. */
  denyLabel?: string;
  /** Render the day count. Default `'3 days'` / `'1 day'`. */
  formatDays?: (days: number) => string;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/**
 * **V4 leave request** — the web twin of the native `LeaveRequestV4`, same
 * props as {@link LeaveRequest} plus `decisionReason`, `approveLabel`,
 * `denyLabel`, `formatDays` and `testID`.
 *
 * ## Six changes
 *
 * 1. **A manager can approve leave from the keyboard.** This is the module's
 *    headline defect and this card is where it does the most damage. Approve
 *    and Deny were `<Button>`s inside a `<Card role="button">` carrying its own
 *    Enter/Space handler. Their *clicks* were guarded with `stopPropagation`;
 *    their *keydowns* were not. Tab to Approve, press Enter, and the card's
 *    handler catches the bubbled event, calls `preventDefault()` — which
 *    cancels the button's own activation, because Enter's default action on a
 *    button **is** that click — and fires the card's `onClick` instead. The
 *    manager is navigated to the request detail, the request is still pending,
 *    and nothing says so. A mouse user never sees it, which is why it shipped.
 *    The card is now a plain container, the activation is a real `<button>`
 *    around the employee and the dates, and the two decisions are its
 *    **siblings**. No guard, because there is nothing left to guard against.
 * 2. **`days={0}` and `days={-1}` no longer render.** The base printed
 *    "0 days" and "-1 days" — a request for a negative number of days — by
 *    interpolating whatever it was handed. The count is floored into `0…∞`
 *    and simply omitted when there is nothing to count.
 * 3. **A denial can say why.** See `decisionReason`.
 * 4. **The card is one accessible name** carrying the status. `Leave request,
 *    Vacation, Pending` replaced the subtree, so the employee, the dates and
 *    the day count were never announced.
 * 5. **Leave type stops spending a status colour.** `sick: danger` said that
 *    being ill is an error and `parental: success` that having a baby went
 *    well. The glyph already tells a holiday from a sick day.
 * 6. **Deny weighs the same on both twins.** Web filled it (`variant="danger"`)
 *    and native outlined it, so the destructive action was the loudest thing
 *    on the card on one platform and the quietest on the other. Both are now
 *    an outline at `tone="danger"` — resolved through `tone`, because
 *    `ButtonVariant` has a `danger` member on web and none on native.
 */
export const LeaveRequestV4 = React.forwardRef<HTMLDivElement, LeaveRequestV4Props>(
  function LeaveRequestV4(
    {
      type,
      startDate,
      endDate,
      days,
      status,
      employeeName,
      employeeAvatarUrl,
      approver,
      reason,
      actionable = false,
      variant = 'default',
      onApprove,
      onDeny,
      onClick,
      decisionReason,
      approveLabel = 'Approve',
      denyLabel = 'Deny',
      formatDays,
      testID,
      className,
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const compact = variant === 'compact';
    const typeMeta = LEAVE_TYPE_META_V4[type];
    const statusMeta = LEAVE_STATUS_META[status];
    const range = endDate && endDate !== startDate ? `${startDate} – ${endDate}` : startDate;
    const showActions = actionable && status === 'pending';
    const interactive = onClick != null;

    // A request cannot be for a negative number of days, and "0 days" is not a
    // request at all — the base rendered both because it interpolated the raw
    // prop.
    const dayCount = Math.max(0, Math.floor(Number.isFinite(days) ? days : 0));
    const daysText =
      dayCount > 0 ? (formatDays ?? ((n: number) => pluralizeCount(n, 'day')))(dayCount) : undefined;

    // `denied` is the adverse member of this union; `cancelled` is a
    // withdrawal, not a refusal, and owes nobody a reason.
    const adverseReason = isAdverse(status) ? decisionReason : undefined;

    const summary = (
      <>
        {employeeName ? (
          <AvatarV4 size="sm" name={employeeName} src={employeeAvatarUrl} alt="" />
        ) : null}
        <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
          {employeeName ? (
            <span className="truncate text-base font-bold text-on-card">{employeeName}</span>
          ) : null}
          <span className="flex items-center gap-xs text-sm font-semibold text-on-card">
            <span aria-hidden="true">{typeMeta.glyph}</span>
            {typeMeta.label}
          </span>
          <span className="flex items-center justify-between gap-sm">
            <span className="text-sm text-on-card">{range}</span>
            {daysText ? (
              <span className="text-xs font-semibold text-muted-text">{daysText}</span>
            ) : null}
          </span>
        </span>
      </>
    );

    return (
      <Card ref={ref} data-testid={testID} className={cn('flex flex-col gap-sm', className)}>
        <div className="flex items-start gap-sm">
          {interactive ? (
            <button
              type="button"
              aria-label={spokenLine([
                employeeName,
                'Leave request',
                typeMeta.label,
                range,
                daysText,
                statusMeta.label,
                adverseReason,
              ])}
              onClick={onClick}
              data-xen-v4-state=""
              style={cardStateVars()}
              className={cn(
                'flex min-w-0 flex-1 items-start gap-sm rounded-[var(--xen-radius-md)] text-left',
                MIN_TAP_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              {summary}
            </button>
          ) : (
            <div className="flex min-w-0 flex-1 items-start gap-sm">{summary}</div>
          )}
          <StatusPillV4 meta={statusMeta} size="sm" aria-hidden={interactive || undefined} />
        </div>

        {!compact && reason ? (
          <p className="line-clamp-2 text-xs text-muted-text">{reason}</p>
        ) : null}

        {adverseReason ? (
          <p className="text-xs font-semibold text-danger-text">{adverseReason}</p>
        ) : null}

        {/*
          Siblings of the card's activation, never descendants of it. The whole
          point of the module: a decision has to be reachable.
        */}
        {showActions ? (
          <div className="flex gap-xs">
            <ButtonV4
              size="sm"
              variant="primary"
              className={cn('flex-1', MIN_TAP_CLASS)}
              onClick={onApprove}
            >
              {approveLabel}
            </ButtonV4>
            <ButtonV4
              size="sm"
              variant="outline"
              tone="danger"
              className={cn('flex-1', MIN_TAP_CLASS)}
              onClick={onDeny}
            >
              {denyLabel}
            </ButtonV4>
          </div>
        ) : approver && (status === 'approved' || status === 'denied') ? (
          <p className="text-xs text-muted-text">
            {status === 'approved' ? 'Approved' : 'Denied'} by {approver}
          </p>
        ) : null}
      </Card>
    );
  }
);
