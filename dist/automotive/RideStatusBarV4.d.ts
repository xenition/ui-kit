import * as React from 'react';
import type { RideStage, RideStatusBarProps } from './RideStatusBar';
export interface RideStatusBarV4Props extends RideStatusBarProps {
    /** Override the stage words — four English phrases lived inside. */
    stageLabels?: Partial<Record<RideStage, string>>;
    /** Copy for the cancelled state. Default `'Cancelled'`. */
    cancelledLabel?: string;
    /** Build the spoken position. Default `'step 2 of 4'`. */
    formatStep?: (position: number, total: number) => string;
}
/**
 * **V4 ride status bar** — the web twin of the native `RideStatusBarV4`, same
 * props as {@link RideStatusBar} plus `stageLabels`, `cancelledLabel` and
 * `formatStep`.
 *
 * ## Four changes
 *
 * 1. **A walked stage stays filled.** The base marked only the current one, so
 *    the bar answered "which is selected" when the question is "how far
 *    through am I".
 * 2. **The cancelled band's ink is contrast-corrected**, at the one moment the
 *    user most needs to read it.
 * 3. **The stepper is a real `role="progressbar"`** with its value.
 * 4. **Every stage word is a prop**, and the step position is spoken.
 */
export declare const RideStatusBarV4: React.ForwardRefExoticComponent<RideStatusBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RideStatusBarV4.d.ts.map