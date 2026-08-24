import * as React from 'react';
import { cn } from '../primitives/cn';
import { Sparkline } from '../charts/Sparkline';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

export interface BalanceHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Caption above the figure (default `Total balance`). */
  label?: string;
  /** Headline balance in integer **cents**. */
  balanceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Period-over-period change in **cents**; tints + arrow (income/expense tone). */
  changeCents?: number;
  /** Optional percentage change shown beside the change amount. */
  changePct?: number;
  /** Optional trend series for a compact sparkline under the figure. */
  trend?: number[];
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Show a loading placeholder instead of the figure. */
  loading?: boolean;
}

/**
 * The hero balance block for an account/wallet screen: a muted label, a large
 * token-scaled figure, an optional up/down change (colored `text-success` /
 * `text-danger`), and an optional {@link Sparkline}. The balance is integer
 * cents (formatted to two decimals, no drift); the change tone derives from its
 * sign. All colors trace to tokens. Web parity of the native `BalanceHeader`.
 */
export const BalanceHeader = React.forwardRef<HTMLDivElement, BalanceHeaderProps>(
  function BalanceHeader(
    {
      label = 'Total balance',
      balanceCents,
      currency = 'USD',
      changeCents,
      changePct,
      trend,
      formatMoney: format = formatMoney,
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
    const up = (changeCents ?? 0) >= 0;
    const changeClass = up ? 'text-success' : 'text-danger';
    const arrow = up ? '▲' : '▼';

    return (
      <div
        ref={ref}
        role="group"
        className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)}
        {...rest}
      >
        <span className="text-sm text-muted">{label}</span>
        {loading ? (
          <div
            aria-label="Loading balance"
            className="h-9 w-40 rounded-[var(--xen-radius-sm)] bg-border"
          />
        ) : (
          <span className="text-3xl font-bold tabular-nums text-on-surface">
            {format(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency)}
          </span>
        )}
        {hasChange && !loading ? (
          <div className={cn('flex items-center gap-[var(--xen-space-xs)] text-sm font-semibold', changeClass)}>
            <span className="text-xs">{arrow}</span>
            <span>
              {format(Math.abs(Math.trunc(changeCents as number)), currency)}
              {typeof changePct === 'number' ? ` (${changePct > 0 ? '+' : ''}${changePct}%)` : ''}
            </span>
          </div>
        ) : null}
        {trend != null && trend.length > 0 && !loading ? (
          <Sparkline data={trend} color={up ? 'success' : 'danger'} className="mt-[var(--xen-space-xs)]" />
        ) : null}
      </div>
    );
  }
);
