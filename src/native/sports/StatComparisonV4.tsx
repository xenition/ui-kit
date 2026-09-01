import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { StatComparisonProps, StatComparisonRow } from './StatComparison';

/** Drop-in for {@link StatComparisonProps} — same props, the V4 "broadcast" design. */
export type StatComparisonV4Props = StatComparisonProps;

/**
 * StatComparison — **V4** "broadcast" design. The matchday take on a head-to-head:
 * an elevated card of center-split bars, one row per metric, home filling left in
 * the `primary` accent and away filling right in the `accent` token. Big value
 * numerals flank each row and the leading side reads bolder in `primary`, so
 * ranking survives without relying on color. Same props/behavior as
 * {@link StatComparisonProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. Empty state built in. 8-pt spacing, one accent.
 */
export function StatComparisonV4({
  homeLabel,
  awayLabel,
  rows,
  homeCrest,
  awayCrest,
  emptyLabel = 'No stats to compare',
  style,
}: StatComparisonV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.md,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  const header = (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1 }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>{homeCrest ?? '🛡'}</Text>
        <Text numberOfLines={1} style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
          {homeLabel}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1, justifyContent: 'flex-end' }}>
        <Text numberOfLines={1} style={{ color: colors.accent, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
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

  const renderRow = (row: StatComparisonRow, i: number): React.ReactElement => {
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
          <Text style={{ color: homeWins ? colors.primary : colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: homeWins ? '800' : '500' }}>
            {fmt(row.home)}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {row.label}
          </Text>
          <Text style={{ color: awayWins ? colors.accent : colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: awayWins ? '800' : '500' }}>
            {fmt(row.away)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: withAlpha(colors.primary, 0.1), overflow: 'hidden', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View style={{ width: `${Math.round(homePct * 100)}%`, borderRadius: 4, backgroundColor: homeWins ? colors.primary : withAlpha(colors.primary, 0.4) }} />
          </View>
          <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: withAlpha(colors.accent, 0.1), overflow: 'hidden', flexDirection: 'row' }}>
            <View style={{ width: `${Math.round(awayPct * 100)}%`, borderRadius: 4, backgroundColor: awayWins ? colors.accent : withAlpha(colors.accent, 0.4) }} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[container, style]}>
      {header}
      {rows.map(renderRow)}
    </View>
  );
}
