import * as React from 'react';
import { Pressable, ScrollView, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { ScoreTickerProps, TickerMatch, TickerStatus } from './ScoreTicker';

/** Drop-in for {@link ScoreTickerProps} — same props, the V4 "broadcast" design. */
export type ScoreTickerV4Props = ScoreTickerProps;

const STATUS_META: Record<
  TickerStatus,
  { label: string; glyph: string; live: boolean; slot: keyof SemanticColors }
> = {
  live: { label: 'LIVE', glyph: '●', live: true, slot: 'danger' },
  final: { label: 'FT', glyph: '✓', live: false, slot: 'muted' },
  upcoming: { label: 'SOON', glyph: '🕑', live: false, slot: 'primary' },
};

/**
 * ScoreTicker — **V4** "broadcast" design. A horizontally-scrolling strip of
 * mini score cards, each a compact matchup with a soft-tint status pill (a
 * pulsing `danger` dot reinforces "LIVE" — never color alone) and bold
 * numerals; live tiles are subtly emphasised with a `primary` edge. One accent:
 * `primary`. Same props/behavior as {@link ScoreTickerProps} (drop-in) — keeps
 * the horizontal scroll, per-match `onSelect`, loading and empty states.
 * Token-only colors via `useXenitionTheme()`.
 */
export function ScoreTickerV4({
  matches,
  onSelect,
  loadingTiles,
  emptyLabel = 'No matches',
  style,
}: ScoreTickerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const strip = (children: React.ReactNode): React.ReactElement => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      contentContainerStyle={{
        gap: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.xs,
        paddingVertical: tokens.spacing.xs,
      }}
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
          style={{
            width: 144,
            height: 80,
            borderRadius: tokens.radius.lg,
            backgroundColor: withAlpha(colors.onSurface, 0.1),
          }}
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
            borderRadius: tokens.radius.lg,
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
    matches.map((m: TickerMatch) => {
      const status = m.status ?? 'upcoming';
      const sm = STATUS_META[status] ?? STATUS_META.upcoming;
      const hasScore = m.homeScore !== undefined && m.awayScore !== undefined;
      const pillBg = withAlpha(colors[sm.slot], 0.12);
      const pillFg = colors[sm.slot];

      const line = (name: string, score: number | undefined) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {name}
          </Text>
          <Text
            style={{
              color: score === undefined ? colors.muted : colors.onSurface,
              fontSize: tokens.typography.scale.lg,
              fontWeight: '800',
            }}
          >
            {score === undefined ? '–' : score}
          </Text>
        </View>
      );

      const tileStyle: ViewStyle = {
        width: 144,
        borderWidth: 1,
        borderColor: sm.live ? colors.primary : colors.border,
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.card,
        padding: tokens.spacing.md,
        gap: 4,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      };

      const tile = (
        <View style={tileStyle}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 2,
                borderRadius: tokens.radius.full,
                backgroundColor: pillBg,
                alignSelf: 'flex-start',
              }}
            >
              {sm.live ? (
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger }} />
              ) : (
                <Text allowFontScaling={false} style={{ color: pillFg, fontSize: tokens.typography.scale.xs }}>
                  {sm.glyph}
                </Text>
              )}
              <Text style={{ color: pillFg, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>{sm.label}</Text>
            </View>
            {m.clock ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{m.clock}</Text>
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
