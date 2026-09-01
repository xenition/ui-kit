import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Avatar, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { AppointmentCardProps, AppointmentStatus, AppointmentMode } from './AppointmentCard';

/** V4 layout choices for the "clinic" design. */
export type AppointmentCardLayout = 'full' | 'compact';

/** Drop-in for {@link AppointmentCardProps} — same props, the V4 "clinic" design. */
export interface AppointmentCardV4Props extends AppointmentCardProps {
  /** V4 layout: `full` (card, default) or `compact` (dense single row). */
  variant?: AppointmentCardLayout;
}

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
 * AppointmentCard — **V4** "clinic" design. The calm, clinical take on an
 * appointment: an elevated rounded card with a soft shadow, clinician identity,
 * a date-time strip with a delivery-mode glyph, a labelled status badge (never
 * color alone), and one dominant action. Honors the V4 `variant` — `full`
 * (card, default) and `compact` (a dense single row) — identical props/behavior
 * to {@link AppointmentCardProps}. Token-only colors via `useXenitionTheme()`.
 * Informational UI only — not a medical device.
 */
export function AppointmentCardV4({
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
  variant = 'full',
  style,
}: AppointmentCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const statusMeta = STATUS_META[status];
  const modeMeta = MODE_META[mode];

  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading appointment" style={[shell, { padding: tokens.spacing.lg, gap: tokens.spacing.md }, style]}>
        <View style={{ height: 16, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 40, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
      </View>
    );
  }

  const canAct = status === 'upcoming' || status === 'confirmed';
  const isVideo = mode === 'video';
  const ctaLabel = bookLabel ?? (isVideo ? 'Join call' : 'Book');
  const a11y = `${modeMeta.label} appointment with ${doctorName}${specialty ? `, ${specialty}` : ''}, ${date} at ${time}, ${statusMeta.label}`;

  // ── compact: dense single row ──
  if (variant === 'compact') {
    return (
      <View accessibilityLabel={a11y} style={[shell, { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.sm }, style]}>
        <Avatar src={doctorAvatar} name={doctorName} size="sm" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{doctorName}</Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {modeMeta.glyph} {date} · {time}
          </Text>
        </View>
        <Badge tone={statusMeta.tone} variant="soft" size="sm">{statusMeta.label}</Badge>
      </View>
    );
  }

  return (
    <View accessibilityLabel={a11y} style={[shell, { padding: tokens.spacing.lg, gap: tokens.spacing.md }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Avatar src={doctorAvatar} name={doctorName} size="md" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{doctorName}</Text>
          {specialty ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{specialty}</Text>
          ) : null}
        </View>
        <Badge tone={statusMeta.tone} variant="soft">{statusMeta.label}</Badge>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, backgroundColor: withAlpha(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>{modeMeta.glyph}</Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{date} · {time}</Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{modeMeta.label}</Text>
      </View>

      {location ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>📍 {location}</Text>
      ) : null}

      {canAct && (onBook || onReschedule) ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {onBook ? (
            <View style={{ flex: 1 }}>
              <Button variant="primary" tone={isVideo ? 'success' : 'default'} onPress={onBook}>{ctaLabel}</Button>
            </View>
          ) : null}
          {onReschedule ? (
            <View style={{ flex: 1 }}>
              <Button variant="outline" onPress={onReschedule}>Reschedule</Button>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
