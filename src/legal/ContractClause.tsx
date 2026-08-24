import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import {
  CLAUSE_RISK_META,
  CLAUSE_STATUS_META,
  toneBgClass,
  type ClauseRisk,
  type ClauseStatus,
  type LegalTone,
} from './internal';

export type ContractClauseVariant = 'default' | 'compact';

export interface ContractClauseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Clause number / section reference (e.g. "§ 7.2"). */
  number?: string;
  /** Clause heading / title. */
  title: string;
  /** Clause body text. */
  body?: string;
  /** Negotiation state — glyph + word pill, never color alone. */
  status?: ClauseStatus;
  /** Risk level — glyph + word pill. */
  risk?: ClauseRisk;
  /** Whether the clause is expanded to show the full body. */
  expanded?: boolean;
  /** Density. */
  variant?: ContractClauseVariant;
  /** Toggle expand/collapse; passes the next expanded state. */
  onToggle?: (expanded: boolean) => void;
  testID?: string;
}

/**
 * A single contract clause: section number, heading, and (when expanded) body,
 * with negotiation-status and risk pills (each a glyph + word so state never
 * rests on color alone). A flagged / high-risk clause gets a token-tinted left
 * rail for scannability. When `onToggle` + `body` are set the clause is an
 * accessible `role="button"` with `aria-expanded`. All colors are `--xen-*`
 * token classes — no literals.
 */
export const ContractClause = React.forwardRef<HTMLDivElement, ContractClauseProps>(
  function ContractClause(
    {
      number,
      title,
      body,
      status,
      risk,
      expanded = false,
      variant = 'default',
      onToggle,
      testID,
      className,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';

    // Risk / flag drives a token-tinted accent rail; default rail is the border.
    const railTone: LegalTone =
      risk === 'high' || status === 'flagged'
        ? 'danger'
        : risk === 'medium' || status === 'negotiate'
          ? 'warn'
          : status === 'agreed'
            ? 'success'
            : 'neutral';
    const railClass = railTone === 'neutral' ? 'bg-border' : toneBgClass(railTone);

    const interactive = Boolean(onToggle) && Boolean(body);

    return (
      <div
        ref={ref}
        data-testid={testID}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-expanded={interactive ? expanded : undefined}
        aria-label={interactive ? `${expanded ? 'Collapse' : 'Expand'} clause ${title}` : undefined}
        onClick={interactive ? () => onToggle?.(!expanded) : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                  e.preventDefault();
                  onToggle?.(!expanded);
                }
              }
            : undefined
        }
        className={cn(
          'flex gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
          interactive && 'cursor-pointer hover:bg-neutral-100',
          className
        )}
        {...rest}
      >
        <span aria-hidden="true" className={cn('w-[3px] shrink-0 rounded-full', railClass)} />
        <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]">
          <div className="flex items-start gap-[var(--xen-space-sm)]">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              {number ? (
                <span className="text-xs font-bold text-muted">{number}</span>
              ) : null}
              <span
                className={cn(
                  'text-sm font-semibold text-on-surface',
                  compact && !expanded && 'truncate'
                )}
              >
                {title}
              </span>
            </div>
            {status ? <StatusPill meta={CLAUSE_STATUS_META[status]} size="sm" /> : null}
          </div>

          {risk ? <StatusPill meta={CLAUSE_RISK_META[risk]} variant="inline" size="sm" /> : null}

          {expanded && body ? (
            <p className="text-xs leading-relaxed text-on-surface">{body}</p>
          ) : null}
        </div>
      </div>
    );
  }
);
