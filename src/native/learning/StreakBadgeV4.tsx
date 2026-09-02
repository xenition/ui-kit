import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { StreakBadgeProps, StreakTone, StreakBadgeSize } from './StreakBadge';

/** Drop-in for {@link StreakBadgeProps} — same props, the V4 "campus" design. */
export type StreakBadgeV4Props = StreakBadgeProps;

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

/**
 * StreakBadge — **V4** "campus" design (native twin of the web V4). A gamified
 * streak pill on a tone-tinted well: a flame glyph + the **tabular-nums** streak
 * count and unit. A zero streak degrades to a muted prompt instead of a "0"
 * badge. The count uses a semantic `tone` color. Token-only colors via
 * `useXenitionTheme()`.
 */
export function StreakBadgeV4({ count, unit = 'day', tone = 'warn', glyph = '🔥', size = 'md', emptyLabel = 'Start your streak', style }: StreakBadgeV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const font = SIZE_FONT[size];
  const toneColor = colors[TONE_COLOR[tone]];

  if (count <= 0) {
    return (
      <View accessibilityLabel={emptyLabel} style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, alignSelf: 'flex-start', paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.sm, borderRadius: tokens.radius.full, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }, style]}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base, opacity: 0.5 }}>{glyph}</Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  const unitLabel = `${unit}${count === 1 ? '' : 's'}`;

  return (
    <View accessibilityLabel={`${count} ${unitLabel} streak`} style={[{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, alignSelf: 'flex-start', paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md, borderRadius: tokens.radius.full, backgroundColor: withAlpha(toneColor, 0.12) }, style]}>
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>{glyph}</Text>
      <Text style={{ color: toneColor, fontSize: tokens.typography.scale[font.count], fontWeight: '800', fontVariant: ['tabular-nums'] }}>{count}</Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale[font.unit] }}>{unitLabel}</Text>
    </View>
  );
}
