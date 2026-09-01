import * as React from 'react';
import type { IrrigationRunState, IrrigationScheduleProps } from './IrrigationSchedule';
export interface IrrigationScheduleV4Props extends IrrigationScheduleProps {
    /** Override the run-state names — four English words lived inside the component. */
    stateLabels?: Partial<Record<IrrigationRunState, string>>;
    /** Description under the empty title. */
    emptyDescription?: string;
}
/**
 * **V4 irrigation schedule** — same props as {@link IrrigationSchedule} plus
 * `stateLabels` and `emptyDescription`.
 *
 * ## Four changes
 *
 * 1. **The per-zone toggle is `SwitchV4`.** The base drew its own, so the one
 *    control on this card a user actually operates did not match the switches
 *    anywhere else in the product — different size, different travel, no focus
 *    ring.
 * 2. **A disabled zone dims at M3's 0.38** and says `disabled` through
 *    `accessibilityState`, rather than only losing colour.
 * 3. **The empty state gets a description**, not just a title, so a schedule
 *    with nothing in it explains itself.
 * 4. **Type comes from `TextV4`** and captions take `mutedText`.
 *
 * Still fully controlled: `onToggle` reports, the component stores nothing.
 */
export declare function IrrigationScheduleV4({ slots, title, onToggle, emptyTitle, emptyDescription, stateLabels, style, }: IrrigationScheduleV4Props): React.ReactElement;
//# sourceMappingURL=IrrigationScheduleV4.d.ts.map