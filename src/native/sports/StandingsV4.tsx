import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { StandingsProps, StandingsZone, StandingsForm } from './Standings';

/** Drop-in for {@link StandingsProps} — same props, the V4 "broadcast" design. */
export type StandingsV4Props = StandingsProps;

const FORM_META: Record<StandingsForm, { slot: keyof SemanticColors; label: string }> = {
  W: { slot: 'success', label: 'win' },
  D: { slot: 'muted', label: 'draw' },
  L: { slot: 'danger', label: 'loss' },
};

/**
 * Standings — **V4** "broadcast" design. The matchday take on a league table,
 * built from `View`/`Text` (RN has no `<table>`): an elevated card with bold rank
 * numerals, emphasized points, and soft-primary-tinted rows for the leading
 * position and the active team — meaning still carried by the leading accent bar +
 * a11y label, never color alone. Rows stay tappable (`onSelectTeam`). Same
 * props/behavior as {@link StandingsProps}; token-only colors via
 * `useXenitionTheme()`. `compact` trims to Played + Points for narrow layouts.
 */
export function StandingsV4({
  rows,
  variant = 'full',
  showForm = false,
  zones = [],
  activeId,
  loadingRows,
  onSelectTeam,
  emptyLabel = 'No standings yet',
  style,
}: StandingsV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const full = variant === 'full';

  const zoneFor = (pos: number): StandingsZone | undefined =>
    zones.find((z) => pos >= z.from && pos <= z.to);

  const headCell = (label: string, w: number, align: 'left' | 'right' | 'center' = 'right') => (
    <Text
      key={label}
      style={{
        width: w,
        textAlign: align,
        color: colors.muted,
        fontSize: tokens.typography.scale.xs,
        fontWeight: '700',
      }}
    >
      {label}
    </Text>
  );

  const container: ViewStyle = {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.card,
    overflow: 'hidden',
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  const header = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.sm,
        gap: tokens.spacing.xs,
        borderBottomWidth: 1,
        borderColor: colors.border,
      }}
    >
      {headCell('#', 22, 'center')}
      <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
        Team
      </Text>
      {headCell('P', 24)}
      {full ? headCell('W', 24) : null}
      {full ? headCell('D', 24) : null}
      {full ? headCell('L', 24) : null}
      {full ? headCell('GD', 32) : null}
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
              backgroundColor: withAlpha(colors.onSurface, 0.1),
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
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {emptyLabel}
          </Text>
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
        fontSize: strong ? tokens.typography.scale.base : tokens.typography.scale.sm,
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
        // Broadcast emphasis: the table leader gets a soft-primary tint too.
        const tinted = active || pos === 1;
        const gd = row.goalDiff ?? row.won - row.lost;
        const gdLabel = gd > 0 ? `+${gd}` : String(gd);
        const zoneColor =
          zone?.tone === 'success' ? colors.success : zone?.tone === 'danger' ? colors.danger : colors.primary;

        const rowBody = (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.sm,
              backgroundColor: tinted ? withAlpha(colors.primary, 0.12) : colors.card,
              borderBottomWidth: i === rows.length - 1 ? 0 : 1,
              borderColor: colors.border,
            }}
          >
            <View style={{ width: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              {zone ? (
                <View
                  style={{
                    position: 'absolute',
                    left: -tokens.spacing.sm,
                    top: -tokens.spacing.sm,
                    bottom: -tokens.spacing.sm,
                    width: 3,
                    backgroundColor: zoneColor,
                  }}
                />
              ) : null}
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
                {pos}
              </Text>
            </View>
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
              {row.crest ?? '🛡'}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                color: colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: tinted ? '800' : '600',
              }}
            >
              {row.team}
            </Text>
            {valueCell(row.played, 24)}
            {full ? valueCell(row.won, 24) : null}
            {full ? valueCell(row.drawn, 24) : null}
            {full ? valueCell(row.lost, 24) : null}
            {full ? valueCell(gdLabel, 32) : null}
            {valueCell(row.points, 32, true)}
          </View>
        );

        const label =
          `${pos}. ${row.team}, ${row.points} points, played ${row.played}` +
          (zone ? `, ${zone.label}` : '');

        if (showForm && full && row.form && row.form.length > 0) {
          const formRow = (
            <View style={{ flexDirection: 'row', gap: 2, paddingLeft: tokens.spacing.sm, paddingBottom: tokens.spacing.xs, backgroundColor: tinted ? withAlpha(colors.primary, 0.12) : colors.card }}>
              {row.form.slice(-5).map((f, fi) => {
                const fm = FORM_META[f] ?? FORM_META.D;
                const c = colors[fm.slot];
                return (
                  <View
                    key={fi}
                    accessibilityLabel={fm.label}
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: tokens.radius.sm,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: withAlpha(colors.onSurface, 0.05),
                      borderWidth: 1,
                      borderColor: c,
                    }}
                  >
                    <Text style={{ color: c, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{f}</Text>
                  </View>
                );
              })}
            </View>
          );
          const wrapped = (
            <View key={row.id}>
              {rowBody}
              {formRow}
            </View>
          );
          return onSelectTeam ? (
            <Pressable
              key={row.id}
              accessibilityRole="button"
              accessibilityLabel={label}
              onPress={() => onSelectTeam(row)}
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
            >
              {wrapped}
            </Pressable>
          ) : (
            wrapped
          );
        }

        return onSelectTeam ? (
          <Pressable
            key={row.id}
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={() => onSelectTeam(row)}
            style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
          >
            {rowBody}
          </Pressable>
        ) : (
          <View key={row.id} accessible accessibilityLabel={label}>
            {rowBody}
          </View>
        );
      })}
    </View>
  );
}
