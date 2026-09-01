import * as React from 'react';
import type { IrrigationRunState, IrrigationScheduleProps } from './IrrigationSchedule';
export interface IrrigationScheduleV4Props extends IrrigationScheduleProps {
    /** Override the run-state names — four English words lived inside the component. */
    stateLabels?: Partial<Record<IrrigationRunState, string>>;
    /** Description under the empty title. */
    emptyDescription?: string;
}
/**
 * **V4 irrigation schedule** — the web twin of the native
 * `IrrigationScheduleV4`, same props as {@link IrrigationSchedule} plus
 * `stateLabels` and `emptyDescription`.
 *
 * ## Four changes
 *
 * 1. **The per-zone toggle is `SwitchV4`.** The base drew its own, so the one
 *    control on this card a user actually operates did not match the switches
 *    anywhere else in the product — different size, different travel, no focus
 *    ring.
 * 2. **A disabled zone dims at M3's 0.38** and carries `aria-disabled`, rather
 *    than only losing colour.
 * 3. **The empty state gets a description**, not just a title, so a schedule
 *    with nothing in it explains itself.
 * 4. **The rows are a real `<ul>`**, and captions take `muted-text`.
 *
 * Still fully controlled: `onToggle` reports, the component stores nothing.
 */
export declare const IrrigationScheduleV4: React.ForwardRefExoticComponent<IrrigationScheduleV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=IrrigationScheduleV4.d.ts.map