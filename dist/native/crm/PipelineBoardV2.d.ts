import * as React from 'react';
import type { PipelineBoardProps } from './PipelineBoard';
/** V2 accepts the exact same props as {@link PipelineBoard} — a drop-in replacement. */
export type PipelineBoardV2Props = PipelineBoardProps;
/**
 * PipelineBoard **design V2** — columns, but each stage header wears a *colored*
 * tone band (cycled across the pipeline) with the stage name, deal count and
 * summed value, and every deal renders as a *compact chip* (name + right-aligned
 * value) instead of a full card. Denser and more colorful than the original
 * board. Same props as {@link PipelineBoard}: `onDealPress` taps a chip,
 * `onMoveDeal` adds guarded `← →` nudges disabled at the pipeline ends. Empty
 * board shows `emptyLabel`; empty stages show a muted placeholder. Token-pure.
 */
export declare function PipelineBoardV2({ stages, currency, onDealPress, onMoveDeal, columnWidth, emptyLabel, style, }: PipelineBoardV2Props): React.ReactElement;
//# sourceMappingURL=PipelineBoardV2.d.ts.map