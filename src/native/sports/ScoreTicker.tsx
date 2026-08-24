import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

/** Lifecycle of a ticker item. */
export type TickerStatus = 'live' | 'final' | 'upcoming';

/** One match tile in the ticker. */
export interface TickerMatch {
  /** Stable key. */
  id: string;
  /** Home short name / code. */
  home: string;
  /** Away short name / code. */
  away: string;
  /** Home score (upcoming → omit). */
  homeScore?: number;
  /** Away score (upcoming → omit). */
  awayScore?: number;
  /** Lifecycle. Default `upcoming`. */
  status?: TickerStatus;
  /** Clock / kickoff label. */
  clock?: string;
}

export interface ScoreTickerProps {
  /** Match tiles rendered in a horizontal strip. */
  matches: TickerMatch[];
  /** Fires with the tapped match. */
  onSelect?: (match: TickerMatch) => void;
  /** Loading skeleton tile count; when set, matches are ignored. */
  loadingTiles?: number;
  /** Empty-state label. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const STATUS_META: Record<TickerStatus, { label: string; live: boolean }> = {
  live: { label: 'LIVE', live: true },
  final: { label: 'FT', live: false },
  upcoming: { label: 'SOON', live: false },
};

/**
 * A horizontally-scrolling scoreboard strip — compact per-match tiles for a
 * top-of-screen ticker. Each tile shows both codes, the scoreline, and a
 * status marked by text (plus a `danger` dot for live, never color alone).
 * Handles empty and loading states. Tappable via `onSelect`. Token-only
 * colors.
 */
export function ScoreTicker({
  matches,
  onSelect,
  loadingTiles,
  emptyLabel = 'No matches',
  style,
}: ScoreTickerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const strip = (children: React.ReactNode): React.ReactElement => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={{ gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: tokens.spacing.xs }}
    >
      {children}
    </ScrollView>
  );

  if (loadingTiles && loadingTiles > 0) {
    return strip(
      Array.from({ length: loadingTiles }).map((_, i) => (
        <View
          key={i}
          accessibilityState={{ busy: true }}
          style={{ width: 128, height: 64, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }}
        />
      ))
    );
  }

  if (matches.length === 0) {
    return (
      <View
        style={[
          {
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
          },
          style,
        ]}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  return strip(
    matches.map((m) => {
      const status = m.status ?? 'upcoming';
      const sm = STATUS_META[status] ?? STATUS_META.upcoming;
      const hasScore = m.homeScore !== undefined && m.awayScore !== undefined;
      const line = (name: string, score: number | undefined) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {name}
          </Text>
          <Text style={{ color: score === undefined ? colors.muted : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {score === undefined ? '–' : score}
          </Text>
        </View>
      );
      const tile = (
        <View
          style={{
            width: 128,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.surface,
            padding: tokens.spacing.sm,
            gap: 2,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            {sm.live ? <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger }} /> : null}
            <Text style={{ flex: 1, color: sm.live ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              {sm.label}
            </Text>
            {m.clock ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{m.clock}</Text>
            ) : null}
          </View>
          {line(m.home, m.homeScore)}
          {line(m.away, m.awayScore)}
        </View>
      );
      const a11y = `${m.home} versus ${m.away}, ${sm.label}${hasScore ? `, ${m.homeScore} ${m.awayScore}` : ''}`;
      return onSelect ? (
        <Pressable
          key={m.id}
          accessibilityRole="button"
          accessibilityLabel={a11y}
          onPress={() => onSelect(m)}
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
        >
          {tile}
        </Pressable>
      ) : (
        <View key={m.id} accessible accessibilityLabel={a11y}>
          {tile}
        </View>
      );
    })
  );
}
