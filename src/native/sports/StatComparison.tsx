import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

/** One head-to-head stat row. */
export interface StatComparisonRow {
  /** Metric label (e.g. `Possession`). */
  label: string;
  /** Home value. */
  home: number;
  /** Away value. */
  away: number;
  /** Suffix appended to displayed values (e.g. `%`). */
  suffix?: string;
  /** `higher` wins (default) or `lower` wins (e.g. fouls) — drives emphasis. */
  better?: 'higher' | 'lower';
}

export interface StatComparisonProps {
  /** Home team name (left). */
  homeLabel: string;
  /** Away team name (right). */
  awayLabel: string;
  /** Comparison rows. */
  rows: StatComparisonRow[];
  /** Home crest glyph. */
  homeCrest?: string;
  /** Away crest glyph. */
  awayCrest?: string;
  /** Empty-state label. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A two-team stat comparison — mirrored horizontal bars sharing a center line,
 * one row per metric (possession, shots, …). Each bar is proportional to its
 * share of the pair total; the winning side is emphasised by weight (leading
 * side reads bolder) so ranking survives without relying on color. Home uses
 * the `primary` slot, away the `accent` slot. Empty state built in.
 * Token-only colors; bars are plain `View`s (no chart dependency).
 */
export function StatComparison({
  homeLabel,
  awayLabel,
  rows,
  homeCrest,
  awayCrest,
  emptyLabel = 'No stats to compare',
  style,
}: StatComparisonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.md,
  };

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1 }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>{homeCrest ?? '🛡'}</Text>
        <Text numberOfLines={1} style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {homeLabel}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1, justifyContent: 'flex-end' }}>
        <Text numberOfLines={1} style={{ color: colors.accent, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {awayLabel}
        </Text>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>{awayCrest ?? '🛡'}</Text>
      </View>
    </View>
  );

  if (rows.length === 0) {
    return (
      <View style={[container, style]}>
        {header}
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center', paddingVertical: tokens.spacing.md }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  return (
    <View style={[container, style]}>
      {header}
      {rows.map((row, i) => {
        const total = row.home + row.away;
        const homePct = total > 0 ? row.home / total : 0.5;
        const awayPct = total > 0 ? row.away / total : 0.5;
        const better = row.better ?? 'higher';
        const homeWins = better === 'higher' ? row.home > row.away : row.home < row.away;
        const awayWins = better === 'higher' ? row.away > row.home : row.away < row.home;
        const fmt = (v: number) => `${v}${row.suffix ?? ''}`;
        return (
          <View
            key={`${row.label}-${i}`}
            accessible
            accessibilityLabel={`${row.label}: ${homeLabel} ${fmt(row.home)}, ${awayLabel} ${fmt(row.away)}`}
            style={{ gap: tokens.spacing.xs }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: homeWins ? '700' : '500' }}>
                {fmt(row.home)}
              </Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {row.label}
              </Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: awayWins ? '700' : '500' }}>
                {fmt(row.away)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: tokens.ramps.neutral[100], overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={{ width: `${Math.round(homePct * 100)}%`, backgroundColor: colors.primary }} />
              </View>
              <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: tokens.ramps.neutral[100], overflow: 'hidden', flexDirection: 'row' }}>
                <View style={{ width: `${Math.round(awayPct * 100)}%`, backgroundColor: colors.accent }} />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
