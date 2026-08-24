import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Button } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import { StatusPill } from './StatusPill';
import { APPOINTMENT_STATUS_META, APPOINTMENT_TYPE_META, toneColor } from './internal';
import type { LegalAppointmentProps } from './LegalAppointment';

/** Alternate design — identical Props to {@link LegalAppointment}, drop-in swap. */
export type LegalAppointmentV2Props = LegalAppointmentProps;
/** Alternate design — identical Props to {@link LegalAppointment}, drop-in swap. */
export type LegalAppointmentV3Props = LegalAppointmentProps;

/**
 * LegalAppointment, design v2 — an **elevated card** led by a prominent tinted
 * date block (type glyph over the date), with type + status pills, location /
 * client, and a confirm / cancel action row when actionable + still scheduled.
 * Same Props as {@link LegalAppointment}; a larger, calendar-block presentation
 * vs. the flat original. Token-pure; status is a glyph + word, never color alone.
 */
export function LegalAppointmentV2({
  type,
  date,
  time,
  location,
  client,
  status = 'scheduled',
  variant = 'default',
  actionable = false,
  onPress,
  onConfirm,
  onCancel,
  testID,
  style,
}: LegalAppointmentV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });
  const compact = variant === 'compact';
  const typeMeta = APPOINTMENT_TYPE_META[type];
  const tint = toneColor(colors, typeMeta.tone);
  const showActions = actionable && status === 'scheduled';
  const cancelled = status === 'cancelled';

  const body = (
    <Card variant="elevated" padding={compact ? 'sm' : 'md'} radius="lg" style={[{ gap: tokens.spacing.sm, opacity: cancelled ? 0.65 : 1 }, style]}>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }}>
        <View
          style={{
            minWidth: 64,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(tint, 0.14),
          }}
        >
          <Text accessibilityElementsHidden importantForAccessibility="no" style={{ fontSize: tokens.typography.scale.xl }}>
            {typeMeta.glyph}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700', textAlign: 'center' }}>
            {date}
          </Text>
        </View>
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
            <StatusPill meta={typeMeta} variant="soft" size="sm" />
            <StatusPill meta={APPOINTMENT_STATUS_META[status]} size="sm" />
          </View>
          {time ? <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{time}</Text> : null}
          {!compact && (location || client) ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {[location, client].filter(Boolean).join(' · ')}
            </Text>
          ) : null}
        </View>
      </View>

      {showActions ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs, paddingTop: tokens.spacing.xs, borderTopWidth: 1, borderTopColor: colors.border }}>
          {onConfirm ? (
            <Button size="sm" variant="primary" tone="success" onPress={onConfirm}>
              Confirm
            </Button>
          ) : null}
          {onCancel ? (
            <Button size="sm" variant="outline" tone="danger" onPress={onCancel}>
              Cancel
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );

  const animated = (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>{body}</Animated.View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`${typeMeta.label} on ${date}`} onPress={onPress} testID={testID}>
        {animated}
      </Pressable>
    );
  }
  return <View testID={testID}>{animated}</View>;
}

/**
 * LegalAppointment, design v3 — a **compact single line**: a type glyph, the
 * date and time inline, and a trailing inline status, on a hairline divider.
 * Same Props as {@link LegalAppointment}; the tightest schedule row. Token-pure;
 * status stays a glyph + word, never color alone.
 */
export function LegalAppointmentV3({
  type,
  date,
  time,
  location,
  client,
  status = 'scheduled',
  onPress,
  testID,
  style,
}: LegalAppointmentV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 4 });
  const typeMeta = APPOINTMENT_TYPE_META[type];
  const cancelled = status === 'cancelled';
  const secondary = [time, location, client].filter((s): s is string => Boolean(s)).join(' · ');

  const row = (
    <Animated.View
      style={[
        {
          opacity: enter.opacity,
          transform: enter.transform,
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.xs,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, opacity: cancelled ? 0.65 : 1 }}>
        <Text accessibilityElementsHidden importantForAccessibility="no" style={{ fontSize: tokens.typography.scale.base }}>
          {typeMeta.glyph}
        </Text>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {date}
          </Text>
          {secondary ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {secondary}
            </Text>
          ) : null}
        </View>
        <StatusPill meta={APPOINTMENT_STATUS_META[status]} variant="inline" size="sm" />
      </View>
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`${typeMeta.label} on ${date}`} onPress={onPress} testID={testID}>
        {row}
      </Pressable>
    );
  }
  return <View testID={testID}>{row}</View>;
}
