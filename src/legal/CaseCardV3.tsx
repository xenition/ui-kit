import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import { CASE_PRIORITY_META, CASE_STATUS_META, activateOnKey } from './internal';
import type { CaseCardProps } from './CaseCard';

/** Same public contract as {@link CaseCard} — a drop-in alternate design. */
export type CaseCardV3Props = CaseCardProps;

/**
 * CaseCard, redesigned (v3): a **dense docket line**. The status pill leads, the
 * caption over a docket·client subtitle, and the priority pill trails — hairline-
 * bordered for a case list. The opposite of v2's card. Same props, token-only.
 */
export const CaseCardV3 = React.forwardRef<HTMLDivElement, CaseCardV3Props>(function CaseCardV3(
  { caseNumber, title, client, practiceArea, status, priority, leadAttorney, nextEvent, variant, loading = false, onClick, onOpen, testID, className, ...rest },
  ref
) {
  void variant;
  void practiceArea;
  void leadAttorney;
  void nextEvent;
  void onOpen;
  if (loading) {
    return <div ref={ref} data-xen-case-card="" data-testid={testID} aria-label="Loading case" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
  }
  const interactive = typeof onClick === 'function';

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
      className={cn('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      {status ? <StatusPill meta={CASE_STATUS_META[status]} variant="inline" size="sm" /> : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
        <p className="truncate font-mono text-xs text-muted">{caseNumber}{client ? ` · ${client}` : ''}</p>
      </div>
      {priority ? <StatusPill meta={CASE_PRIORITY_META[priority]} variant="soft" size="sm" /> : null}
    </div>
  );
});
