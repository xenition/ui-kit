import * as React from 'react';
import type { StatusPipelineProps } from './StatusPipeline';
import type { ApplicationStage } from './types';
export interface StatusPipelineV4Props extends StatusPipelineProps {
    /** Override any stage's word. Unlisted stages keep {@link STAGE_LABEL}. */
    stageLabels?: Partial<Record<ApplicationStage, string>>;
    /** Render the position. Default `'3 of 5'`. */
    formatPosition?: (index: number, total: number) => string;
    /** Said when the stage is not in the pipeline. Default `'Stage unknown'`. */
    unknownStageLabel?: string;
}
/**
 * **V4 status pipeline** — same props as {@link StatusPipeline} plus
 * `stageLabels`, `formatPosition` and `unknownStageLabel`.
 *
 * ## Five changes
 *
 * 1. **The stage was announced nowhere.** `compact` — the variant every
 *    `ApplicationRow` in the module renders — hung its entire accessible name
 *    off `role="text"`. That is not an ARIA role; it is a WebKit extension,
 *    and Chrome and Firefox drop it *and* the `aria-label` with it. The `full`
 *    variant was no better: it put `aria-label` on a bare `<div>`, and ARIA
 *    forbids naming a `generic` element. Where an application actually sits —
 *    the reason the component exists — reached nobody. It is now ordinary
 *    visible text in `compact`, and a named `role="group"` around the step
 *    track in `full`.
 * 2. **An unknown stage is admitted rather than guessed at.** The base's
 *    `Math.max(0, indexOf(stage))` turned "not found" into the first stage, so
 *    a withdrawn or archived application announced "Stage 1 of 5: Applied"
 *    with total confidence — and the two twins picked *different* fallback
 *    words for the same input. `stageParts` reports the miss; this says
 *    `unknownStageLabel` and draws an empty track, which is the honest picture
 *    of not knowing.
 * 3. **The current step carries `aria-current="step"`,** through `StepsV4`, so
 *    "where am I" is a state a reader can query and not a fill colour.
 * 4. **The position is drawn as well as spoken.** `full` showed five markers
 *    and left the reader to count them; the `n of m` line is now beside the
 *    track in both variants.
 * 5. **Status words stop being inked with fill tokens.** `text-danger` and
 *    `text-muted` are the fill slots — the compiler guarantees contrast for
 *    `on-danger` against `danger`, and nothing at all for `muted`. The
 *    rejection line and the position take `danger-text` and `muted-text`.
 */
export declare const StatusPipelineV4: React.ForwardRefExoticComponent<StatusPipelineV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatusPipelineV4.d.ts.map