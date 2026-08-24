import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Sparkline } from '../charts';

export type BodyMetricVariant = 'weight' | 'bmi' | 'body-fat' | 'muscle' | 'waist' | 'blood-sugar';

interface VariantMeta {
  glyph: string;
  label: string;
  unit: string;
}

const VARIANT_META: Record<BodyMetricVariant, VariantMeta> = {
  weight: { glyph: '⚖️', label: 'Weight', unit: 'kg' },
  bmi: { glyph: '📊', label: 'BMI', unit: '' },
  'body-fat': { glyph: '📉', label: 'Body fat', unit: '%' },
  muscle: { glyph: '💪', label: 'Muscle mass', unit: 'kg' },
  waist: { glyph: '📏', label: 'Waist', unit: 'cm' },
  'blood-sugar': { glyph: '🩸', label: 'Blood sugar', unit: 'mg/dL' },
};

export interface BodyMetricCardProps {
  /** Which body metric; drives the icon, label, and default unit. */
  variant: BodyMetricVariant;
  /** The current measurement. */
  value: React.ReactNode;
  /** Override the variant's default unit. Pass `''` to hide. */
  unit?: string;
  /** Change vs. the previous reading; positive reads success, negative danger. */
  delta?: number;
  /**
   * Invert the delta tone — for metrics where down is good (weight, body fat,
   * waist). When true a negative delta reads `success`.
   */
  lowerIsBetter?: boolean;
  /** Recent history for an inline sparkline trend. */
  trend?: number[];
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A body-composition metric card: icon + label, the current value with unit, an
 * optional change delta, and an inline {@link Sparkline} trend. `lowerIsBetter`
 * flips the delta tone for metrics where a decrease is good. Colors trace to
 * `SemanticColors` tokens — no literals. Pressable when `onPress` is set.
 */
export function BodyMetricCard({
  variant,
  value,
  unit,
  delta,
  lowerIsBetter = false,
  trend,
  onPress,
  style,
}: BodyMetricCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = VARIANT_META[variant];
  const resolvedUnit = unit ?? meta.unit;

  let deltaColor: string = colors.muted;
  let trendColor: keyof SemanticColors = 'primary';
  if (delta != null && delta !== 0) {
    const good = lowerIsBetter ? delta < 0 : delta > 0;
    deltaColor = good ? colors.success : colors.danger;
    trendColor = good ? 'success' : 'danger';
  }

  const inner = (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
          {meta.glyph}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{meta.label}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}>
          {value}
        </Text>
        {resolvedUnit ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, marginBottom: tokens.spacing.xs }}>
            {resolvedUnit}
          </Text>
        ) : null}
      </View>

      {delta != null ? (
        <Text style={{ color: deltaColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : ''}
          {Math.abs(delta)}
          {resolvedUnit ? ` ${resolvedUnit}` : ''}
        </Text>
      ) : null}

      {trend && trend.length > 0 ? (
        <Sparkline
          data={trend}
          color={trendColor}
          accessibilityLabel={`${meta.label} trend over ${trend.length} readings`}
        />
      ) : null}
    </View>
  );

  const a11y = `${meta.label}: ${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
