import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  CONFLICT_CHECK_META,
  INTAKE_STATUS_META,
  PRACTICE_AREA_META,
  activateOnKey,
  type ConflictCheck,
  type IntakeStatus,
  type PracticeArea,
} from './internal';

export type ClientIntakeRowVariant = 'default' | 'compact';

export interface ClientIntakeRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Prospective client name. */
  name: string;
  /** Matter type / practice area of the inquiry. */
  practiceArea?: PracticeArea;
  /** Intake stage — glyph + word pill, never color alone. */
  status?: IntakeStatus;
  /** Conflict-check outcome — glyph + word pill. */
  conflict?: ConflictCheck;
  /** Pre-formatted inquiry date / source label. */
  source?: string;
  /** Short summary of the matter. */
  summary?: string;
  /** Avatar image URL (initials fallback otherwise). */
  avatarUrl?: string;
  /** Density. */
  variant?: ClientIntakeRowVariant;
  /** Render the accept/decline action row. */
  actionable?: boolean;
  /** Accept / retain the prospective client. */
  onAccept?: () => void;
  /** Decline the inquiry. */
  onDecline?: () => void;
  /** Click handler for the whole row. */
  onClick?: () => void;
  testID?: string;
}

/**
 * A prospective-client intake row: name, matter type, intake stage and
 * conflict-check pills (each a glyph + word so state never rests on color
 * alone). When `actionable` and still open, an accept/decline row of real
 * `<button>`s is shown (Accept is disabled on a hard conflict). When `onClick`
 * is set the row is an accessible `role="button"`. All colors are `--xen-*`
 * token classes — no literals.
 */
export const ClientIntakeRow = React.forwardRef<HTMLDivElement, ClientIntakeRowProps>(
  function ClientIntakeRow(
    {
      name,
      practiceArea,
      status = 'new',
      conflict,
      source,
      summary,
      avatarUrl,
      variant = 'default',
      actionable = false,
      onAccept,
      onDecline,
      onClick,
      testID,
      className,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';
    const decided = status === 'retained' || status === 'declined';
    const showActions = actionable && !decided;
    const interactive = Boolean(onClick);

    return (
      <div
        ref={ref}
        data-testid={testID}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `Intake ${name}` : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(
          'flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
          interactive && 'cursor-pointer hover:bg-neutral-100',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <Avatar size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-sm font-bold text-on-surface">{name}</span>
            {source ? <span className="truncate text-xs text-muted">{source}</span> : null}
          </div>
          <StatusPill meta={INTAKE_STATUS_META[status]} size="sm" />
        </div>

        {!compact ? (
          <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
            {practiceArea ? (
              <StatusPill meta={PRACTICE_AREA_META[practiceArea]} variant="soft" size="sm" />
            ) : null}
            {conflict ? (
              <StatusPill meta={CONFLICT_CHECK_META[conflict]} variant="soft" size="sm" />
            ) : null}
          </div>
        ) : null}

        {!compact && summary ? (
          <span className="text-xs text-muted">{summary}</span>
        ) : null}

        {showActions ? (
          <div className="flex gap-[var(--xen-space-xs)]">
            {onAccept ? (
              <Button
                size="sm"
                variant="primary"
                disabled={conflict === 'conflict'}
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept();
                }}
              >
                Accept
              </Button>
            ) : null}
            {onDecline ? (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onDecline();
                }}
              >
                Decline
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
