import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { BarChart } from '../charts';
import { formatMoney } from '../commerce/money';
import { attainment, spokenLine, TABULAR_CLASS, toneInkClass } from './internal/crm-v4';
import type { DealForecastProps } from './DealForecast';

export interface DealForecastV4Props extends DealForecastProps {
  /** How the target figure is spelled. Defaults to `formatMoney`. */
  formatTarget?: (cents: number) => string;
  /** The words above the attainment figure. Default `'vs target'`. */
  targetLabel?: string;
  /** The word that appears once the quota is met. Default `'Target met'`. */
  attainedLabel?: string;
}

/**
 * **V4 deal forecast** — the web twin of the native `DealForecastV4`, same
 * props as {@link DealForecast} plus `formatTarget`, `targetLabel` and
 * `attainedLabel`.
 *
 * ## Four changes
 *
 * 1. **The target is finally shown.** `targetCents` is documented as "shown as
 *    a labelled reference" and was only ever used to compute a percentage: a
 *    caller supplied a quota and the block printed "78%" and the words "vs
 *    target" — never the quota itself, so there was nothing to check the
 *    percentage against. It is rendered now, through `formatTarget`.
 * 2. **Attainment is clamped.** The base divided raw, so a reversed period
 *    rendered a *negative* percent and a bumper quarter drew past the end of
 *    its own track. {@link attainment} clamps to 0–100.
 * 3. **Hitting quota is a word, not a colour.** Crossing the target was
 *    signalled by turning the figure green — colour alone, and green drawn with
 *    a **fill** token used as ink. `attainedLabel` renders beside the figure
 *    and joins the accessible sentence.
 * 4. **The total is tabular and the empty state is real** — a titled
 *    {@link EmptyStateV4} with status semantics, not a lone grey line where a
 *    chart should be.
 */
export const DealForecastV4 = React.forwardRef<HTMLDivElement, DealForecastV4Props>(
  function DealForecastV4(
    {
      periods,
      title = 'Forecast',
      currency = 'USD',
      targetCents,
      color = 'primary',
      height = 128,
      emptyLabel = 'No forecast data',
      formatTarget,
      targetLabel = 'vs target',
      attainedLabel = 'Target met',
      className,
      ...rest
    },
    ref
  ) {
    const series = periods ?? [];
    const total = series.reduce(
      (sum, p) => sum + (Number.isFinite(p.valueCents) ? p.valueCents : 0),
      0
    );
    const pct = attainment(total, targetCents);
    const attained = pct != null && pct >= 100;
    // The default has to be built here rather than in the signature: it closes
    // over `currency`, which is itself a prop.
    const spellTarget = formatTarget ?? ((cents: number) => formatMoney(cents, currency));
    const totalText = formatMoney(total, currency);
    const targetText = targetCents != null && targetCents > 0 ? spellTarget(targetCents) : undefined;

    const summary = spokenLine([
      title,
      totalText,
      pct != null ? `${Math.round(pct)}% ${targetLabel}` : undefined,
      targetText,
      attained ? attainedLabel : undefined,
    ]);

    return (
      <Card ref={ref} className={cn('flex flex-col gap-md', className)} {...rest}>
        <div className="flex items-start justify-between gap-sm">
          <div className="flex flex-col gap-xs">
            <span className="text-xs font-semibold text-muted-text">{title}</span>
            <span className={cn('text-2xl font-bold text-on-surface', TABULAR_CLASS)}>
              {totalText}
            </span>
          </div>

          {pct != null ? (
            <div className="flex flex-col items-end gap-xs">
              <span className="text-xs text-muted-text">{targetLabel}</span>
              <span className="flex items-center gap-xs">
                <span
                  className={cn(
                    'text-base font-bold',
                    TABULAR_CLASS,
                    attained ? toneInkClass('success') : 'text-on-surface'
                  )}
                >
                  {`${Math.round(pct)}%`}
                </span>
                {/* The word, so quota is not carried by a colour alone. */}
                {attained ? (
                  <span className={cn('text-xs font-semibold', toneInkClass('success'))}>
                    {attainedLabel}
                  </span>
                ) : null}
              </span>
              {/*
                The quota itself. Without it the percentage is a number with
                nothing to measure it against, which is what the base shipped.
              */}
              {targetText ? (
                <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>{targetText}</span>
              ) : null}
            </div>
          ) : null}
        </div>

        {series.length === 0 ? (
          <EmptyStateV4 role="status" aria-label={emptyLabel} title={emptyLabel} />
        ) : (
          <BarChart
            data={series.map((p) => (Number.isFinite(p.valueCents) ? p.valueCents : 0))}
            labels={series.map((p) => p.label)}
            color={color}
            height={height}
            aria-label={summary}
          />
        )}
      </Card>
    );
  }
);
