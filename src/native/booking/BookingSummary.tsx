import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { BookingResource, BookingSlot } from '../../booking/types';
import { formatTimeInTz } from '../../booking/datetime';

export interface BookingSummaryProps {
  /** The chosen resource (staff member, room, …). */
  resource?: BookingResource;
  /** The chosen time slot. */
  slot?: BookingSlot | null;
  /** IANA timezone for rendering (falls back to `resource.timezone`). */
  timeZone?: string;
  /** Render the date line. Defaults to a localized long date. */
  formatDate?: (iso: string) => string;
  /** Render a time. Defaults to timezone-aware `h:mm a`. */
  formatTime?: (iso: string) => string;
  /** Trailing action slot (e.g. a confirm button). */
  action?: React.ReactNode;
  /** Heading text (default `Your booking`). */
  title?: React.ReactNode;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

const defaultFormatDate = (iso: string, timeZone?: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
};

/**
 * Read-only recap of a chosen resource + slot — the native mirror of the web
 * `BookingSummary`. Same `resource`/`slot`/`timeZone`/`formatDate`/`formatTime`/
 * `action`/`title` contract. A token-styled card listing who/what, the date,
 * the time range, the slot duration, and the timezone. Pairs with a
 * `BookingCalendar` + `SlotPicker` flow as the confirmation step. Token-only.
 */
export function BookingSummary({
  resource,
  slot,
  timeZone,
  formatDate,
  formatTime,
  action,
  title = 'Your booking',
  style,
}: BookingSummaryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const tz = timeZone ?? resource?.timezone;
  const fmtDate = formatDate ?? ((iso: string) => defaultFormatDate(iso, tz));
  const fmtTime = formatTime ?? ((iso: string) => formatTimeInTz(iso, tz));

  const line = (label: string, value: React.ReactNode, key: string): React.ReactElement => (
    <View
      key={key}
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: tokens.spacing.md,
      }}
    >
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      <Text
        style={{
          flexShrink: 1,
          textAlign: 'right',
          color: colors.onSurface,
          fontSize: tokens.typography.scale.sm,
        }}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <View
      style={[
        {
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
        },
        style,
      ]}
    >
      <Text
        accessibilityRole="header"
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: '600',
        }}
      >
        {title}
      </Text>
      <View style={{ gap: tokens.spacing.sm }}>
        {resource ? line('With', resource.name, 'resource') : null}
        {slot ? line('Date', fmtDate(slot.startsAt), 'date') : null}
        {slot ? line('Time', `${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}`, 'time') : null}
        {resource?.slotMinutes ? line('Duration', `${resource.slotMinutes} min`, 'duration') : null}
        {tz ? line('Timezone', tz, 'tz') : null}
        {!slot && !resource ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            Nothing selected yet.
          </Text>
        ) : null}
      </View>
      {action ? <View>{action}</View> : null}
    </View>
  );
}
