import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon, Badge, Progress } from '../primitives';

/** Operational state of a machine. Colors the status dot label + chip. */
export type EquipmentState = 'operational' | 'idle' | 'maintenance' | 'offline';

export interface EquipmentStatusProps {
  /** Machine name (e.g. "Tractor 04"). */
  name: string;
  /** Equipment type / model line (e.g. "John Deere 6M"). */
  type?: string;
  /** Leading glyph/emoji. Default `'🚜'`. */
  icon?: string;
  /** Operational state. Default `'operational'`. */
  state?: EquipmentState;
  /** Fuel or battery level 0–100 (rendered as a bar). Clamped/guarded. */
  fuelPct?: number;
  /** Label for the level bar (e.g. "Fuel", "Battery"). Default "Fuel". */
  fuelLabel?: string;
  /** Hours / usage hint (e.g. "1,204 hrs"). */
  hours?: string;
  /** Fires when the card is tapped. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STATE_META: Record<
  EquipmentState,
  { label: string; tone: 'success' | 'neutral' | 'warn' | 'danger'; color: keyof SemanticColors }
> = {
  operational: { label: 'Operational', tone: 'success', color: 'success' },
  idle: { label: 'Idle', tone: 'neutral', color: 'muted' },
  maintenance: { label: 'Maintenance', tone: 'warn', color: 'warn' },
  offline: { label: 'Offline', tone: 'danger', color: 'danger' },
};

/**
 * An equipment status card — machine glyph, name + type, and an operational
 * {@link Badge} whose text label (not color alone) carries the state. An
 * optional fuel/battery {@link Progress} bar and usage-hours line sit below.
 * The level is clamped to [0,100]. Tappable via `onPress` (accessible button).
 * Token-bound throughout — no literal colors.
 */
export function EquipmentStatus({
  name,
  type,
  icon = '🚜',
  state = 'operational',
  fuelPct,
  fuelLabel = 'Fuel',
  hours,
  onPress,
  style,
}: EquipmentStatusProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATE_META[state];
  const pct = typeof fuelPct === 'number' ? Math.max(0, Math.min(100, fuelPct)) : undefined;
  const lowFuel = pct != null && pct < 20;

  const Body = (
    <Card variant={onPress ? 'interactive' : 'outlined'} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph={icon} size="xl" color={meta.color} />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
            {name}
          </Text>
          {type != null ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {type}
            </Text>
          ) : null}
        </View>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
      </View>

      {pct != null ? (
        <View style={{ marginTop: tokens.spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{fuelLabel}</Text>
            <Text style={{ color: lowFuel ? colors.danger : colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {pct}%{lowFuel ? ' · Low' : ''}
            </Text>
          </View>
          <Progress value={pct} tone={lowFuel ? 'danger' : 'primary'} />
        </View>
      ) : null}

      {hours != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.sm }}>
          ⏱️ {hours}
        </Text>
      ) : null}
    </Card>
  );

  if (!onPress) return Body;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${meta.label}`}
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
    >
      {Body}
    </Pressable>
  );
}
