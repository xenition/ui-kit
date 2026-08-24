import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import type { LeaderboardRowProps } from './LeaderboardRow';

/** Same public contract as {@link LeaderboardRow} — a drop-in alternate design. */
export type LeaderboardRowV2Props = LeaderboardRowProps;

const MEDAL: Record<number, { glyph: string; color: keyof SemanticColors }> = {
  1: { glyph: '🥇', color: 'accent' },
  2: { glyph: '🥈', color: 'muted' },
  3: { glyph: '🥉', color: 'warn' },
};

/**
 * LeaderboardRow, design v2 — an **elevated card** row: a large tinted rank disc
 * (medal glyph for the top three) on the left, a ringed avatar, the name over an
 * optional trend line, and the score in a {@link Badge} on the right. The score
 * badge turns `primary` for the highlighted (current-user) row. `empty` renders
 * a muted placeholder. Same props as {@link LeaderboardRow}. Token-only colors.
 */
export function LeaderboardRowV2({
  rank,
  name,
  avatar,
  score,
  scoreUnit = 'pts',
  highlighted = false,
  empty = false,
  trend,
  onPress,
  style,
}: LeaderboardRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const medal = MEDAL[rank];

  const cardStyle = [
    {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      backgroundColor: colors.surface,
      borderWidth: highlighted ? 1.5 : 0,
      borderColor: highlighted ? colors.primary : colors.border,
      ...shadow('sm', tokens),
    },
    style,
  ];

  if (empty || !name) {
    return (
      <View accessibilityLabel={`Rank ${rank}, empty`} style={cardStyle}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.muted, 0.12),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>{rank}</Text>
        </View>
        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border }} />
        <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>—</Text>
      </View>
    );
  }

  const rankTint = medal ? colors[medal.color] : colors.primary;

  const content = (
    <View style={cardStyle}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(rankTint, 0.14),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {medal ? (
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
            {medal.glyph}
          </Text>
        ) : (
          <Text style={{ color: rankTint, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>{rank}</Text>
        )}
      </View>
      <Avatar src={avatar} name={name} size="md" ring={highlighted} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: highlighted ? '800' : '600' }}>
          {name}
        </Text>
        {trend ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{trend}</Text> : null}
      </View>
      {score != null ? (
        <Badge tone={highlighted ? 'primary' : 'neutral'} variant={highlighted ? 'solid' : 'soft'} size="md">
          {`${score} ${scoreUnit}`}
        </Badge>
      ) : null}
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
