import * as React from 'react';
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    /** Appends a danger-colored required marker (*). */
    required?: boolean;
}
/** Themed form label bound to the `--xen-*` tokens. */
export declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;
//# sourceMappingURL=Label.d.ts.map