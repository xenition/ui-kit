import * as React from 'react';
import type { ChecklistItemProps } from './ChecklistItem';
/** Drop-in for {@link ChecklistItemProps} — same props, the V4 "flow" design. */
export type ChecklistItemV4Props = ChecklistItemProps;
/**
 * ChecklistItem — **V4** "flow" design. The focused-workspace take on a checklist
 * line: a big ≥44px tap target, a round toggle, and a bigger, more legible label.
 * Checking the item is the satisfying moment — the row settles into a
 * **soft-success glow** with the label struck through. Same props/behavior as
 * {@link ChecklistItemProps} (both `onChange` and `onCheckedChange` spellings,
 * the original winning); token-only colors via `useXenitionTheme()`.
 */
export declare function ChecklistItemV4({ label, checked, onCheckedChange, onChange, disabled, style, }: ChecklistItemV4Props): React.ReactElement;
//# sourceMappingURL=ChecklistItemV4.d.ts.map