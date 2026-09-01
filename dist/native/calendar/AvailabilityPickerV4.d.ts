import * as React from 'react';
import type { AvailabilityPickerProps } from './AvailabilityPicker';
export interface AvailabilityPickerV4Props extends AvailabilityPickerProps {
    /** Locale for the slot times. Default: the device's. */
    locale?: string;
    /** Announced for a slot that cannot be taken. Default `'Unavailable'`. */
    unavailableLabel?: string;
}
/**
 * **V4 availability picker** — same props as {@link AvailabilityPicker} plus
 * `locale` and `unavailableLabel`.
 *
 * ## Four changes
 *
 * 1. **Every chip clears 44.** The base sized them by padding alone, so a
 *    compact seed produced a grid of targets a thumb could miss — on the one
 *    control this component is.
 * 2. **A disabled slot cannot be pressed**, dims at M3's 0.38 and says why.
 *    The base greyed it and reported the press.
 * 3. **The times are localized and tabular**, so a grid of slots lines up and
 *    reads correctly outside en-US.
 * 4. **Multi-select announces itself.** With `multiple`, the chips are
 *    checkboxes rather than buttons, so a reader hears what selecting does.
 */
export declare function AvailabilityPickerV4({ slots, value, multiple, columns, locale, unavailableLabel, onSelect, loading, emptyLabel, style, }: AvailabilityPickerV4Props): React.ReactElement;
//# sourceMappingURL=AvailabilityPickerV4.d.ts.map