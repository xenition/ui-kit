import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar } from '../primitives';
import type { LeaderboardRowProps } from './LeaderboardRow';

/** V4 layout choices for the "campus" design. */
export type LeaderboardRowLayout = 'full' | 'compact';

/** Drop-in for {@link LeaderboardRowProps} — same props, the V4 "campus" design. */
export interface LeaderboardRowV4Props extends LeaderboardRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: LeaderboardRowLayout;
}

const MEDAL: Record<number, { glyph: string; color: keyof SemanticColors }> = {
  1: { glyph: '🥇', color: 'accent' },
  2: { glyph: '🥈', color: 'muted' },
  3: { glyph: '🥉', color: 'warn' },
};

/**
 * LeaderboardRow — **V4** "campus" design (native twin of the web V4). An
 * elevated rounded row with a soft shadow: rank (a medal glyph for the top
 * three), avatar, name, an optional trend, and a big legible **tabular-nums**
 * score. `highlighted` marks the current user with a primary ring; `empty`
 * renders a muted placeholder. Tappable when `onPress` is set. Honors the V4
 * `variant` — `full` (default) and `compact`. Token-only colors via
 * `useXenitionTheme()`.
 */
export function LeaderboardRowV4({
  rank,
  name,
  avatar,
  score,
  scoreUnit = 'pts',
  highlighted = false,
  empty = false,
  trend,
  onPress,
  variant = 'full',
  style,
}: LeaderboardRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const medal = MEDAL[rank];
  const compact = variant === 'compact';
  const shell: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      backgroundColor: colors.card,
      borderWidth: highlighted ? 2 : 1,
      borderColor: highlighted ? colors.primary : colors.border,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    style,
  ];

  if (empty || !name) {
    return (
      <View accessibilityLabel={`Rank ${rank}, empty`} style={shell}>
        <Text style={{ width: 28, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }}>{rank}</Text>
        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border }} />
        <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>—</Text>
      </View>
    );
  }

  const rankColor = medal ? colors[medal.color] : colors.onSurface;
  const content = (
    <View style={shell}>
      <Text style={{ width: 28, textAlign: 'center', color: rankColor, fontSize: tokens.typography.scale.base, fontWeight: '800', fontVariant: ['tabular-nums'] }}>{medal ? medal.glyph : rank}</Text>
      <Avatar src={avatar} name={name} size="sm" />
      <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: highlighted ? '700' : '600' }}>{name}</Text>
      {trend ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>{trend}</Text> : null}
      {score != null ? <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }}>{score} {scoreUnit}</Text> : null}
    </View>
  );

  const a11y = `Rank ${rank}, ${name}${score != null ? `, ${score} ${scoreUnit}` : ''}${highlighted ? ', you' : ''}`;

  if (!onPress) {
    return <View accessibilityLabel={a11y}>{content}</View>;
  }
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
      {content}
    </Pressable>
  );
}
