import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { MiniBar } from './MiniBar';

export type ProgressBarsColor = keyof SemanticColors;

export interface ProgressBarsItem {
  label: string;
  value: number;
  /** Per-item color override. */
  color?: ProgressBarsColor;
}

export interface ProgressBarsProps {
  items: ProgressBarsItem[];
  /** Value mapped to a full bar; defaults to the largest item. */
  max?: number;
  /** Default theme color key for the bars. */
  color?: ProgressBarsColor;
  /** Show the numeric value beside each label. */
  showValues?: boolean;
  /** Accessible one-line summary; a sensible default is generated when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Stack of labelled progress bars — token-bound, View-based (no SVG). Each row
 * is a label + value over a {@link MiniBar} sized to `value / max`.
 */
export function ProgressBars({
  items,
  max,
  color = 'primary',
  showValues = true,
  accessibilityLabel,
  style,
}: ProgressBarsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (items.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
        No data
      </Text>
    );
  }

  const ceiling = Math.max(max ?? Math.max(...items.map((i) => i.value)), 1);

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? `Progress bars, ${items.length} items`}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      {items.map((item, i) => (
        <View key={i} style={{ gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, flex: 1 }}
            >
              {item.label}
            </Text>
            {showValues ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {item.value}
              </Text>
            ) : null}
          </View>
          <MiniBar value={item.value} max={ceiling} color={item.color ?? color} />
        </View>
      ))}
    </View>
  );
}
