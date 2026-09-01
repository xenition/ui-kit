import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { formatMoney } from '../commerce/money';
import { DealCardV4 } from './DealCardV4';
import { BADGE_V4, spokenLine, TABULAR_CLASS } from './internal/crm-v4';
import type { PipelineBoardProps } from './PipelineBoard';

export interface PipelineBoardV4Props extends PipelineBoardProps {
  /** What an empty stage column says. Default `'No deals'`. */
  stageEmptyLabel?: string;
  /** How a stage's deal count is spoken. Default `` `${n} deals` ``. */
  formatStageCount?: (count: number) => string;
}

/**
 * **V4 pipeline board** — the web twin of the native `PipelineBoardV4`, same
 * props as {@link PipelineBoard} plus `stageEmptyLabel` and `formatStageCount`.
 *
 * ## Five changes
 *
 * 1. **The stage count is a badge on both twins.** Native hand-rolled a chip
 *    with `colors.muted` as its **fill** — a text token spent as a ground — and
 *    `colors.surface` as its ink, which is not that fill's guaranteed pair, so
 *    whether the number was readable depended entirely on the seed.
 * 2. **The move buttons are real targets.** They were ~28px squares held
 *    together with `hitSlop`, had no pressed treatment at all, and dimmed to an
 *    invented `0.4` when disabled — below M3's 0.38 band by a rounding error
 *    and above it by nothing anyone chose. They clear 44, take the state layer,
 *    and disable at 0.38.
 * 3. **A stage says how many deals it holds, in words.** `4` alone is not a
 *    quantity of anything; the column's name carries "4 deals" so a reader
 *    learns which stage a deal is sitting in.
 * 4. **Both twins use the shared empty state.** Native drew its own bordered
 *    box despite `EmptyState` being right there in the native primitives.
 * 5. **Stage totals are tabular**, so a row of column sums lines up instead of
 *    drifting with the digit widths.
 */
export const PipelineBoardV4 = React.forwardRef<HTMLDivElement, PipelineBoardV4Props>(
  function PipelineBoardV4(
    {
      stages,
      currency = 'USD',
      onDealClick,
      onMoveDeal,
      columnWidth = 268,
      emptyLabel = 'No stages in this pipeline yet',
      stageEmptyLabel = 'No deals',
      formatStageCount,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const list = stages ?? [];
    const spellCount = formatStageCount ?? ((n: number) => `${n} deals`);

    if (list.length === 0) {
      return (
        <EmptyStateV4
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

    // One recipe for both arrows, so the two are never nearly the same size.
    const moveClass = cn(
      'flex flex-1 items-center justify-center rounded-[var(--xen-radius-md)] border border-border text-sm text-on-surface',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      // M3's disabled-content band, from the scale — not the invented 0.4 the
      // base dimmed an unreachable arrow to.
      V4_DISABLED_CLASS,
      MIN_TAP_CLASS
    );
    const moveStyle = stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties;

    return (
      <div ref={ref} className={cn('w-full overflow-x-auto', className)} {...rest}>
        <div className="flex gap-md">
          {list.map((stage, stageIndex) => {
            const total = stage.deals.reduce(
              (sum, d) => sum + (Number.isFinite(d.valueCents) ? d.valueCents : 0),
              0
            );
            const canBack = stageIndex > 0;
            const canForward = stageIndex < list.length - 1;
            const totalText = formatMoney(total, currency);

            return (
              <section
                key={stage.id}
                // The column's name carries the count and the sum, so a reader
                // learns what stage a deal is in and how big the stage is.
                aria-label={spokenLine([stage.name, spellCount(stage.deals.length), totalText])}
                className="flex shrink-0 flex-col gap-sm rounded-[var(--xen-radius-md)] border border-border bg-surface p-sm"
                style={{ width: columnWidth }}
              >
                <header className="flex flex-col gap-xs">
                  <div className="flex items-center justify-between gap-xs">
                    <h3 className="min-w-0 flex-1 truncate text-sm font-bold text-on-surface">
                      {stage.name}
                    </h3>
                    {/* The count's words live in the column's name. */}
                    <BadgeV4 {...BADGE_V4} tone="neutral" aria-hidden="true">
                      {stage.deals.length}
                    </BadgeV4>
                  </div>
                  <span className={cn('text-xs font-semibold text-muted-text', TABULAR_CLASS)}>
                    {totalText}
                  </span>
                </header>

                {stage.deals.length === 0 ? (
                  <p className="py-lg text-center text-xs text-muted-text">{stageEmptyLabel}</p>
                ) : (
                  stage.deals.map((deal) => (
                    <div key={deal.id} className="flex flex-col gap-xs">
                      <DealCardV4
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
                        <div className="flex justify-between gap-xs">
                          <button
                            type="button"
                            disabled={!canBack}
                            aria-label={`Move ${deal.name} back`}
                            onClick={() => onMoveDeal(deal, stage, 'back')}
                            data-xen-v4-state=""
                            style={moveStyle}
                            className={moveClass}
                          >
                            <span aria-hidden="true">←</span>
                          </button>
                          <button
                            type="button"
                            disabled={!canForward}
                            aria-label={`Move ${deal.name} forward`}
                            onClick={() => onMoveDeal(deal, stage, 'forward')}
                            data-xen-v4-state=""
                            style={moveStyle}
                            className={moveClass}
                          >
                            <span aria-hidden="true">→</span>
                          </button>
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
  }
);
