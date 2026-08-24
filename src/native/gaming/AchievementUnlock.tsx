import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Card, Icon, useXenitionTheme } from '../primitives';
import { withAlpha, type Achievement } from './types';

export type AchievementUnlockVariant = 'toast' | 'inline';

export interface AchievementUnlockProps {
  /** The achievement to celebrate. */
  achievement: Achievement;
  /**
   * - `toast`  — a compact banner for a transient unlock notification (default).
   * - `inline` — a larger centered card for a details / list surface.
   */
  variant?: AchievementUnlockVariant;
  /**
   * Whether it's unlocked. `false` renders a locked/greyed placeholder (a
   * padlock + "Locked"), so the same component covers both trophy states.
   */
  unlocked?: boolean;
  /** Overline above the title, e.g. `'Achievement unlocked'`. */
  label?: string;
  /** Called when the banner is tapped — open the achievement. */
  onPress?: (achievement: Achievement) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * An achievement / trophy unlock surface — a glyph medallion, an overline, the
 * title + criteria, and a point value. Locked achievements render a padlock and
 * muted copy (state shown via text + icon, not color alone). `toast` is a
 * compact banner; `inline` is a centered card. `onPress` opens it. Uses
 * `accessibilityRole="summary"` so a screen reader announces it. Composes
 * `Card`, `Icon`. Token-only.
 */
export function AchievementUnlock({
  achievement,
  variant = 'toast',
  unlocked = true,
  label = 'Achievement unlocked',
  onPress,
  style,
}: AchievementUnlockProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const inline = variant === 'inline';
  const accent = unlocked ? colors.warn : colors.muted;
  const medallion = 56;

  const badge = (
    <View
      style={{
        width: medallion,
        height: medallion,
        borderRadius: medallion / 2,
        backgroundColor: withAlpha(accent, 0.18),
        borderWidth: 2,
        borderColor: accent,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon glyph={unlocked ? achievement.glyph ?? '🏆' : '🔒'} size="2xl" color={unlocked ? 'warn' : 'muted'} />
    </View>
  );

  const text = (
    <View style={{ flex: inline ? undefined : 1, gap: 2, alignItems: inline ? 'center' : 'flex-start' }}>
      <Text
        style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}
      >
        {unlocked ? label : 'Locked'}
      </Text>
      <Text
        numberOfLines={2}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', textAlign: inline ? 'center' : 'left' }}
      >
        {achievement.title}
      </Text>
      {achievement.description ? (
        <Text
          numberOfLines={inline ? 3 : 2}
          style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: inline ? 'center' : 'left' }}
        >
          {achievement.description}
        </Text>
      ) : null}
      {achievement.points != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', marginTop: 2 }}>
          {`${achievement.points} G`}
        </Text>
      ) : null}
    </View>
  );

  const card = (
    <Card
      variant={unlocked ? 'elevated' : 'outlined'}
      style={[
        inline
          ? { alignItems: 'center', gap: tokens.spacing.sm }
          : { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md },
        style,
      ]}
    >
      {badge}
      {text}
    </Card>
  );

  const a11yLabel = `${unlocked ? label : 'Locked achievement'}: ${achievement.title}`;

  if (!onPress) {
    return (
      <View accessible accessibilityRole="summary" accessibilityLabel={a11yLabel}>
        {card}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityState={{ disabled: !unlocked }}
      onPress={() => onPress(achievement)}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {card}
    </Pressable>
  );
}
