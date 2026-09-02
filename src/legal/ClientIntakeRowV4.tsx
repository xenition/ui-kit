import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { CONFLICT_CHECK_META, INTAKE_STATUS_META, PRACTICE_AREA_META, activateOnKey } from './internal';
import type { ClientIntakeRowProps } from './ClientIntakeRow';

/** Drop-in for {@link ClientIntakeRowProps} — same props, the V4 "chambers" design. */
export type ClientIntakeRowV4Props = ClientIntakeRowProps;

/**
 * ClientIntakeRow — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a prospective-client intake: an elevated
 * rounded card with a soft shadow, an avatar + name + source line, a labelled
 * glyph + word intake-stage pill (never color alone), a soft-primary chip strip
 * carrying practice area + conflict-check, and an optional summary. When
 * `actionable` and still open, an accept/decline row of real `<button>`s is shown
 * (Accept disabled on a hard conflict). When `onClick` is set the row is a
 * keyboard-activable `role="button"`. Reuses the base `variant`
 * (`default` / `compact`). All colors from `--xen-*` token classes (no literals).
 */
export const ClientIntakeRowV4 = React.forwardRef<HTMLDivElement, ClientIntakeRowV4Props>(function ClientIntakeRowV4(
  { name, practiceArea, status = 'new', conflict, source, summary, avatarUrl, variant = 'default', actionable = false, onAccept, onDecline, onClick, testID, className, ...rest },
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
      data-xen-client-intake-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Intake ${name}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? activateOnKey(onClick) : undefined}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-md)]',
        interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
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
        <StatusPill meta={INTAKE_STATUS_META[status]} variant="soft" size="sm" />
      </div>

      {!compact && (practiceArea || conflict) ? (
        <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
          {practiceArea ? <StatusPill meta={PRACTICE_AREA_META[practiceArea]} variant="soft" size="sm" /> : null}
          {conflict ? <StatusPill meta={CONFLICT_CHECK_META[conflict]} variant="soft" size="sm" /> : null}
        </div>
      ) : null}

      {!compact && summary ? <span className="text-xs text-muted">{summary}</span> : null}

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
});
