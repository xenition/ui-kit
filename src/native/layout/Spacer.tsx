import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
import { useXenitionTheme } from '../theme';

export type SpaceKey = keyof SpacingScale;

export interface SpacerProps extends ViewProps {
  /**
   * Fixed size from the spacing scale, or `'flex'` to grow and absorb free
   * space (pushing siblings apart). Defaults to `md`.
   */
  size?: SpaceKey | 'flex';
  style?: StyleProp<ViewStyle>;
}

/**
 * Inert spacing element: either a fixed square from the token spacing scale or
 * a flexible `'flex'` gap that expands to fill remaining space along the
 * parent's main axis. Sizes trace to the compiled spacing scale; no literal
 * colors. Hidden from accessibility.
 */
export function Spacer({ size = 'md', style, ...rest }: SpacerProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const dimension: ViewStyle =
    size === 'flex'
      ? { flexGrow: 1, flexShrink: 1 }
      : { width: tokens.spacing[size], height: tokens.spacing[size] };
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[dimension, style]} {...rest} />
  );
}
