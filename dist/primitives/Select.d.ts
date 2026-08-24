import * as React from 'react';
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    /** Renders the danger border/ring state. */
    invalid?: boolean;
}
/**
 * Themed `<select>` bound to the `--xen-*` tokens — the control every relation or
 * enum field needs. Pass `<option>` (or `<optgroup>`) children; the native caret is
 * kept for zero-asset, accessible behavior.
 */
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
//# sourceMappingURL=Select.d.ts.map