import * as React from 'react';
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
export declare const PipelineBoard: React.ForwardRefExoticComponent<PipelineBoardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PipelineBoard.d.ts.map