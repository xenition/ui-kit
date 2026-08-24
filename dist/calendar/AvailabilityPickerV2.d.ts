import * as React from 'react';
import type { AvailabilityPickerProps } from './AvailabilityPicker';
/** Same public contract as {@link AvailabilityPicker} — a drop-in alternate design. */
export type AvailabilityPickerV2Props = AvailabilityPickerProps;
/**
 * AvailabilityPicker, redesigned (v2): **big time tiles**. Each slot is a large
 * rounded button; disabled slots dim, and the chosen slot(s) fill primary. Bolder
 * than v1. Same props, token-only.
 */
export declare const AvailabilityPickerV2: React.ForwardRefExoticComponent<AvailabilityPickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AvailabilityPickerV2.d.ts.map