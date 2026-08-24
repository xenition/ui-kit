import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { LEAVE_STATUS_META, LEAVE_TYPE_META } from './internal';
import type { LeaveRequestProps } from './LeaveRequest';

/** Drop-in alternate design for {@link LeaveRequest} — identical Props. */
export type LeaveRequestV2Props = LeaveRequestProps;

/**
 * LeaveRequest, design **V2** — a card built around an explicit date-range block.
 * The range renders as two dated columns (From → To) joined by an arrow with the
 * day-count between; status is a glyph + word pill (never color alone). When
 * `actionable` and still `pending`, approve / deny buttons show; otherwise the
 * approver is named. Same Props as {@link LeaveRequest}. Elevated with a subtle
 * hover lift; token-pure (no literals).
 */
export const LeaveRequestV2 = React.forwardRef<HTMLDivElement, LeaveRequestV2Props>(function LeaveRequestV2(
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
    onApprove,
    onDeny,
    onClick,
    className,
  },
  ref
) {
  const typeMeta = LEAVE_TYPE_META[type];
  const statusMeta = LEAVE_STATUS_META[status];
  const showActions = actionable && status === 'pending';
  const hasEnd = !!endDate && endDate !== startDate;
  const interactive = onClick != null;

  return (
    <Card
      ref={ref}
      variant="elevated"
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Leave request, ${typeMeta.label}, ${statusMeta.label}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        'flex flex-col gap-3 transition duration-200 motion-reduce:transition-none',
        interactive &&
          'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {employeeName ? <Avatar size="sm" name={employeeName} src={employeeAvatarUrl} /> : null}
          <div className="min-w-0 flex-1">
            {employeeName ? (
              <p className="truncate text-base font-bold text-on-surface">{employeeName}</p>
            ) : null}
            <span className="flex items-center gap-1 text-sm font-semibold text-muted">
              <span aria-hidden="true">{typeMeta.glyph}</span>
              {typeMeta.label}
            </span>
          </div>
        </div>
        <StatusPill meta={statusMeta} size="sm" />
      </div>

      {/* Date-range block: From → To with the day-count between. */}
      <div className="flex items-center justify-between gap-3 rounded-md bg-primary/5 p-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted">From</p>
          <p className="truncate text-sm font-bold text-on-surface">{startDate}</p>
        </div>
        <div className="flex flex-col items-center">
          <span aria-hidden="true" className="text-base text-primary">
            →
          </span>
          <span className="text-xs font-semibold text-muted">
            {days} day{days === 1 ? '' : 's'}
          </span>
        </div>
        <div className="min-w-0 flex-1 text-right">
          <p className="text-xs text-muted">To</p>
          <p className="truncate text-sm font-bold text-on-surface">{hasEnd ? endDate : startDate}</p>
        </div>
      </div>

      {reason ? <p className="line-clamp-2 text-xs text-muted">{reason}</p> : null}

      {showActions ? (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="primary"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onApprove?.();
            }}
          >
            Approve
          </Button>
          <Button
            size="sm"
            variant="danger"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onDeny?.();
            }}
          >
            Deny
          </Button>
        </div>
      ) : approver && (status === 'approved' || status === 'denied') ? (
        <p className="text-xs text-muted">
          {status === 'approved' ? 'Approved' : 'Denied'} by {approver}
        </p>
      ) : null}
    </Card>
  );
});
