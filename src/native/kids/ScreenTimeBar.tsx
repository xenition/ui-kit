import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Progress } from '../primitives';
import type { ProgressTone } from '../primitives';

export interface ScreenTimeBarProps {
  /** Minutes (or `unit`s) used so far. */
  used: number;
  /** Daily limit. `<= 0` renders a "no limit set" state. */
  limit: number;
  /** Unit suffix for the readout. */
  unit?: string;
  /** Section label. */
  label?: string;
  /** Loading placeholder state. */
  loading?: boolean;
  /** Copy shown when no limit is configured. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

function fmtMinutes(mins: number, unit: string): string {
  if (unit !== 'min') return `${mins} ${unit}`;
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/**
 * Screen-time usage against a daily limit: a labelled readout plus a progress
 * bar that shifts tone as usage climbs (primary → warn near the cap → danger
 * once over). The over/near state is conveyed in the readout text + a11y label,
 * not by color alone. Renders a "no limit set" state when `limit <= 0`. Bar and
 * text colors are `SemanticColors` tokens — no literals.
 */
export function ScreenTimeBar({
  used,
  limit,
  unit = 'min',
  label = 'Screen time',
  loading = false,
  emptyLabel = 'No screen-time limit set',
  style,
}: ScreenTimeBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.sm,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading screen time" style={container}>
        <View style={{ height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: 10, width: '100%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
      </View>
    );
  }

  if (!(limit > 0)) {
    return (
      <View accessibilityLabel={emptyLabel} style={container}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{label}</Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  const safeUsed = Math.max(0, used);
  const pct = (safeUsed / limit) * 100;
  const over = safeUsed > limit;
  const near = !over && pct >= 80;
  const tone: ProgressTone = over ? 'danger' : near ? 'warn' : 'primary';
  const readoutColor = over ? colors.danger : near ? colors.warn : colors.onSurface;

  const stateNote = over
    ? `over by ${fmtMinutes(safeUsed - limit, unit)}`
    : `${fmtMinutes(Math.max(0, limit - safeUsed), unit)} left`;

  return (
    <View
      accessibilityLabel={`${label}, ${fmtMinutes(safeUsed, unit)} of ${fmtMinutes(limit, unit)}, ${stateNote}`}
      style={container}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{label}</Text>
        <Text style={{ color: readoutColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {fmtMinutes(safeUsed, unit)} / {fmtMinutes(limit, unit)}
        </Text>
      </View>
      <Progress value={safeUsed} max={limit} tone={tone} />
      <Text style={{ color: over ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: over ? '700' : '400' }}>
        {over ? `⚠️ ${stateNote}` : stateNote}
      </Text>
    </View>
  );
}
