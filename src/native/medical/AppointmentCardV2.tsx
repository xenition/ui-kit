import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge, Button } from '../primitives';
import { useEnter } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { AppointmentCardProps, AppointmentStatus, AppointmentMode } from './AppointmentCard';

/** Same public contract as {@link AppointmentCard} — a drop-in alternate design. */
export type AppointmentCardV2Props = AppointmentCardProps;

const STATUS_META: Record<AppointmentStatus, { label: string; tone: 'neutral' | 'primary' | 'success' | 'warn' | 'danger' }> = {
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

/**
 * AppointmentCard, redesigned (v2): an **elevated hero card**. A big primary-
 * tinted date block anchors the left, with the time set large; the clinician
 * rides beside it as a ringed avatar + name/specialty. A mode chip (in-person /
 * video / phone) and a status badge sit on the same row, and a dominant CTA
 * ("Join call" for video, else "Book") spans the foot. Lifted with a shadow and
 * mounted with a gentle fade-in — distinct at a glance from v1's flat bordered
 * card. Same props, token-pure.
 */
export function AppointmentCardV2({
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
}: AppointmentCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const statusMeta = STATUS_META[status];
  const modeMeta = MODE_META[mode];

  const cardBase = {
    backgroundColor: colors.surface,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
    ...shadow('md', tokens),
  } as const;

  if (loading) {
    return (
      <Animated.View
        accessibilityLabel="Loading appointment"
        style={[cardBase, { opacity: enter.opacity, transform: enter.transform }, style]}
      >
        <View style={{ height: 64, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 40, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
      </Animated.View>
    );
  }

  const canAct = status === 'upcoming' || status === 'confirmed';
  const isVideo = mode === 'video';
  const ctaLabel = bookLabel ?? (isVideo ? 'Join call' : 'Book');
  const tint = withAlpha(colors.primary, 0.08);

  return (
    <Animated.View
      accessibilityLabel={`${modeMeta.label} appointment with ${doctorName}${specialty ? `, ${specialty}` : ''}, ${date} at ${time}, ${statusMeta.label}`}
      style={[cardBase, { opacity: enter.opacity, transform: enter.transform }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {/* Big date block. */}
        <View
          style={{
            minWidth: 76,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: tint,
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Text numberOfLines={1} style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {date}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {time}
          </Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Avatar src={doctorAvatar} name={doctorName} size="md" ring />
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
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Badge tone="neutral" variant="soft" size="sm">
          {`${modeMeta.glyph} ${modeMeta.label}`}
        </Badge>
        <Badge tone={statusMeta.tone} variant="soft" size="sm">
          {statusMeta.label}
        </Badge>
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
    </Animated.View>
  );
}
