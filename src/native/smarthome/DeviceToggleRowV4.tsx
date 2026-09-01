import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Switch } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { DeviceToggleRowProps } from './DeviceToggleRow';

/** Drop-in for {@link DeviceToggleRowProps} — same props, the V4 "ambient" design. */
export type DeviceToggleRowV4Props = DeviceToggleRowProps;

/**
 * DeviceToggleRow — **V4** "ambient" design. The control-panel take on a list
 * row: a **leading glyph glows** in a soft primary-tinted disc when the device
 * is `on`, and the whole row takes a gentle primary wash so an active device
 * reads at a glance; `off`/`offline` stay calm on `surface`. The name + subtitle
 * sit beside a trailing on/off {@link Switch}; when `offline` the switch is
 * disabled and the subtitle is replaced by a muted "Offline" note so
 * unreachability is textual, not color-only. Rows are ≥44px tall for comfortable
 * touch. Same props/behavior as {@link DeviceToggleRowProps} (both
 * `onCheckedChange`/`onChange` spellings, `last` divider); token-only colors via
 * `useXenitionTheme()` + `withAlpha`.
 */
export function DeviceToggleRowV4({
  label,
  icon,
  subtitle,
  checked = false,
  offline = false,
  onCheckedChange,
  onChange,
  last = false,
  style,
}: DeviceToggleRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const secondary = offline ? 'Offline' : subtitle;
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onCheckedChange ?? onChange;
  const isOn = checked && !offline;
  const accent = colors.primary;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          minHeight: 44,
          borderRadius: tokens.radius.md,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          backgroundColor: isOn ? withAlpha(accent, 0.08) : colors.surface,
          borderBottomWidth: last ? 0 : 1,
          borderBottomColor: colors.border,
          opacity: offline ? 0.7 : 1,
        },
        style,
      ]}
    >
      {/* Glowing glyph disc — the ambient signature. */}
      {icon != null ? (
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
          <Icon glyph={icon} color={isOn ? 'primary' : 'muted'} size="lg" />
        </View>
      ) : null}
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
          {label}
        </Text>
        {secondary != null ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {secondary}
          </Text>
        ) : null}
      </View>
      <Switch checked={checked} disabled={offline} onCheckedChange={emit} accessibilityLabel={label} />
    </View>
  );
}
