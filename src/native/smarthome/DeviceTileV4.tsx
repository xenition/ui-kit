import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon, Switch, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { DeviceTileProps, DeviceState } from './DeviceTile';

/** Drop-in for {@link DeviceTileProps} — same props, the V4 "ambient" design. */
export type DeviceTileV4Props = DeviceTileProps;

const STATE_META: Record<
  DeviceState,
  { accent: keyof SemanticColors; label: string; tone: 'success' | 'neutral' | 'danger' }
> = {
  on: { accent: 'success', label: 'On', tone: 'success' },
  off: { accent: 'muted', label: 'Off', tone: 'neutral' },
  unavailable: { accent: 'danger', label: 'Offline', tone: 'danger' },
};

/**
 * DeviceTile — **V4** "ambient" design. The control-panel take on a device tile:
 * an **active device glows** — when `on`, the tile takes a soft accent-tinted
 * wash, an accent border, and a glowing icon disc; `off`/`unavailable` stay calm.
 * A soft status pill + the on/off {@link Switch} keep the meaning readable
 * (status never by color alone). Same props/behavior as {@link DeviceTileProps};
 * token-only colors via `useXenitionTheme()`. `loading` shows a skeleton.
 */
export function DeviceTileV4({
  name,
  icon = '🔌',
  state = 'off',
  subtitle,
  onToggle,
  onPress,
  loading = false,
  style,
}: DeviceTileV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATE_META[state];
  const isOn = state === 'on';
  const disabled = state === 'unavailable';
  const accent = colors[meta.accent];

  const shell = {
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    padding: tokens.spacing.md,
    backgroundColor: isOn ? withAlpha(accent, 0.08) : colors.card,
    borderColor: isOn ? withAlpha(accent, 0.5) : colors.border,
    ...(isOn
      ? { shadowColor: accent, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
      : {}),
  } as const;

  if (loading) {
    return (
      <View style={[{ borderRadius: tokens.radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, padding: tokens.spacing.md, gap: tokens.spacing.sm }, style]}>
        <View style={{ width: 44, height: 44, borderRadius: tokens.radius.md, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
        <View style={{ height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
        <View style={{ height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
      </View>
    );
  }

  const body = (
    <View style={[shell, { opacity: disabled ? 0.7 : 1 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        {/* Glowing icon disc — the ambient signature. */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isOn ? withAlpha(accent, 0.16) : withAlpha(colors.onSurface, 0.05),
            borderWidth: 1,
            borderColor: isOn ? withAlpha(accent, 0.4) : colors.border,
          }}
        >
          <Icon glyph={icon} color={isOn ? meta.accent : 'muted'} size="lg" />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {name}
          </Text>
          {subtitle != null ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={{ marginTop: tokens.spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
        <Switch checked={isOn} disabled={disabled} onCheckedChange={onToggle} accessibilityLabel={`${name} power`} />
      </View>
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${name}, ${meta.label}`} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
      {body}
    </Pressable>
  );
}
