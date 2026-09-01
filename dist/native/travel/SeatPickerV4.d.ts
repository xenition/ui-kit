import * as React from 'react';
import type { SeatPickerProps } from './SeatPicker';
/** Drop-in for {@link SeatPickerProps} — same props, the V4 "journey" design. */
export type SeatPickerV4Props = SeatPickerProps;
/**
 * SeatPicker — **V4** "journey" design. A refined cabin seat map for the
 * boarding-pass line: a grid of pressable seats where the chosen seat is filled
 * with the brand journey gradient (`journeyDisc`) and near-white glyph (the
 * signature V4 touch), available seats sit as clean `surface` tiles, and
 * occupied seats read muted and disabled. A legend row explains the states.
 * Same props/behavior as {@link SeatPickerProps}: each seat announces its label
 * and status via `accessibilityLabel`/`accessibilityState` and carries a glyph
 * (`✓` selected, `✕` occupied), so state never depends on color alone. Occupied
 * seats never fire `onSelect`. Selection is controlled via `selectedIds`.
 * Token-only colors via `useXenitionTheme()`.
 */
export declare function SeatPickerV4({ rows, selectedIds, rowLabels, onSelect, maxSelectable, style, }: SeatPickerV4Props): React.ReactElement;
//# sourceMappingURL=SeatPickerV4.d.ts.map