import * as React from 'react';
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Field label text. */
    label?: React.ReactNode;
    /** Marks the field required (adds the * marker on the label). */
    required?: boolean;
    /** Validation error; when set it renders in the danger tone and takes precedence over `hint`. */
    error?: string | null;
    /** Helper text shown below the control when there is no error. */
    hint?: string;
    /** id of the control the label points at (`htmlFor`). */
    htmlFor?: string;
}
/**
 * A labelled form row: Label + control (`children`) + hint/error — removes the
 * hand-rolled label+error markup generated forms repeat for every field.
 */
export declare const Field: React.ForwardRefExoticComponent<FieldProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Field.d.ts.map