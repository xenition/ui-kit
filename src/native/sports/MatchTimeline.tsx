import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

/** Kind of match event — drives the glyph + accessible prefix. */
export type MatchEventKind = 'goal' | 'own-goal' | 'penalty' | 'yellow' | 'red' | 'sub' | 'var';

/** A single timeline event, attributed to a side. */
export interface MatchEvent {
  /** Stable key. */
  id: string;
  /** Clock label (e.g. `23'`, `90+4'`). */
  minute: string;
  /** Event kind. */
  kind: MatchEventKind;
  /** Which team the event belongs to. */
  side: 'home' | 'away';
  /** Primary label (e.g. scorer). */
  label: string;
  /** Secondary detail (e.g. assist, sub off). */
  detail?: string;
}

export interface MatchTimelineProps {
  /** Home team name (left rail). */
  homeLabel?: string;
  /** Away team name (right rail). */
  awayLabel?: string;
  /** Events, chronological (earliest first recommended). */
  events: MatchEvent[];
  /** Empty-state label. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const EVENT_META: Record<MatchEventKind, { glyph: string; label: string }> = {
  goal: { glyph: '⚽', label: 'Goal' },
  'own-goal': { glyph: '🥅', label: 'Own goal' },
  penalty: { glyph: '🅿', label: 'Penalty' },
  yellow: { glyph: '🟨', label: 'Yellow card' },
  red: { glyph: '🟥', label: 'Red card' },
  sub: { glyph: '🔁', label: 'Substitution' },
  var: { glyph: '📺', label: 'VAR' },
};

/**
 * A match event timeline — a vertical spine with a minute marker per event and
 * the event pushed to the home (left) or away (right) side. Each event carries
 * a glyph and an accessible kind prefix, so goals, cards, and subs are legible
 * without relying on color. Empty state built in. Presentational; pass shaped
 * `events`. Token-only colors; the spine is a plain `View`.
 */
export function MatchTimeline({
  homeLabel = 'Home',
  awayLabel = 'Away',
  events,
  emptyLabel = 'No events yet',
  style,
}: MatchTimelineProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
  };

  const header = (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text numberOfLines={1} style={{ flex: 1, color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
        {homeLabel}
      </Text>
      <Text numberOfLines={1} style={{ flex: 1, textAlign: 'right', color: colors.accent, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
        {awayLabel}
      </Text>
    </View>
  );

  if (events.length === 0) {
    return (
      <View style={[container, style]}>
        {header}
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center', paddingVertical: tokens.spacing.md }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const cell = (e: MatchEvent, mine: boolean): React.ReactElement => {
    const meta = EVENT_META[e.kind] ?? EVENT_META.goal;
    if (!mine) return <View style={{ flex: 1 }} />;
    return (
      <View
        style={{
          flex: 1,
          alignItems: e.side === 'home' ? 'flex-end' : 'flex-start',
        }}
      >
        <View
          style={{
            flexDirection: e.side === 'home' ? 'row' : 'row-reverse',
            alignItems: 'center',
            gap: tokens.spacing.xs,
          }}
        >
          <View style={{ flexShrink: 1, alignItems: e.side === 'home' ? 'flex-end' : 'flex-start' }}>
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
            >
              {e.label}
            </Text>
            {e.detail ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {e.detail}
              </Text>
            ) : null}
          </View>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
            {meta.glyph}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View accessibilityRole="list" style={[container, style]}>
      {header}
      {events.map((e) => {
        const meta = EVENT_META[e.kind] ?? EVENT_META.goal;
        return (
          <View
            key={e.id}
            accessible
            accessibilityLabel={`${e.minute}, ${meta.label}, ${e.side === 'home' ? homeLabel : awayLabel}: ${e.label}${e.detail ? `, ${e.detail}` : ''}`}
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
          >
            {cell(e, e.side === 'home')}
            <View style={{ alignItems: 'center', minWidth: 44 }}>
              <View
                style={{
                  paddingHorizontal: tokens.spacing.xs,
                  paddingVertical: 1,
                  borderRadius: tokens.radius.full,
                  backgroundColor: tokens.ramps.neutral[100],
                }}
              >
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                  {e.minute}
                </Text>
              </View>
            </View>
            {cell(e, e.side === 'away')}
          </View>
        );
      })}
    </View>
  );
}
