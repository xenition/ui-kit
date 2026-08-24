import * as React from 'react';
import type { AvailabilityPickerProps } from './AvailabilityPicker';
/** Same public contract as {@link AvailabilityPicker} — a drop-in alternate design. */
export type AvailabilityPickerV2Props = AvailabilityPickerProps;
/**
 * AvailabilityPicker, redesigned (v2): **slot chips grouped by part of day**.
 * Open times wrap into rounded chips under Morning / Afternoon / Evening
 * headings; a selected chip fills (and is announced), blocked chips render
 * struck-through and inert. Empty + loading states included. Same props,
 * token-pure.
 */
export declare function AvailabilityPickerV2({ slots, value, multiple, onSelect, loading, emptyLabel, style, }: AvailabilityPickerV2Props): React.ReactElement;
//# sourceMappingURL=AvailabilityPickerV2.d.ts.map