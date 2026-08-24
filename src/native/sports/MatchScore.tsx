import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

/** One side of a fixture. `score` is omitted for upcoming matches. */
export interface MatchScoreTeam {
  /** Team display name. */
  name: string;
  /** Short code shown on narrow layouts (e.g. `ARS`). Falls back to `name`. */
  short?: string;
  /** Crest/logo glyph or emoji (the kit ships no image fetch). */
  crest?: string;
  /** Goals / points; omit for an upcoming match. */
  score?: number;
}

/** Lifecycle of the fixture — drives the status chip (never color alone). */
export type MatchScoreStatus = 'live' | 'final' | 'upcoming' | 'halftime' | 'postponed';

export interface MatchScoreProps {
  /** Home side. */
  home: MatchScoreTeam;
  /** Away side. */
  away: MatchScoreTeam;
  /** Match lifecycle. */
  status: MatchScoreStatus;
  /** Live clock label (e.g. `67'`) — shown when `status === 'live'`. */
  minute?: string;
  /** Kickoff label for upcoming fixtures (e.g. `Sat 15:00`). */
  kickoffLabel?: string;
  /** Competition / round caption above the teams. */
  competition?: string;
  /** Emphasise the layout with a larger score (feature/hero variant). */
  variant?: 'row' | 'feature';
  /** Show a skeleton placeholder instead of data. */
  loading?: boolean;
  /** Fires when the card is tapped. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STATUS_META: Record<
  MatchScoreStatus,
  { label: string; glyph: string; live: boolean }
> = {
  live: { label: 'LIVE', glyph: '●', live: true },
  halftime: { label: 'HT', glyph: '●', live: true },
  final: { label: 'FT', glyph: '✓', live: false },
  upcoming: { label: 'Upcoming', glyph: '🕑', live: false },
  postponed: { label: 'Postponed', glyph: '⚠', live: false },
};

/**
 * A single fixture's scoreline — the native anchor of the sports module.
 * Renders both teams, their scores, and a status chip that distinguishes
 * live / final / upcoming by **text + glyph**, not color alone (a `danger`
 * dot merely reinforces the "LIVE" label). Presentational only: shaped data
 * plus an optional `onPress`; nothing fetches. `loading` swaps in a token
 * skeleton. All colors resolve from the compiled theme — no literals.
 */
export function MatchScore({
  home,
  away,
  status,
  minute,
  kickoffLabel,
  competition,
  variant = 'row',
  loading = false,
  onPress,
  style,
}: MatchScoreProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status] ?? STATUS_META.upcoming;
  const feature = variant === 'feature';
  const scoreSize = feature ? tokens.typography.scale['3xl'] : tokens.typography.scale.xl;

  const container: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
  };

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading match"
        accessibilityState={{ busy: true }}
        style={[container, style]}
      >
        {[0, 1].map((i) => (
          <View
            key={i}
            style={{
              height: tokens.typography.scale.xl,
              borderRadius: tokens.radius.sm,
              backgroundColor: tokens.ramps.neutral[200],
            }}
          />
        ))}
      </View>
    );
  }

  const statusRight =
    status === 'live' && minute
      ? minute
      : status === 'upcoming' && kickoffLabel
        ? kickoffLabel
        : meta.label;

  const a11y =
    `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
    (status === 'live' && minute ? `, ${minute}` : '');

  const renderSide = (team: MatchScoreTeam, isWinner: boolean): React.ReactElement => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1 }}>
      <Text style={{ fontSize: scoreSize * 0.7 }} allowFontScaling={false}>
        {team.crest ?? '🛡'}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          flex: 1,
          color: colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: isWinner ? '700' : '500',
        }}
      >
        {team.name}
      </Text>
      <Text
        style={{
          color: team.score === undefined ? colors.muted : colors.onSurface,
          fontSize: scoreSize,
          fontWeight: '700',
          minWidth: scoreSize,
          textAlign: 'right',
        }}
      >
        {team.score === undefined ? '–' : team.score}
      </Text>
    </View>
  );

  const homeWins = home.score !== undefined && away.score !== undefined && home.score > away.score;
  const awayWins = home.score !== undefined && away.score !== undefined && away.score > home.score;

  const body = (
    <View style={[container, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {competition ? (
          <Text
            numberOfLines={1}
            style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}
          >
            {competition}
          </Text>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {meta.live ? (
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.danger,
              }}
            />
          ) : (
            <Text
              allowFontScaling={false}
              style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}
            >
              {meta.glyph}
            </Text>
          )}
          <Text
            style={{
              color: meta.live ? colors.danger : colors.muted,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '700',
            }}
          >
            {statusRight}
          </Text>
        </View>
      </View>
      {renderSide(home, homeWins)}
      {renderSide(away, awayWins)}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {body}
      </Pressable>
    );
  }

  return (
    <View accessible accessibilityLabel={a11y}>
      {body}
    </View>
  );
}
