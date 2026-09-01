import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { MatchTimelineProps, MatchEvent, MatchEventKind } from './MatchTimeline';

/** Drop-in for {@link MatchTimelineProps} — same props, the V4 "broadcast" design. */
export type MatchTimelineV4Props = MatchTimelineProps;

/** Glyph + accessible label + semantic slot per kind (color reinforces the glyph, never alone). */
const EVENT_META: Record<
  MatchEventKind,
  { glyph: string; label: string; slot: keyof SemanticColors }
> = {
  goal: { glyph: '⚽', label: 'Goal', slot: 'primary' },
  'own-goal': { glyph: '🥅', label: 'Own goal', slot: 'warn' },
  penalty: { glyph: '🅿', label: 'Penalty', slot: 'primary' },
  yellow: { glyph: '🟨', label: 'Yellow card', slot: 'warn' },
  red: { glyph: '🟥', label: 'Red card', slot: 'danger' },
  sub: { glyph: '🔁', label: 'Substitution', slot: 'success' },
  var: { glyph: '📺', label: 'VAR', slot: 'muted' },
};

/**
 * MatchTimeline — **V4** "broadcast" design. The matchday feed: an elevated card
 * with a center rail, each event hung on the home (left) or away (right) side
 * and anchored by a round node carrying the kind glyph (goal ⚽ / card 🟨 / sub
 * 🔁) tinted from its semantic token, plus a bold minute chip on the rail. Kind
 * is always legible from glyph + shape, not color alone. Same props/behavior as
 * {@link MatchTimelineProps}; token-only colors via `useXenitionTheme()`.
 */
export function MatchTimelineV4({
  homeLabel = 'Home',
  awayLabel = 'Away',
  events,
  emptyLabel = 'No events yet',
  style,
}: MatchTimelineV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  const header = (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text numberOfLines={1} style={{ flex: 1, color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
        {homeLabel}
      </Text>
      <Text numberOfLines={1} style={{ flex: 1, textAlign: 'right', color: colors.accent, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
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
    const home = e.side === 'home';
    return (
      <View style={{ flex: 1, alignItems: home ? 'flex-end' : 'flex-start' }}>
        <View
          style={{
            flexDirection: home ? 'row' : 'row-reverse',
            alignItems: 'center',
            gap: tokens.spacing.xs,
          }}
        >
          <View style={{ flexShrink: 1, alignItems: home ? 'flex-end' : 'flex-start' }}>
            <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {e.label}
            </Text>
            {e.detail ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {e.detail}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: withAlpha(colors[meta.slot], 0.12),
            }}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
              {meta.glyph}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View accessibilityRole="list" style={[container, style]}>
      {header}
      <View style={{ gap: tokens.spacing.sm, position: 'relative' }}>
        {/* Center rail — a token hairline behind the minute chips. */}
        <View
          pointerEvents="none"
          style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, marginLeft: -0.5, backgroundColor: colors.border }}
        />
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
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                  }}
                >
                  <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
                    {e.minute}
                  </Text>
                </View>
              </View>
              {cell(e, e.side === 'away')}
            </View>
          );
        })}
      </View>
    </View>
  );
}

export type { MatchEvent, MatchEventKind };
