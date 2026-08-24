import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon, Badge } from '../primitives';

/** Health of a sensor value. */
export type SensorStatus = 'normal' | 'warn' | 'danger' | 'offline';

export interface SensorReadingProps {
  /** What is being measured (e.g. "Temperature", "CO₂"). */
  label: string;
  /** Numeric/formatted reading. Shown as "—" when `offline`. */
  value?: string | number;
  /** Unit suffix (e.g. "°C", "ppm", "%"). */
  unit?: string;
  /** Leading glyph/emoji (e.g. "🌡️", "💧"). */
  icon?: string;
  /** Reading health — drives the value color + a text status chip. */
  status?: SensorStatus;
  /** Optional trend hint shown under the value (e.g. "↑ 2° since 1pm"). */
  trend?: string;
  style?: StyleProp<ViewStyle>;
}

const STATUS_META: Record<
  SensorStatus,
  { color: keyof SemanticColors; label: string; tone: 'success' | 'warn' | 'danger' | 'neutral' }
> = {
  normal: { color: 'onSurface', label: 'Normal', tone: 'success' },
  warn: { color: 'warn', label: 'Elevated', tone: 'warn' },
  danger: { color: 'danger', label: 'Alert', tone: 'danger' },
  offline: { color: 'muted', label: 'Offline', tone: 'neutral' },
};

/**
 * A single sensor reading — glyph, label, a large value+unit, and a status
 * {@link Badge}. `status` colors the value (`warn`→warn, `danger`→danger,
 * else onSurface/muted) but is always paired with a text chip so an at-risk
 * reading is legible without color. When `offline` the value renders as an em
 * dash. Optional `trend` line sits underneath. Token-bound throughout.
 */
export function SensorReading({
  label,
  value,
  unit,
  icon = '📈',
  status = 'normal',
  trend,
  style,
}: SensorReadingProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const shownValue = status === 'offline' || value == null ? '—' : String(value);

  return (
    <Card variant="outlined" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph={icon} color="muted" size="base" />
        <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>{label}</Text>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: tokens.spacing.sm }}>
        <Text style={{ color: colors[meta.color], fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
          {shownValue}
        </Text>
        {unit != null && shownValue !== '—' ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{unit}</Text>
        ) : null}
      </View>
      {trend != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }}>{trend}</Text>
      ) : null}
    </Card>
  );
}
