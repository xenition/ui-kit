import * as React from 'react';
import type { AvailabilityPickerProps } from './AvailabilityPicker';
export interface AvailabilityPickerV4Props extends AvailabilityPickerProps {
    /** Locale for the slot times. Default: the browser's. */
    locale?: string;
    /** Announced for a slot that cannot be taken. Default `'Unavailable'`. */
    unavailableLabel?: string;
}
/**
 * **V4 availability picker** — the web twin of the native
 * `AvailabilityPickerV4`, same props as {@link AvailabilityPicker} plus
 * `locale` and `unavailableLabel`.
 *
 * ## Four changes
 *
 * 1. **Every chip clears 44** — on the one control this component is.
 * 2. **A disabled slot is a `disabled` button**, not a greyed live one.
 * 3. **The times are localized and tabular.**
 * 4. **Multi-select announces itself** — the chips become checkboxes rather
 *    than buttons, so a reader hears what selecting does.
 */
export declare const AvailabilityPickerV4: React.ForwardRefExoticComponent<AvailabilityPickerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AvailabilityPickerV4.d.ts.map