import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

/** Fixture lifecycle. */
export type FixtureStatus = 'scheduled' | 'live' | 'final' | 'postponed';

export interface FixtureRowProps {
  /** Home team name. */
  home: string;
  /** Away team name. */
  away: string;
  /** Home crest glyph/emoji. */
  homeCrest?: string;
  /** Away crest glyph/emoji. */
  awayCrest?: string;
  /** Home score (scheduled → omit). */
  homeScore?: number;
  /** Away score (scheduled → omit). */
  awayScore?: number;
  /** Kickoff / date label for scheduled fixtures (e.g. `Sat 15:00`). */
  kickoffLabel?: string;
  /** Live clock label (e.g. `73'`). */
  minute?: string;
  /** Competition / venue caption. */
  meta?: string;
  /** Lifecycle. Default `scheduled`. */
  status?: FixtureStatus;
  /** Highlight (e.g. favourite team involved). */
  highlighted?: boolean;
  /** Fires on tap. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STATUS_META: Record<FixtureStatus, { label: string; glyph: string; live: boolean }> = {
  scheduled: { label: 'vs', glyph: '🕑', live: false },
  live: { label: 'LIVE', glyph: '●', live: true },
  final: { label: 'FT', glyph: '✓', live: false },
  postponed: { label: 'PP', glyph: '⚠', live: false },
};

/**
 * A compact one-line fixture — home vs away with a leading center column that
 * shows either the kickoff time, the live scoreline, or the final result. The
 * status is conveyed by text + glyph (a `danger` dot only reinforces "LIVE").
 * Built for tight lists (schedules, results). Tappable via `onPress`.
 * Token-only colors.
 */
export function FixtureRow({
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
}: FixtureRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sm = STATUS_META[status] ?? STATUS_META.scheduled;
  const hasScore = homeScore !== undefined && awayScore !== undefined;

  const center =
    status === 'scheduled'
      ? kickoffLabel ?? 'vs'
      : hasScore
        ? `${homeScore} – ${awayScore}`
        : sm.label;

  const teamText = (nameStr: string, crest: string | undefined, align: 'left' | 'right') => (
    <View
      style={{
        flex: 1,
        flexDirection: align === 'right' ? 'row-reverse' : 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
      }}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
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
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: highlighted ? colors.primary : colors.border,
    backgroundColor: highlighted ? tokens.ramps.primary[50] : colors.surface,
  };

  const centerBlock = (
    <View style={{ alignItems: 'center', minWidth: 64 }}>
      <Text
        style={{
          color: status === 'scheduled' ? colors.muted : colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: '700',
        }}
      >
        {center}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
        {sm.live ? (
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger }} />
        ) : null}
        <Text
          style={{
            color: sm.live ? colors.danger : colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '600',
          }}
        >
          {status === 'live' && minute ? minute : status === 'scheduled' ? (meta ?? '') : sm.label}
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
