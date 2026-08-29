import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Switch } from '../primitives';

export interface DeviceToggleRowProps {
  /** Device / entity label. */
  label: string;
  /** Leading glyph/emoji. */
  icon?: string;
  /** Secondary line (e.g. "Dimmable · 60%"). */
  subtitle?: string;
  /** Whether the device is on. */
  checked?: boolean;
  /** Device is unreachable — disables the switch and shows an offline label. */
  offline?: boolean;
  /**
   * Fires with the requested on/off value. Prefer `onChange` — that is the
   * kit's one canonical name for "the value changed". `onCheckedChange` is this
   * component's original spelling, kept so existing callers keep working; if
   * both are passed this one wins.
   */
  onCheckedChange?: (next: boolean) => void;
  /** Canonical spelling of `onCheckedChange` (see it for the precedence rule). */
  onChange?: (next: boolean) => void;
  /** Hide the bottom divider (e.g. last row in a group). */
  last?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A compact list row with a trailing on/off {@link Switch} — the building block
 * of {@link RoomGroup}. Renders a glyph, label, and optional subtitle; when
 * `offline` the switch is disabled and the subtitle is replaced by a muted
 * "Offline" note so unreachability is textual, not color-only. A hairline
 * `border` divider separates rows unless `last`. Token-bound throughout.
 */
export function DeviceToggleRow({
  label,
  icon,
  subtitle,
  checked = false,
  offline = false,
  onCheckedChange,
  onChange,
  last = false,
  style,
}: DeviceToggleRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const secondary = offline ? 'Offline' : subtitle;
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onCheckedChange ?? onChange;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: last ? 0 : 1,
          borderBottomColor: colors.border,
          opacity: offline ? 0.7 : 1,
        },
        style,
      ]}
    >
      {icon != null ? <Icon glyph={icon} color={checked && !offline ? 'primary' : 'muted'} size="lg" /> : null}
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
