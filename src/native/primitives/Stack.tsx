import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type StackDirection = 'row' | 'column';
export type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface StackProps extends ViewProps {
  direction?: StackDirection;
  gap?: StackGap;
  /** Cross-axis alignment (mirrors web `align`). */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /**
   * Main-axis distribution. Native-only additive prop (the web `Stack` relies
   * on flow layout); optional, so web usages still type-check unchanged.
   */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const ALIGN: Record<NonNullable<StackProps['align']>, ViewStyle['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const JUSTIFY: Record<NonNullable<StackProps['justify']>, ViewStyle['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
};

/**
 * Flexbox layout helper — the native mirror of the web `Stack` (`direction`,
 * `gap`, `align`), with an additive `justify`. Gap comes from the theme
 * spacing scale (RN `gap` is supported on modern React Native).
 */
export function Stack({
  direction = 'column',
  gap = 'md',
  align = 'stretch',
  justify,
  style,
  children,
  ...rest
}: StackProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          flexDirection: direction,
          gap: tokens.spacing[gap],
          alignItems: ALIGN[align],
          ...(justify ? { justifyContent: JUSTIFY[justify] } : null),
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
