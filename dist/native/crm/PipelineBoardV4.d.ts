import * as React from 'react';
import type { PipelineBoardProps } from './PipelineBoard';
export interface PipelineBoardV4Props extends PipelineBoardProps {
    /** Placeholder inside a stage that holds no deals. Default `'No deals'`. */
    stageEmptyLabel?: string;
    /** How a stage's deal count is spelled. Default `'3 deals'`. */
    formatStageCount?: (count: number) => string;
}
/**
 * **V4 pipeline board** — same props as {@link PipelineBoard} plus
 * `stageEmptyLabel` and `formatStageCount`.
 *
 * ## Six changes
 *
 * 1. **The stage count is a real `Badge` on both twins.** Native hand-rolled a
 *    chip filled with `colors.muted` — a **text** token — and inked with
 *    `colors.surface`, which is not the pair for anything. Web already used a
 *    badge, so the same count was two objects.
 * 2. **The move buttons clear 44.** They were roughly 28px with a `hitSlop`,
 *    which is a hit area, not a target: nothing on screen tells a user where
 *    to aim.
 * 3. **They disable at 0.38**, M3's disabled-content band, rather than an
 *    invented `0.4` — and they finally acknowledge a press.
 * 4. **A stage column is a group.** Native exposed no grouping at all, so a
 *    reader walking the board never learned which stage a deal was in; each
 *    column's deals are now a named list.
 * 5. **Empty is the shared `EmptyState`** — for the whole board and for a
 *    single empty stage, which was one muted line in a blank region.
 * 6. **The count carries a unit and the stage totals are tabular**, so a row
 *    of columns lines its figures up.
 */
export declare function PipelineBoardV4({ stages, currency, onDealPress, onMoveDeal, columnWidth, emptyLabel, stageEmptyLabel, formatStageCount, style, }: PipelineBoardV4Props): React.ReactElement;
//# sourceMappingURL=PipelineBoardV4.d.ts.map