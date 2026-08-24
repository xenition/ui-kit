import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
export { useForm } from '../../primitives/useForm';
export type { UseFormOptions, UseFormReturn } from '../../primitives/useForm';
export interface FormProps extends ViewProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Themed form container — the native mirror of the web `Form`. RN has no
 * `<form>`, so this is a `<View>` with vertical field spacing; drive
 * submit/validation with the re-exported `useForm` (wire `handleSubmit` to a
 * `Button onPress`) and lay out rows with `Field`. No literal colors.
 */
export declare function Form({ style, children, ...rest }: FormProps): React.ReactElement;
//# sourceMappingURL=Form.d.ts.map