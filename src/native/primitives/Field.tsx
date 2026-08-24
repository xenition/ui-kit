import * as React from 'react';
import { Text, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Label } from './Label';

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
export function Field({
  label,
  required = false,
  error,
  hint,
  style,
  children,
  ...rest
}: FieldProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View style={[{ gap: tokens.spacing.xs }, style]} {...rest}>
      {label != null ? <Label required={required}>{label}</Label> : null}
      {children}
      {error ? (
        <Text
          accessibilityRole="alert"
          style={{ color: colors.dangerText, fontSize: tokens.typography.scale.sm }}
        >
          {error}
        </Text>
      ) : hint ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{hint}</Text>
      ) : null}
    </View>
  );
}
