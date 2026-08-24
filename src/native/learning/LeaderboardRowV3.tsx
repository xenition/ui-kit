import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { LeaderboardRowProps } from './LeaderboardRow';

/** Same public contract as {@link LeaderboardRow} — a drop-in alternate design. */
export type LeaderboardRowV3Props = LeaderboardRowProps;

const MEDAL: Record<number, { glyph: string; color: keyof SemanticColors }> = {
  1: { glyph: '🥇', color: 'accent' },
  2: { glyph: '🥈', color: 'muted' },
  3: { glyph: '🥉', color: 'warn' },
};

/**
 * LeaderboardRow, design v3 — a **minimal flat row** separated by a hairline
 * rule, no card. The rank is a plain numeral (medal glyph for the top three),
 * the name sits mid-row, and the score is emphasized as large numerals with a
 * quiet unit beside it. The highlighted (current-user) row gets a soft primary
 * tint wash rather than a solid fill, keeping text legible against a token color.
 * `empty` renders a muted placeholder. Same props as {@link LeaderboardRow}.
 * Token-only colors.
 */
export function LeaderboardRowV3({
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
}: LeaderboardRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const medal = MEDAL[rank];

  const rowStyle = [
    {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: highlighted ? withAlpha(colors.primary, 0.08) : 'transparent',
      borderRadius: highlighted ? tokens.radius.sm : 0,
    },
    style,
  ];

  if (empty || !name) {
    return (
      <View accessibilityLabel={`Rank ${rank}, empty`} style={rowStyle}>
        <Text style={{ width: 26, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
          {rank}
        </Text>
        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border }} />
        <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>—</Text>
      </View>
    );
  }

  const rankColor = medal ? colors[medal.color] : colors.onSurface;

  const content = (
    <View style={rowStyle}>
      <Text style={{ width: 26, textAlign: 'center', color: rankColor, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
        {medal ? medal.glyph : rank}
      </Text>
      <Avatar src={avatar} name={name} size="sm" />
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: highlighted ? '800' : '600' }}>
          {name}
        </Text>
        {trend ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{trend}</Text> : null}
      </View>
      {score != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>{score}</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{scoreUnit}</Text>
        </View>
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
