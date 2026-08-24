import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
import { useXenitionTheme } from '../theme';

export type SpaceKey = keyof SpacingScale;

export interface ListSeparatorProps extends ViewProps {
  /** Leading inset (e.g. to clear an avatar), from the spacing scale. */
  inset?: SpaceKey;
  style?: StyleProp<ViewStyle>;
}

/**
 * Hairline row divider for lists — a thin rule in the theme `border` color with
 * an optional leading `inset`, ideal as a `FlatList`'s `ItemSeparatorComponent`.
 * Color and inset trace to the compiled theme; no literal colors.
 */
export function ListSeparator({ inset, style, ...rest }: ListSeparatorProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      accessibilityRole="none"
      accessible={false}
      style={[
        {
          height: 1,
          backgroundColor: colors.border,
          marginLeft: inset ? tokens.spacing[inset] : 0,
        },
        style,
      ]}
      {...rest}
    />
  );
}
