import * as React from 'react';
import type { SlotPickerProps } from './SlotPicker';
/** Same public contract as {@link SlotPicker} — a drop-in alternate design. */
export type SlotPickerV3Props = SlotPickerProps;
/**
 * SlotPicker, redesigned (v3): a **compact time-chip wrap**. Small rounded time
 * pills flow inline; a full slot dims, and the chosen pill fills primary — a dense
 * picker for tight layouts. The opposite of v2's big tiles. Same props,
 * token-only. (`columns` is accepted for parity.)
 */
export declare const SlotPickerV3: React.ForwardRefExoticComponent<SlotPickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SlotPickerV3.d.ts.map