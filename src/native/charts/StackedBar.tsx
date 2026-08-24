import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type StackedBarColor = keyof SemanticColors;

export interface StackedBarSegment {
  value: number;
  /** Theme color key for this segment. */
  color?: StackedBarColor;
  /** Opacity applied to the color (for series that share one theme color). */
  opacity?: number;
  label?: string;
}

export interface StackedBarProps {
  /** Segments laid end-to-end; each width is its share of the total. */
  segments: StackedBarSegment[];
  /** Bar height in px. */
  height?: number;
  /** Accessible one-line summary; a sensible default is generated when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Single horizontal stacked bar — token-bound, View-based (no SVG). Each
 * segment is a `View` flexed by its share of the sum; distinguish series by
 * varying the `opacity` of one theme color rather than inventing hex values.
 */
export function StackedBar({
  segments,
  height = 16,
  accessibilityLabel,
  style,
}: StackedBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (segments.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
        No data
      </Text>
    );
  }

  const total = Math.max(
    segments.reduce((sum, s) => sum + Math.max(s.value, 0), 0),
    1
  );

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? `Stacked bar, ${segments.length} segments`}
      style={[
        {
          flexDirection: 'row',
          height,
          borderRadius: tokens.radius.full,
          overflow: 'hidden',
          backgroundColor: colors.border,
        },
        style,
      ]}
    >
      {segments.map((s, i) => {
        const ratio = Math.min(Math.max(s.value, 0) / total, 1);
        if (ratio <= 0) return null;
        return (
          <View
            key={i}
            style={{
              flexGrow: ratio,
              flexBasis: 0,
              backgroundColor: colors[s.color ?? 'primary'],
              opacity: s.opacity ?? 1,
            }}
          />
        );
      })}
    </View>
  );
}
