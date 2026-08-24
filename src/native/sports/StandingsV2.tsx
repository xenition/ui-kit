import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { StandingsProps, StandingsForm, StandingsRow } from './Standings';

/** Drop-in replacement for {@link StandingsProps} — identical shape. */
export type StandingsV2Props = StandingsProps;

const FORM_META: Record<StandingsForm, { tone: 'success' | 'muted' | 'danger'; label: string }> = {
  W: { tone: 'success', label: 'win' },
  D: { tone: 'muted', label: 'draw' },
  L: { tone: 'danger', label: 'loss' },
};

/**
 * Standings, design variant 2 — a **styled table** with a rounded elevated
 * frame, zebra rows, a leading zone accent bar (promotion / relegation, always
 * reinforced by an a11y label so meaning never rests on color), and inline
 * form dots on each row. `zones` paint the accent bar; `activeId` tints a row;
 * `variant="compact"` trims to Played + Points. Same props as `Standings`;
 * empty + loading states built in. Token-pure (`shadow`, `withAlpha`).
 */
export function StandingsV2({
  rows,
  variant = 'full',
  showForm = false,
  zones = [],
  activeId,
  loadingRows,
  onSelectTeam,
  emptyLabel = 'No standings yet',
  style,
}: StandingsV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const full = variant === 'full';

  const zoneFor = (pos: number) => zones.find((z) => pos >= z.from && pos <= z.to);

  const container: ViewStyle = {
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    ...shadow('sm', tokens),
  };

  const headCell = (label: string, w: number) => (
    <Text
      key={label}
      style={{ width: w, textAlign: 'right', color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}
    >
      {label}
    </Text>
  );

  const header = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        paddingVertical: tokens.spacing.sm,
        paddingLeft: tokens.spacing.md,
        paddingRight: tokens.spacing.sm,
        backgroundColor: tokens.ramps.neutral[100],
      }}
    >
      <Text style={{ width: 24, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
        #
      </Text>
      <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Team</Text>
      {headCell('P', 24)}
      {full ? headCell('W', 22) : null}
      {full ? headCell('D', 22) : null}
      {full ? headCell('L', 22) : null}
      {full ? headCell('GD', 30) : null}
      {headCell('Pts', 32)}
    </View>
  );

  if (loadingRows && loadingRows > 0) {
    return (
      <View accessibilityState={{ busy: true }} accessibilityLabel="Loading standings" style={[container, style]}>
        {header}
        {Array.from({ length: loadingRows }).map((_, i) => (
          <View
            key={i}
            style={{
              height: tokens.spacing.xl,
              margin: tokens.spacing.sm,
              borderRadius: tokens.radius.sm,
              backgroundColor: i % 2 === 0 ? tokens.ramps.neutral[200] : tokens.ramps.neutral[100],
            }}
          />
        ))}
      </View>
    );
  }

  if (rows.length === 0) {
    return (
      <View style={[container, style]}>
        {header}
        <View style={{ padding: tokens.spacing.xl, alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{emptyLabel}</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>
            Rows appear once the table is published.
          </Text>
        </View>
      </View>
    );
  }

  const valueCell = (value: React.ReactNode, w: number, strong = false) => (
    <Text
      style={{
        width: w,
        textAlign: 'right',
        color: strong ? colors.onSurface : colors.muted,
        fontSize: tokens.typography.scale.sm,
        fontWeight: strong ? '800' : '500',
      }}
    >
      {value}
    </Text>
  );

  return (
    <View style={[container, style]}>
      {header}
      {rows.map((row, i) => {
        const pos = i + 1;
        const zone = zoneFor(pos);
        const active = row.id === activeId;
        const gd = row.goalDiff ?? row.won - row.lost;
        const gdLabel = gd > 0 ? `+${gd}` : String(gd);
        const zoneColor =
          zone?.tone === 'success' ? colors.success : zone?.tone === 'danger' ? colors.danger : colors.primary;
        const zebra = i % 2 === 1;
        const bg = active ? withAlpha(colors.primary, 0.1) : zebra ? tokens.ramps.neutral[50] : colors.surface;

        const label =
          `${pos}. ${row.team}, ${row.points} points, played ${row.played}` + (zone ? `, ${zone.label}` : '');

        const rowInner = (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.sm,
                paddingLeft: tokens.spacing.md,
                paddingRight: tokens.spacing.sm,
                backgroundColor: bg,
                borderBottomWidth: i === rows.length - 1 ? 0 : 1,
                borderColor: colors.border,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  top: tokens.spacing.xs,
                  bottom: tokens.spacing.xs,
                  width: 4,
                  borderRadius: tokens.radius.full,
                  backgroundColor: zone ? zoneColor : 'transparent',
                }}
              />
              <Text style={{ width: 24, textAlign: 'center', color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                {pos}
              </Text>
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
                {row.crest ?? '🛡'}
              </Text>
              <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                {row.team}
              </Text>
              {valueCell(row.played, 24)}
              {full ? valueCell(row.won, 22) : null}
              {full ? valueCell(row.drawn, 22) : null}
              {full ? valueCell(row.lost, 22) : null}
              {full ? valueCell(gdLabel, 30) : null}
              {valueCell(row.points, 32, true)}
            </View>
            {showForm && full && row.form && row.form.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 3,
                  paddingLeft: tokens.spacing.md + 24,
                  paddingBottom: tokens.spacing.xs,
                  backgroundColor: bg,
                }}
              >
                {row.form.slice(-5).map((f, fi) => {
                  const fm = FORM_META[f] ?? FORM_META.D;
                  const c = fm.tone === 'success' ? colors.success : fm.tone === 'danger' ? colors.danger : colors.muted;
                  return (
                    <View
                      key={fi}
                      accessibilityLabel={fm.label}
                      style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c }}
                    />
                  );
                })}
              </View>
            ) : null}
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
