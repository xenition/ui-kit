import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { FixtureRowProps, FixtureStatus } from './FixtureRow';

/** Drop-in for {@link FixtureRowProps} — same props, the V4 "broadcast" design. */
export type FixtureRowV4Props = FixtureRowProps;

const STATUS_META: Record<
  FixtureStatus,
  { label: string; glyph: string; live: boolean; slot: keyof SemanticColors }
> = {
  scheduled: { label: 'Upcoming', glyph: '🕑', live: false, slot: 'primary' },
  live: { label: 'LIVE', glyph: '●', live: true, slot: 'danger' },
  final: { label: 'FT', glyph: '✓', live: false, slot: 'muted' },
  postponed: { label: 'PP', glyph: '⚠', live: false, slot: 'warn' },
};

/**
 * FixtureRow — **V4** "broadcast" design. The matchday take on a fixture line:
 * a clean, elevated row with teams flanking a bold center scoreline / kickoff,
 * and a soft-tint status pill (a pulsing `danger` dot reinforces "LIVE" — never
 * color alone). One accent: `primary`. Same props/behavior as
 * {@link FixtureRowProps} (drop-in); token-only colors via `useXenitionTheme()`.
 * Tappable via `onPress`.
 */
export function FixtureRowV4({
  home,
  away,
  homeCrest,
  awayCrest,
  homeScore,
  awayScore,
  kickoffLabel,
  minute,
  meta,
  status = 'scheduled',
  highlighted = false,
  onPress,
  style,
}: FixtureRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sm = STATUS_META[status] ?? STATUS_META.scheduled;
  const hasScore = homeScore !== undefined && awayScore !== undefined;

  const center =
    status === 'scheduled'
      ? kickoffLabel ?? 'vs'
      : hasScore
        ? `${homeScore} – ${awayScore}`
        : sm.label;

  const statusRight =
    status === 'live' && minute ? minute : status === 'scheduled' && meta ? meta : sm.label;

  const pillBg = withAlpha(colors[sm.slot], 0.12);
  const pillFg = colors[sm.slot];

  const teamText = (nameStr: string, crest: string | undefined, align: 'left' | 'right') => (
    <View
      style={{
        flex: 1,
        flexDirection: align === 'right' ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
      }}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
        {crest ?? '🛡'}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          flex: 1,
          textAlign: align,
          color: colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '600',
        }}
      >
        {nameStr}
      </Text>
    </View>
  );

  const container: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: highlighted ? colors.primary : colors.border,
    backgroundColor: highlighted ? tokens.ramps.primary[50] : colors.card,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  const centerBlock = (
    <View style={{ alignItems: 'center', minWidth: 72, gap: 4 }}>
      <Text
        style={{
          color: status === 'scheduled' ? colors.muted : colors.onSurface,
          fontSize: tokens.typography.scale.xl,
          fontWeight: '800',
        }}
      >
        {center}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: 2,
          borderRadius: tokens.radius.full,
          backgroundColor: pillBg,
        }}
      >
        {sm.live ? (
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger }} />
        ) : (
          <Text allowFontScaling={false} style={{ color: pillFg, fontSize: tokens.typography.scale.xs }}>
            {sm.glyph}
          </Text>
        )}
        <Text style={{ color: pillFg, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
          {statusRight}
        </Text>
      </View>
    </View>
  );

  const body = (
    <View style={[container, style]}>
      {teamText(home, homeCrest, 'right')}
      {centerBlock}
      {teamText(away, awayCrest, 'left')}
    </View>
  );

  const a11y =
    `${home} versus ${away}, ${sm.label}` +
    (hasScore ? `, ${homeScore} to ${awayScore}` : status === 'scheduled' && kickoffLabel ? `, ${kickoffLabel}` : '');

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {body}
      </Pressable>
    );
  }
  return (
    <View accessible accessibilityLabel={a11y}>
      {body}
    </View>
  );
}
