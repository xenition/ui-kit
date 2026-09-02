import * as React from 'react';
import type { ApplicationStage } from './types';
import type { StatusPipelineProps, StatusPipelineVariant } from './StatusPipeline';
export type { StatusPipelineVariant };
export interface StatusPipelineV4Props extends StatusPipelineProps {
    /** Re-word one or more stages. Defaults to the module's `STAGE_LABEL`. */
    stageLabels?: Partial<Record<ApplicationStage, string>>;
    /** Render the position. Default `'Stage 2 of 5'`. */
    formatPosition?: (index: number, total: number) => string;
    /** Said instead of a position when the stage is not in the pipeline. */
    unknownStageLabel?: string;
}
/**
 * **V4 status pipeline** — same props as {@link StatusPipeline} plus
 * `stageLabels`, `formatPosition` and `unknownStageLabel`.
 *
 * ## Four changes
 *
 * 1. **The stage is spoken.** The base put its summary on a `View` that was
 *    never `accessible` (and, on the web twin, on `role="text"` — not an ARIA
 *    role at all). So `<ApplicationRow application={{stage:'interview'}} />`
 *    announced the job title and nothing else: where the application actually
 *    stands, the entire reason the row exists, was silent on both platforms.
 * 2. **An unknown stage is admitted, not invented.** `Math.max(0,
 *    indexOf(stage))` turned "not found" into the first stage, so a withdrawn
 *    application announced "Stage 1 of 5: Applied" with total confidence.
 *    `stageParts` reports the miss; the track then draws no current marker and
 *    the name says `unknownStageLabel` instead of a position it does not know.
 * 3. **The two twins stopped disagreeing.** For an unrecognised stage the base
 *    fell back to the label `'Applied'` on web and to the raw union member
 *    `'applied'` on native — the same input, two different sentences, one of
 *    them an internal identifier read out loud. Neither survives: an unknown
 *    stage is named by `unknownStageLabel` on both twins.
 * 4. **The position is a real value, not a caption.** The track is a drawn
 *    progress indicator, so it carries `accessibilityRole="progressbar"` with
 *    an `accessibilityValue` — which is what lets a reader say "3 of 5"
 *    without the user having to parse a row of circles.
 *
 * Colour still means status here and only here: `danger` for a rejection,
 * `success` for hired, `primary` for in-flight. The employment *type* tinting
 * this module also carried — `contract → warn`, `remote → success` — was
 * identity wearing a status colour, and is gone from `JobCardV4` and
 * `SavedJobRowV4`.
 */
export declare function StatusPipelineV4({ stage, rejected, variant, stageLabels, formatPosition, unknownStageLabel, style, }: StatusPipelineV4Props): React.ReactElement;
//# sourceMappingURL=StatusPipelineV4.d.ts.map