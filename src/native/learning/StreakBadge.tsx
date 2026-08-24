import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/** Streak emphasis tone. */
export type StreakTone = 'primary' | 'accent' | 'warn' | 'success';

export type StreakBadgeSize = 'sm' | 'md' | 'lg';

const TONE_COLOR: Record<StreakTone, keyof SemanticColors> = {
  primary: 'primary',
  accent: 'accent',
  warn: 'warn',
  success: 'success',
};

const SIZE_FONT: Record<StreakBadgeSize, { count: 'lg' | 'xl' | '2xl'; unit: 'xs' | 'sm' }> = {
  sm: { count: 'lg', unit: 'xs' },
  md: { count: 'xl', unit: 'xs' },
  lg: { count: '2xl', unit: 'sm' },
};

export interface StreakBadgeProps {
  /** Current streak length. */
  count: number;
  /** Unit noun (default "day"; pluralized automatically). */
  unit?: string;
  /** Emphasis tone. */
  tone?: StreakTone;
  /** Glyph before the count (default 🔥). */
  glyph?: string;
  /** Size preset. */
  size?: StreakBadgeSize;
  /** Copy shown when `count` is 0. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A gamified streak pill: a flame glyph + the streak count and unit. A zero
 * streak degrades to a muted prompt instead of a "0" badge. The count uses a
 * semantic `tone` color. Token-only colors.
 */
export function StreakBadge({
  count,
  unit = 'day',
  tone = 'warn',
  glyph = '🔥',
  size = 'md',
  emptyLabel = 'Start your streak',
  style,
}: StreakBadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const font = SIZE_FONT[size];

  if (count <= 0) {
    return (
      <View
        accessibilityLabel={emptyLabel}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            alignSelf: 'flex-start',
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          },
          style,
        ]}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base, opacity: 0.5 }}>
          {glyph}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  const unitLabel = `${unit}${count === 1 ? '' : 's'}`;

  return (
    <View
      accessibilityLabel={`${count} ${unitLabel} streak`}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: tokens.spacing.xs,
          alignSelf: 'flex-start',
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.full,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
        {glyph}
      </Text>
      <Text style={{ color: colors[TONE_COLOR[tone]], fontSize: tokens.typography.scale[font.count], fontWeight: '800' }}>
        {count}
      </Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale[font.unit] }}>{unitLabel}</Text>
    </View>
  );
}
