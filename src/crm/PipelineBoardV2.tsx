import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { EmptyState, formatMoney } from '../commerce';
import { OUTCOME_META, toneFillClass } from './internal';
import type { PipelineBoardProps, PipelineDeal } from './PipelineBoard';

/** V2 accepts the exact same props as {@link PipelineBoard} — a drop-in replacement. */
export type PipelineBoardV2Props = PipelineBoardProps;

/** Tone bands cycled across the stage headers (band tint + left border + count-chip tint). */
const HEADER_TONES: Array<{ band: string; chip: string }> = [
  { band: 'bg-primary/10 border-primary', chip: 'bg-primary/20' },
  { band: 'bg-accent/10 border-accent', chip: 'bg-accent/20' },
  { band: 'bg-warn/10 border-warn', chip: 'bg-warn/20' },
  { band: 'bg-success/10 border-success', chip: 'bg-success/20' },
  { band: 'bg-danger/10 border-danger', chip: 'bg-danger/20' },
];

function dealDotClass(deal: PipelineDeal): string {
  return toneFillClass(OUTCOME_META[deal.outcome ?? 'open'].tone).split(' ')[0] ?? 'bg-primary';
}

/**
 * PipelineBoard **design V2** — columns, but each stage header wears a *colored*
 * tone band (cycled across the pipeline) with the stage name, deal count and
 * summed value, and every deal renders as a *compact chip* (dot + name +
 * right-aligned value) instead of a full {@link DealCard}. Denser and more
 * colorful than the base board. Same props as {@link PipelineBoard}:
 * `onDealClick` taps a chip; `onMoveDeal` adds guarded `← →` nudges disabled at
 * the pipeline ends. Empty board shows an {@link EmptyState}; empty stages show a
 * muted placeholder. Token-pure.
 */
export const PipelineBoardV2 = React.forwardRef<HTMLDivElement, PipelineBoardV2Props>(function PipelineBoardV2(
  { stages, currency = 'USD', onDealClick, onMoveDeal, columnWidth = 268, emptyLabel = 'No stages in this pipeline yet', className, ...rest },
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

  return (
    <div ref={ref} className={cn('w-full overflow-x-auto', className)} {...rest}>
      <div className="flex gap-md">
        {stages.map((stage, stageIndex) => {
          const total = stage.deals.reduce((sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0), 0);
          const tone = HEADER_TONES[stageIndex % HEADER_TONES.length]!;
          const canBack = stageIndex > 0;
          const canForward = stageIndex < stages.length - 1;
          return (
            <section
              key={stage.id}
              aria-label={stage.name}
              className="flex shrink-0 flex-col gap-sm overflow-hidden rounded-md border border-border bg-surface pb-sm"
              style={{ width: columnWidth }}
            >
              <header className={cn('flex flex-col gap-0.5 border-l-[3px] px-sm py-sm', tone.band)}>
                <div className="flex items-center justify-between gap-xs">
                  <h3 className="min-w-0 flex-1 truncate text-sm font-bold text-on-surface">{stage.name}</h3>
                  <span className={cn('rounded-full px-xs py-0.5 text-xs font-bold text-on-surface', tone.chip)}>
                    {stage.deals.length}
                  </span>
                </div>
                <span className="text-xs font-semibold text-muted">{formatMoney(total, currency)}</span>
              </header>

              <div className="flex flex-col gap-xs px-sm">
                {stage.deals.length === 0 ? (
                  <div className="py-lg text-center text-xs text-muted">No deals</div>
                ) : (
                  stage.deals.map((deal) => (
                    <div key={deal.id} className="flex flex-col gap-0.5">
                      {onDealClick ? (
                        <button
                          type="button"
                          aria-label={`Deal ${deal.name}`}
                          onClick={() => onDealClick(deal, stage)}
                          className="flex items-center gap-xs rounded-sm border border-border bg-surface px-sm py-xs text-left transition duration-200 hover:bg-neutral-100 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <span aria-hidden="true" className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dealDotClass(deal))} />
                          <span className="min-w-0 flex-1 truncate text-xs font-semibold text-on-surface">{deal.name}</span>
                          <span className="text-xs font-bold text-muted">{formatMoney(deal.valueCents, currency)}</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-xs rounded-sm border border-border bg-surface px-sm py-xs">
                          <span aria-hidden="true" className={cn('h-1.5 w-1.5 shrink-0 rounded-full', dealDotClass(deal))} />
                          <span className="min-w-0 flex-1 truncate text-xs font-semibold text-on-surface">{deal.name}</span>
                          <span className="text-xs font-bold text-muted">{formatMoney(deal.valueCents, currency)}</span>
                        </div>
                      )}
                      {onMoveDeal ? (
                        <div className="flex justify-between gap-xs">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            disabled={!canBack}
                            aria-label={`Move ${deal.name} back`}
                            onClick={() => onMoveDeal(deal, stage, 'back')}
                          >
                            <span aria-hidden="true">←</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            disabled={!canForward}
                            aria-label={`Move ${deal.name} forward`}
                            onClick={() => onMoveDeal(deal, stage, 'forward')}
                          >
                            <span aria-hidden="true">→</span>
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
});
