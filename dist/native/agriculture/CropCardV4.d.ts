import * as React from 'react';
import type { CropCardProps, CropHealth, GrowthStage } from './CropCard';
export interface CropCardV4Props extends CropCardProps {
    /** Label for the maturity meter. Default `'Maturity'`, which the base hard-coded. */
    progressLabel?: string;
    /** Override the stage names — five English words lived inside the component. */
    stageLabels?: Partial<Record<GrowthStage, string>>;
    /** Override the health names. */
    healthLabels?: Partial<Record<CropHealth, string>>;
}
/**
 * **V4 crop card** — same props as {@link CropCard} plus `progressLabel`,
 * `stageLabels` and `healthLabels`.
 *
 * ## Five changes
 *
 * 1. **The skeleton stops being made of hairlines.** The base filled its
 *    loading bars with `colors.border` — a divider token asked to act as a
 *    block. See `internal/farm-v4`.
 * 2. **Press is a state layer over the card's own fill**, not `opacity: 0.85`
 *    on its content — which is the signal M3 spends 0.38 on to mean *disabled*,
 *    so a pressed card read as unavailable.
 * 3. **Type comes from `TextV4`.** The base hand-wrote `color`, `fontSize`,
 *    `fontWeight` and `fontFamily` on a raw `<Text>` six times in one file.
 * 4. **The location and harvest captions carry icons, not emoji glued into the
 *    string.** `'📍 ' + fieldLabel` cannot be tinted, cannot be replaced, and
 *    is read aloud by a screen reader as the emoji's name.
 * 5. **Nine English strings became props**, in a module whose whole contract is
 *    that copy is caller-supplied.
 *
 * `variant="compact"` still drops the meter and the captions, and `loading`
 * still renders the skeleton rather than a bordered blank.
 */
export declare function CropCardV4({ name, variety, icon, stage, health, progress, fieldLabel, harvestLabel, variant, loading, progressLabel, stageLabels, healthLabels, onPress, style, }: CropCardV4Props): React.ReactElement | null;
//# sourceMappingURL=CropCardV4.d.ts.map