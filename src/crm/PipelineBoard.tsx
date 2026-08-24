import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { EmptyState, formatMoney } from '../commerce';
import { DealCard } from './DealCard';
import type { DealOutcome, DealOwner } from './DealCard';

export interface PipelineDeal {
  id: string;
  name: string;
  company?: string;
  valueCents: number;
  probability?: number;
  outcome?: DealOutcome;
  owner?: DealOwner;
}

export interface PipelineStage {
  id: string;
  name: string;
  deals: PipelineDeal[];
}

export type MoveDirection = 'forward' | 'back';

export interface PipelineBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ordered pipeline stages, each holding its deals. */
  stages: PipelineStage[];
  /** ISO 4217 currency for the stage totals + deal values (default USD). */
  currency?: string;
  /** Fired when a deal card is activated. */
  onDealClick?: (deal: PipelineDeal, stage: PipelineStage) => void;
  /**
   * Fired when a deal is nudged to the previous/next stage via the arrow
   * affordances. Arrows are auto-disabled at the ends of the pipeline.
   */
  onMoveDeal?: (deal: PipelineDeal, stage: PipelineStage, direction: MoveDirection) => void;
  /** Column width in px (default 268). */
  columnWidth?: number;
  /** Placeholder message when there are no stages at all. */
  emptyLabel?: string;
}

/**
 * Horizontally scrolling sales pipeline: one column per stage, each headed by
 * the stage name, a deal-count badge, and the summed stage value (integer cents
 * via `formatMoney`). Deals render as compact {@link DealCard}s; when
 * `onMoveDeal` is set, each card gains `←/→` buttons that advance or regress it
 * a stage (disabled at the pipeline ends, so indexing is always guarded). An
 * empty stage shows a muted placeholder; a board with **no stages** shows an
 * {@link EmptyState} with `emptyLabel`. Non-drag — wire a DnD layer separately if
 * needed. All colors are `--xen-*` token classes.
 */
export const PipelineBoard = React.forwardRef<HTMLDivElement, PipelineBoardProps>(function PipelineBoard(
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
      <div className="flex gap-[var(--xen-space-md)]">
        {stages.map((stage, stageIndex) => {
          const total = stage.deals.reduce((sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0), 0);
          const canBack = stageIndex > 0;
          const canForward = stageIndex < stages.length - 1;
          return (
            <section
              key={stage.id}
              aria-label={stage.name}
              className="flex shrink-0 flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-sm)]"
              style={{ width: columnWidth }}
            >
              <header className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between gap-[var(--xen-space-xs)]">
                  <h3 className="min-w-0 flex-1 truncate text-sm font-bold text-on-surface">{stage.name}</h3>
                  <Badge tone="neutral">{stage.deals.length}</Badge>
                </div>
                <span className="text-xs font-semibold text-muted">{formatMoney(total, currency)}</span>
              </header>

              {stage.deals.length === 0 ? (
                <div className="py-[var(--xen-space-lg)] text-center text-xs text-muted">No deals</div>
              ) : (
                stage.deals.map((deal) => (
                  <div key={deal.id} className="flex flex-col gap-[var(--xen-space-xs)]">
                    <DealCard
                      name={deal.name}
                      company={deal.company}
                      valueCents={deal.valueCents}
                      currency={currency}
                      probability={deal.probability}
                      outcome={deal.outcome}
                      owner={deal.owner}
                      variant="compact"
                      onClick={onDealClick ? () => onDealClick(deal, stage) : undefined}
                    />
                    {onMoveDeal ? (
                      <div className="flex justify-between gap-[var(--xen-space-xs)]">
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
            </section>
          );
        })}
      </div>
    </div>
  );
});
