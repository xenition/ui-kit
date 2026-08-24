import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

/** Form result for the trailing streak column. */
export type StandingsForm = 'W' | 'D' | 'L';

/** One league-table row. */
export interface StandingsRow {
  /** Stable key / team id. */
  id: string;
  /** Team display name. */
  team: string;
  /** Crest glyph or emoji. */
  crest?: string;
  /** Played. */
  played: number;
  /** Won. */
  won: number;
  /** Drawn. */
  drawn: number;
  /** Lost. */
  lost: number;
  /** Points. */
  points: number;
  /** Goal difference (rendered signed). */
  goalDiff?: number;
  /** Recent form, oldest→newest (max 5 shown). */
  form?: StandingsForm[];
}

/** Highlight band a position belongs to (promotion / relegation etc.). */
export interface StandingsZone {
  /** 1-based inclusive start position. */
  from: number;
  /** 1-based inclusive end position. */
  to: number;
  /** Semantic accent — `success` (promotion) / `danger` (relegation) / `primary`. */
  tone: 'success' | 'danger' | 'primary';
  /** Announced zone name. */
  label: string;
}

export interface StandingsProps {
  /** Ordered rows (top of table first). */
  rows: StandingsRow[];
  /** `full` shows W/D/L + GD; `compact` shows P and Pts only. Default `full`. */
  variant?: 'full' | 'compact';
  /** Show the trailing form streak column (full variant only). */
  showForm?: boolean;
  /** Position bands drawn as a leading accent bar. */
  zones?: StandingsZone[];
  /** Highlight this team id. */
  activeId?: string;
  /** Loading skeleton row count; when set, data is ignored. */
  loadingRows?: number;
  /** Fires with the tapped row. */
  onSelectTeam?: (row: StandingsRow) => void;
  /** Rendered when there are no rows. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const FORM_META: Record<StandingsForm, { tone: 'success' | 'muted' | 'danger'; label: string }> = {
  W: { tone: 'success', label: 'win' },
  D: { tone: 'muted', label: 'draw' },
  L: { tone: 'danger', label: 'loss' },
};

/**
 * A league table — the classic standings grid built from `View`/`Text` (RN has
 * no `<table>`). Rows are tappable (`onSelectTeam`); `zones` paint promotion /
 * relegation bands as a leading accent bar reinforced by an a11y label so the
 * meaning never rests on color alone. Empty and loading states are built in.
 * `compact` trims to Played + Points for narrow layouts. Token-only colors.
 */
export function Standings({
  rows,
  variant = 'full',
  showForm = false,
  zones = [],
  activeId,
  loadingRows,
  onSelectTeam,
  emptyLabel = 'No standings yet',
  style,
}: StandingsProps): React.ReactElement {
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
        fontWeight: '600',
      }}
    >
      {label}
    </Text>
  );

  const container: ViewStyle = {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: tokens.radius.md,
    backgroundColor: colors.surface,
    overflow: 'hidden',
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
      <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
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
              backgroundColor: tokens.ramps.neutral[200],
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
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
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
        fontSize: tokens.typography.scale.sm,
        fontWeight: strong ? '700' : '500',
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

        const rowBody = (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.sm,
              backgroundColor: active ? tokens.ramps.primary[50] : colors.surface,
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
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                {pos}
              </Text>
            </View>
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
              {row.crest ?? '🛡'}
            </Text>
            <Text
              numberOfLines={1}
              style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
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
            <View style={{ flexDirection: 'row', gap: 2, paddingLeft: tokens.spacing.sm, paddingBottom: tokens.spacing.xs }}>
              {row.form.slice(-5).map((f, fi) => {
                const fm = FORM_META[f] ?? FORM_META.D;
                const c = fm.tone === 'success' ? colors.success : fm.tone === 'danger' ? colors.danger : colors.muted;
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
                      backgroundColor: tokens.ramps.neutral[100],
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
