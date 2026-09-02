import * as React from 'react';
import { type Appearance } from './internal/tone-v4';
/** The four stages a night is scored into. */
export type SleepStage = 'deep' | 'rem' | 'light' | 'awake';
/** One measured stretch of a night. */
export interface SleepStageSegment {
    /** Which stage. */
    stage: SleepStage;
    /** How long it lasted, in minutes. */
    minutes: number;
}
export interface SleepStagesV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /** The night, in the order it was slept. Zero and negative stretches are dropped. */
    stages: SleepStageSegment[];
    /** Override the four stage words. */
    stageLabels?: Partial<Record<SleepStage, string>>;
    /** Render a duration. Default `'1h 20m'`. */
    formatDuration?: (minutes: number) => string;
    /** Draw the legend under the bar. Default `true`. */
    showLegend?: boolean;
    /** Copy when there is nothing to draw. Default `'No sleep stages recorded'`. */
    emptyLabel?: string;
    /** A next step under the empty title. */
    emptyDescription?: string;
    /** The figure's accessible name. Default `'Sleep stages'`. */
    label?: string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 sleep stages** — deep, REM, light and awake across one night, with a
 * legend and a single spoken sentence.
 *
 * There is no base component. This is the piece the `health` line kept needing
 * and did not have.
 *
 * ## Why it exists
 *
 * 1. **`SleepBar` collapses a whole night to one number and one adjective.**
 *    "7.5h, Good" cannot distinguish a night of unbroken deep sleep from seven
 *    and a half hours of light sleep broken eleven times, which is the
 *    difference a sleep screen exists to show.
 * 2. **A stacked band is the one chart that needs no axis.** Each stretch is
 *    drawn at its true share of the night, so the picture is the proportion —
 *    and the same proportions are printed as words and minutes in the legend,
 *    because a band of four colours with no numbers is decoration.
 * 3. **The stages take no status colour.** Being briefly awake is not an error
 *    and REM is not a warning; spending `warn` on either is what left the rest
 *    of the module unable to say when something genuinely was wrong.
 * 4. **A night with nothing in it says so.** An empty `stages` array renders a
 *    real empty state rather than a bar of width nought.
 */
export declare const SleepStagesV4: React.ForwardRefExoticComponent<SleepStagesV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SleepStagesV4.d.ts.map