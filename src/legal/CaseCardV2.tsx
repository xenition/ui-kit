import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { CASE_PRIORITY_META, CASE_STATUS_META, PRACTICE_AREA_META, activateOnKey } from './internal';
import type { CaseCardProps } from './CaseCard';

/** Same public contract as {@link CaseCard} — a drop-in alternate design. */
export type CaseCardV2Props = CaseCardProps;

/**
 * CaseCard, redesigned (v2): an **elevated matter card**. The docket number is an
 * eyebrow over a large caption; client, practice/status/priority pills, and lead-
 * attorney·next-event meta follow, with an Open-case footer button. Distinct from
 * v1. Same props, token-only.
 */
export const CaseCardV2 = React.forwardRef<HTMLDivElement, CaseCardV2Props>(function CaseCardV2(
  { caseNumber, title, client, practiceArea, status, priority, leadAttorney, nextEvent, variant, loading = false, onClick, onOpen, testID, className, ...rest },
  ref
) {
  void variant;
  if (loading) {
    return <div ref={ref} data-xen-case-card="" data-testid={testID} aria-label="Loading case" className={cn('h-36 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
  }
  const interactive = typeof onClick === 'function';
  const meta = [leadAttorney, nextEvent].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-case-card=""
      data-testid={testID}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={title}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? activateOnKey(() => onClick?.()) : undefined}
      className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <div>
        <p className="font-mono text-xs text-muted">{caseNumber}</p>
        <p className="text-base font-bold text-on-surface">{title}</p>
        {client ? <p className="text-xs text-muted">{client}</p> : null}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {status ? <StatusPill meta={CASE_STATUS_META[status]} size="sm" /> : null}
        {practiceArea ? <StatusPill meta={PRACTICE_AREA_META[practiceArea]} variant="soft" size="sm" /> : null}
        {priority ? <StatusPill meta={CASE_PRIORITY_META[priority]} variant="soft" size="sm" /> : null}
      </div>
      {meta ? <p className="text-xs text-muted">{meta}</p> : null}
      {onOpen ? <Button size="md" variant="primary" className="w-full" onClick={(e) => { e.stopPropagation(); onOpen(); }}>Open case</Button> : null}
    </div>
  );
});
