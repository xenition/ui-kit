import * as React from 'react';
import { ActivityIndicator, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
  style?: StyleProp<ViewStyle>;
}

const DIAMETER: Record<SpinnerSize, number> = { sm: 16, md: 24, lg: 32 };

/**
 * Themed loading spinner — the native mirror of the web `Spinner`. An
 * `ActivityIndicator` tinted with the primary token. No literal colors.
 */
export function Spinner({ size = 'md', style }: SpinnerProps): React.ReactElement {
  const { colors } = useXenitionTheme();
  return (
    <ActivityIndicator
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      color={colors.primary}
      size={DIAMETER[size]}
      style={style}
    />
  );
}
