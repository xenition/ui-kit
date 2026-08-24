import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type MiniBarColor = keyof SemanticColors;

export interface MiniBarProps {
  /** Current value. */
  value: number;
  /** Value mapped to a full-width fill. */
  max?: number;
  /** Theme color key for the fill. */
  color?: MiniBarColor;
  /** Track/fill height in px. */
  height?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single thin progress-style bar — token-bound, View-based (no SVG). The fill
 * width is `value / max`; the track uses `border`. Handy inline next to a stat.
 */
export function MiniBar({
  value,
  max = 100,
  color = 'primary',
  height = 6,
  style,
}: MiniBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const ceiling = Math.max(max, 1);
  const ratio = Math.min(Math.max(value / ceiling, 0), 1);

  return (
    <View
      style={[
        {
          height,
          backgroundColor: colors.border,
          borderRadius: tokens.radius.full,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        style={{
          width: `${ratio * 100}%`,
          height: '100%',
          backgroundColor: colors[color],
          borderRadius: tokens.radius.full,
        }}
      />
    </View>
  );
}
