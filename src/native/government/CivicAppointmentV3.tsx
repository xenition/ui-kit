import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Badge, type BadgeTone } from '../primitives';
import { withAlpha } from './internal/format';
import type { CivicAppointmentProps, AppointmentStatus } from './CivicAppointment';

/** Drop-in replacement for {@link CivicAppointment} — identical props, distinct design. */
export type CivicAppointmentV3Props = CivicAppointmentProps;

const STATUS: Record<AppointmentStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
  confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
  'checked-in': { label: 'Checked in', glyph: '📍', tone: 'accent' },
  completed: { label: 'Completed', glyph: '🏁', tone: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
  'no-show': { label: 'No-show', glyph: '!', tone: 'danger' },
};

/**
 * CivicAppointment, alternate design **V3** — a dense agenda line. A left
 * date/time column (bold date over muted time) leads, the service and office
 * share the middle, and the lifecycle status closes the line as a text + glyph +
 * color pill (never color alone). Tight rhythm for a day/agenda list. Same
 * `CivicAppointmentProps`; drops in for `CivicAppointment`. Token-pure.
 */
export function CivicAppointmentV3({
  service,
  office,
  date,
  time,
  status = 'scheduled',
  location,
  reference,
  style,
}: CivicAppointmentV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = STATUS[status] ?? STATUS.scheduled;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View
        style={{
          minWidth: 56,
          alignItems: 'center',
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.xs,
          borderRadius: tokens.radius.sm,
          backgroundColor: withAlpha(colors.primary, 0.1),
        }}
      >
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>
          {date}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {time}
        </Text>
      </View>

      <View style={{ flex: 1, gap: 1 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {service}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {office}
          {location != null ? ` · ${location}` : ''}
          {reference != null ? ` · #${reference}` : ''}
        </Text>
      </View>

      <Badge tone={sd.tone} variant="soft" size="sm">
        {`${sd.glyph} ${sd.label}`}
      </Badge>
    </View>
  );
}
