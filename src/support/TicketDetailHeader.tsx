import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';
import type { TicketStatus } from './TicketRow';
import type { Priority } from './TicketPriority';

/** Status glyph + label for the frosted status tile — status is never color-only. */
const STATUS_META: Record<TicketStatus, { glyph: string; label: string }> = {
  open: { glyph: '◉', label: 'Open' },
  pending: { glyph: '◐', label: 'Pending' },
  solved: { glyph: '✓', label: 'Solved' },
  closed: { glyph: '✕', label: 'Closed' },
};

/** Priority glyph + label for the frosted priority tile. */
const PRIORITY_META: Record<Priority, { glyph: string; label: string }> = {
  low: { glyph: '▽', label: 'Low' },
  normal: { glyph: '▷', label: 'Normal' },
  high: { glyph: '△', label: 'High' },
  urgent: { glyph: '⚑', label: 'Urgent' },
};

export interface TicketDetailHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Ticket subject line — the big near-white headline on the gradient. */
  subject: string;
  /** Human-readable ticket reference (e.g. `"#4821"`). */
  ticketId: string;
  /** Lifecycle status; rendered as a glyph + label frosted tile. */
  status: TicketStatus;
  /** Optional priority; rendered as a second frosted tile when set. */
  priority?: Priority;
  /** Requester display name (drives the avatar fallback + requester row). */
  requester?: string;
  /** Optional requester avatar URL. */
  requesterAvatar?: string;
  /** Agent the ticket is assigned to; shown in the requester row when set. */
  assignee?: string;
  /** SLA countdown/label (e.g. `"Due in 2h 05m"`); rendered as a frosted tile. */
  slaLabel?: string;
  /** When `true`, the SLA tile reads as breached (danger glyph + "breached" a11y). */
  slaBreached?: boolean;
  /** Optional free-form tags rendered as small frosted chips. */
  tags?: readonly string[];
  /** Primary "solve" CTA handler; the button is hidden when unset. */
  onSolve?: () => void;
  /** Primary CTA label (default `"Solve"`). */
  solveLabel?: string;
  /** Secondary "assign" CTA handler; the button is hidden when unset. */
  onAssign?: () => void;
  /** Secondary CTA label (default `"Assign"`). */
  assignLabel?: string;
}

/**
 * TicketDetailHeader — the gradient "console" hero shown when an agent opens a
 * ticket. The one saturated surface at the top of the detail view: the subject
 * reads as big near-white ink over a `from-primary-500 to-primary-700` ground,
 * with the ticket id, status, optional priority, and SLA countdown carried on
 * frosted tiles (`bg-primary-50/15`, `border-primary-50/30`). A requester row
 * (avatar + requester → assignee), optional tag chips, and a near-white primary
 * "Solve" pill beside a ghost "Assign" button complete it. Status/priority/SLA
 * carry a glyph so meaning is never color-only. Presentational — shaped data +
 * callbacks only; every color derives from the brand ramp (token-only, no
 * literals), light + dark safe.
 */
export const TicketDetailHeader = React.forwardRef<HTMLDivElement, TicketDetailHeaderProps>(
  function TicketDetailHeader(
    {
      subject,
      ticketId,
      status,
      priority,
      requester,
      requesterAvatar,
      assignee,
      slaLabel,
      slaBreached = false,
      tags,
      onSolve,
      solveLabel = 'Solve',
      onAssign,
      assignLabel = 'Assign',
      className,
      ...rest
    },
    ref
  ) {
    const statusMeta = STATUS_META[status] ?? STATUS_META.open;
    const priorityMeta = priority ? PRIORITY_META[priority] : undefined;

    const Tile = ({
      glyph,
      label,
      a11yLabel,
    }: {
      glyph: string;
      label: string;
      a11yLabel: string;
    }) => (
      <span
        role="img"
        aria-label={a11yLabel}
        className="inline-flex items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-primary-50"
      >
        <span aria-hidden="true">{glyph}</span>
        <span>{label}</span>
      </span>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]',
          className
        )}
        {...rest}
      >
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          <span className="text-sm font-semibold text-primary-100">{ticketId}</span>
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-primary-50">{subject}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
          <Tile glyph={statusMeta.glyph} label={statusMeta.label} a11yLabel={`Status ${statusMeta.label}`} />
          {priorityMeta ? (
            <Tile glyph={priorityMeta.glyph} label={priorityMeta.label} a11yLabel={`Priority ${priorityMeta.label}`} />
          ) : null}
          {slaLabel ? (
            <Tile
              glyph={slaBreached ? '⚠' : '⏱'}
              label={slaLabel}
              a11yLabel={slaBreached ? `SLA breached, ${slaLabel}` : `SLA, ${slaLabel}`}
            />
          ) : null}
        </div>

        {requester || assignee ? (
          <div className="flex items-center gap-[var(--xen-space-md)]">
            <Avatar size="md" name={requester} src={requesterAvatar} />
            <span className="flex min-w-0 flex-col">
              {requester ? (
                <span className="truncate text-base font-bold text-primary-50">{requester}</span>
              ) : null}
              {assignee ? (
                <span className="truncate text-sm text-primary-100">Assigned to {assignee}</span>
              ) : null}
            </span>
          </div>
        ) : null}

        {tags && tags.length > 0 ? (
          <ul className="flex flex-wrap gap-[var(--xen-space-xs)]" aria-label="Tags">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-[2px] text-xs font-semibold text-primary-100"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        {onSolve || onAssign ? (
          <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
            {onSolve ? (
              <button
                type="button"
                aria-label={solveLabel}
                onClick={onSolve}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-[var(--xen-radius-md)] bg-on-primary px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                {solveLabel}
              </button>
            ) : null}
            {onAssign ? (
              <button
                type="button"
                aria-label={assignLabel}
                onClick={onAssign}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-[var(--xen-radius-md)] border border-primary-50/30 px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-base font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                {assignLabel}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
