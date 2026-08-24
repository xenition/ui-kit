import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
import { useXenitionTheme } from '../theme';

export type SpaceKey = keyof SpacingScale;
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

const ALIGN: Record<Align, ViewStyle['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const JUSTIFY: Record<Justify, ViewStyle['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

export interface FlexProps extends ViewProps {
  direction?: FlexDirection;
  /** Space between children, from the spacing scale. */
  gap?: SpaceKey;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
  /** Flex grow factor for this container. */
  grow?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * General-purpose flex container exposing `direction`/`align`/`justify`/`wrap`
 * plus a token-bound `gap` — the escape hatch when `Row`/`Column` are too
 * opinionated. Gap traces to the compiled spacing scale; no literal colors.
 */
export function Flex({
  direction = 'row',
  gap,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  grow,
  style,
  children,
  ...rest
}: FlexProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          flexDirection: direction,
          alignItems: ALIGN[align],
          justifyContent: JUSTIFY[justify],
          flexWrap: wrap ? 'wrap' : 'nowrap',
          gap: gap ? tokens.spacing[gap] : undefined,
          flexGrow: grow,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
