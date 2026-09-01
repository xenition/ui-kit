import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card, Icon, Switch, EmptyState } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { DeviceToggleRow } from './DeviceToggleRow';
import type { RoomGroupProps } from './RoomGroup';

/** Drop-in for {@link RoomGroupProps} — same props, the V4 "ambient" design. */
export type RoomGroupV4Props = RoomGroupProps;

/**
 * RoomGroup — **V4** "ambient" design. The control-panel take on a room card:
 * when **any** device is on, the whole card takes a soft `primary`-tinted wash,
 * a primary border, and a glowing icon disc so an active room reads at a glance.
 * A **bold numeral** summarizes how many devices are on, and a group all-on/off
 * {@link Switch} keeps parity with the base header. Idle rooms stay calm and
 * muted; status is carried by icon + a text summary (never color alone). Same
 * props/behavior as {@link RoomGroupProps}; token-only colors via `useXenitionTheme()`.
 */
export function RoomGroupV4({
  name,
  icon = '🛋️',
  devices,
  onDeviceToggle,
  onToggleAll,
  emptyTitle = 'No devices in this room',
  children,
  style,
}: RoomGroupV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(devices) ? devices : [];
  const reachable = list.filter((d) => !d.offline);
  const onCount = reachable.filter((d) => d.on).length;
  const allOn = reachable.length > 0 && onCount === reachable.length;
  const anyOn = onCount > 0;
  const offlineCount = list.length - reachable.length;
  const accent: keyof SemanticColors = anyOn ? 'primary' : 'muted';

  return (
    <Card
      variant="outlined"
      style={[
        {
          backgroundColor: anyOn ? withAlpha(colors.primary, 0.08) : colors.card,
          borderColor: anyOn ? withAlpha(colors.primary, 0.5) : colors.border,
          ...(anyOn
            ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
            : {}),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {/* Glowing icon disc — the ambient signature. */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: anyOn ? withAlpha(colors.primary, 0.16) : withAlpha(colors.onSurface, 0.05),
            borderWidth: 1,
            borderColor: anyOn ? withAlpha(colors.primary, 0.4) : colors.border,
          }}
        >
          <Icon glyph={icon} color={accent} size="xl" />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
            {name}
          </Text>
          {list.length === 0 ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No devices</Text>
          ) : (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              <Text style={{ color: colors.onSurface, fontWeight: '700' }}>{onCount}</Text>
              {` of ${reachable.length} on${offlineCount > 0 ? ` · ${offlineCount} offline` : ''}`}
            </Text>
          )}
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
