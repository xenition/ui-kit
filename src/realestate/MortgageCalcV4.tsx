import * as React from 'react';
import { cn } from '../primitives/cn';
import { Slider } from '../primitives';
import { formatMoney } from '../commerce';
import type { MortgageCalcProps, MortgageEstimate } from './MortgageCalc';

/** Drop-in for {@link MortgageCalcProps} — same props, the V4 "listing" design. */
export type MortgageCalcV4Props = MortgageCalcProps;

/** Standard amortized monthly payment. Guards a zero rate (straight division). */
function monthlyPayment(loanCents: number, annualRatePct: number, termYears: number): number {
  const n = Math.max(termYears, 1) * 12;
  const r = annualRatePct / 100 / 12;
  if (r <= 0) return Math.round(loanCents / n);
  const factor = Math.pow(1 + r, n);
  return Math.round((loanCents * r * factor) / (factor - 1));
}

const clampPct = (n: number): number => (n < 0 ? 0 : n > 100 ? 100 : n);

/**
 * MortgageCalc — **V4** "listing" design (web parity of the native V4). The
 * editorial, price-forward take on the estimator: the computed **monthly
 * payment as a big numeral** up top, then soft-primary sliders for down-payment
 * and interest rate over a fixed home price, and a small principal-vs-interest
 * breakdown bar beneath. Same props/behavior as {@link MortgageCalcProps} — the
 * compute logic and `onChange` estimate are preserved; a zero rate falls back to
 * straight division (no divide-by-zero). All colors from `--xen-*` token classes
 * (no literals); money uses the shared `formatMoney`.
 */
export const MortgageCalcV4 = React.forwardRef<HTMLDivElement, MortgageCalcV4Props>(
  function MortgageCalcV4(
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
    const [down, setDown] = React.useState(clampPct(downPercent));
    const [rate, setRate] = React.useState(ratePercent);

    const downCents = Math.round((priceCents * down) / 100);
    const loanCents = Math.max(priceCents - downCents, 0);
    const monthlyCents = monthlyPayment(loanCents, rate, termYears);

    // Principal-vs-interest split over the life of the loan, for the breakdown bar.
    const totalPaidCents = monthlyCents * Math.max(termYears, 1) * 12;
    const interestCents = Math.max(totalPaidCents - loanCents, 0);
    const principalPct =
      totalPaidCents > 0 ? Math.round((loanCents / totalPaidCents) * 100) : 0;

    const emit = React.useCallback(
      (nextDownPct: number, nextRatePct: number): void => {
        const d = Math.round((priceCents * clampPct(nextDownPct)) / 100);
        const loan = Math.max(priceCents - d, 0);
        const estimate: MortgageEstimate = {
          monthlyCents: monthlyPayment(loan, nextRatePct, termYears),
          loanCents: loan,
          downCents: d,
        };
        onChange?.(estimate);
      },
      [onChange, priceCents, termYears]
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface shadow-md',
          className
        )}
        {...rest}
      >
        <span className="text-sm text-muted">{title}</span>
        <span
          aria-label={`Estimated monthly payment ${formatMoney(monthlyCents, currency)}`}
          className="text-4xl font-bold leading-none text-on-surface"
        >
          {`${formatMoney(monthlyCents, currency)}`}
          <span className="text-base font-semibold text-muted">/mo</span>
        </span>

        <label className="flex flex-col gap-1">
          <span className="flex justify-between text-sm text-muted">
            <span>Down payment</span>
            <span className="font-semibold text-on-surface">{`${Math.round(down)}%`}</span>
          </span>
          <Slider
            value={down}
            min={0}
            max={100}
            step={1}
            onChange={(v) => {
              const next = clampPct(v);
              setDown(next);
              emit(next, rate);
            }}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="flex justify-between text-sm text-muted">
            <span>Interest rate</span>
            <span className="font-semibold text-on-surface">{`${rate.toFixed(2)}%`}</span>
          </span>
          <Slider
            value={rate}
            min={0}
            max={15}
            step={0.05}
            onChange={(v) => {
              setRate(v);
              emit(down, v);
            }}
          />
        </label>

        {/* Principal-vs-interest breakdown bar. */}
        <div className="flex flex-col gap-1">
          <div
            className="flex h-2 overflow-hidden rounded-full bg-primary/10"
            role="img"
            aria-label={`Principal ${principalPct} percent of total paid, interest ${100 - principalPct} percent`}
          >
            <div className="h-full bg-primary" style={{ width: `${principalPct}%` }} />
          </div>
          <div className="flex justify-between text-xs text-muted">
            <span>{`Principal ${formatMoney(loanCents, currency)}`}</span>
            <span>{`Interest ${formatMoney(interestCents, currency)}`}</span>
          </div>
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
