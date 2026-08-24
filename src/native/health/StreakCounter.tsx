import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

export type StreakCounterTone = 'primary' | 'success' | 'warn' | 'accent';

const TONE_COLOR: Record<StreakCounterTone, keyof SemanticColors> = {
  primary: 'primary',
  success: 'success',
  warn: 'warn',
  accent: 'accent',
};

export interface StreakCounterProps {
  /** Current streak length. Clamped to `>= 0`. */
  count: number;
  /** Unit noun; defaults to "day". Pluralized automatically. */
  unit?: string;
  /** Caption under the number; defaults to "streak". */
  label?: string;
  /** Accent tone for the number + flame. */
  tone?: StreakCounterTone;
  /** Optional best/record value shown as a muted sub-caption. */
  best?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A prominent streak readout: a flame, the day count, and a caption. When
 * `count` is 0 it reads a muted "Start your streak" prompt instead of a cold
 * zero. All colors trace to `SemanticColors` tokens — no literals.
 */
export function StreakCounter({
  count,
  unit = 'day',
  label = 'streak',
  tone = 'warn',
  best,
  style,
}: StreakCounterProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safe = Math.max(Math.floor(count), 0);
  const accent = colors[TONE_COLOR[tone]];
  const unitLabel = safe === 1 ? unit : `${unit}s`;

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={safe === 0 ? 'No active streak' : `${safe} ${unitLabel} ${label}`}
      style={[{ alignItems: 'center', gap: tokens.spacing.xs }, style]}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
        {safe === 0 ? '🌱' : '🔥'}
      </Text>
      {safe === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Start your streak</Text>
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
            <Text style={{ color: accent, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}>
              {safe}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>{unitLabel}</Text>
          </View>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{label}</Text>
        </>
      )}
      {best != null && best > 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          Best: {Math.max(Math.floor(best), 0)}
        </Text>
      ) : null}
    </View>
  );
}
