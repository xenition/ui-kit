import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Avatar } from '../primitives';

/** Medal tone for the top three ranks. */
const MEDAL: Record<number, { glyph: string; color: keyof SemanticColors }> = {
  1: { glyph: '🥇', color: 'accent' },
  2: { glyph: '🥈', color: 'muted' },
  3: { glyph: '🥉', color: 'warn' },
};

export interface LeaderboardRowProps {
  /** 1-based rank. */
  rank: number;
  /** Participant name. */
  name?: string;
  /** Avatar image URI (initials fallback from `name`). */
  avatar?: string;
  /** Score / points. */
  score?: number;
  /** Unit label after the score (default "pts"). */
  scoreUnit?: string;
  /** Highlight this row as the current user. */
  highlighted?: boolean;
  /** Renders a muted empty placeholder slot (unfilled rank). */
  empty?: boolean;
  /** Optional short delta/trend note, e.g. "▲2". */
  trend?: string;
  /** Fires when the row is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A leaderboard entry row: rank (medal glyph for the top three), avatar, name,
 * and score. `highlighted` marks the current user; `empty` renders a muted
 * placeholder for an unfilled slot. Token-only colors.
 */
export function LeaderboardRow({
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
}: LeaderboardRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const medal = MEDAL[rank];

  const base: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      backgroundColor: highlighted ? colors.primary : colors.surface,
      borderWidth: 1,
      borderColor: highlighted ? colors.primary : colors.border,
    },
    style,
  ];

  if (empty || !name) {
    return (
      <View accessibilityLabel={`Rank ${rank}, empty`} style={base}>
        <Text style={{ width: 28, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {rank}
        </Text>
        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border }} />
        <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>—</Text>
      </View>
    );
  }

  const fg = highlighted ? colors.onPrimary : colors.onSurface;
  const muted = highlighted ? colors.onPrimary : colors.muted;

  const content = (
    <View style={base}>
      <Text
        style={{ width: 28, textAlign: 'center', color: medal ? colors[medal.color] : fg, fontSize: tokens.typography.scale.base, fontWeight: '800' }}
      >
        {medal ? medal.glyph : rank}
      </Text>
      <Avatar src={avatar} name={name} size="sm" />
      <Text numberOfLines={1} style={{ flex: 1, color: fg, fontSize: tokens.typography.scale.sm, fontWeight: highlighted ? '700' : '600' }}>
        {name}
      </Text>
      {trend ? <Text style={{ color: muted, fontSize: tokens.typography.scale.xs }}>{trend}</Text> : null}
      {score != null ? (
        <Text style={{ color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {score} {scoreUnit}
        </Text>
      ) : null}
    </View>
  );

  const a11y = `Rank ${rank}, ${name}${score != null ? `, ${score} ${scoreUnit}` : ''}${highlighted ? ', you' : ''}`;

  if (!onPress) {
    return (
      <View accessibilityLabel={a11y}>{content}</View>
    );
  }

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
      {content}
    </Pressable>
  );
}
