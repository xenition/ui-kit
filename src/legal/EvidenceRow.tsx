import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import {
  EVIDENCE_KIND_META,
  EVIDENCE_STATUS_META,
  toneSoftBgClass,
  activateOnKey,
  type EvidenceKind,
  type EvidenceStatus,
} from './internal';

export type EvidenceRowVariant = 'default' | 'compact';

export interface EvidenceRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Exhibit label / number (e.g. "Exhibit A-12"). */
  exhibit?: string;
  /** Description of the evidence item. */
  title: string;
  /** Kind of evidence — drives the leading glyph. */
  kind?: EvidenceKind;
  /** Admissibility / evidentiary status — glyph + word pill, never color alone. */
  status?: EvidenceStatus;
  /** Chain-of-custody / source label. */
  source?: string;
  /** Pre-formatted date collected / logged. */
  date?: string;
  /** Whether custody is verified (adds a "Chain verified" marker). */
  custodyVerified?: boolean;
  /** Density. */
  variant?: EvidenceRowVariant;
  /** Click handler (open the exhibit). */
  onClick?: () => void;
  testID?: string;
}

/**
 * One evidence exhibit in a matter: exhibit label, description, kind glyph, and
 * an admissibility pill (glyph + word so status never rests on color alone),
 * plus optional chain-of-custody source / date. A verified custody marker is a
 * glyph + word, not a bare color. When `onClick` is set the row is an accessible
 * `role="button"`. All colors are `--xen-*` token classes — no literals.
 */
export const EvidenceRow = React.forwardRef<HTMLDivElement, EvidenceRowProps>(
  function EvidenceRow(
    {
      exhibit,
      title,
      kind = 'document',
      status,
      source,
      date,
      custodyVerified,
      variant = 'default',
      onClick,
      testID,
      className,
      ...rest
    },
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
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `Evidence ${exhibit ? `${exhibit}, ` : ''}${title}` : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
          interactive && 'cursor-pointer hover:bg-neutral-100',
          className
        )}
        {...rest}
      >
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)]',
            toneSoftBgClass(kindMeta.tone)
          )}
        >
          <span aria-hidden="true" className="text-base leading-none">
            {kindMeta.glyph}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          {exhibit ? (
            <span className="text-xs font-bold uppercase tracking-wide text-muted">{exhibit}</span>
          ) : null}
          <span className={cn('text-sm font-semibold text-on-surface', compact && 'truncate')}>
            {title}
          </span>
          {!compact && meta ? <span className="truncate text-xs text-muted">{meta}</span> : null}
          {custodyVerified ? (
            <span className="text-xs font-semibold text-success">🔗 Chain verified</span>
          ) : null}
        </div>
        {status ? <StatusPill meta={EVIDENCE_STATUS_META[status]} size="sm" /> : null}
      </div>
    );
  }
);
