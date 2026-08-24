import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
import { useXenitionTheme } from '../theme';

export type SpaceKey = keyof SpacingScale;
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

export interface RowProps extends ViewProps {
  /** Space between children, from the spacing scale. */
  gap?: SpaceKey;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Horizontal flex row with a token-bound `gap` plus `align`/`justify`/`wrap`
 * controls — the native mirror of the web horizontal stack. Gap traces to the
 * compiled spacing scale; no literal colors.
 */
export function Row({
  gap,
  align = 'center',
  justify = 'start',
  wrap = false,
  style,
  children,
  ...rest
}: RowProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: ALIGN[align],
          justifyContent: JUSTIFY[justify],
          flexWrap: wrap ? 'wrap' : 'nowrap',
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
