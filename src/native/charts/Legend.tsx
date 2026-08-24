import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type LegendColor = keyof SemanticColors;

export interface LegendItem {
  label: string;
  /** Theme color key for the swatch. */
  color?: LegendColor;
  /** Opacity applied to the swatch color (for single-color series). */
  opacity?: number;
}

export interface LegendProps {
  items: LegendItem[];
  /** Stack vertically instead of wrapping in a row. */
  vertical?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Chart legend — token-bound, View-based (no SVG). Each entry is a color swatch
 * (a theme color, optionally at reduced `opacity`) beside its `onSurface` label.
 */
export function Legend({ items, vertical = false, style }: LegendProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (items.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
        No data
      </Text>
    );
  }

  return (
    <View
      style={[
        {
          flexDirection: vertical ? 'column' : 'row',
          flexWrap: vertical ? 'nowrap' : 'wrap',
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {items.map((item, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: tokens.radius.full,
              backgroundColor: colors[item.color ?? 'primary'],
              opacity: item.opacity ?? 1,
            }}
          />
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs }}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
