import * as React from 'react';
import { cn } from '../primitives/cn';
import { LEAVE_STATUS_META, LEAVE_TYPE_META, type HrTone } from './internal';
import type { LeaveRequestProps } from './LeaveRequest';

/** Drop-in alternate design for {@link LeaveRequest} — identical Props. */
export type LeaveRequestV3Props = LeaveRequestProps;

/** Tone → solid dot background (token-bound, never a literal). */
const DOT_BG: Record<HrTone, string> = {
  neutral: 'bg-neutral-200',
  primary: 'bg-primary',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
  accent: 'bg-accent',
};

/**
 * LeaveRequest, design **V3** — a dense single line for tight queues. A leading
 * tone status-dot (paired with the status word for a11y — never color alone),
 * the leave type + optional employee and date range, and the day-count pinned
 * right. Same Props as {@link LeaveRequest}; approve/deny chrome is intentionally
 * dropped in favour of a tappable, borderless divider row. Token-pure.
 */
export const LeaveRequestV3 = React.forwardRef<HTMLDivElement, LeaveRequestV3Props>(function LeaveRequestV3(
  {
    type,
    startDate,
    endDate,
    days,
    status,
    employeeName,
    onClick,
    className,
  },
  ref
) {
  const typeMeta = LEAVE_TYPE_META[type];
  const statusMeta = LEAVE_STATUS_META[status];
  const range = endDate && endDate !== startDate ? `${startDate} – ${endDate}` : startDate;
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
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
        'flex items-center gap-3 border-b border-border bg-surface px-2 py-2 transition-colors motion-reduce:transition-none',
        interactive &&
          'cursor-pointer hover:bg-neutral-100 active:scale-[.99] motion-reduce:active:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      {/* Status dot + word — the word carries the meaning, not the color. */}
      <span
        role="img"
        aria-label={statusMeta.label}
        className={cn('h-2.5 w-2.5 shrink-0 rounded-full', DOT_BG[statusMeta.tone])}
      />

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1 truncate text-sm font-semibold text-on-surface">
          <span aria-hidden="true">{typeMeta.glyph}</span>
          {typeMeta.label}
          {employeeName ? <span className="font-normal text-muted">· {employeeName}</span> : null}
        </p>
        <p className="truncate text-xs text-muted">{range}</p>
      </div>

      <div className="text-right">
        <p className="text-sm font-bold text-on-surface">{days}d</p>
        <p className="text-xs text-muted">{statusMeta.label}</p>
      </div>
    </div>
  );
});
