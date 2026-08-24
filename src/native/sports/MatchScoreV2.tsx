import * as React from 'react';
import { Animated, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, Icon } from '../primitives';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { MatchScoreProps, MatchScoreStatus, MatchScoreTeam } from './MatchScore';

/** Drop-in replacement for {@link MatchScoreProps} — identical shape. */
export type MatchScoreV2Props = MatchScoreProps;

interface Meta {
  label: string;
  glyph: string;
  live: boolean;
}

const STATUS_META: Record<MatchScoreStatus, Meta> = {
  live: { label: 'LIVE', glyph: '●', live: true },
  halftime: { label: 'HT', glyph: '●', live: true },
  final: { label: 'FT', glyph: '✓', live: false },
  upcoming: { label: 'Upcoming', glyph: '🕑', live: false },
  postponed: { label: 'Postponed', glyph: '⚠', live: false },
};

/**
 * MatchScore, design variant 2 — a **big scoreboard card**. The two crests sit
 * in flanking columns around an oversized centered scoreline, with the
 * competition caption above and a pill "live band" below. The band carries a
 * `danger` dot for live states and a glyph + label otherwise, so lifecycle is
 * conveyed by text + glyph and never color alone. Same props as `MatchScore`;
 * token-pure (elevation via `shadow`, tints via `withAlpha`), reduced-motion
 * aware (enter + press scale). `loading` swaps in a token skeleton.
 */
export function MatchScoreV2({
  home,
  away,
  status,
  minute,
  kickoffLabel,
  competition,
  loading = false,
  onPress,
  style,
}: MatchScoreV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();
  const meta = STATUS_META[status] ?? STATUS_META.upcoming;

  const container: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
    ...shadow('md', tokens),
  };

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading match"
        accessibilityState={{ busy: true }}
        style={[container, style]}
      >
        <View
          style={{
            height: tokens.typography.scale.sm,
            width: '40%',
            alignSelf: 'center',
            borderRadius: tokens.radius.sm,
            backgroundColor: tokens.ramps.neutral[100],
          }}
        />
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: tokens.typography.scale['3xl'],
                borderRadius: tokens.radius.sm,
                backgroundColor: tokens.ramps.neutral[200],
              }}
            />
          ))}
        </View>
      </View>
    );
  }

  const bothScored = home.score !== undefined && away.score !== undefined;
  const homeWins = bothScored && (home.score ?? 0) > (away.score ?? 0);
  const awayWins = bothScored && (away.score ?? 0) > (home.score ?? 0);

  const rightLabel =
    status === 'live' && minute
      ? minute
      : status === 'upcoming' && kickoffLabel
        ? kickoffLabel
        : meta.label;

  const scoreText = (t: MatchScoreTeam): string => (t.score === undefined ? '–' : String(t.score));

  const bigScore = tokens.typography.scale['3xl'] * 1.4;

  const side = (t: MatchScoreTeam, wins: boolean): React.ReactElement => (
    <View style={{ flex: 1, alignItems: 'center', gap: tokens.spacing.xs }}>
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
        {t.crest ?? '🛡'}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: wins ? '700' : '600',
          textAlign: 'center',
        }}
      >
        {t.short ?? t.name}
      </Text>
    </View>
  );

  const scoreCell = (t: MatchScoreTeam, align: 'right' | 'left'): React.ReactElement => (
    <Text
      style={{
        color: t.score === undefined ? colors.muted : colors.onSurface,
        fontSize: bigScore,
        fontWeight: '800',
        minWidth: tokens.typography.scale['3xl'],
        textAlign: align,
      }}
    >
      {scoreText(t)}
    </Text>
  );

  const band = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        gap: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.sm,
        paddingVertical: tokens.spacing.xs,
        borderRadius: tokens.radius.full,
        backgroundColor: meta.live
          ? withAlpha(colors.danger, 0.12)
          : tokens.ramps.neutral[100],
      }}
    >
      {meta.live ? (
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger }} />
      ) : (
        <Icon glyph={meta.glyph} size="xs" color="muted" />
      )}
      <Text
        style={{
          color: meta.live ? colors.dangerText : colors.muted,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '700',
        }}
      >
        {rightLabel}
      </Text>
    </View>
  );

  const a11y =
    `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
    (status === 'live' && minute ? `, ${minute}` : '');

  const body = (
    <View style={[container, style]}>
      {competition ? (
        <Text
          numberOfLines={1}
          style={{
            alignSelf: 'center',
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '600',
          }}
        >
          {competition}
        </Text>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {side(home, homeWins)}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          {scoreCell(home, 'right')}
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
            -
          </Text>
          {scoreCell(away, 'left')}
        </View>
        {side(away, awayWins)}
      </View>
      {band}
    </View>
  );

  if (onPress) {
    return (
      <Animated.View
        style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={a11y}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {body}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <View accessible accessibilityLabel={a11y}>
        {body}
      </View>
    </Animated.View>
  );
}
