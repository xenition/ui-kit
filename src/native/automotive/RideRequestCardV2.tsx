import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Avatar, Badge, Button, Icon, Rating, formatMoney } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import type { RideRequestCardProps, RideStop } from './RideRequestCard';

/**
 * Alternate design (v2) of {@link RideRequestCard} — a drop-in with the **same
 * props**. Where the original is a flat bordered card, V2 is an *elevated,
 * floating* request: a shadowed borderless surface, a large ringed rider avatar,
 * a prominent vertical **route timeline** (pin → line → flag) with the fare
 * hero'd in a tinted pill, and a mount fade-in. Endpoints are marked by
 * text-labelled glyphs (not color alone) and the surge state is spelled out.
 * Token-pure: colors come from semantic slots and `withAlpha` tints only.
 */
export type RideRequestCardV2Props = RideRequestCardProps;

export function RideRequestCardV2({
  riderName,
  riderAvatarUrl,
  riderRating,
  pickup,
  dropoff,
  fareCents,
  currency = 'USD',
  distanceToPickup,
  tripDuration,
  scheduledFor,
  surgeMultiplier,
  variant = 'incoming',
  onAccept,
  onDecline,
  loading = false,
  style,
}: RideRequestCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });
  const compact = variant === 'compact';
  const scheduled = variant === 'scheduled';
  const pad = compact ? tokens.spacing.md : tokens.spacing.lg;

  const surface = {
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.surface,
    padding: pad,
    ...shadow('lg', tokens),
  } as const;

  if (loading) {
    return (
      <View accessibilityLabel="Loading ride request" style={[surface, { gap: tokens.spacing.sm }, style]}>
        <View style={{ height: 20, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ height: 14, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
        <View style={{ height: 14, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
      </View>
    );
  }

  const hasSurge = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;

  const timelineRow = (glyph: string, tone: 'primary' | 'success', stop: RideStop, last: boolean) => (
    <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
      <View style={{ alignItems: 'center', width: 28 }}>
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors[tone], 0.16),
            borderWidth: 2,
            borderColor: colors[tone],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: colors[tone], fontSize: tokens.typography.scale.xs, fontWeight: '800' }}>{glyph}</Text>
        </View>
        {!last ? <View style={{ flex: 1, minHeight: tokens.spacing.md, width: 2, backgroundColor: withAlpha(colors.muted, 0.4) }} /> : null}
      </View>
      <View style={{ flex: 1, paddingBottom: last ? 0 : tokens.spacing.sm }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{stop.label}</Text>
        <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {stop.address}
        </Text>
      </View>
    </View>
  );

  return (
    <Animated.View
      accessible
      accessibilityLabel={`Ride request from ${riderName}, pickup ${pickup.address}, drop off ${dropoff.address}${
        hasSurge ? `, ${surgeMultiplier}x surge` : ''
      }`}
      style={[surface, { gap: compact ? tokens.spacing.sm : tokens.spacing.md, opacity: enter.opacity, transform: enter.transform }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            padding: 3,
            borderRadius: tokens.radius.full,
            borderWidth: 2,
            borderColor: withAlpha(colors.primary, 0.5),
          }}
        >
          <Avatar src={riderAvatarUrl} name={riderName} size={compact ? 'md' : 'lg'} />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
            {riderName}
          </Text>
          {typeof riderRating === 'number' ? <Rating value={riderRating} size="sm" showValue /> : null}
        </View>
        {hasSurge ? <Badge tone="warn" variant="soft">{`⚡ ${surgeMultiplier}x surge`}</Badge> : null}
      </View>

      {scheduled && scheduledFor ? (
        <View
          style={{
            flexDirection: 'row',
            gap: tokens.spacing.xs,
            alignItems: 'center',
            backgroundColor: withAlpha(colors.primary, 0.1),
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
          }}
        >
          <Icon glyph="🗓️" size="sm" />
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>Scheduled for {scheduledFor}</Text>
        </View>
      ) : null}

      <View>
        {timelineRow('A', 'primary', pickup, false)}
        {timelineRow('B', 'success', dropoff, true)}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
        {typeof fareCents === 'number' ? (
          <View
            style={{
              backgroundColor: withAlpha(colors.success, 0.12),
              borderRadius: tokens.radius.md,
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.sm,
            }}
          >
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
              {formatMoney(fareCents, currency)}
            </Text>
          </View>
        ) : null}
        {distanceToPickup ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {distanceToPickup} away</Text> : null}
        {tripDuration ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>⏱ {tripDuration} trip</Text> : null}
      </View>

      {onAccept || onDecline ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {onDecline ? (
            <View style={{ flex: 1 }}>
              <Button variant="outline" tone="danger" onPress={onDecline} accessibilityLabel={`Decline ride from ${riderName}`}>
                Decline
              </Button>
            </View>
          ) : null}
          {onAccept ? (
            <View style={{ flex: 2 }}>
              <Button variant="primary" tone="success" onPress={onAccept} accessibilityLabel={`Accept ride from ${riderName}`}>
                Accept
              </Button>
            </View>
          ) : null}
        </View>
      ) : null}
    </Animated.View>
  );
}
