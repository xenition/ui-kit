import * as React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { spokenLine } from './internal/arcade-v4';
import type { TournamentBracketProps } from './TournamentBracket';

export interface TournamentBracketV4Props extends TournamentBracketProps {
  /** How the advancing side is announced. Default `` (name) => `${name} advanced` ``. */
  advancedLabel?: (name: string) => string;
}

/** A side of a match, drawn. Its numbers reach the reader through the match's name. */
function Side({
  name,
  score,
  isWinner,
}: {
  name?: string;
  score?: number;
  isWinner: boolean;
}): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: tokens.spacing.sm,
      }}
    >
      <TextV4
        size="sm"
        weight={isWinner ? 'bold' : 'regular'}
        tone={name ? 'onCard' : 'mutedText'}
        numberOfLines={1}
        style={{ flex: 1, minWidth: 0 }}
      >
        {name ?? 'TBD'}
      </TextV4>
      <TextV4
        size="sm"
        weight={isWinner ? 'bold' : 'regular'}
        numeric="tabular"
        tone={isWinner ? 'primaryText' : 'mutedText'}
      >
        {score == null ? '–' : String(score)}
      </TextV4>
    </View>
  );
}

/**
 * **V4 tournament bracket** — same props as {@link TournamentBracket} plus
 * `advancedLabel`.
 *
 * ## Four changes
 *
 * 1. **The scores are announced.** The match's name was
 *    `` `${home} versus ${away}` `` on a `Pressable` that is `accessible` by
 *    default, so the two `Side`s that render the numbers were pruned with the
 *    rest of the subtree — a reader could not learn a single score anywhere in
 *    the bracket. The name now carries both sides *and* both scores, and the
 *    dash for an unplayed match survives as a spoken "–".
 * 2. **A match is not a toggle.** It announced
 *    `accessibilityState={{ selected: decided }}` (`aria-pressed={decided}` on
 *    web), so a reader was told the control was pressed because the match had
 *    a winner. Pressing it opens a detail view and can never change that.
 * 3. **The winner stops living in a hint.** It was an `accessibilityHint` here
 *    and a `title` attribute on web — a tooltip, which never reaches a touch
 *    user or a keyboard user. `advancedLabel` puts it in the name, on both
 *    twins.
 * 4. **The winning side uses `primaryText`**, the contrast-corrected ink,
 *    rather than the `primary` fill as text; a match card clears 44, and the
 *    press is a state layer instead of `opacity: 0.85`.
 */
export function TournamentBracketV4({
  rounds,
  emptyLabel = 'No matches scheduled',
  advancedLabel = (name) => `${name} advanced`,
  onMatchPress,
  style,
}: TournamentBracketV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const totalMatches = rounds.reduce((n, r) => n + (r.matches?.length ?? 0), 0);
  if (rounds.length === 0 || totalMatches === 0) {
    return (
      <EmptyStateV4
        icon={<IconV4 glyph="🏆" size="2xl" color="mutedText" />}
        title={emptyLabel}
        style={style}
      />
    );
  }

  const column = minTap(tokens.spacing) * 4;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: tokens.spacing.lg, padding: tokens.spacing.xs }}
      style={style}
    >
      {rounds.map((round, ri) => (
        <View key={`${round.name}-${ri}`} style={{ gap: tokens.spacing.sm, minWidth: column }}>
          <TextV4
            accessibilityRole="header"
            size="xs"
            weight="bold"
            tone="mutedText"
            style={{ textTransform: 'uppercase' }}
          >
            {round.name}
          </TextV4>
          {(round.matches ?? []).map((match, mi) => {
            const winnerName =
              match.winner === 'home'
                ? match.home
                : match.winner === 'away'
                  ? match.away
                  : undefined;
            const name = spokenLine([
              match.home ?? 'TBD',
              match.homeScore == null ? '–' : match.homeScore,
              `versus ${match.away ?? 'TBD'}`,
              match.awayScore == null ? '–' : match.awayScore,
              winnerName ? advancedLabel(winnerName) : null,
            ]);

            const body = (pressed: boolean): React.ReactElement => (
              <View
                style={{
                  gap: tokens.spacing.xs,
                  justifyContent: 'center',
                  minHeight: minTap(tokens.spacing),
                  padding: tokens.spacing.sm,
                  borderRadius: tokens.radius.md,
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: pressed
                    ? pressOver(theme, colors.card, colors.onCard)
                    : colors.card,
                }}
              >
                <Side
                  name={match.home}
                  score={match.homeScore}
                  isWinner={match.winner === 'home'}
                />
                <View
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  style={{ height: 1, backgroundColor: colors.border }}
                />
                <Side
                  name={match.away}
                  score={match.awayScore}
                  isWinner={match.winner === 'away'}
                />
              </View>
            );

            if (!onMatchPress) {
              return (
                <View key={match.id} accessible accessibilityLabel={name}>
                  {body(false)}
                </View>
              );
            }
            return (
              <Pressable
                key={match.id}
                accessibilityRole="button"
                accessibilityLabel={name}
                onPress={() => onMatchPress(match, ri, mi)}
              >
                {({ pressed }) => body(pressed)}
              </Pressable>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}
