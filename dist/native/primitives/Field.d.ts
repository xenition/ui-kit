import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
export interface FieldProps extends ViewProps {
    /** Field label text. */
    label?: React.ReactNode;
    /** Marks the field required (adds the * marker on the label). */
    required?: boolean;
    /** Validation error; when set it renders in the danger tone and takes precedence over `hint`. */
    error?: string | null;
    /** Helper text shown below the control when there is no error. */
    hint?: string;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * A labelled form row — the native mirror of the web `Field`: Label + control
 * (`children`) + hint/error. Removes the hand-rolled label+error markup mobile
 * forms repeat for every field. No literal colors.
 */
export declare function Field({ label, required, error, hint, style, children, ...rest }: FieldProps): React.ReactElement;
//# sourceMappingURL=Field.d.ts.map