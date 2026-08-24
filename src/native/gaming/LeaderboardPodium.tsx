import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Avatar, Card, EmptyState, Icon, useXenitionTheme } from '../primitives';
import { formatCount, withAlpha, type LeaderboardEntry } from './types';

export interface LeaderboardPodiumProps {
  /** Standings; the top 3 (by array order) form the podium. */
  entries: LeaderboardEntry[];
  /** Message shown when there are no entries. */
  emptyLabel?: string;
  /** Called when a podium place is tapped. */
  onPress?: (entry: LeaderboardEntry, rank: number) => void;
  style?: StyleProp<ViewStyle>;
}

// Podium render order (2nd, 1st, 3rd) with per-place heights + accent slots.
const PLACES: { index: number; height: number; medal: string; color: keyof import('../theme').SemanticColors }[] = [
  { index: 1, height: 56, medal: '🥈', color: 'muted' },
  { index: 0, height: 80, medal: '🥇', color: 'warn' },
  { index: 2, height: 40, medal: '🥉', color: 'accent' },
];

/**
 * A top-3 leaderboard podium — the first three `entries` render as centered
 * columns (2nd · 1st · 3rd) with medals, avatars, names, and scores; the tallest
 * block marks the leader. Uses **guarded indexing** so a 1- or 2-entry list
 * simply omits the missing places, and renders an `EmptyState` when there are
 * none. `onPress(entry, rank)` opens a place. Composes `Card`, `Avatar`, `Icon`.
 * Token-only.
 */
export function LeaderboardPodium({
  entries,
  emptyLabel = 'No rankings yet',
  onPress,
  style,
}: LeaderboardPodiumProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

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
    <Card style={[{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: tokens.spacing.sm }, style]}>
      {PLACES.map((place) => {
        const entry = entries[place.index];
        if (!entry) return <View key={place.index} style={{ flex: 1 }} />;
        const rank = place.index + 1;
        const accent = colors[place.color];

        const column = (
          <View style={{ flex: 1, alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
              {place.medal}
            </Text>
            <Avatar src={entry.avatarUrl} name={entry.name} size={place.index === 0 ? 'lg' : 'md'} ring />
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
                backgroundColor: withAlpha(accent, 0.18),
                borderTopWidth: 2,
                borderColor: accent,
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: tokens.spacing.xs,
              }}
            >
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                #{rank}
              </Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs }}>
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
    </Card>
  );
}
