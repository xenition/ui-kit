import * as React from 'react';
import type { SlotPickerProps } from './SlotPicker';
/** Same public contract as {@link SlotPicker} — a drop-in alternate design. */
export type SlotPickerV2Props = SlotPickerProps;
/**
 * SlotPicker, redesigned (v2): **big time tiles**. Each slot is a large rounded
 * button showing the time and a low-spots hint; a full slot is disabled with a
 * "Full" note, and the chosen tile fills primary. Bolder than v1. Same props,
 * token-only.
 */
export declare const SlotPickerV2: React.ForwardRefExoticComponent<SlotPickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SlotPickerV2.d.ts.map