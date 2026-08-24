import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  LEAVE_STATUS_META,
  LEAVE_TYPE_META,
  type LeaveStatus,
  type LeaveType,
} from './internal';

export type LeaveRequestVariant = 'default' | 'compact';

export interface LeaveRequestProps {
  /** Category of leave — glyph + word chip. */
  type: LeaveType;
  /** Pre-formatted start date. */
  startDate: string;
  /** Pre-formatted end date (omit for a single day). */
  endDate?: string;
  /** Number of working days requested. */
  days: number;
  /** Approval state. `pending`/`approved`/`denied`/`cancelled`. */
  status: LeaveStatus;
  /** Requesting employee's name (for a manager's approval queue). */
  employeeName?: string;
  /** Requesting employee's avatar. */
  employeeAvatarUrl?: string;
  /** Approver's name (shown once approved/denied). */
  approver?: string;
  /** Optional reason / note. */
  reason?: string;
  /** Show approve/deny actions (only meaningful while `pending`). */
  actionable?: boolean;
  /** Density. */
  variant?: LeaveRequestVariant;
  onApprove?: () => void;
  onDeny?: () => void;
  /** Click handler for the whole card (web parity of native `onPress`). */
  onClick?: () => void;
  className?: string;
}

/**
 * A leave / time-off request: type, date range, day count and approval status.
 * Status is a glyph + word pill (pending → warn, approved → success, denied →
 * danger) so it never rests on color alone. When `actionable` and still
 * `pending`, approve / deny `<button>`s render for a manager's queue; once
 * decided the approver is shown instead. All colors are `--xen-*` token classes
 * — no literals. `forwardRef` to the root `<div>`.
 */
export const LeaveRequest = React.forwardRef<HTMLDivElement, LeaveRequestProps>(function LeaveRequest(
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
    className,
  },
  ref
) {
  const compact = variant === 'compact';
  const typeMeta = LEAVE_TYPE_META[type];
  const range = endDate && endDate !== startDate ? `${startDate} – ${endDate}` : startDate;
  const showActions = actionable && status === 'pending';
  const interactive = onClick != null;

  return (
    <Card
      ref={ref}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Leave request, ${typeMeta.label}, ${LEAVE_STATUS_META[status].label}` : undefined}
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
        'flex flex-col gap-3',
        interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {employeeName ? <Avatar size="sm" name={employeeName} src={employeeAvatarUrl} /> : null}
          <div className="min-w-0 flex-1">
            {employeeName ? (
              <p className="truncate text-base font-bold text-on-surface">{employeeName}</p>
            ) : null}
            <span className="flex items-center gap-1 text-sm font-semibold text-on-surface">
              <span aria-hidden="true">{typeMeta.glyph}</span>
              {typeMeta.label}
            </span>
          </div>
        </div>
        <StatusPill meta={LEAVE_STATUS_META[status]} size="sm" />
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-on-surface">{range}</span>
        <span className="text-xs font-semibold text-muted">
          {days} day{days === 1 ? '' : 's'}
        </span>
      </div>

      {!compact && reason ? <p className="line-clamp-2 text-xs text-muted">{reason}</p> : null}

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
