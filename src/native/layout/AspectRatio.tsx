import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface AspectRatioProps extends ViewProps {
  /** Width-to-height ratio, e.g. `16 / 9` or `1`. */
  ratio: number;
  /** Clip children to the (token-bound) corner radius. */
  rounded?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Locks its content to a fixed width-to-height `ratio` via RN's `aspectRatio`
 * style. When `rounded`, it clips to the theme's large corner radius token; the
 * `ratio` itself is a numeric layout literal. No literal colors.
 */
export function AspectRatio({
  ratio,
  rounded = false,
  style,
  children,
  ...rest
}: AspectRatioProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          width: '100%',
          aspectRatio: ratio,
          overflow: 'hidden',
          borderRadius: rounded ? tokens.radius.lg : undefined,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
