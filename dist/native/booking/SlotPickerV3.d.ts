import * as React from 'react';
import type { SlotPickerProps } from './SlotPicker';
/** Drop-in alternate of {@link SlotPickerProps} — identical prop contract. */
export type SlotPickerV3Props = SlotPickerProps;
/**
 * SlotPicker — design variant **V3**: a **vertical list of full-width time
 * rows**, each pairing the time with a capacity {@link Badge}. Where V1 is a
 * chip grid, V3 reads like a schedule — one row per slot, time on the left,
 * remaining-capacity badge on the right (success = open, warn = low, neutral =
 * `fullLabel`). A full slot is disabled and dimmed; the selected row is banded
 * with a primary-tinted fill and a leading primary rail (state shown by fill +
 * shape, never hue alone). Same
 * `slots`/`onPick`/`selected`/`formatTime`/`timeZone`/`lowSpotsThreshold`/
 * `fullLabel`/`scrollEnabled` contract as {@link SlotPickerProps}
 * (`columns` is accepted for drop-in parity). Token-only.
 */
export declare function SlotPickerV3({ slots, onPick, selected, formatTime, timeZone, lowSpotsThreshold, fullLabel, style, scrollEnabled, }: SlotPickerV3Props): React.ReactElement;
//# sourceMappingURL=SlotPickerV3.d.ts.map