import * as React from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Renders the danger border/ring state. */
    invalid?: boolean;
}
/** Themed text input bound to the `--xen-*` tokens. */
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Input.d.ts.map