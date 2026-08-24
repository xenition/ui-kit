import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge, Button, type BadgeTone } from '../primitives';
import { useEnter } from '../primitives/internal/motion';
import { withAlpha } from './internal/format';
import type { CivicAppointmentProps, AppointmentStatus } from './CivicAppointment';

/** Drop-in replacement for {@link CivicAppointment} — identical props, distinct design. */
export type CivicAppointmentV2Props = CivicAppointmentProps;

const STATUS: Record<AppointmentStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
  confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
  'checked-in': { label: 'Checked in', glyph: '📍', tone: 'accent' },
  completed: { label: 'Completed', glyph: '🏁', tone: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
  'no-show': { label: 'No-show', glyph: '!', tone: 'danger' },
};

const TERMINAL: AppointmentStatus[] = ['completed', 'cancelled', 'no-show'];

/**
 * CivicAppointment, alternate design **V2** — a hero card led by a big tinted
 * **date block** (calendar glyph over the date, with the time beneath). The
 * service, office, and location stack beside it under a status pill (text +
 * glyph + color, never color alone), and non-terminal visits expose full-width
 * Reschedule / Check-in actions. Same `CivicAppointmentProps`; drops in for
 * `CivicAppointment`. Token-pure.
 */
export function CivicAppointmentV2({
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
}: CivicAppointmentV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = STATUS[status] ?? STATUS.scheduled;
  const terminal = TERMINAL.includes(status);
  const showActions = !terminal && (onCheckIn != null || onReschedule != null);
  const enter = useEnter({ translateY: 8 });

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <Card variant="elevated" style={style}>
        <View style={{ flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md }}>
          <View
            style={{
              minWidth: 84,
              borderRadius: tokens.radius.lg,
              paddingVertical: tokens.spacing.md,
              paddingHorizontal: tokens.spacing.sm,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              backgroundColor: withAlpha(colors.primary, 0.12),
            }}
          >
            <Icon glyph="📅" size="xl" accessibilityLabel="Appointment" />
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800', textAlign: 'center' }}>
              {date}
            </Text>
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              {time}
            </Text>
          </View>

          <View style={{ flex: 1, gap: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
              <Text
                numberOfLines={2}
                style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}
              >
                {service}
              </Text>
              <Badge tone={sd.tone} variant="soft" size="sm">
                {`${sd.glyph} ${sd.label}`}
              </Badge>
            </View>
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {office}
            </Text>
            {location != null ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {location}</Text>
            ) : null}
            {reference != null ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Ref #{reference}</Text>
            ) : null}
          </View>
        </View>

        {showActions ? (
          <View style={{ marginTop: tokens.spacing.md, flexDirection: 'row', gap: tokens.spacing.sm }}>
            {onReschedule != null ? (
              <Button size="sm" variant="outline" onPress={onReschedule} style={{ flex: 1 }}>
                Reschedule
              </Button>
            ) : null}
            {onCheckIn != null ? (
              <Button size="sm" onPress={onCheckIn} style={{ flex: 1 }}>
                Check in
              </Button>
            ) : null}
          </View>
        ) : null}
      </Card>
    </Animated.View>
  );
}
