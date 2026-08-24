import * as React from 'react';
import type { AvailabilityPickerProps } from './AvailabilityPicker';
/** Same public contract as {@link AvailabilityPicker} — a drop-in alternate design. */
export type AvailabilityPickerV3Props = AvailabilityPickerProps;
/**
 * AvailabilityPicker, redesigned (v3): a **compact time-chip wrap**. Small rounded
 * time pills flow inline; disabled slots dim, and the chosen pill(s) fill primary —
 * dense for tight layouts. The opposite of v2's big tiles. Same props, token-only.
 * (`columns` is accepted for parity.)
 */
export declare const AvailabilityPickerV3: React.ForwardRefExoticComponent<AvailabilityPickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AvailabilityPickerV3.d.ts.map