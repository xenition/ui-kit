import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
import { useXenitionTheme } from '../theme';

export type SpaceKey = keyof SpacingScale;
export type Align = 'start' | 'center' | 'end' | 'stretch';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

const ALIGN: Record<Align, ViewStyle['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const JUSTIFY: Record<Justify, ViewStyle['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

export interface ColumnProps extends ViewProps {
  /** Vertical space between children, from the spacing scale. */
  gap?: SpaceKey;
  align?: Align;
  justify?: Justify;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Vertical flex column with a token-bound `gap` plus `align`/`justify`
 * controls — the native mirror of the web vertical stack. Gap traces to the
 * compiled spacing scale; no literal colors.
 */
export function Column({
  gap,
  align = 'stretch',
  justify = 'start',
  style,
  children,
  ...rest
}: ColumnProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'column',
          alignItems: ALIGN[align],
          justifyContent: JUSTIFY[justify],
          gap: gap ? tokens.spacing[gap] : undefined,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
