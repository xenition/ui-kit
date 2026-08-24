import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/** Achievement tier — sets the ring tone. */
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';

const TIER_COLOR: Record<AchievementTier, keyof SemanticColors> = {
  bronze: 'warn',
  silver: 'muted',
  gold: 'accent',
  platinum: 'primary',
};

export type AchievementBadgeSize = 'sm' | 'md' | 'lg';

const SIZE_DIAMETER: Record<AchievementBadgeSize, number> = { sm: 48, md: 64, lg: 84 };

export interface AchievementBadgeProps {
  /** Achievement title. */
  title: string;
  /** Icon / emoji shown in the medallion. */
  glyph?: string;
  /** Tier; sets the ring tone. */
  tier?: AchievementTier;
  /** Whether the achievement is unlocked; locked badges dim and show a 🔒. */
  unlocked?: boolean;
  /** Optional short description under the title. */
  description?: string;
  /** Size preset. */
  size?: AchievementBadgeSize;
  /** Hide the title/description labels (medallion only). */
  hideLabel?: boolean;
  /** Fires when the badge is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A gamification achievement badge: a tier-toned medallion with an icon, plus a
 * title / description. Locked achievements dim the medallion and overlay a lock
 * glyph (state is spoken, not color-only). Token-only colors.
 */
export function AchievementBadge({
  title,
  glyph = '🏆',
  tier = 'gold',
  unlocked = true,
  description,
  size = 'md',
  hideLabel = false,
  onPress,
  style,
}: AchievementBadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const diameter = SIZE_DIAMETER[size];
  const ring = colors[TIER_COLOR[tier]];

  const medallion = (
    <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
      <View
        style={{
          width: diameter,
          height: diameter,
          borderRadius: diameter / 2,
          borderWidth: 3,
          borderColor: unlocked ? ring : colors.border,
          backgroundColor: colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: unlocked ? 1 : 0.5,
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: diameter * 0.42 }}>
          {unlocked ? glyph : '🔒'}
        </Text>
      </View>
      {!hideLabel ? (
        <>
          <Text
            numberOfLines={1}
            style={{ color: unlocked ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700', textAlign: 'center' }}
          >
            {title}
          </Text>
          {description ? (
            <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>
              {description}
            </Text>
          ) : null}
        </>
      ) : null}
    </View>
  );

  const a11y = `${title} achievement, ${tier} tier, ${unlocked ? 'unlocked' : 'locked'}`;

  if (!onPress) {
    return (
      <View accessibilityLabel={a11y} style={style}>
        {medallion}
      </View>
    );
  }

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} style={[{ alignSelf: 'flex-start' }, style]}>
      {medallion}
    </Pressable>
  );
}
