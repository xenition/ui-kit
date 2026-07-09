import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface CardProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Themed surface container — the native mirror of the web `Card`: token-bound
 * background, border, radius, and padding. No literal colors.
 */
export function Card({ style, children, ...rest }: CardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
