import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { BarChart } from '../charts';
import { EmptyState, formatMoney } from '../commerce';
import { OUTCOME_META, toneFillClass } from './internal';
import type { PipelineBoardProps, PipelineDeal } from './PipelineBoard';

/** V3 accepts the exact same props as {@link PipelineBoard} — a drop-in replacement. */
export type PipelineBoardV3Props = PipelineBoardProps;

function dealDotClass(deal: PipelineDeal): string {
  return toneFillClass(OUTCOME_META[deal.outcome ?? 'open'].tone).split(' ')[0] ?? 'bg-primary';
}

/**
 * PipelineBoard **design V3** — no columns at all. A *horizontal stage-total
 * strip* (a token {@link BarChart} of each stage's summed value) sits above a
 * flat, vertically stacked *list* of every stage and its deals — a single-column,
 * no-horizontal-scroll layout for narrow screens. Same props as
 * {@link PipelineBoard}: `onDealClick` taps a deal line; `onMoveDeal` adds guarded
 * `← →` nudges disabled at the pipeline ends. Empty board shows an
 * {@link EmptyState}; empty stages show a muted placeholder. Token-pure.
 */
export const PipelineBoardV3 = React.forwardRef<HTMLDivElement, PipelineBoardV3Props>(function PipelineBoardV3(
  { stages, currency = 'USD', onDealClick, onMoveDeal, emptyLabel = 'No stages in this pipeline yet', className, ...rest },
  ref
) {
  if (stages.length === 0) {
    return (
      <EmptyState
        ref={ref}
        role="status"
        aria-label={emptyLabel}
        icon={<span aria-hidden="true">▤</span>}
        title={emptyLabel}
        className={className}
        {...rest}
      />
    );
  }

  const totals = stages.map((s) => s.deals.reduce((sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0), 0));
  const labels = stages.map((s) => s.name);
  const grandTotal = totals.reduce((a, b) => a + b, 0);

  return (
    <div ref={ref} className={cn('flex w-full flex-col gap-md', className)} {...rest}>
      <div className="flex flex-col gap-sm rounded-md border border-border bg-surface p-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted">Pipeline total</span>
          <span className="text-base font-extrabold text-on-surface">{formatMoney(grandTotal, currency)}</span>
        </div>
        <BarChart data={totals} labels={labels} height={80} color="primary" aria-label={`Stage totals across ${stages.length} stages`} />
      </div>

      <div className="flex flex-col gap-md">
        {stages.map((stage, stageIndex) => {
          const canBack = stageIndex > 0;
          const canForward = stageIndex < stages.length - 1;
          return (
            <section key={stage.id} aria-label={stage.name} className="flex flex-col gap-xs">
              <div className="flex items-center justify-between gap-sm">
                <h3 className="min-w-0 flex-1 truncate text-sm font-bold text-on-surface">{stage.name}</h3>
                <span className="text-xs font-semibold text-muted">
                  {`${stage.deals.length} · ${formatMoney(totals[stageIndex] ?? 0, currency)}`}
                </span>
              </div>

              {stage.deals.length === 0 ? (
                <div className="py-xs text-xs text-muted">No deals</div>
              ) : (
                stage.deals.map((deal) => {
                  const inner = (
                    <>
                      <span aria-hidden="true" className={cn('h-2 w-2 shrink-0 rounded-full', dealDotClass(deal))} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-on-surface">{deal.name}</p>
                        {deal.company ? <p className="truncate text-xs text-muted">{deal.company}</p> : null}
                      </div>
                      <span className="shrink-0 text-sm font-bold text-on-surface">{formatMoney(deal.valueCents, currency)}</span>
                    </>
                  );
                  return (
                    <div key={deal.id} className="flex items-center gap-sm">
                      {onDealClick ? (
                        <button
                          type="button"
                          aria-label={`Deal ${deal.name}`}
                          onClick={() => onDealClick(deal, stage)}
                          className="flex min-w-0 flex-1 items-center gap-sm rounded-sm border border-border bg-surface px-sm py-xs text-left transition duration-200 hover:bg-neutral-100 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          {inner}
                        </button>
                      ) : (
                        <div className="flex min-w-0 flex-1 items-center gap-sm rounded-sm border border-border bg-surface px-sm py-xs">
                          {inner}
                        </div>
                      )}
                      {onMoveDeal ? (
                        <div className="flex shrink-0 gap-xs">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={!canBack}
                            aria-label={`Move ${deal.name} back`}
                            onClick={() => onMoveDeal(deal, stage, 'back')}
                          >
                            <span aria-hidden="true">←</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={!canForward}
                            aria-label={`Move ${deal.name} forward`}
                            onClick={() => onMoveDeal(deal, stage, 'forward')}
                          >
                            <span aria-hidden="true">→</span>
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  );
                })
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
});
