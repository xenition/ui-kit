import * as React from 'react';
import type { AppointmentSlotProps, AppointmentSlotStatus } from './AppointmentSlot';
export interface AppointmentSlotV4Props extends AppointmentSlotProps {
    /**
     * Override the status words. Defaults `'Available'` / `'Selected'` /
     * `'On hold'` / `'Booked'` — four English words that lived inside the
     * component and only ever reached assistive tech.
     */
    statusLabels?: Partial<Record<AppointmentSlotStatus, string>>;
}
/**
 * **V4 appointment slot** — the web twin of the native `AppointmentSlotV4`,
 * same props as {@link AppointmentSlot} plus `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **It clears 44.** A slot grid is the densest target in a booking flow and
 *    the base sized it by its padding alone.
 * 2. **A booked or held slot is a `disabled` button**, not a live one that
 *    reports the click.
 * 3. **The time is tabular**, so a column of slots has an edge to scan.
 * 4. **Hover and press are the shared chrome layers.**
 *
 * **Renders nothing without a `time`** (§4.5).
 */
export declare const AppointmentSlotV4: React.ForwardRefExoticComponent<AppointmentSlotV4Props & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=AppointmentSlotV4.d.ts.map