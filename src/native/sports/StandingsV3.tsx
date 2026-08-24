import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { StandingsProps, StandingsForm, StandingsRow } from './Standings';

/** Drop-in replacement for {@link StandingsProps} — identical shape. */
export type StandingsV3Props = StandingsProps;

/**
 * Movement derived from the newest form result (the props carry no prior
 * position). Newest `W` reads as moving up, `L` as moving down, `D`/none as
 * holding — a recent-momentum proxy shown as a delta arrow + label.
 */
function movement(form: StandingsForm[] | undefined): {
  glyph: string;
  slot: 'success' | 'danger' | 'muted';
  label: string;
} {
  const latest = form && form.length > 0 ? form[form.length - 1] : undefined;
  if (latest === 'W') return { glyph: '▲', slot: 'success', label: 'moving up' };
  if (latest === 'L') return { glyph: '▼', slot: 'danger', label: 'moving down' };
  return { glyph: '–', slot: 'muted', label: 'holding' };
}

/**
 * Standings, design variant 3 — a **compact ranked list** (not a grid). Each
 * item leads with a large position number, then crest + team + a Played caption,
 * and trails with the points total and a position-delta arrow derived from the
 * newest form result (up / down / holding), announced in words so it never reads
 * by color alone. Zones show a leading accent stripe + a11y label. Same props as
 * `Standings`; empty + loading built in. Token-pure (`withAlpha`).
 */
export function StandingsV3({
  rows,
  showForm = false,
  zones = [],
  activeId,
  loadingRows,
  onSelectTeam,
  emptyLabel = 'No standings yet',
  style,
}: StandingsV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const zoneFor = (pos: number) => zones.find((z) => pos >= z.from && pos <= z.to);

  const container: ViewStyle = {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  };

  if (loadingRows && loadingRows > 0) {
    return (
      <View accessibilityState={{ busy: true }} accessibilityLabel="Loading standings" style={[container, style]}>
        {Array.from({ length: loadingRows }).map((_, i) => (
          <View
            key={i}
            style={{
              height: tokens.spacing.xl,
              margin: tokens.spacing.sm,
              borderRadius: tokens.radius.sm,
              backgroundColor: tokens.ramps.neutral[100],
            }}
          />
        ))}
      </View>
    );
  }

  if (rows.length === 0) {
    return (
      <View style={[container, style]}>
        <View style={{ padding: tokens.spacing.xl, alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{emptyLabel}</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>
            Rows appear once the table is published.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[container, style]}>
      {rows.map((row, i) => {
        const pos = i + 1;
        const zone = zoneFor(pos);
        const active = row.id === activeId;
        const mv = showForm ? movement(row.form) : undefined;
        const zoneColor =
          zone?.tone === 'success' ? colors.success : zone?.tone === 'danger' ? colors.danger : colors.primary;
        const mvColor =
          mv?.slot === 'success' ? colors.successText : mv?.slot === 'danger' ? colors.dangerText : colors.muted;

        const label =
          `${pos}. ${row.team}, ${row.points} points, played ${row.played}` +
          (zone ? `, ${zone.label}` : '') +
          (mv ? `, ${mv.label}` : '');

        const rowInner = (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.sm,
              paddingVertical: tokens.spacing.sm,
              paddingLeft: tokens.spacing.md,
              paddingRight: tokens.spacing.md,
              backgroundColor: active ? withAlpha(colors.primary, 0.1) : colors.surface,
              borderBottomWidth: i === rows.length - 1 ? 0 : 1,
              borderColor: colors.border,
            }}
          >
            {zone ? (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  backgroundColor: zoneColor,
                }}
              />
            ) : null}
            <Text style={{ width: 28, textAlign: 'center', color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
              {pos}
            </Text>
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
              {row.crest ?? '🛡'}
            </Text>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                {row.team}
              </Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {`Played ${row.played}`}
              </Text>
            </View>
            {mv ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }} accessibilityLabel={mv.label}>
                <Text allowFontScaling={false} style={{ color: mvColor, fontSize: tokens.typography.scale.xs }}>
                  {mv.glyph}
                </Text>
              </View>
            ) : null}
            <View style={{ alignItems: 'flex-end', minWidth: 40 }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
                {row.points}
              </Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Pts</Text>
            </View>
          </View>
        );

        return onSelectTeam ? (
          <Pressable
            key={row.id}
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={() => onSelectTeam(row as StandingsRow)}
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
          >
            {rowInner}
          </Pressable>
        ) : (
          <View key={row.id} accessible accessibilityLabel={label}>
            {rowInner}
          </View>
        );
      })}
    </View>
  );
}
