import * as React from 'react';
import type { RideStage, RideStatusBarProps } from './RideStatusBar';
export interface RideStatusBarV4Props extends RideStatusBarProps {
    /** Override the stage words — four English phrases lived inside the component. */
    stageLabels?: Partial<Record<RideStage, string>>;
    /** Copy for the cancelled state. Default `'Cancelled'`. */
    cancelledLabel?: string;
    /** Build the spoken position. Default `'step 2 of 4'`. */
    formatStep?: (position: number, total: number) => string;
}
/**
 * **V4 ride status bar** — same props as {@link RideStatusBar} plus
 * `stageLabels`, `cancelledLabel` and `formatStep`.
 *
 * ## Four changes
 *
 * 1. **A walked stage stays filled.** The base marked only the *current*
 *    stage, so the bar answered "which one is selected" when the question a
 *    rider is asking is "how far through am I".
 * 2. **The cancelled band's ink is contrast-corrected.** `colors.danger` on a
 *    10%-danger ground is the fill slot used as text at the one moment the
 *    user most needs to read it.
 * 3. **The connector reports progress**, with `accessibilityRole="progressbar"`
 *    and a real value, instead of being decorative.
 * 4. **Every stage word is a prop**, and the step position is spoken.
 */
export declare function RideStatusBarV4({ stage, detail, cancelled, variant, stageLabels, cancelledLabel, formatStep, style, }: RideStatusBarV4Props): React.ReactElement;
//# sourceMappingURL=RideStatusBarV4.d.ts.map