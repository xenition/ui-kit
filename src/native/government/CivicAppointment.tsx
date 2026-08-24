import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge, Button, type BadgeTone } from '../primitives';
import { withAlpha } from './internal/format';

/** Lifecycle of a booked civic appointment (DMV visit, city-hall meeting…). */
export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'checked-in'
  | 'completed'
  | 'cancelled'
  | 'no-show';

const STATUS: Record<AppointmentStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
  confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
  'checked-in': { label: 'Checked in', glyph: '📍', tone: 'accent' },
  completed: { label: 'Completed', glyph: '🏁', tone: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
  'no-show': { label: 'No-show', glyph: '!', tone: 'danger' },
};

export interface CivicAppointmentProps {
  /** Service the appointment is for (e.g. "License renewal"). */
  service: string;
  /** Office / department name (e.g. "DMV — Downtown"). */
  office: string;
  /** Localized date (already formatted, e.g. "Mon, Aug 24"). */
  date: string;
  /** Localized time (already formatted, e.g. "10:30 AM"). */
  time: string;
  /** Appointment lifecycle status (default `scheduled`). */
  status?: AppointmentStatus;
  /** Physical address / room shown as a secondary location line. */
  location?: string;
  /** Confirmation / queue reference (e.g. "A-042"). */
  reference?: string;
  /** Fires "Check in" (shown only when supplied and status is upcoming). */
  onCheckIn?: () => void;
  /** Fires "Reschedule" (shown only when supplied and not terminal). */
  onReschedule?: () => void;
  style?: StyleProp<ViewStyle>;
}

const TERMINAL: AppointmentStatus[] = ['completed', 'cancelled', 'no-show'];

/**
 * A booked civic appointment card: service, office, date/time, and a status pill
 * conveyed by **text + glyph + color** (never color alone). Optional
 * `onCheckIn` / `onReschedule` actions appear only for non-terminal
 * appointments. Every color traces to a `SemanticColors` slot or a token-derived
 * tint — no literals.
 */
export function CivicAppointment({
  service,
  office,
  date,
  time,
  status = 'scheduled',
  location,
  reference,
  onCheckIn,
  onReschedule,
  style,
}: CivicAppointmentProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = STATUS[status] ?? STATUS.scheduled;
  const terminal = TERMINAL.includes(status);
  const showActions = !terminal && (onCheckIn != null || onReschedule != null);

  return (
    <Card variant="elevated" style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 52,
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.sm,
            alignItems: 'center',
            backgroundColor: withAlpha(colors.primary, 0.12),
          }}
        >
          <Icon glyph="📅" size="lg" accessibilityLabel="Appointment" />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {service}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {office}
          </Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {date} · {time}
          </Text>
          {location != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {location}</Text>
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          <Badge tone={sd.tone} variant="soft" size="sm">
            {`${sd.glyph} ${sd.label}`}
          </Badge>
          {reference != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>#{reference}</Text>
          ) : null}
        </View>
      </View>

      {showActions ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            flexDirection: 'row',
            gap: tokens.spacing.sm,
            justifyContent: 'flex-end',
          }}
        >
          {onReschedule != null ? (
            <Button size="sm" variant="outline" onPress={onReschedule}>
              Reschedule
            </Button>
          ) : null}
          {onCheckIn != null ? (
            <Button size="sm" onPress={onCheckIn}>
              Check in
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
