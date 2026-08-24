import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type SleepQuality = 'poor' | 'fair' | 'good' | 'excellent';

const QUALITY_COLOR: Record<SleepQuality, keyof SemanticColors> = {
  poor: 'danger',
  fair: 'warn',
  good: 'primary',
  excellent: 'success',
};

const QUALITY_LABEL: Record<SleepQuality, string> = {
  poor: 'Poor',
  fair: 'Fair',
  good: 'Good',
  excellent: 'Excellent',
};

export interface SleepBarProps {
  /** Hours actually slept. */
  hours: number;
  /** Target hours; the bar fills to `hours / goal`. */
  goal?: number;
  /** Sleep-quality rating; colors the bar and shows a tag. */
  quality?: SleepQuality;
  /** Optional bedtime label, e.g. "11:20 PM". */
  bedtime?: string;
  /** Optional wake time label, e.g. "6:45 AM". */
  wakeTime?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A sleep-duration summary: hours slept versus goal drawn as a single fill bar,
 * a color-coded quality tag, and optional bed / wake times. The bar color comes
 * from `quality` (falling back to `primary`). Guards `goal <= 0`. Token-only.
 */
export function SleepBar({
  hours,
  goal = 8,
  quality,
  bedtime,
  wakeTime,
  style,
}: SleepBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const safeGoal = Math.max(goal, 0);
  const safeHours = Math.max(hours, 0);
  const ratio = safeGoal > 0 ? Math.min(safeHours / safeGoal, 1) : 0;
  const barColor = quality ? colors[QUALITY_COLOR[quality]] : colors.primary;

  return (
    <View
      accessibilityLabel={`Sleep: ${safeHours} hours${safeGoal > 0 ? ` of ${safeGoal}` : ''}${
        quality ? `, ${QUALITY_LABEL[quality]} quality` : ''
      }`}
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
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
            😴
          </Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
            {safeHours}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            h{safeGoal > 0 ? ` / ${safeGoal}h` : ''}
          </Text>
        </View>
        {quality ? (
          <Text style={{ color: barColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {QUALITY_LABEL[quality]}
          </Text>
        ) : null}
      </View>

      <View style={{ height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }}>
        <View style={{ width: `${ratio * 100}%`, height: '100%', backgroundColor: barColor, borderRadius: tokens.radius.full }} />
      </View>

      {bedtime || wakeTime ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {bedtime ? `🌙 ${bedtime}` : ''}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {wakeTime ? `☀️ ${wakeTime}` : ''}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
