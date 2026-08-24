import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Icon, Switch, EmptyState } from '../primitives';
import { DeviceToggleRow } from './DeviceToggleRow';

/** A device summarized inside a room. */
export interface RoomDevice {
  /** Stable identity. */
  id: string;
  /** Row label. */
  label: string;
  /** Row glyph/emoji. */
  icon?: string;
  /** Secondary line. */
  subtitle?: string;
  /** Whether the device is on. */
  on?: boolean;
  /** Whether the device is unreachable. */
  offline?: boolean;
}

export interface RoomGroupProps {
  /** Room name (e.g. "Living Room"). */
  name: string;
  /** Leading glyph/emoji. Default "🛋️". */
  icon?: string;
  /** Devices in the room. Empty → an inline empty state. */
  devices?: RoomDevice[];
  /** Fires with `(id, next)` when a device row is toggled. */
  onDeviceToggle?: (id: string, next: boolean) => void;
  /** Fires with `next` when the header "all" switch is toggled. */
  onToggleAll?: (next: boolean) => void;
  /** Copy for the empty state title. */
  emptyTitle?: string;
  /** Optional extra content rendered under the device list. */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A room grouping card — a header (glyph, name, "N on" summary + an all-devices
 * {@link Switch}) over a list of {@link DeviceToggleRow}s. The header switch is
 * on when **every** reachable device is on and fires `onToggleAll`; the summary
 * count is derived defensively from the `devices` array. When there are no
 * devices it renders the shared {@link EmptyState} instead of an empty list.
 * Token-bound throughout — no literal colors.
 */
export function RoomGroup({
  name,
  icon = '🛋️',
  devices,
  onDeviceToggle,
  onToggleAll,
  emptyTitle = 'No devices in this room',
  children,
  style,
}: RoomGroupProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(devices) ? devices : [];
  const reachable = list.filter((d) => !d.offline);
  const onCount = reachable.filter((d) => d.on).length;
  const allOn = reachable.length > 0 && onCount === reachable.length;

  return (
    <Card variant="outlined" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph={icon} color="onSurface" size="xl" />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
            {name}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {list.length === 0
              ? 'No devices'
              : `${onCount} of ${reachable.length} on${list.length !== reachable.length ? ` · ${list.length - reachable.length} offline` : ''}`}
          </Text>
        </View>
        {reachable.length > 0 ? (
          <Switch checked={allOn} onCheckedChange={onToggleAll} accessibilityLabel={`Toggle all devices in ${name}`} />
        ) : null}
      </View>

      {list.length === 0 ? (
        <View style={{ marginTop: tokens.spacing.md }}>
          <EmptyState icon={<Icon glyph="🔌" color="muted" size="2xl" />} title={emptyTitle} description="Add a device to control it from here." />
        </View>
      ) : (
        <View style={{ marginTop: tokens.spacing.sm }}>
          {list.map((d, i) => (
            <DeviceToggleRow
              key={d.id}
              label={d.label}
              icon={d.icon}
              subtitle={d.subtitle}
              checked={!!d.on}
              offline={!!d.offline}
              last={i === list.length - 1}
              onCheckedChange={(next) => onDeviceToggle?.(d.id, next)}
            />
          ))}
        </View>
      )}

      {children != null ? <View style={{ marginTop: tokens.spacing.sm }}>{children}</View> : null}
    </Card>
  );
}
