import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type ComparisonBarsColor = keyof SemanticColors;

export interface ComparisonBarsGroup {
  label: string;
  /** Two (or more) series values compared side-by-side within the group. */
  values: number[];
}

export interface ComparisonBarsProps {
  data: ComparisonBarsGroup[];
  /** One theme color key per series; extras vary by opacity. */
  colors?: ComparisonBarsColor[];
  /** Value mapped to full bar height; defaults to the largest datum. */
  max?: number;
  /** Plot height in px. */
  height?: number;
  /** Accessible one-line summary; a sensible default is generated when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** Descending opacity steps so extra series stay within one theme color. */
const OPACITY_STEPS = [1, 0.6, 0.35, 0.2];

/**
 * Grouped comparison bars — token-bound, View/flex-based (no SVG). Renders each
 * group's series as adjacent vertical bars; distinguish series by cycling the
 * provided theme `colors` (and, beyond that, by descending opacity). Group
 * labels use `onSurface`; a `muted` baseline stands in for the axis.
 */
export function ComparisonBars({
  data,
  colors: seriesColors = ['primary', 'accent'],
  max,
  height = 120,
  accessibilityLabel,
  style,
}: ComparisonBarsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (data.length === 0) {
    return (
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
        No data
      </Text>
    );
  }

  const ceiling = Math.max(
    max ?? Math.max(...data.flatMap((g) => g.values), 1),
    1
  );

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? `Comparison bars, ${data.length} groups`}
      style={style}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', height, gap: tokens.spacing.sm }}>
        {data.map((group, gi) => (
          <View
            key={gi}
            style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: 2, height }}
          >
            {group.values.map((value, si) => {
              const ratio = Math.min(Math.max(value / ceiling, 0), 1);
              const colorKey = seriesColors[si % seriesColors.length] ?? 'primary';
              const opacity =
                si < seriesColors.length ? 1 : OPACITY_STEPS[Math.min(si, OPACITY_STEPS.length - 1)];
              return (
                <View
                  key={si}
                  style={{
                    flex: 1,
                    height: Math.max(ratio * height, 1),
                    backgroundColor: colors[colorKey],
                    opacity,
                    borderTopLeftRadius: tokens.radius.sm,
                    borderTopRightRadius: tokens.radius.sm,
                  }}
                />
              );
            })}
          </View>
        ))}
      </View>
      <View style={{ height: 1, backgroundColor: colors.muted, marginTop: tokens.spacing.xs }} />
      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
        {data.map((group, gi) => (
          <Text
            key={gi}
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: 'center',
              color: colors.onSurface,
              fontSize: tokens.typography.scale.xs,
            }}
          >
            {group.label}
          </Text>
        ))}
      </View>
    </View>
  );
}
