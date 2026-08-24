import * as React from 'react';
export type SpinnerSize = 'sm' | 'md' | 'lg';
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: SpinnerSize;
}
/** Themed loading spinner (primary ring). Pairs with buttons or inline "busy" states. */
export declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Spinner.d.ts.map