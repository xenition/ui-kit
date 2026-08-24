import * as React from 'react';
import type { PipelineBoardProps } from './PipelineBoard';
/** V3 accepts the exact same props as {@link PipelineBoard} — a drop-in replacement. */
export type PipelineBoardV3Props = PipelineBoardProps;
/**
 * PipelineBoard **design V3** — no columns at all. A *horizontal stage-total
 * strip* (a token `BarChart` of each stage's summed value) sits above a flat,
 * vertically stacked *list* of every stage and its deals — a single-column,
 * no-horizontal-scroll layout for phones. Same props as {@link PipelineBoard}:
 * `onDealPress` taps a deal line, `onMoveDeal` adds guarded `← →` nudges
 * disabled at the pipeline ends. Empty board shows `emptyLabel`; empty stages
 * show a muted placeholder. Token-pure.
 */
export declare function PipelineBoardV3({ stages, currency, onDealPress, onMoveDeal, emptyLabel, style, }: PipelineBoardV3Props): React.ReactElement;
//# sourceMappingURL=PipelineBoardV3.d.ts.map