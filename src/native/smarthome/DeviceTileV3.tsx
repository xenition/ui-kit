import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon, Switch } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { DeviceTileProps, DeviceState } from './DeviceTile';

/** Alternate design (V3) — identical prop contract to {@link DeviceTileProps}. */
export type DeviceTileV3Props = DeviceTileProps;

const STATE_META: Record<
  DeviceState,
  { accent: keyof SemanticColors; label: string; glyph: string }
> = {
  on: { accent: 'success', label: 'On', glyph: '●' },
  off: { accent: 'muted', label: 'Off', glyph: '○' },
  unavailable: { accent: 'danger', label: 'Offline', glyph: '⊘' },
};

/**
 * DeviceTile — alternate design **V3**: a compact single-line list row. A small
 * tinted glyph leads, the name + subtitle stack in the middle, and a status
 * glyph+text pair (never color-alone) precedes an inline {@link Switch}. Drop-in
 * replacement for `DeviceTile` — same props — meant for dense device lists.
 */
export function DeviceTileV3({
  name,
  icon = '🔌',
  state = 'off',
  subtitle,
  onToggle,
  onPress,
  loading = false,
  style,
}: DeviceTileV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATE_META[state];
  const isOn = state === 'on';
  const disabled = state === 'unavailable';

  const rowBase = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.sm,
    borderRadius: tokens.radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  };

  if (loading) {
    return (
      <View style={[rowBase, style]}>
        <View style={{ width: 28, height: 28, borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ flex: 1, height: 12, borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
      </View>
    );
  }

  const body = (
    <View style={[rowBase, { opacity: disabled ? 0.65 : 1 }, style]}>
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: tokens.radius.sm,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isOn ? withAlpha(colors[meta.accent], 0.12) : withAlpha(colors.muted, 0.06),
        }}
      >
        <Icon glyph={icon} color={isOn ? meta.accent : 'muted'} size="base" />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {name}
        </Text>
        {subtitle != null ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Icon glyph={meta.glyph} color={meta.accent} size="xs" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {meta.label}
        </Text>
      </View>

      <Switch
        checked={isOn}
        disabled={disabled}
        onCheckedChange={onToggle}
        accessibilityLabel={`${name} power`}
      />
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
