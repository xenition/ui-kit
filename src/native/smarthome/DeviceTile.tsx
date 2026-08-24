import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon, Switch, Badge } from '../primitives';

/** Power/reachability state of a smart-home device. */
export type DeviceState = 'on' | 'off' | 'unavailable';

export interface DeviceTileProps {
  /** Device display name (e.g. "Living Room Lamp"). */
  name: string;
  /** Leading glyph/emoji (e.g. "💡", "🔌"). */
  icon?: string;
  /** Power/reachability state. `unavailable` disables the toggle. */
  state?: DeviceState;
  /** Secondary line under the name (e.g. "72% brightness", "Offline 2m ago"). */
  subtitle?: string;
  /** Fires with the requested on/off value when the toggle is pressed. */
  onToggle?: (next: boolean) => void;
  /** Fires when the tile body (not the switch) is pressed — opens details. */
  onPress?: () => void;
  /** Show a skeleton-style placeholder instead of live content. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Per-state presentation: accent color slot + a text label so state never relies on color alone. */
const STATE_META: Record<
  DeviceState,
  { accent: keyof SemanticColors; label: string; tone: 'success' | 'neutral' | 'danger' }
> = {
  on: { accent: 'success', label: 'On', tone: 'success' },
  off: { accent: 'muted', label: 'Off', tone: 'neutral' },
  unavailable: { accent: 'danger', label: 'Offline', tone: 'danger' },
};

/**
 * A single controllable device tile — a tinted glyph, name + status, and an
 * on/off {@link Switch}. `state` drives the accent slot and a text status label
 * (`on`→success, `off`→muted, `unavailable`→danger) so device status is never
 * conveyed by color alone; `unavailable` disables the switch. Optional `onPress`
 * makes the body open a detail view while the switch stays independently
 * tappable. Token-bound throughout — no literal colors.
 */
export function DeviceTile({
  name,
  icon = '🔌',
  state = 'off',
  subtitle,
  onToggle,
  onPress,
  loading = false,
  style,
}: DeviceTileProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATE_META[state];
  const isOn = state === 'on';
  const disabled = state === 'unavailable';

  if (loading) {
    return (
      <Card variant="outlined" style={style}>
        <View style={{ gap: tokens.spacing.sm }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: tokens.radius.md,
              backgroundColor: colors.border,
            }}
          />
          <View style={{ height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      </Card>
    );
  }

  const body = (
    <Card variant={isOn ? 'elevated' : 'outlined'} style={[{ opacity: disabled ? 0.7 : 1 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors[meta.accent],
          }}
        >
          <Icon glyph={icon} color={isOn ? meta.accent : 'muted'} size="lg" />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
          >
            {name}
          </Text>
          {subtitle != null ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      <View
        style={{
          marginTop: tokens.spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
        <Switch
          checked={isOn}
          disabled={disabled}
          onCheckedChange={onToggle}
          accessibilityLabel={`${name} power`}
        />
      </View>
    </Card>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${meta.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}
