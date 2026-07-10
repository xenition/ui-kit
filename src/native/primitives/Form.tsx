import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

// The headless form helper is pure React (no DOM), so it works unchanged on
// native — re-exported here so a mobile app can wire submit/validation without
// a second import from the web entry.
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
export function Form({ style, children, ...rest }: FormProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View style={[{ gap: tokens.spacing.md }, style]} {...rest}>
      {children}
    </View>
  );
}
