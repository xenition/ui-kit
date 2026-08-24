import * as React from 'react';
export interface SettingsRowProps {
    label: string;
    /** Optional current-value readout shown on the right (before `rightSlot`). */
    value?: string;
    /** Optional description under the label. */
    description?: string;
    /** Custom trailing control (switch, badge, …). Overrides the chevron. */
    rightSlot?: React.ReactNode;
    /** When set (and no `rightSlot`), shows a chevron and makes the row a button. */
    onClick?: () => void;
    className?: string;
}
/**
 * A single settings/preferences row: label (+ optional description) on the left,
 * a value and/or trailing control on the right. Shows a chevron and becomes a
 * `<button>` when `onClick` is provided. Token-only.
 */
export declare const SettingsRow: React.ForwardRefExoticComponent<SettingsRowProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=SettingsRow.d.ts.map