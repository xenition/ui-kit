import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce';

/** Tone slot for a breakdown segment — a near-white opacity step on the gradient. */
export type MortgageBreakdownTone = 'primary' | 'accent' | 'warn' | 'success';

/** One component of the monthly payment (principal+interest, tax, insurance, HOA…). */
export interface MortgageBreakdownItem {
  /** Legend label (e.g. "Principal & interest"). */
  label: string;
  /** This component's monthly amount, in integer **cents**. */
  cents: number;
  /** Segment tone; drives the bar/legend swatch opacity. Default `primary`. */
  tone?: MortgageBreakdownTone;
}

export interface MortgageSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total estimated monthly payment, in integer **cents** (the hero numeral). */
  monthlyCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Payment components — a stacked token bar + frosted legend tiles. */
  breakdown?: readonly MortgageBreakdownItem[];
  /** Down-payment summary line (e.g. "20% down · $80,000"). */
  downLabel?: string;
  /** Interest-rate summary line (e.g. "6.5% APR"). */
  rateLabel?: string;
  /** Loan-term summary line (e.g. "30-yr fixed"). */
  termLabel?: string;
}

/**
 * Opacity step (of near-white `primary-50`) that distinguishes each stacked
 * segment while keeping every fill token-derived and legible on the gradient.
 */
const TONE_FILL: Record<MortgageBreakdownTone, string> = {
  primary: 'bg-primary-50',
  accent: 'bg-primary-50/70',
  warn: 'bg-primary-50/45',
  success: 'bg-primary-50/25',
};

/**
 * MortgageSummary — a brand-gradient mortgage-results hero for the real-estate
 * V4 "listing" line (web parity of the native twin). A big near-white monthly
 * payment numeral sits on the brand gradient (`from-primary-500 to-primary-700`);
 * the `breakdown` renders as a single stacked bar of near-white opacity steps
 * plus frosted legend tiles, and the down/rate/term lines read as frosted chips.
 * Presentational — shaped data only, nothing fetches or computes amortization.
 * Money is integer cents via `formatMoney`. Token-only colors (`--xen-*` classes
 * + gradient utilities), dark-mode safe.
 */
export const MortgageSummary = React.forwardRef<HTMLDivElement, MortgageSummaryProps>(
  function MortgageSummary(
    { monthlyCents, currency = 'USD', breakdown, downLabel, rateLabel, termLabel, className, ...rest },
    ref
  ) {
    const monthly = Math.max(0, Math.trunc(monthlyCents || 0));
    const segments = (breakdown ?? []).filter((b) => Math.trunc(b.cents || 0) > 0);
    const total = segments.reduce((sum, b) => sum + Math.trunc(b.cents), 0);

    const chips: string[] = [];
    if (downLabel) chips.push(downLabel);
    if (rateLabel) chips.push(rateLabel);
    if (termLabel) chips.push(termLabel);

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-[var(--xen-space-lg)] rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] text-primary-50',
          className
        )}
        {...rest}
      >
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          <p className="text-sm font-semibold text-primary-100">Estimated monthly payment</p>
          <p
            aria-label={`Estimated monthly payment ${formatMoney(monthly, currency)} per month`}
            className="text-4xl font-extrabold tracking-tight text-primary-50"
          >
            {formatMoney(monthly, currency)}
            <span className="text-lg font-bold text-primary-100">/mo</span>
          </p>
        </div>

        {segments.length > 0 && total > 0 ? (
          <div className="flex flex-col gap-[var(--xen-space-md)]">
            {/* Stacked token bar. */}
            <div
              role="img"
              aria-label="Payment breakdown"
              className="flex h-3 w-full overflow-hidden rounded-full bg-primary-50/15"
            >
              {segments.map((b) => (
                <span
                  key={b.label}
                  className={cn('h-full', TONE_FILL[b.tone ?? 'primary'])}
                  style={{ width: `${(Math.trunc(b.cents) / total) * 100}%` }}
                />
              ))}
            </div>

            {/* Frosted legend tiles. */}
            <div className="grid grid-cols-2 gap-[var(--xen-space-sm)]">
              {segments.map((b) => (
                <div
                  key={b.label}
                  className="flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]"
                >
                  <span
                    aria-hidden="true"
                    className={cn('h-3 w-3 flex-shrink-0 rounded-full', TONE_FILL[b.tone ?? 'primary'])}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-primary-100">{b.label}</span>
                    <span className="block text-sm font-bold text-primary-50">
                      {formatMoney(Math.trunc(b.cents), currency)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {chips.length > 0 ? (
          <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
            {chips.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm font-semibold text-primary-50"
              >
                {c}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
