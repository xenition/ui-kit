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
 * **V4 crop card** — the web twin of the native `CropCardV4`, same props as
 * {@link CropCard} plus `progressLabel`, `stageLabels` and `healthLabels`.
 *
 * ## Five changes
 *
 * 1. **An interactive card is a `<button>`.** The base made a `<div>` into one
 *    with `role="button"`, `tabIndex` and a hand-written Enter/Space handler —
 *    three things a real button gives for free, and which that combination
 *    still gets wrong (no `:disabled`, no form semantics, no native focus
 *    behaviour on Safari).
 * 2. **The skeleton stops being a ramp step.** `bg-neutral-200` carries the
 *    light orientation in both schemes, so the loading state was a pale bar on
 *    a dark page.
 * 3. **Hover is the shared state layer**, not `hover:bg-neutral-50`.
 * 4. **The location and harvest captions carry icons**, not emoji glued into
 *    the string — `'📍 ' + fieldLabel` cannot be tinted and is read aloud by a
 *    screen reader as the emoji's name.
 * 5. **Captions take `muted-text`** and nine English strings became props.
 */
export declare const CropCardV4: React.ForwardRefExoticComponent<CropCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CropCardV4.d.ts.map