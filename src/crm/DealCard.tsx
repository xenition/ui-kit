import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar } from '../primitives';
import { formatMoney } from '../commerce';
import { WinLossBadge } from './WinLossBadge';
import { activate, clampPct, type DealOutcome } from './internal';
export type { DealOutcome } from './internal';

export type DealCardVariant = 'default' | 'compact' | 'highlighted';

export interface DealOwner {
  name?: string;
  avatarUrl?: string;
}

export interface DealCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Deal / opportunity name. */
  name: string;
  /** Account or company the deal belongs to. */
  company?: string;
  /** Deal value in integer **cents**. */
  valueCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Named pipeline stage (e.g. "Negotiation"). */
  stage?: string;
  /** Win probability 0–100. Rendered as a labelled meter. */
  probability?: number;
  /** Deal owner / rep — shown as an avatar. */
  owner?: DealOwner;
  /** Expected/actual close date, pre-formatted for display. */
  closeDate?: string;
  /** Lifecycle result. `won` reads success, `lost` reads danger. */
  outcome?: DealOutcome;
  /** Visual density / emphasis. */
  variant?: DealCardVariant;
  /** Show a placeholder skeleton instead of content. */
  loading?: boolean;
  /** Click handler for the whole card (renders as a keyboard-accessible button). */
  onClick?: () => void;
}

/**
 * Summary card for a single deal / opportunity: name, account, value, stage,
 * win-probability meter, owner avatar and outcome badge. `compact` drops the
 * meter and secondary meta for list use; `highlighted` tints the surface with
 * the `primary-50` token wash for the focused deal. Value is integer cents run
 * through the shared `formatMoney`. Outcome is conveyed by {@link WinLossBadge}
 * (glyph + word), so it never depends on color alone. When `onClick` is set the
 * card becomes a `role="button"` div with Enter/Space activation. All colors are
 * `--xen-*` token classes — no literals.
 */
export const DealCard = React.forwardRef<HTMLDivElement, DealCardProps>(function DealCard(
  {
    name,
    company,
    valueCents,
    currency = 'USD',
    stage,
    probability,
    owner,
    closeDate,
    outcome = 'open',
    variant = 'default',
    loading = false,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const compact = variant === 'compact';
  const highlighted = variant === 'highlighted';
  const pct = clampPct(probability);
  const showMeter = !compact && probability != null;
  const interactive = onClick && !loading ? activate(onClick) : {};

  return (
    <Card
      ref={ref}
      aria-label={onClick && !loading ? `Deal ${name}${company ? `, ${company}` : ''}` : undefined}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)]',
        highlighted && 'bg-primary-50 border-primary',
        onClick && !loading && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...interactive}
      {...rest}
    >
      {loading ? (
        <div aria-label="Loading deal" className="flex flex-col gap-[var(--xen-space-sm)]">
          <div className="h-4 w-[70%] rounded-[var(--xen-radius-sm)] bg-neutral-100" />
          <div className="h-3 w-[40%] rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-on-surface">{name}</p>
              {company ? <p className="truncate text-sm text-muted">{company}</p> : null}
            </div>
            <WinLossBadge outcome={outcome} size="sm" />
          </div>

          <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
            <span className="text-lg font-bold text-on-surface">{formatMoney(valueCents, currency)}</span>
            {stage ? <span className="truncate text-xs font-semibold text-muted">{stage}</span> : null}
          </div>

          {showMeter ? (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs text-muted">
                <span>Probability</span>
                <span className="font-semibold">{pct}%</span>
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
                className="h-1.5 overflow-hidden rounded-full bg-neutral-100"
              >
                <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ) : null}

          {!compact && (owner || closeDate) ? (
            <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
              {owner ? (
                <div className="flex min-w-0 items-center gap-[var(--xen-space-xs)]">
                  <Avatar size="sm" name={owner.name} src={owner.avatarUrl} />
                  {owner.name ? <span className="truncate text-xs text-muted">{owner.name}</span> : null}
                </div>
              ) : (
                <span />
              )}
              {closeDate ? <span className="text-xs text-muted">{closeDate}</span> : null}
            </div>
          ) : null}
        </>
      )}
    </Card>
  );
});
