import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
import { useXenitionTheme } from '../theme';

export type SpaceKey = keyof SpacingScale;

export interface ContainerProps extends ViewProps {
  /** Max content width in px; content is centered within it. Defaults to 480. */
  maxWidth?: number;
  /** Horizontal padding token. Defaults to `lg`. */
  padding?: SpaceKey;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Centered content column with a token-bound horizontal padding and a numeric
 * `maxWidth` cap — the native mirror of the web page container. Colors/padding
 * come from the compiled theme; only the numeric `maxWidth` is a layout literal.
 */
export function Container({
  maxWidth = 480,
  padding = 'lg',
  style,
  children,
  ...rest
}: ContainerProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth,
          alignSelf: 'center',
          paddingHorizontal: tokens.spacing[padding],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
