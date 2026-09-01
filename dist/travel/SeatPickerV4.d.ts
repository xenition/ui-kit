import * as React from 'react';
import type { SeatPickerProps } from './SeatPicker';
/** Drop-in for {@link SeatPickerProps} — same props, the V4 "journey" design. */
export type SeatPickerV4Props = SeatPickerProps;
/**
 * SeatPicker — **V4** "journey" design (web parity of the native V4). A refined
 * cabin seat map for the boarding-pass line: a grid of `<button>` seats where
 * the chosen seat is filled with the brand journey gradient
 * (`from-primary-400 to-primary-700`) and near-white glyph (the signature V4
 * touch), available seats sit as clean `surface` tiles, and occupied seats read
 * muted and disabled. A legend row explains the states. Same props/behavior as
 * {@link SeatPickerProps}: each seat announces its label and status via
 * `aria-label`, `aria-pressed` (selected) and `aria-disabled` (occupied) and
 * carries a glyph (`✓` selected, `✕` occupied), so state never depends on color
 * alone. Occupied seats never fire `onSelect`. Selection is controlled via
 * `selectedIds`. All colors from `--xen-*` token classes (no literal colors).
 */
export declare const SeatPickerV4: React.ForwardRefExoticComponent<SeatPickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SeatPickerV4.d.ts.map