import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { Avatar, EmptyState, Icon, useXenitionTheme } from '../primitives';
import { useEnter } from '../primitives/internal/motion';
import { formatCount, withAlpha } from './types';
import type { LeaderboardPodiumProps } from './LeaderboardPodium';
import type { SemanticColors } from '../theme';

/** Drop-in alternate of {@link LeaderboardPodiumProps} — identical prop contract. */
export type LeaderboardPodiumV3Props = LeaderboardPodiumProps;

// Natural order (1 · 2 · 3) with per-rank medal + accent tier.
const RANKS: { index: number; medal: string; color: keyof SemanticColors }[] = [
  { index: 0, medal: '🥇', color: 'warn' },
  { index: 1, medal: '🥈', color: 'muted' },
  { index: 2, medal: '🥉', color: 'accent' },
];

/**
 * LeaderboardPodium — design variant **V3**: a **horizontal top-3 strip**. The
 * leaders read left→right (1 · 2 · 3) as equal-width tiles — medal, ringed
 * avatar, name, and score stacked in each — instead of V1/V2's stepped
 * pedestals. Uses **guarded indexing** so a 1–2 entry list renders only the
 * present tiles and an `EmptyState` when there are none. Same props as
 * {@link LeaderboardPodiumProps}. Token-only, minimal (hairline dividers).
 */
export function LeaderboardPodiumV3({
  entries,
  emptyLabel = 'No rankings yet',
  onPress,
  style,
}: LeaderboardPodiumV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 6 });
  const palette = colors as unknown as Record<string, string>;

  if (entries.length === 0) {
    return (
      <EmptyState
        icon={<Icon glyph="🏆" size="2xl" color="muted" accessibilityLabel="Leaderboard" />}
        title={emptyLabel}
        style={style}
      />
    );
  }

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'stretch',
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
          },
          style,
        ]}
      >
        {RANKS.map((r, position) => {
          const entry = entries[r.index];
          if (!entry) return <View key={r.index} style={{ flex: 1 }} />;
          const rank = r.index + 1;
          const accent = palette[r.color] ?? colors.muted;

          const tile = (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.sm,
                borderLeftWidth: position === 0 ? 0 : 1,
                borderColor: colors.border,
                backgroundColor: withAlpha(accent, 0.06),
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
                  {r.medal}
                </Text>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>#{rank}</Text>
              </View>
              <Avatar src={entry.avatarUrl} name={entry.name} size="md" ring />
              <Text
                numberOfLines={1}
                style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', maxWidth: '100%' }}
              >
                {entry.name}
              </Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                {formatCount(entry.score)}
              </Text>
            </View>
          );

          if (!onPress) {
            return (
              <View key={entry.id} style={{ flex: 1 }} accessible accessibilityLabel={`Rank ${rank}, ${entry.name}, ${entry.score} points`}>
                {tile}
              </View>
            );
          }
          return (
            <Pressable
              key={entry.id}
              style={{ flex: 1 }}
              accessibilityRole="button"
              accessibilityLabel={`Rank ${rank}, ${entry.name}, ${entry.score} points`}
              onPress={() => onPress(entry, rank)}
            >
              {tile}
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
}
