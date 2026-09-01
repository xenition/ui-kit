import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { SensorReadingProps, SensorStatus } from './SensorReading';

/** Drop-in for {@link SensorReadingProps} — same props, the V4 "ambient" design. */
export type SensorReadingV4Props = SensorReadingProps;

const STATUS_META: Record<
  SensorStatus,
  { accent: keyof SemanticColors; value: keyof SemanticColors; label: string; tone: 'success' | 'warn' | 'danger' | 'neutral' }
> = {
  normal: { accent: 'primary', value: 'onSurface', label: 'Normal', tone: 'success' },
  warn: { accent: 'warn', value: 'warn', label: 'High', tone: 'warn' },
  danger: { accent: 'danger', value: 'danger', label: 'Alert', tone: 'danger' },
  offline: { accent: 'muted', value: 'muted', label: 'Offline', tone: 'neutral' },
};

/** Icon slot for the disc — semantic name that maps to a `text-*`/theme color. */
const ICON_COLOR: Record<SensorStatus, 'primary' | 'warn' | 'danger' | 'muted'> = {
  normal: 'primary',
  warn: 'warn',
  danger: 'danger',
  offline: 'muted',
};

/**
 * SensorReading — **V4** "ambient" design. The calm take on a sensor card: a
 * glyph sits in a **status-tinted glowing disc**, the reading is a **big
 * legible numeral** (3xl, weight 800) beside its unit, with the sensor `label`
 * and a soft-tint status pill (Normal / High / Alert / Offline) below. `status`
 * also colors the numeral — but the pill's icon+label always carries the
 * meaning, so an at-risk reading is never conveyed by color alone. When
 * `offline` the value renders as an em dash; optional `trend` sits underneath.
 * Same props/behavior as {@link SensorReadingProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha`.
 */
export function SensorReadingV4({
  label,
  value,
  unit,
  icon = '📈',
  status = 'normal',
  trend,
  style,
}: SensorReadingV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const accent = colors[meta.accent];
  const shownValue = status === 'offline' || value == null ? '—' : String(value);
  const tinted = status !== 'offline';

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        {/* Glowing status disc — the ambient signature. */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: tinted ? withAlpha(accent, 0.12) : withAlpha(colors.onSurface, 0.05),
            borderWidth: 1,
            borderColor: tinted ? withAlpha(accent, 0.4) : colors.border,
          }}
        >
          <Icon glyph={icon} color={ICON_COLOR[status]} size="lg" />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
            <Text
              style={{
                color: colors[meta.value],
                fontSize: tokens.typography.scale['3xl'],
                fontWeight: '800',
                fontFamily: tokens.typography.fontHeading,
              }}
            >
              {shownValue}
            </Text>
            {unit != null && shownValue !== '—' ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>{unit}</Text>
            ) : null}
          </View>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }}>
            {label}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: tokens.spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.xs,
        }}
      >
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
        {trend != null ? (
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {trend}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
