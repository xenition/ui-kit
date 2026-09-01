import * as React from 'react';
import { type SlotPeriod } from '../../booking/schedule-v4';
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
 * **V4 slot picker** — same props as {@link SlotPicker} plus `grouped`,
 * `periodLabels`, `formatSpots` and `emptyMessage`.
 *
 * ## Five changes
 *
 * 1. **A day of slots has structure.** See `grouped`.
 * 2. **A full slot is disabled at M3's opacity, not at 0.5.** `0.38` is the
 *    number the whole kit uses for "you cannot have this"; 0.5 was this
 *    component's own guess and read as "dimmed for some reason".
 * 3. **Press is a state layer over the chip's own fill.** The base pressed to
 *    `tokens.ramps.primary[50]` — the light end of the ramp in both schemes,
 *    so on a dark page a pressed slot flashed near-white.
 * 4. **Chips clear 44 and their type comes from `TextV4`.** The base set
 *    `paddingVertical: spacing.sm` with no minimum height, so a compact seed
 *    produced a chip a finger could miss.
 * 5. **The copy is the host's** — `formatSpots`, `periodLabels`,
 *    `emptyMessage`, on top of the `fullLabel` the base already had.
 *
 * Still a controlled component: it computes nothing it does not display, and
 * an empty `slots` renders the message rather than a blank grid.
 */
export declare function SlotPickerV4({ slots, onPick, selected, formatTime, timeZone, columns, lowSpotsThreshold, fullLabel, grouped, periodLabels, formatSpots, emptyMessage, style, }: SlotPickerV4Props): React.ReactElement;
//# sourceMappingURL=SlotPickerV4.d.ts.map