import * as React from 'react';
import type { PipelineBoardProps } from './PipelineBoard';
/** V2 accepts the exact same props as {@link PipelineBoard} — a drop-in replacement. */
export type PipelineBoardV2Props = PipelineBoardProps;
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
export declare const PipelineBoardV2: React.ForwardRefExoticComponent<PipelineBoardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PipelineBoardV2.d.ts.map