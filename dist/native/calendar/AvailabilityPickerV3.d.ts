import * as React from 'react';
import type { AvailabilityPickerProps } from './AvailabilityPicker';
/** Same public contract as {@link AvailabilityPicker} — a drop-in alternate design. */
export type AvailabilityPickerV3Props = AvailabilityPickerProps;
/**
 * AvailabilityPicker, redesigned (v3): **full-width vertical time rows**. Each
 * bookable window is its own tappable line — time on the left, a check/radio
 * indicator on the right — so the list scans top-to-bottom like a booking sheet.
 * The selected row fills and shows a check (never color-alone); blocked rows are
 * struck-through and inert. Empty + loading states included. Same props,
 * token-pure.
 */
export declare function AvailabilityPickerV3({ slots, value, multiple, onSelect, loading, emptyLabel, style, }: AvailabilityPickerV3Props): React.ReactElement;
//# sourceMappingURL=AvailabilityPickerV3.d.ts.map