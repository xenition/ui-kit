import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Avatar, Badge } from '../primitives';

export type AppointmentStatus = 'upcoming' | 'confirmed' | 'completed' | 'cancelled';
export type AppointmentMode = 'in-person' | 'video' | 'phone';

interface StatusMeta {
  label: string;
  tone: 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
}

const STATUS_META: Record<AppointmentStatus, StatusMeta> = {
  upcoming: { label: 'Upcoming', tone: 'primary' },
  confirmed: { label: 'Confirmed', tone: 'success' },
  completed: { label: 'Completed', tone: 'neutral' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
};

const MODE_META: Record<AppointmentMode, { glyph: string; label: string }> = {
  'in-person': { glyph: '🏥', label: 'In person' },
  video: { glyph: '📹', label: 'Video visit' },
  phone: { glyph: '📞', label: 'Phone call' },
};

export interface AppointmentCardProps {
  /** Clinician name shown as the appointment owner. */
  doctorName: string;
  /** Clinician specialty, e.g. "Cardiology". */
  specialty?: string;
  /** Optional avatar image URL for the clinician. */
  doctorAvatar?: string;
  /** Human-readable date, e.g. "Mon, 24 Aug". */
  date: string;
  /** Human-readable time, e.g. "10:30 AM". */
  time: string;
  /** Delivery mode; drives the icon + label. Defaults to `in-person`. */
  mode?: AppointmentMode;
  /** Lifecycle status; drives the badge tone/label. Defaults to `upcoming`. */
  status?: AppointmentStatus;
  /** Optional location / clinic line. */
  location?: string;
  /** Skeleton placeholder while the appointment loads. */
  loading?: boolean;
  /** Fires when the primary CTA is pressed (book / join). */
  onBook?: () => void;
  /** Fires when the secondary reschedule action is pressed. */
  onReschedule?: () => void;
  /** Overrides the primary CTA label. */
  bookLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single appointment summary card for clinical / telehealth schedules:
 * clinician identity, a date-time strip, a delivery-mode chip (in-person /
 * video / phone), a status badge, and one dominant action. For a `video`
 * appointment the CTA reads "Join call"; otherwise "Book" (or a completed /
 * cancelled state hides it). Status is conveyed by text + badge, never color
 * alone. Informational UI only — not a medical device. Token-only colors.
 */
export function AppointmentCard({
  doctorName,
  specialty,
  doctorAvatar,
  date,
  time,
  mode = 'in-person',
  status = 'upcoming',
  location,
  loading = false,
  onBook,
  onReschedule,
  bookLabel,
  style,
}: AppointmentCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const statusMeta = STATUS_META[status];
  const modeMeta = MODE_META[mode];

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading appointment"
        style={[
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
          },
          style,
        ]}
      >
        <View style={{ height: 16, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 40, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
      </View>
    );
  }

  const canAct = status === 'upcoming' || status === 'confirmed';
  const isVideo = mode === 'video';
  const ctaLabel = bookLabel ?? (isVideo ? 'Join call' : 'Book');

  return (
    <View
      accessibilityLabel={`${modeMeta.label} appointment with ${doctorName}${specialty ? `, ${specialty}` : ''}, ${date} at ${time}, ${statusMeta.label}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Avatar src={doctorAvatar} name={doctorName} size="md" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {doctorName}
          </Text>
          {specialty ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {specialty}
            </Text>
          ) : null}
        </View>
        <Badge tone={statusMeta.tone} variant="soft">
          {statusMeta.label}
        </Badge>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
          {modeMeta.glyph}
        </Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {date} · {time}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{modeMeta.label}</Text>
      </View>

      {location ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          📍 {location}
        </Text>
      ) : null}

      {canAct && (onBook || onReschedule) ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {onBook ? (
            <View style={{ flex: 1 }}>
              <Button variant="primary" tone={isVideo ? 'success' : 'default'} onPress={onBook}>
                {ctaLabel}
              </Button>
            </View>
          ) : null}
          {onReschedule ? (
            <View style={{ flex: 1 }}>
              <Button variant="outline" onPress={onReschedule}>
                Reschedule
              </Button>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
