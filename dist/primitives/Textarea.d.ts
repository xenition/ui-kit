import * as React from 'react';
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Renders the danger border/ring state. */
    invalid?: boolean;
}
/** Themed multi-line text input bound to the `--xen-*` tokens. Mirrors Input. */
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
//# sourceMappingURL=Textarea.d.ts.map