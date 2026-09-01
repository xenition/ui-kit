import * as React from 'react';
import { type SlotPeriod } from './schedule-v4';
import type { SlotPickerProps } from './SlotPicker';
export interface SlotPickerV4Props extends SlotPickerProps {
    /**
     * Group the slots under Morning / Afternoon / Evening headings. Default
     * `true`.
     *
     * A busy day is thirty chips in one undifferentiated wall, and a user
     * looking for "something after work" has to read all thirty. The buckets are
     * computed in the slot's **own** timezone, not the device's — a 9am
     * appointment in Lisbon is not an evening slot for a user in Tokyo.
     *
     * `false` restores the base's flat grid.
     */
    grouped?: boolean;
    /** Override the three bucket headings — they are English by default. */
    periodLabels?: Partial<Record<SlotPeriod, string>>;
    /**
     * Build the spots hint. Defaults to `'3 left'` under the threshold and
     * `'8 open'` above it; the base hard-coded both inside the component.
     */
    formatSpots?: (spotsLeft: number, low: boolean) => string;
    /** Copy for the empty state. Default `'No times available.'`. */
    emptyMessage?: string;
}
/**
 * **V4 slot picker** — the web twin of the native `SlotPickerV4`, same props as
 * {@link SlotPicker} plus `grouped`, `periodLabels`, `formatSpots` and
 * `emptyMessage`.
 *
 * ## Five changes
 *
 * 1. **A day of slots has structure.** See `grouped`.
 * 2. **A full slot is disabled at M3's 0.38**, the number the whole kit uses
 *    for "you cannot have this", rather than this component's own 0.5.
 * 3. **Hover and press are the shared chrome layers** over the chip's own
 *    fill, not a ramp step that is near-white on a dark page.
 * 4. **Chips clear 44 and the type steps come from the scale.**
 * 5. **The copy is the host's** — `formatSpots`, `periodLabels`,
 *    `emptyMessage`, on top of the `fullLabel` the base already had.
 *
 * An empty `slots` renders the message, never a blank grid.
 */
export declare const SlotPickerV4: React.ForwardRefExoticComponent<SlotPickerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SlotPickerV4.d.ts.map