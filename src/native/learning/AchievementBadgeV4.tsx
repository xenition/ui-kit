import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { AchievementBadgeProps, AchievementTier, AchievementBadgeSize } from './AchievementBadge';

/** Drop-in for {@link AchievementBadgeProps} — same props, the V4 "campus" design. */
export type AchievementBadgeV4Props = AchievementBadgeProps;

const TIER_COLOR: Record<AchievementTier, keyof SemanticColors> = {
  bronze: 'warn',
  silver: 'muted',
  gold: 'accent',
  platinum: 'primary',
};
const SIZE_DIAMETER: Record<AchievementBadgeSize, number> = { sm: 48, md: 64, lg: 84 };

/**
 * AchievementBadge — **V4** "campus" design (native twin of the web V4). A
 * gamification achievement badge: a tier-toned medallion (a tinted well inside a
 * toned ring) with an icon, plus a title / description. Locked achievements dim
 * the medallion and overlay a 🔒 (state is spoken, not color-only). Tappable when
 * `onPress` is set. Token-only colors via `useXenitionTheme()`.
 */
export function AchievementBadgeV4({ title, glyph = '🏆', tier = 'gold', unlocked = true, description, size = 'md', hideLabel = false, onPress, style }: AchievementBadgeV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const diameter = SIZE_DIAMETER[size];
  const ring = colors[TIER_COLOR[tier]];

  const medallion = (
    <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
      <View style={{ width: diameter, height: diameter, borderRadius: diameter / 2, borderWidth: 3, borderColor: unlocked ? ring : colors.border, backgroundColor: unlocked ? withAlpha(ring, 0.12) : colors.surface, alignItems: 'center', justifyContent: 'center', opacity: unlocked ? 1 : 0.5 }}>
        <Text allowFontScaling={false} style={{ fontSize: diameter * 0.42 }}>{unlocked ? glyph : '🔒'}</Text>
      </View>
      {!hideLabel ? (
        <>
          <Text numberOfLines={1} style={{ color: unlocked ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700', textAlign: 'center' }}>{title}</Text>
          {description ? <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>{description}</Text> : null}
        </>
      ) : null}
    </View>
  );

  const a11y = `${title} achievement, ${tier} tier, ${unlocked ? 'unlocked' : 'locked'}`;

  if (!onPress) {
    return <View accessibilityLabel={a11y} style={style}>{medallion}</View>;
  }
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} style={[{ alignSelf: 'flex-start' }, style]}>
      {medallion}
    </Pressable>
  );
}
