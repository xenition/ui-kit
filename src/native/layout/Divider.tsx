import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
import { useXenitionTheme } from '../theme';

export type SpaceKey = keyof SpacingScale;

export interface DividerProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
  /** Inset the divider from the cross axis by a spacing token. */
  inset?: SpaceKey;
  style?: StyleProp<ViewStyle>;
}

/**
 * A one-pixel rule in the theme `border` color, horizontal or vertical, with an
 * optional token-bound `inset`. Color and inset trace to the compiled theme; no
 * literal colors. Exposed to assistive tech with the `separator` role.
 */
export function Divider({
  orientation = 'horizontal',
  inset,
  style,
  ...rest
}: DividerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const insetPx = inset ? tokens.spacing[inset] : 0;
  const base: ViewStyle =
    orientation === 'horizontal'
      ? { height: 1, alignSelf: 'stretch', marginHorizontal: insetPx }
      : { width: 1, alignSelf: 'stretch', marginVertical: insetPx };
  return (
    <View
      accessibilityRole="none"
      accessible={false}
      style={[{ backgroundColor: colors.border }, base, style]}
      {...rest}
    />
  );
}
