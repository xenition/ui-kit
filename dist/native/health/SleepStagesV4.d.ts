import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
/** The four stages a night is scored into. */
export type SleepStage = 'deep' | 'rem' | 'light' | 'awake';
/** One stretch of one stage. */
export interface SleepStageSegment {
    /** Which stage this stretch was. */
    stage: SleepStage;
    /** How long it lasted, in minutes. Zero and negative stretches are dropped. */
    minutes: number;
}
export interface SleepStagesV4Props {
    /** The night, in the order slept. */
    stages: SleepStageSegment[];
    /** Wording for each stage. Defaults to `Deep` / `REM` / `Light` / `Awake`. */
    stageLabels?: Partial<Record<SleepStage, string>>;
    /** Format a minute total. Default `'1h 20m'`. */
    formatDuration?: (minutes: number) => string;
    /** Show the per-stage legend under the bar. Default `true`. */
    showLegend?: boolean;
    /** Shown when there is nothing to draw. Default `'No sleep stages recorded'`. */
    emptyLabel?: string;
    /** The next-step sentence under {@link SleepStagesV4Props.emptyLabel}. */
    emptyDescription?: string;
    /** The figure's accessible name. Default `'Sleep stages'`. */
    label?: string;
    /** Surface treatment. Defaults to `classic`, matching the rest of the module. */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 sleep stages** — deep, REM, light and awake across one night. New in
 * V4; there is no base component.
 *
 * ## Why it exists
 *
 * `SleepBar` collapses a whole night to one number and one quality word, which
 * is the part of sleep tracking a user already knows: they were in bed for
 * seven and a half hours. What they cannot know without a picture is the shape
 * of those hours — that the seven and a half contained forty minutes of deep
 * sleep and five wakings. Two nights of identical length are routinely not the
 * same night, and the base module had no way to say so.
 *
 * ## Four things it does deliberately
 *
 * 1. **The bar is one accessible sentence** — "Sleep stages, Deep 52m, REM 1h
 *    20m, Light 4h 10m, Awake 18m, 6h 40m total" — rather than a row of
 *    unlabelled rectangles. The legend beneath is **hidden from the reader**,
 *    because it repeats that sentence word for word, and hearing a night twice
 *    is worse than hearing it once.
 * 2. **A stage is an identity, so it takes no status colour**, and the visible
 *    legend carries the word beside each swatch — nothing about the chart is
 *    conveyed by hue alone.
 * 3. **Every stretch is drawn at its true share of the night**, laid out by
 *    `flex` rather than by percentage arithmetic, so the stretches cannot
 *    round themselves a pixel apart from the totals printed beneath them.
 * 4. **An empty night is a real empty state** with a title, an optional
 *    next-step sentence, and `style` and `appearance` applied — the two guard
 *    branches in this module's base returned a bare `<Text>` and dropped both.
 */
export declare function SleepStagesV4({ stages, stageLabels, formatDuration, showLegend, emptyLabel, emptyDescription, label, appearance, style, }: SleepStagesV4Props): React.ReactElement;
//# sourceMappingURL=SleepStagesV4.d.ts.map