import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  CASE_PRIORITY_META,
  CASE_STATUS_META,
  PRACTICE_AREA_META,
  activateOnKey,
  type CasePriority,
  type CaseStatus,
  type PracticeArea,
} from './internal';

export type CaseCardVariant = 'default' | 'compact' | 'detailed';

export interface CaseCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Case / docket number (e.g. "2026-CV-01184"). */
  caseNumber: string;
  /** Case caption / title. */
  title: string;
  /** Client name. */
  client?: string;
  /** Area of practice — glyph + word chip. */
  practiceArea?: PracticeArea;
  /** Lifecycle state — glyph + word chip, never color alone. */
  status?: CaseStatus;
  /** Priority — glyph + word chip. */
  priority?: CasePriority;
  /** Lead attorney of record (detailed variant). */
  leadAttorney?: string;
  /** Pre-formatted next-event label (detailed variant). */
  nextEvent?: string;
  /** Visual density / emphasis. */
  variant?: CaseCardVariant;
  /** Render a placeholder skeleton instead of content. */
  loading?: boolean;
  /** Click handler for the whole card (open the case). */
  onClick?: () => void;
  /** Explicit "Open case" affordance; renders a footer button when provided. */
  onOpen?: () => void;
  testID?: string;
}

/**
 * Summary card for a single case / matter file: docket number, caption, client,
 * and practice-area / status / priority chips (each a glyph + word so state
 * never rests on color alone). `compact` trims to a header row for lists;
 * `detailed` adds lead attorney and the next scheduled event. An optional
 * `onOpen` renders an explicit "Open case" button. Renders a `loading` skeleton
 * on demand. When `onClick` is set the card is an accessible `role="button"`
 * (keyboard-activable). All colors are `--xen-*` token classes — no literals.
 */
export const CaseCard = React.forwardRef<HTMLDivElement, CaseCardProps>(function CaseCard(
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

  return (
    <Card
      ref={ref}
      data-testid={testID}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Case ${caseNumber}: ${title}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? activateOnKey(onClick) : undefined}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)]',
        compact && 'p-[var(--xen-space-md)]',
        closed && 'opacity-70',
        interactive && 'cursor-pointer',
        className
      )}
      {...rest}
    >
      {loading ? (
        <div aria-label="Loading case" className="flex flex-col gap-[var(--xen-space-xs)]">
          <div className="h-3 w-1/3 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          <div className="h-4 w-3/4 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          <div className="h-3 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </div>
      ) : (
        <>
          <div className="flex items-start gap-[var(--xen-space-sm)]">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                {caseNumber}
              </span>
              <span className="truncate text-base font-bold text-on-surface">{title}</span>
              {client ? <span className="truncate text-sm text-muted">{client}</span> : null}
            </div>
            {status ? <StatusPill meta={CASE_STATUS_META[status]} size="sm" /> : null}
          </div>

          {!compact && (practiceArea || priority) ? (
            <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
              {practiceArea ? (
                <StatusPill meta={PRACTICE_AREA_META[practiceArea]} variant="soft" size="sm" />
              ) : null}
              {priority ? (
                <StatusPill meta={CASE_PRIORITY_META[priority]} variant="soft" size="sm" />
              ) : null}
            </div>
          ) : null}

          {detailed && (leadAttorney || nextEvent) ? (
            <div className="flex flex-col gap-0.5">
              {leadAttorney ? (
                <span className="text-xs text-muted">Lead: {leadAttorney}</span>
              ) : null}
              {nextEvent ? (
                <span className="text-xs font-semibold text-on-surface">⏭ {nextEvent}</span>
              ) : null}
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
              className="self-start rounded-[var(--xen-radius-md)] border border-border px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold text-primary hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              Open case
            </button>
          ) : null}
        </>
      )}
    </Card>
  );
});
