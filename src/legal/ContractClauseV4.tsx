import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import { CLAUSE_RISK_META, CLAUSE_STATUS_META, toneBgClass, type LegalTone } from './internal';
import type { ContractClauseProps } from './ContractClause';

/** Drop-in for {@link ContractClauseProps} — same props, the V4 "chambers" design. */
export type ContractClauseV4Props = ContractClauseProps;

/**
 * ContractClause — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a contract clause: an elevated rounded card
 * with a soft shadow and a token-tinted left rail that keys off risk / flag
 * state, a section-number eyebrow over the heading, negotiation-status and risk
 * pills (each a glyph + word so state never rests on color alone), and — when
 * expanded — the body. When `onToggle` + `body` are set the clause is a
 * keyboard-activable `role="button"` with `aria-expanded`. Reuses the base
 * `variant` (`default` / `compact`). All colors from `--xen-*` token classes
 * (no literals).
 */
export const ContractClauseV4 = React.forwardRef<HTMLDivElement, ContractClauseV4Props>(function ContractClauseV4(
  { number, title, body, status, risk, expanded = false, variant = 'default', onToggle, testID, className, ...rest },
  ref
) {
  const compact = variant === 'compact';
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
      data-xen-contract-clause=""
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
        'flex gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-md)]',
        interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <span aria-hidden="true" className={cn('w-1 shrink-0 rounded-full', railClass)} />
      <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]">
        <div className="flex items-start gap-[var(--xen-space-sm)]">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            {number ? <span className="text-xs font-bold tabular-nums text-muted">{number}</span> : null}
            <span className={cn('text-sm font-semibold text-on-surface', compact && !expanded && 'truncate')}>{title}</span>
          </div>
          {status ? <StatusPill meta={CLAUSE_STATUS_META[status]} variant="soft" size="sm" /> : null}
        </div>

        {risk ? <StatusPill meta={CLAUSE_RISK_META[risk]} variant="inline" size="sm" /> : null}

        {expanded && body ? <p className="text-xs leading-relaxed text-on-surface">{body}</p> : null}
      </div>
    </div>
  );
});
