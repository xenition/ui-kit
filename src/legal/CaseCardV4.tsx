import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import {
  CASE_PRIORITY_META,
  CASE_STATUS_META,
  PRACTICE_AREA_META,
  activateOnKey,
} from './internal';
import type { CaseCardProps } from './CaseCard';

/** Drop-in for {@link CaseCardProps} — same props, the V4 "chambers" design. */
export type CaseCardV4Props = CaseCardProps;

/**
 * CaseCard — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a matter file: an elevated rounded card with a
 * soft shadow, a docket-number eyebrow over a strong caption, the client, a
 * labelled glyph + word status pill (never color alone), and a soft-primary chip
 * strip carrying practice area + priority. `compact` trims to the header row;
 * `detailed` adds lead attorney + next event. An optional `onOpen` renders an
 * "Open case" affordance; when `onClick` is set the card is a keyboard-activable
 * `role="button"`. Reuses the base `variant` (`default` / `compact` / `detailed`).
 * All colors from `--xen-*` token classes (no literals).
 */
export const CaseCardV4 = React.forwardRef<HTMLDivElement, CaseCardV4Props>(function CaseCardV4(
  {
    caseNumber,
    title,
    client,
    practiceArea,
    status,
    priority,
    leadAttorney,
    nextEvent,
    variant = 'default',
    loading = false,
    onClick,
    onOpen,
    testID,
    className,
    ...rest
  },
  ref
) {
  const compact = variant === 'compact';
  const detailed = variant === 'detailed';
  const closed = status === 'closed';
  const interactive = Boolean(onClick) && !loading;
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

  if (loading) {
    return (
      <div
        ref={ref}
        data-testid={testID}
        data-xen-case-card=""
        aria-label="Loading case"
        aria-busy="true"
        className={cn(shell, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]', className)}
        {...rest}
      >
        <div className="h-3 w-1/3 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        <div className="h-4 w-3/4 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        <div className="h-3 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-testid={testID}
      data-xen-case-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Case ${caseNumber}: ${title}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? activateOnKey(onClick) : undefined}
      className={cn(
        shell,
        'flex flex-col gap-[var(--xen-space-md)]',
        compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]',
        closed && 'opacity-70',
        interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <div className="flex items-start gap-[var(--xen-space-sm)]">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-xs font-semibold uppercase tracking-wide tabular-nums text-muted">{caseNumber}</span>
          <span className="truncate text-lg font-bold text-on-surface">{title}</span>
          {client ? <span className="truncate text-sm text-muted">{client}</span> : null}
        </div>
        {status ? <StatusPill meta={CASE_STATUS_META[status]} size="sm" /> : null}
      </div>

      {!compact && (practiceArea || priority) ? (
        <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
          {practiceArea ? <StatusPill meta={PRACTICE_AREA_META[practiceArea]} variant="soft" size="sm" /> : null}
          {priority ? <StatusPill meta={CASE_PRIORITY_META[priority]} variant="soft" size="sm" /> : null}
        </div>
      ) : null}

      {detailed && (leadAttorney || nextEvent) ? (
        <div className="flex flex-col gap-0.5">
          {leadAttorney ? <span className="text-xs text-muted">Lead: {leadAttorney}</span> : null}
          {nextEvent ? <span className="text-xs font-semibold text-on-surface">⏭ {nextEvent}</span> : null}
        </div>
      ) : null}

      {onOpen ? (
        <button
          type="button"
          aria-label={`Open case ${caseNumber}`}
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="self-start rounded-[var(--xen-radius-md)] border border-border px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-xs font-bold text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          Open case
        </button>
      ) : null}
    </div>
  );
});
