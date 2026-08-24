import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { Avatar, EmptyState, Icon, useXenitionTheme } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import { formatCount, withAlpha } from './types';
import type { LeaderboardPodiumProps } from './LeaderboardPodium';
import type { SemanticColors } from '../theme';

/** Drop-in alternate of {@link LeaderboardPodiumProps} — identical prop contract. */
export type LeaderboardPodiumV2Props = LeaderboardPodiumProps;

// Render order (2nd · 1st · 3rd) with per-place pedestal heights + medal tiers.
const PLACES: { index: number; height: number; medal: string; color: keyof SemanticColors }[] = [
  { index: 1, height: 84, medal: '🥈', color: 'muted' },
  { index: 0, height: 120, medal: '🥇', color: 'warn' },
  { index: 2, height: 60, medal: '🥉', color: 'accent' },
];

/**
 * LeaderboardPodium — design variant **V2**: a **classic 3-column podium with
 * medal tiers**. A titled, elevated card frames three pedestals (2nd · 1st ·
 * 3rd) whose heights and tinted risers escalate to the champion, each carrying a
 * medal, ringed avatar, name, a rank chip, and score. Where V1 is a bare compact
 * podium, V2 is a taller, ceremonial stand with a crown on first and stronger
 * tier tints. Uses **guarded indexing** so a 1–2 entry list omits missing places
 * and renders an `EmptyState` when empty. Same props as
 * {@link LeaderboardPodiumProps}. Token-only.
 */
export function LeaderboardPodiumV2({
  entries,
  emptyLabel = 'No rankings yet',
  onPress,
  style,
}: LeaderboardPodiumV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });
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
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
            ...shadow('md', tokens),
          },
          style,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph="🏆" size="lg" color="warn" accessibilityLabel="Top players" />
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>Top Players</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: tokens.spacing.sm }}>
          {PLACES.map((place) => {
            const entry = entries[place.index];
            if (!entry) return <View key={place.index} style={{ flex: 1 }} />;
            const rank = place.index + 1;
            const accent = palette[place.color] ?? colors.muted;
            const champion = place.index === 0;

            const column = (
              <View style={{ flex: 1, alignItems: 'center', gap: tokens.spacing.xs }}>
                {champion ? (
                  <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
                    👑
                  </Text>
                ) : null}
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
                  {place.medal}
                </Text>
                <Avatar src={entry.avatarUrl} name={entry.name} size={champion ? 'lg' : 'md'} ring />
                <Text
                  numberOfLines={1}
                  style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', maxWidth: '100%' }}
                >
                  {entry.name}
                </Text>
                <View
                  style={{
                    width: '100%',
                    height: place.height,
                    borderTopLeftRadius: tokens.radius.md,
                    borderTopRightRadius: tokens.radius.md,
                    backgroundColor: withAlpha(accent, 0.24),
                    borderTopWidth: 3,
                    borderColor: accent,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: tokens.spacing.sm,
                    gap: 2,
                  }}
                >
                  <View
                    style={{
                      paddingHorizontal: tokens.spacing.sm,
                      paddingVertical: 1,
                      borderRadius: tokens.radius.full,
                      backgroundColor: withAlpha(accent, 0.28),
                    }}
                  >
                    <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>#{rank}</Text>
                  </View>
                  <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                    {formatCount(entry.score)}
                  </Text>
                </View>
              </View>
            );

            if (!onPress) {
              return (
                <View key={entry.id} style={{ flex: 1 }} accessible accessibilityLabel={`Rank ${rank}, ${entry.name}, ${entry.score} points`}>
                  {column}
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
                {column}
              </Pressable>
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
}
