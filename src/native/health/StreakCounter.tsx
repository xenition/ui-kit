import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';

export type StreakCounterTone = 'primary' | 'success' | 'warn' | 'accent';

/** Tone → the contrast-safe `*Text` key used for the big streak number. */
const TONE_TEXT_COLOR: Record<StreakCounterTone, keyof SemanticColors> = {
  primary: 'primaryText',
  success: 'successText',
  warn: 'warnText',
  accent: 'accentText',
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
  /** Surface treatment for visual diversity; defaults to `classic` (no surface, the historical look). */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A prominent streak readout: a flame, the day count, and a caption. When
 * `count` is 0 it reads a muted "Start your streak" prompt instead of a cold
 * zero. `appearance` selects an optional surface treatment (classic stays
 * surface-free). All colors trace to `SemanticColors` tokens — no literals.
 */
export function StreakCounter({
  count,
  unit = 'day',
  label = 'streak',
  tone = 'warn',
  best,
  appearance = 'classic',
  style,
}: StreakCounterProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safe = Math.max(Math.floor(count), 0);
  const accent = colors[TONE_TEXT_COLOR[tone]];
  const unitLabel = safe === 1 ? unit : `${unit}s`;
  const enter = useEnter();

  return (
    <Animated.View
      accessibilityRole="summary"
      accessibilityLabel={safe === 0 ? 'No active streak' : `${safe} ${unitLabel} ${label}`}
      style={[
        { alignItems: 'center', gap: tokens.spacing.xs, opacity: enter.opacity, transform: enter.transform },
        appearance !== 'classic'
          ? { ...appearanceStyle(appearance, colors, tokens), borderRadius: tokens.radius.lg, padding: tokens.spacing.lg }
          : null,
        style,
      ]}
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
    </Animated.View>
  );
}
