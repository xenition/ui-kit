import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { broadcastGradient, broadcastInk, broadcastInkSoft, broadcastTile } from './internal/broadcast';
import type { MatchScoreProps, MatchScoreTeam, MatchScoreStatus } from './MatchScore';

/** Drop-in for {@link MatchScoreProps} — same props, the V4 "broadcast" design. */
export type MatchScoreV4Props = MatchScoreProps;

const STATUS_META: Record<
  MatchScoreStatus,
  { label: string; glyph: string; live: boolean; slot: keyof SemanticColors }
> = {
  live: { label: 'LIVE', glyph: '●', live: true, slot: 'danger' },
  halftime: { label: 'HT', glyph: '●', live: true, slot: 'danger' },
  final: { label: 'FT', glyph: '✓', live: false, slot: 'muted' },
  upcoming: { label: 'Upcoming', glyph: '🕑', live: false, slot: 'primary' },
  postponed: { label: 'Postponed', glyph: '⚠', live: false, slot: 'warn' },
};

/**
 * MatchScore — **V4** "broadcast" design. The matchday take on a scoreline: an
 * elevated card with a soft-tint status pill (a pulsing danger dot reinforces
 * "LIVE" — never color alone) and bold score numerals; the `feature` variant
 * becomes a full brand-gradient hero with near-white ink. Same props/behavior as
 * {@link MatchScoreProps}; token-only colors via `useXenitionTheme()`. `loading`
 * swaps in a token skeleton.
 */
export function MatchScoreV4({
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
}: MatchScoreV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const meta = STATUS_META[status] ?? STATUS_META.upcoming;
  const feature = variant === 'feature';
  const scoreSize = feature ? tokens.typography.scale['3xl'] : tokens.typography.scale['2xl'];

  const container: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading match" accessibilityState={{ busy: true }} style={[container, style]}>
        {[0, 1].map((i) => (
          <View key={i} style={{ height: tokens.typography.scale.xl, borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
        ))}
      </View>
    );
  }

  const statusRight =
    status === 'live' && minute ? minute : status === 'upcoming' && kickoffLabel ? kickoffLabel : meta.label;

  const a11y =
    `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
    (status === 'live' && minute ? `, ${minute}` : '');

  const homeWins = home.score !== undefined && away.score !== undefined && home.score > away.score;
  const awayWins = home.score !== undefined && away.score !== undefined && away.score > home.score;

  // Ink resolves to near-white on the gradient hero, or the theme colors on the row.
  const ink = feature ? broadcastInk(r) : colors.onSurface;
  const inkSoft = feature ? broadcastInkSoft(r) : colors.muted;
  const pillBg = feature ? broadcastTile(r) : withAlpha(colors[meta.slot], 0.12);
  const pillFg = feature ? broadcastInk(r) : colors[meta.slot];
  const dotColor = feature ? broadcastInk(r) : colors.danger;

  const renderSide = (team: MatchScoreTeam, isWinner: boolean): React.ReactElement => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1 }}>
      <Text style={{ fontSize: scoreSize * 0.6 }} allowFontScaling={false}>
        {team.crest ?? '🛡'}
      </Text>
      <Text numberOfLines={1} style={{ flex: 1, color: ink, fontSize: tokens.typography.scale.base, fontWeight: isWinner ? '800' : '500' }}>
        {team.name}
      </Text>
      <Text style={{ color: team.score === undefined ? inkSoft : ink, fontSize: scoreSize, fontWeight: '800', minWidth: scoreSize, textAlign: 'right' }}>
        {team.score === undefined ? '–' : team.score}
      </Text>
    </View>
  );

  const inner = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {competition ? (
          <Text numberOfLines={1} style={{ flex: 1, color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {competition}
          </Text>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
            borderRadius: tokens.radius.full,
            backgroundColor: pillBg,
          }}
        >
          {meta.live ? (
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: dotColor }} />
          ) : (
            <Text allowFontScaling={false} style={{ color: pillFg, fontSize: tokens.typography.scale.xs }}>
              {meta.glyph}
            </Text>
          )}
          <Text style={{ color: pillFg, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>{statusRight}</Text>
        </View>
      </View>
      {renderSide(home, homeWins)}
      {renderSide(away, awayWins)}
    </>
  );

  const body = feature ? (
    <GradientSurface colors={broadcastGradient(r)} style={[container, { backgroundColor: undefined, borderWidth: 0, overflow: 'hidden' }, style]}>
      {inner}
    </GradientSurface>
  ) : (
    <View style={[container, style]}>{inner}</View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}>
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
