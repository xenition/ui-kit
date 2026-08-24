import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon, Switch, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import type { DeviceTileProps, DeviceState } from './DeviceTile';

/** Alternate design (V2) — identical prop contract to {@link DeviceTileProps}. */
export type DeviceTileV2Props = DeviceTileProps;

const STATE_META: Record<
  DeviceState,
  { accent: keyof SemanticColors; label: string; tone: 'success' | 'neutral' | 'danger' }
> = {
  on: { accent: 'success', label: 'On', tone: 'success' },
  off: { accent: 'muted', label: 'Off', tone: 'neutral' },
  unavailable: { accent: 'danger', label: 'Offline', tone: 'danger' },
};

/**
 * DeviceTile — alternate design **V2**: a big square glass-panel tile. A large
 * centered glyph sits inside a soft on/off glow (a tinted, radiused halo that
 * only lights when the device is `on`), the name + a status {@link Badge} label
 * the state without relying on color alone, and a full-width {@link Switch}
 * anchors the bottom. Drop-in replacement for `DeviceTile` — same props. The
 * glow tint is derived from the accent token via `withAlpha` (never a literal),
 * and `unavailable` dims the panel and disables the toggle.
 */
export function DeviceTileV2({
  name,
  icon = '🔌',
  state = 'off',
  subtitle,
  onToggle,
  onPress,
  loading = false,
  style,
}: DeviceTileV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATE_META[state];
  const isOn = state === 'on';
  const disabled = state === 'unavailable';

  const panelBase = {
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    aspectRatio: 1,
    minHeight: 140,
    justifyContent: 'space-between' as const,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: isOn ? withAlpha(colors[meta.accent], 0.4) : colors.border,
  };

  if (loading) {
    return (
      <View style={[panelBase, { justifyContent: 'center', alignItems: 'center' }, style]}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.border,
          }}
        />
        <View style={{ height: 12, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
      </View>
    );
  }

  const body = (
    <View style={[panelBase, isOn ? shadow('md', tokens) : null, { opacity: disabled ? 0.65 : 1 }, style]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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

      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <View
          style={{
            width: 68,
            height: 68,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isOn ? withAlpha(colors[meta.accent], 0.18) : withAlpha(colors.muted, 0.08),
            borderWidth: 1,
            borderColor: isOn ? withAlpha(colors[meta.accent], 0.35) : colors.border,
          }}
        >
          <Icon glyph={icon} color={isOn ? meta.accent : 'muted'} size={34} />
        </View>
      </View>

      <View>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
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
