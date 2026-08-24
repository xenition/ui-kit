import * as React from 'react';
import { Image, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Avatar, Card, EmptyState, Icon, useXenitionTheme } from '../primitives';
import type { ScoreEntry } from './types';

export type ScoreBoardVariant = 'ranked' | 'versus';

export interface ScoreBoardProps {
  /** Rows to render. `ranked` sorts by score desc; `versus` keeps order. */
  entries: ScoreEntry[];
  /**
   * - `ranked` — ordered list with position + highlighted leader (default).
   * - `versus` — two-side head-to-head (uses the first two entries).
   */
  variant?: ScoreBoardVariant;
  /** Optional board title / header. */
  title?: string;
  /** Message shown when there are no entries. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

function Crest({ entry, size }: { entry: ScoreEntry; size: number }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  if (entry.avatarUrl) {
    return (
      <Image
        source={{ uri: entry.avatarUrl }}
        accessibilityIgnoresInvertColors
        style={{ width: size, height: size, borderRadius: tokens.radius.sm, backgroundColor: colors.border }}
      />
    );
  }
  return <Avatar name={entry.name} size={size >= 48 ? 'lg' : 'sm'} />;
}

/**
 * A scoreboard — a `ranked` ordered standings list (leader highlighted in
 * weight + a badge, not color alone) or a `versus` head-to-head between the
 * first two entries. Renders an `EmptyState` when there are no entries. Uses
 * guarded indexing for the versus sides. Composes `Card`, `Avatar`. Token-only.
 */
export function ScoreBoard({
  entries,
  variant = 'ranked',
  title,
  emptyLabel = 'No scores yet',
  style,
}: ScoreBoardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (entries.length === 0) {
    return (
      <EmptyState
        icon={<Icon glyph="🏁" size="2xl" color="muted" accessibilityLabel="Scores" />}
        title={emptyLabel}
        style={style}
      />
    );
  }

  const header = title ? (
    <Text
      accessibilityRole="header"
      style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
    >
      {title}
    </Text>
  ) : null;

  if (variant === 'versus') {
    const home = entries[0];
    const away = entries[1];
    const homeWins = home != null && away != null && home.score > away.score;
    const awayWins = home != null && away != null && away.score > home.score;
    return (
      <Card style={[{ gap: tokens.spacing.md }, style]}>
        {header}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <VersusSide entry={home} score={home?.score} winner={homeWins} align="flex-start" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>VS</Text>
          <VersusSide entry={away} score={away?.score} winner={awayWins} align="flex-end" />
        </View>
      </Card>
    );
  }

  const ranked = [...entries].sort((a, b) => b.score - a.score);
  return (
    <Card style={[{ gap: tokens.spacing.xs }, style]}>
      {header}
      {ranked.map((e, i) => {
        const leader = i === 0;
        return (
          <View
            key={e.id}
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}
            accessible
            accessibilityLabel={`Rank ${i + 1}, ${e.name}, ${e.score} points`}
          >
            <Text
              style={{ width: 22, color: leader ? colors.primary : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
            >
              {i + 1}
            </Text>
            <Crest entry={e} size={28} />
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: leader ? '700' : '500' }}
              >
                {e.name}
              </Text>
              {e.detail ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {e.detail}
                </Text>
              ) : null}
            </View>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
              {e.score}
            </Text>
          </View>
        );
      })}
    </Card>
  );
}

function VersusSide({
  entry,
  score,
  winner,
  align,
}: {
  entry?: ScoreEntry;
  score?: number;
  winner: boolean;
  align: 'flex-start' | 'flex-end';
}): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={{ flex: 1, alignItems: 'center', gap: tokens.spacing.xs }}
      accessible
      accessibilityLabel={`${entry?.name ?? 'TBD'}, ${score ?? 0}${winner ? ', leading' : ''}`}
    >
      {entry ? <Crest entry={entry} size={48} /> : <Avatar name="?" size="lg" />}
      <Text
        numberOfLines={1}
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: winner ? '700' : '500',
          textAlign: align === 'flex-start' ? 'left' : 'right',
        }}
      >
        {entry?.name ?? 'TBD'}
      </Text>
      <Text
        style={{ color: winner ? colors.primary : colors.muted, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}
      >
        {score ?? 0}
      </Text>
    </View>
  );
}
