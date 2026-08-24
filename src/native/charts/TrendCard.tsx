import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Sparkline } from './Sparkline';

export type TrendCardColor = keyof SemanticColors;

export interface TrendCardProps {
  /** Metric label, e.g. "Revenue". */
  label: string;
  /** Primary stat value shown large. */
  value: string | number;
  /** Optional delta caption, e.g. "+12%". */
  delta?: string;
  /** Trend series rendered as an inline sparkline. */
  data?: number[];
  /** Theme color key for the sparkline + accents. */
  color?: TrendCardColor;
  /** Accessible one-line summary; a sensible default is generated when omitted. */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A labelled stat paired with an inline {@link Sparkline} — token-bound,
 * View-based (no SVG). Surfaces a headline metric with an at-a-glance trend.
 */
export function TrendCard({
  label,
  value,
  delta,
  data,
  color = 'primary',
  accessibilityLabel,
  style,
}: TrendCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? `${label}, ${value}${delta ? `, ${delta}` : ''}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
        {label}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['2xl'],
            fontWeight: '700',
          }}
        >
          {value}
        </Text>
        {delta ? (
          <Text style={{ color: colors[color], fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {delta}
          </Text>
        ) : null}
      </View>
      {data && data.length > 0 ? <Sparkline data={data} color={color} height={28} /> : null}
    </View>
  );
}
