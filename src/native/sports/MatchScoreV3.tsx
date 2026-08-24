import * as React from 'react';
import { Animated, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, Icon } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import type { MatchScoreProps, MatchScoreStatus, MatchScoreTeam } from './MatchScore';

/** Drop-in replacement for {@link MatchScoreProps} — identical shape. */
export type MatchScoreV3Props = MatchScoreProps;

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
 * MatchScore, design variant 3 — a **compact fixture line**. Everything sits on
 * one row: a leading status block (a `danger` dot + minute when live, otherwise
 * a glyph + short label), the home side right-aligned, a tight `2 - 1` (or
 * `vs`) score in the middle, and the away side left-aligned. Built for dense
 * lists. Same props as `MatchScore`; token-pure, reduced-motion press scale.
 */
export function MatchScoreV3({
  home,
  away,
  status,
  minute,
  kickoffLabel,
  competition,
  loading = false,
  onPress,
  style,
}: MatchScoreV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const meta = STATUS_META[status] ?? STATUS_META.upcoming;

  const container: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    backgroundColor: colors.surface,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: colors.border,
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
            flex: 1,
            height: tokens.typography.scale.base,
            borderRadius: tokens.radius.sm,
            backgroundColor: tokens.ramps.neutral[200],
          }}
        />
      </View>
    );
  }

  const bothScored = home.score !== undefined && away.score !== undefined;
  const scored = bothScored ? `${home.score} - ${away.score}` : 'vs';

  const statusLabel =
    status === 'live' && minute
      ? minute
      : status === 'upcoming' && kickoffLabel
        ? kickoffLabel
        : meta.label;

  const sideName = (t: MatchScoreTeam): string => t.short ?? t.name;

  const a11y =
    `${home.name} ${home.score ?? ''} versus ${away.name} ${away.score ?? ''}, ${meta.label}` +
    (status === 'live' && minute ? `, ${minute}` : '');

  const statusBlock = (
    <View style={{ width: 52, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
      {meta.live ? (
        <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: colors.danger }} />
      ) : (
        <Icon glyph={meta.glyph} size="xs" color="muted" />
      )}
      <Text
        numberOfLines={1}
        style={{
          color: meta.live ? colors.dangerText : colors.muted,
          fontSize: tokens.typography.scale.xs,
          fontWeight: '700',
        }}
      >
        {statusLabel}
      </Text>
    </View>
  );

  const body = (
    <View style={[container, style]}>
      {statusBlock}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', textAlign: 'right' }}
        >
          {sideName(home)}
        </Text>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
          {home.crest ?? '🛡'}
        </Text>
      </View>
      <Text
        style={{
          color: bothScored ? colors.onSurface : colors.muted,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '800',
          textAlign: 'center',
          minWidth: 44,
        }}
      >
        {scored}
      </Text>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: tokens.spacing.xs }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
          {away.crest ?? '🛡'}
        </Text>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {sideName(away)}
        </Text>
      </View>
      {competition ? (
        <Text
          numberOfLines={1}
          style={{ maxWidth: 72, color: colors.muted, fontSize: tokens.typography.scale.xs }}
        >
          {competition}
        </Text>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: press.scale }] }}>
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
    <View accessible accessibilityLabel={a11y}>
      {body}
    </View>
  );
}
