import * as React from 'react';
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
export declare const PipelineBoardV4: React.ForwardRefExoticComponent<PipelineBoardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PipelineBoardV4.d.ts.map