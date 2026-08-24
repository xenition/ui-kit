import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';

export type SleepQuality = 'poor' | 'fair' | 'good' | 'excellent';

const QUALITY_COLOR: Record<SleepQuality, keyof SemanticColors> = {
  poor: 'danger',
  fair: 'warn',
  good: 'primary',
  excellent: 'success',
};

/** Quality → the contrast-safe `*Text` key used for the quality tag label. */
const QUALITY_TEXT_COLOR: Record<SleepQuality, keyof SemanticColors> = {
  poor: 'dangerText',
  fair: 'warnText',
  good: 'primaryText',
  excellent: 'successText',
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
  /** Surface treatment for visual diversity; defaults to `classic` (the historical look). */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A sleep-duration summary: hours slept versus goal drawn as a single fill bar,
 * a color-coded quality tag, and optional bed / wake times. The bar color comes
 * from `quality` (falling back to `primary`). `appearance` selects the surface
 * treatment (classic by default). Guards `goal <= 0`. Token-only.
 */
export function SleepBar({
  hours,
  goal = 8,
  quality,
  bedtime,
  wakeTime,
  appearance = 'classic',
  style,
}: SleepBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();

  const safeGoal = Math.max(goal, 0);
  const safeHours = Math.max(hours, 0);
  const ratio = safeGoal > 0 ? Math.min(safeHours / safeGoal, 1) : 0;
  const barColor = quality ? colors[QUALITY_COLOR[quality]] : colors.primary;
  const tagTextColor = quality ? colors[QUALITY_TEXT_COLOR[quality]] : colors.primaryText;

  return (
    <Animated.View
      accessibilityLabel={`Sleep: ${safeHours} hours${safeGoal > 0 ? ` of ${safeGoal}` : ''}${
        quality ? `, ${QUALITY_LABEL[quality]} quality` : ''
      }`}
      style={[
        {
          ...appearanceStyle(appearance, colors, tokens),
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
          opacity: enter.opacity,
          transform: enter.transform,
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
          <Text style={{ color: tagTextColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
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
    </Animated.View>
  );
}
