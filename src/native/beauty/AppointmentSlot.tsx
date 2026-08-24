import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export type AppointmentSlotStatus = 'available' | 'selected' | 'held' | 'booked';

interface StatusMeta {
  /** Border/text accent slot. */
  slot: keyof SemanticColors;
  note?: string;
  disabled: boolean;
}

const STATUS_META: Record<AppointmentSlotStatus, StatusMeta> = {
  available: { slot: 'primary', disabled: false },
  selected: { slot: 'primary', note: 'Selected', disabled: false },
  held: { slot: 'warn', note: 'On hold', disabled: true },
  booked: { slot: 'muted', note: 'Booked', disabled: true },
};

export interface AppointmentSlotProps {
  /** Display time, e.g. "9:30 AM". */
  time: string;
  /** Slot state; drives accent, fill, and interactivity. Default `available`. */
  status?: AppointmentSlotStatus;
  /** Optional secondary line (e.g. stylist name or "45 min"). */
  meta?: string;
  /** Fires when an interactive slot is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single bookable time slot rendered as a tappable pill. `status` carries the
 * meaning (never color alone): `selected` fills with the accent, `held`/`booked`
 * are disabled and labelled, `available` is an outlined tap target. The spoken
 * label always includes the status word, and `accessibilityState.selected` /
 * `.disabled` are set. Token-only colors via semantic slots + `withAlpha`.
 */
export function AppointmentSlot({
  time,
  status = 'available',
  meta,
  onPress,
  style,
}: AppointmentSlotProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const info = STATUS_META[status] ?? STATUS_META.available;
  const accent = colors[info.slot];
  const isSelected = status === 'selected';
  const interactive = !info.disabled && !!onPress;

  const bg = isSelected ? accent : info.disabled ? withAlpha(colors.muted, 0.08) : colors.surface;
  const fg = isSelected ? colors.onPrimary : info.disabled ? colors.muted : colors.onSurface;
  const border = isSelected ? accent : info.disabled ? colors.border : accent;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${time}${meta ? `, ${meta}` : ''}, ${status}`}
      accessibilityState={{ selected: isSelected, disabled: info.disabled }}
      disabled={!interactive}
      onPress={interactive ? onPress : undefined}
      style={({ pressed }) => [
        {
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 84,
          gap: 2,
          borderWidth: 1,
          borderColor: border,
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          backgroundColor: bg,
          opacity: pressed && interactive ? 0.85 : 1,
        },
        style,
      ]}
    >
      <Text style={{ color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{time}</Text>
      {info.note ? (
        <Text style={{ color: isSelected ? colors.onPrimary : accent, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {info.note}
        </Text>
      ) : meta ? (
        <Text numberOfLines={1} style={{ color: isSelected ? colors.onPrimary : colors.muted, fontSize: tokens.typography.scale.xs }}>
          {meta}
        </Text>
      ) : null}
    </Pressable>
  );
}
