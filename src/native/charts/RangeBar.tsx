import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type RangeBarColor = keyof SemanticColors;

export interface RangeBarProps {
  /** Start of the highlighted range (in domain units). */
  start: number;
  /** End of the highlighted range (in domain units). */
  end: number;
  /** Domain minimum (track left edge). */
  domainMin?: number;
  /** Domain maximum (track right edge). */
  domainMax?: number;
  /** Theme color key for the range segment. */
  color?: RangeBarColor;
  /** Track height in px. */
  height?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single-range indicator — token-bound, View-based (no SVG). Draws a `border`
 * track with one filled segment spanning `[start, end]` positioned by its share
 * of `[domainMin, domainMax]`. Good for min–max / percentile bands.
 */
export function RangeBar({
  start,
  end,
  domainMin = 0,
  domainMax = 100,
  color = 'primary',
  height = 10,
  style,
}: RangeBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const span = Math.max(domainMax - domainMin, 1);
  const lo = Math.min(start, end);
  const hi = Math.max(start, end);
  const left = Math.min(Math.max((lo - domainMin) / span, 0), 1);
  const right = Math.min(Math.max((hi - domainMin) / span, 0), 1);
  const width = Math.max(right - left, 0);

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
          position: 'absolute',
          left: `${left * 100}%`,
          width: `${width * 100}%`,
          height: '100%',
          backgroundColor: colors[color],
          borderRadius: tokens.radius.full,
        }}
      />
    </View>
  );
}
