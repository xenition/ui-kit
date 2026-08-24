import * as React from 'react';
import { Text, type TextProps } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface LabelProps extends TextProps {
  /** Appends a danger-colored required marker (*). */
  required?: boolean;
  children?: React.ReactNode;
}

/** Themed form label — the native mirror of the web `Label`. No literal colors. */
export function Label({
  required = false,
  style,
  children,
  ...rest
}: LabelProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <Text
      style={[
        { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' },
        style,
      ]}
      {...rest}
    >
      {children}
      {required ? <Text style={{ color: colors.dangerText, marginLeft: 2 }}>*</Text> : null}
    </Text>
  );
}
