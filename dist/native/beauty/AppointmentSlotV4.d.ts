import * as React from 'react';
import type { AppointmentSlotProps, AppointmentSlotStatus } from './AppointmentSlot';
export interface AppointmentSlotV4Props extends AppointmentSlotProps {
    /**
     * Override the status words. Defaults `'Available'` / `'Selected'` /
     * `'On hold'` / `'Booked'` — four English words that lived inside the
     * component and only ever reached assistive tech, never the screen.
     */
    statusLabels?: Partial<Record<AppointmentSlotStatus, string>>;
}
/**
 * **V4 appointment slot** — same props as {@link AppointmentSlot} plus
 * `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **It clears 44.** A slot grid is the densest tap target in a booking
 *    flow and the base sized it by its padding, so a compact seed produced a
 *    chip a thumb could miss.
 * 2. **A booked or held slot cannot be pressed**, and dims at M3's 0.38. The
 *    base kept them pressable and reported the press.
 * 3. **The time is tabular**, so a column of slots has an edge to scan.
 * 4. **Press is a state layer over the chip's own fill**, not an opacity that
 *    fades its content.
 *
 * **Renders nothing without a `time`** (§4.5).
 */
export declare function AppointmentSlotV4({ time, status, meta, statusLabels, onPress, style, }: AppointmentSlotV4Props): React.ReactElement | null;
//# sourceMappingURL=AppointmentSlotV4.d.ts.map