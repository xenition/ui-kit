import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Card, EmptyState, Icon, useXenitionTheme } from '../primitives';
import type { BracketMatch, BracketRound } from './types';

export interface TournamentBracketProps {
  /** Rounds left→right (e.g. Quarterfinals → Final). */
  rounds: BracketRound[];
  /** Message shown when there are no rounds/matches. */
  emptyLabel?: string;
  /** Called when a match is tapped — open its detail. */
  onMatchPress?: (match: BracketMatch, roundIndex: number, matchIndex: number) => void;
  style?: StyleProp<ViewStyle>;
}

function Side({
  name,
  score,
  isWinner,
}: {
  name?: string;
  score?: number;
  isWinner: boolean;
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
      <Text
        numberOfLines={1}
        style={{
          flex: 1,
          color: name ? colors.onSurface : colors.muted,
          fontSize: tokens.typography.scale.sm,
          fontWeight: isWinner ? '700' : '400',
        }}
      >
        {name ?? 'TBD'}
      </Text>
      <Text
        style={{
          color: isWinner ? colors.primary : colors.muted,
          fontSize: tokens.typography.scale.sm,
          fontWeight: isWinner ? '700' : '400',
        }}
      >
        {score == null ? '–' : String(score)}
      </Text>
    </View>
  );
}

/**
 * A single-elimination bracket — rounds render as horizontally scrollable
 * columns of match cards, each showing two sides, scores, and the advancing
 * team (marked in weight + color, never color alone). `onMatchPress` fires with
 * the match and its guarded `[round, match]` indices. Renders an `EmptyState`
 * when there are no matches. Composes `Card`. Token-only.
 */
export function TournamentBracket({
  rounds,
  emptyLabel = 'No matches scheduled',
  onMatchPress,
  style,
}: TournamentBracketProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const totalMatches = rounds.reduce((n, r) => n + (r.matches?.length ?? 0), 0);
  if (rounds.length === 0 || totalMatches === 0) {
    return (
      <EmptyState
        icon={<Icon glyph="🏆" size="2xl" color="muted" accessibilityLabel="Bracket" />}
        title={emptyLabel}
        style={style}
      />
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: tokens.spacing.lg, padding: tokens.spacing.xs }}
      style={style}
    >
      {rounds.map((round, ri) => (
        <View key={`${round.name}-${ri}`} style={{ gap: tokens.spacing.sm, minWidth: 176 }}>
          <Text
            accessibilityRole="header"
            style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}
          >
            {round.name}
          </Text>
          {(round.matches ?? []).map((match, mi) => {
            const decided = match.winner != null;
            const body = (
              <Card padding="sm" style={{ gap: tokens.spacing.xs }}>
                <Side name={match.home} score={match.homeScore} isWinner={match.winner === 'home'} />
                <View style={{ height: 1, backgroundColor: colors.border }} />
                <Side name={match.away} score={match.awayScore} isWinner={match.winner === 'away'} />
              </Card>
            );
            if (!onMatchPress) return <View key={match.id}>{body}</View>;
            const winnerName =
              match.winner === 'home' ? match.home : match.winner === 'away' ? match.away : undefined;
            return (
              <Pressable
                key={match.id}
                accessibilityRole="button"
                accessibilityLabel={`${match.home ?? 'TBD'} versus ${match.away ?? 'TBD'}`}
                accessibilityState={{ selected: decided }}
                accessibilityHint={winnerName ? `${winnerName} advanced` : undefined}
                onPress={() => onMatchPress(match, ri, mi)}
                style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
              >
                {body}
              </Pressable>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}
