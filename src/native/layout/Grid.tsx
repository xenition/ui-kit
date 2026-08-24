import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
import { useXenitionTheme } from '../theme';

export type SpaceKey = keyof SpacingScale;

export interface GridProps extends ViewProps {
  /** Number of equal-width columns. Defaults to 2. */
  columns?: number;
  /** Gutter between cells, from the spacing scale. Defaults to `md`. */
  gap?: SpaceKey;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Fixed-column grid that wraps its children into equal-width cells using the
 * classic gutter technique (negative container margin + per-cell padding), so
 * the token-bound `gap` traces to the compiled spacing scale. Column count is
 * a numeric layout literal; no literal colors.
 */
export function Grid({
  columns = 2,
  gap = 'md',
  style,
  children,
  ...rest
}: GridProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const gutter = tokens.spacing[gap];
  const half = gutter / 2;
  const cells = React.Children.toArray(children);
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: -half,
          marginVertical: -half,
        },
        style,
      ]}
      {...rest}
    >
      {cells.map((child, i) => (
        <View
          key={i}
          style={{
            width: `${100 / columns}%`,
            paddingHorizontal: half,
            paddingVertical: half,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
}
