import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';

/** Reservation lifecycle. */
export type ReservationStatus = 'requested' | 'confirmed' | 'seated' | 'completed' | 'cancelled';

export interface TableReservationRowProps {
  /** Guest / booking name. */
  name: string;
  /** Party size (number of guests). */
  partySize: number;
  /** Date text (e.g. "Fri, Aug 29"). */
  dateText?: string;
  /** Time text (e.g. "7:30 PM"). */
  timeText?: string;
  /** Table label / number (e.g. "Table 12"). */
  tableLabel?: string;
  /** Reservation status; drives the status badge (default `requested`). */
  status?: ReservationStatus;
  /** Press handler for the whole row. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STATUS_META: Record<ReservationStatus, { label: string; tone: BadgeTone }> = {
  requested: { label: 'Requested', tone: 'warn' },
  confirmed: { label: 'Confirmed', tone: 'primary' },
  seated: { label: 'Seated', tone: 'success' },
  completed: { label: 'Completed', tone: 'neutral' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
};

/**
 * A single table-reservation row — guest name, a party-size chip, date/time,
 * an optional table label, and a status `Badge`. The status is shown as a
 * labelled badge (text + tone), so it never depends on color alone. Optionally
 * pressable to open the booking. Reuses the `Badge` and `Icon` primitives.
 * Token-only.
 */
export function TableReservationRow({
  name,
  partySize,
  dateText,
  timeText,
  tableLabel,
  status = 'requested',
  onPress,
  style,
}: TableReservationRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status] ?? STATUS_META.requested;
  const when = [dateText, timeText].filter(Boolean).join(' · ');

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      padding: tokens.spacing.md,
    },
    style,
  ];

  const inner = (
    <>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tokens.ramps.neutral[100],
        }}
      >
        <Icon glyph="👥" size="sm" accessibilityLabel={`Party of ${partySize}`} />
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
          {partySize}
        </Text>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {name}
        </Text>
        {when ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{when}</Text>
        ) : null}
        {tableLabel ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{tableLabel}</Text>
        ) : null}
      </View>
      <Badge tone={meta.tone}>{meta.label}</Badge>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}, party of ${partySize}${when ? `, ${when}` : ''}, ${meta.label}`}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
