import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface StatCardProps {
  /** Metric name, e.g. "Monthly revenue". */
  label: string;
  /** The dominant value, e.g. "$12.4k" or 128. */
  value: React.ReactNode;
  /** Optional change readout, e.g. "+12%". */
  delta?: string;
  /** Direction of `delta`; drives the success/danger tone. */
  trend?: 'up' | 'down';
  /** Optional leading icon/illustration slot. */
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single at-a-glance metric card. The `value` is the dominant element; the
 * `delta` reads in a success (up) or danger (down) tone. Token-only; the native
 * mirror of a dashboard stat tile every admin screen otherwise hand-rolls.
 */
export function StatCard({
  label,
  value,
  delta,
  trend,
  icon,
  style,
}: StatCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const deltaColor =
    trend === 'down' ? colors.danger : trend === 'up' ? colors.success : colors.muted;
  return (
    <View
      accessibilityLabel={`${label}: ${String(value)}${delta ? `, ${delta}` : ''}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.xs,
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          numberOfLines={1}
          style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}
        >
          {label}
        </Text>
        {icon ? <View>{icon}</View> : null}
      </View>
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
        <Text style={{ color: deltaColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {trend === 'up' ? '▲ ' : trend === 'down' ? '▼ ' : ''}
          {delta}
        </Text>
      ) : null}
    </View>
  );
}
