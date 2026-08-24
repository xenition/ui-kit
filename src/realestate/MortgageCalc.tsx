import * as React from 'react';
import { cn } from '../primitives/cn';
import { Input } from '../primitives';
import { formatMoney } from '../commerce';

/** The derived figures a {@link MortgageCalc} reports on each change. */
export interface MortgageEstimate {
  /** Monthly principal + interest payment, in integer cents. */
  monthlyCents: number;
  /** Financed amount (price − down payment), in integer cents. */
  loanCents: number;
  /** Down payment, in integer cents. */
  downCents: number;
}

export interface MortgageCalcProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Home price in integer minor units (cents). */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Initial down-payment percent (default 20). */
  downPercent?: number;
  /** Initial annual interest rate percent (default 6.5). */
  ratePercent?: number;
  /** Loan term in years (default 30). */
  termYears?: number;
  /** Card heading. */
  title?: string;
  /** Fires whenever an input changes, with the recomputed estimate. */
  onChange?: (estimate: MortgageEstimate) => void;
}

/** Standard amortized monthly payment. Guards a zero rate (straight division). */
function monthlyPayment(loanCents: number, annualRatePct: number, termYears: number): number {
  const n = Math.max(termYears, 1) * 12;
  const r = annualRatePct / 100 / 12;
  if (r <= 0) return Math.round(loanCents / n);
  const factor = Math.pow(1 + r, n);
  return Math.round((loanCents * r * factor) / (factor - 1));
}

const clampPct = (n: number): number => (n < 0 ? 0 : n > 100 ? 100 : n);
const parseNum = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ''));
  return Number.isFinite(v) ? v : 0;
};

/**
 * Web parity of the native `MortgageCalc`: an interactive mortgage estimator —
 * editable down-payment and interest-rate fields over a fixed home price,
 * computing the amortized monthly payment plus the financed loan amount. Fully
 * self-contained (no fetch); reports every recompute through `onChange`. Rate /
 * percent inputs are clamped and parsed defensively, and a zero rate falls back
 * to straight division (no divide-by-zero). All colors come from the `--xen-*`
 * tokens — no literal colors; money uses the shared `formatMoney`.
 */
export const MortgageCalc = React.forwardRef<HTMLDivElement, MortgageCalcProps>(
  function MortgageCalc(
    {
      priceCents,
      currency = 'USD',
      downPercent = 20,
      ratePercent = 6.5,
      termYears = 30,
      title = 'Monthly payment',
      onChange,
      className,
      ...rest
    },
    ref
  ) {
    const [downPct, setDownPct] = React.useState(String(downPercent));
    const [ratePct, setRatePct] = React.useState(String(ratePercent));

    const down = clampPct(parseNum(downPct));
    const rate = parseNum(ratePct);
    const downCents = Math.round((priceCents * down) / 100);
    const loanCents = Math.max(priceCents - downCents, 0);
    const monthlyCents = monthlyPayment(loanCents, rate, termYears);

    const emit = React.useCallback(
      (nextDownPct: number, nextRatePct: number): void => {
        const d = Math.round((priceCents * clampPct(nextDownPct)) / 100);
        const loan = Math.max(priceCents - d, 0);
        onChange?.({
          monthlyCents: monthlyPayment(loan, nextRatePct, termYears),
          loanCents: loan,
          downCents: d,
        });
      },
      [onChange, priceCents, termYears]
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-3 border border-border bg-surface p-[var(--xen-space-lg)]',
          'rounded-[var(--xen-radius-lg)]',
          className
        )}
        {...rest}
      >
        <span className="text-sm text-muted">{title}</span>
        <span
          aria-label={`Estimated monthly payment ${formatMoney(monthlyCents, currency)}`}
          className="text-3xl font-bold text-on-surface"
        >
          {`${formatMoney(monthlyCents, currency)}/mo`}
        </span>

        <div className="flex gap-3">
          <label className="flex flex-1 flex-col gap-1">
            <span className="text-sm text-muted">Down %</span>
            <Input
              data-testid="xen-re-mortgage-down"
              inputMode="decimal"
              value={downPct}
              onChange={(e) => {
                setDownPct(e.target.value);
                emit(parseNum(e.target.value), rate);
              }}
            />
          </label>
          <label className="flex flex-1 flex-col gap-1">
            <span className="text-sm text-muted">Rate %</span>
            <Input
              data-testid="xen-re-mortgage-rate"
              inputMode="decimal"
              value={ratePct}
              onChange={(e) => {
                setRatePct(e.target.value);
                emit(down, parseNum(e.target.value));
              }}
            />
          </label>
        </div>

        <div className="flex justify-between">
          <span className="text-xs text-muted">{`Loan ${formatMoney(loanCents, currency)}`}</span>
          <span className="text-xs text-muted">
            {`${termYears} yr · ${formatMoney(downCents, currency)} down`}
          </span>
        </div>
      </div>
    );
  }
);
