import * as React from 'react';
export interface ChecklistItemProps {
    /** Item text. */
    label: string;
    /** Controlled checked state. */
    checked?: boolean;
    /** Fires with the next checked value on click. */
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}
/**
 * A single checklist line — a round toggle + label. Unlike the square primitive
 * `Checkbox`, a checked item fills with the **success** token (done = success)
 * and strikes through its label. Exposes the `checkbox` a11y role/state. Web
 * parity of the native `ChecklistItem` (`onPress` → `onClick`). No literal colors.
 */
export declare const ChecklistItem: React.ForwardRefExoticComponent<ChecklistItemProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ChecklistItem.d.ts.map