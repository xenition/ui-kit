import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import type { AppointmentCardProps, AppointmentStatus, AppointmentMode } from './AppointmentCard';

/** Same public contract as {@link AppointmentCard} — a drop-in alternate design. */
export type AppointmentCardV3Props = AppointmentCardProps;

const STATUS_META: Record<AppointmentStatus, { label: string; color: keyof SemanticColors }> = {
  upcoming: { label: 'Upcoming', color: 'primaryText' },
  confirmed: { label: 'Confirmed', color: 'successText' },
  completed: { label: 'Completed', color: 'muted' },
  cancelled: { label: 'Cancelled', color: 'dangerText' },
};

const MODE_META: Record<AppointmentMode, { glyph: string; label: string }> = {
  'in-person': { glyph: '🏥', label: 'In person' },
  video: { glyph: '📹', label: 'Video visit' },
  phone: { glyph: '📞', label: 'Phone call' },
};

/**
 * AppointmentCard, redesigned (v3): a **minimal dense line**. A small colored
 * status dot leads (paired with a text status word, so status never rides on
 * color alone), the clinician + date·time·mode share one flexible line, and the
 * status label hugs the right edge. No card, no avatar disc, no CTA cluster —
 * tuned for long agenda lists. Distinct at a glance from v1's card and v2's
 * hero. Same props, token-pure.
 */
export function AppointmentCardV3({
  doctorName,
  specialty,
  date,
  time,
  mode = 'in-person',
  status = 'upcoming',
  loading = false,
  onBook,
  style,
}: AppointmentCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const statusMeta = STATUS_META[status];
  const modeMeta = MODE_META[mode];
  const statusColor = colors[statusMeta.color];

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading appointment"
        style={[
          { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingVertical: tokens.spacing.sm, minHeight: 44 },
          style,
        ]}
      >
        <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ flex: 1, height: 12, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
      </View>
    );
  }

  const meta = [specialty, `${date} · ${time}`, modeMeta.label].filter(Boolean).join(' · ');
  const a11y = `${modeMeta.label} appointment with ${doctorName}, ${date} at ${time}, ${statusMeta.label}`;

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          minHeight: 44,
        },
        style,
      ]}
    >
      <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: statusColor }} />
      <View style={{ flex: 1, gap: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {`${modeMeta.glyph} ${doctorName}`}
        </Text>
        {meta !== '' ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {meta}
          </Text>
        ) : null}
      </View>
      <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
        {statusMeta.label}
      </Text>
    </View>
  );

  if (!onBook) {
    return <View accessibilityLabel={a11y}>{body}</View>;
  }
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={onBook}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
