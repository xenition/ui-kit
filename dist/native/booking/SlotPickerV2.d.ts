import * as React from 'react';
import type { SlotPickerProps } from './SlotPicker';
/** Drop-in alternate of {@link SlotPickerProps} — identical prop contract. */
export type SlotPickerV2Props = SlotPickerProps;
/**
 * SlotPicker — design variant **V2**: bookable times **grouped into Morning /
 * Afternoon / Evening**, each section a wrap-flowed set of time chips. Where V1
 * is one flat FlatList grid, V2 buckets slots by their local hour (in
 * `timeZone`) under labelled section headers, so a long day of availability
 * scans at a glance. A full slot (`spotsLeft === 0`) is disabled and shows the
 * `fullLabel`; low capacity surfaces a "{n} left" hint; the selected chip fills
 * with the primary token. Same
 * `slots`/`onPick`/`selected`/`formatTime`/`timeZone`/`lowSpotsThreshold`/
 * `fullLabel` contract as {@link SlotPickerProps} (`columns`/`scrollEnabled` are
 * accepted for drop-in parity; the wrap layout is fluid). Token-only.
 */
export declare function SlotPickerV2({ slots, onPick, selected, formatTime, timeZone, lowSpotsThreshold, fullLabel, style, }: SlotPickerV2Props): React.ReactElement;
//# sourceMappingURL=SlotPickerV2.d.ts.map