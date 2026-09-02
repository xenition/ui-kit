import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import { EVIDENCE_KIND_META, EVIDENCE_STATUS_META, activateOnKey } from './internal';
import type { EvidenceRowProps } from './EvidenceRow';

/** Drop-in for {@link EvidenceRowProps} — same props, the V4 "chambers" design. */
export type EvidenceRowV4Props = EvidenceRowProps;

/**
 * EvidenceRow — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on an evidence exhibit: an elevated rounded row
 * with a soft shadow, the kind glyph tucked in a soft-primary well, an exhibit
 * eyebrow over the description, a chain-of-custody meta line, an optional
 * "Chain verified" marker (glyph + word, not bare color), and a labelled glyph +
 * word admissibility pill (never color alone). `compact` truncates and hides the
 * meta line. When `onClick` is set the row is a keyboard-activable `role="button"`.
 * Reuses the base `variant` (`default` / `compact`). All colors from `--xen-*`
 * token classes (no literals).
 */
export const EvidenceRowV4 = React.forwardRef<HTMLDivElement, EvidenceRowV4Props>(function EvidenceRowV4(
  { exhibit, title, kind = 'document', status, source, date, custodyVerified, variant = 'default', onClick, testID, className, ...rest },
  ref
) {
  const compact = variant === 'compact';
  const kindMeta = EVIDENCE_KIND_META[kind];
  const interactive = Boolean(onClick);
  const meta = [source, date].filter(Boolean).join(' · ');

  return (
    <div
      ref={ref}
      data-testid={testID}
      data-xen-evidence-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Evidence ${exhibit ? `${exhibit}, ` : ''}${title}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? activateOnKey(onClick) : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        compact ? 'min-h-[44px]' : 'min-h-[56px]',
        interactive && 'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10 text-base leading-none">
        <span aria-hidden="true">{kindMeta.glyph}</span>
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {exhibit ? <span className="text-xs font-bold uppercase tracking-wide text-muted">{exhibit}</span> : null}
        <span className={cn('text-sm font-semibold text-on-surface', compact && 'truncate')}>{title}</span>
        {!compact && meta ? <span className="truncate text-xs text-muted">{meta}</span> : null}
        {custodyVerified ? <span className="text-xs font-semibold text-success">🔗 Chain verified</span> : null}
      </div>
      {status ? <StatusPill meta={EVIDENCE_STATUS_META[status]} variant="soft" size="sm" /> : null}
    </div>
  );
});
