import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Avatar, Badge, Button, Rating } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** Presentation density / intent for a {@link RideRequestCard}. */
export type RideRequestVariant = 'incoming' | 'scheduled' | 'compact';

/** A single endpoint on the requested trip. */
export interface RideStop {
  /** Short label, e.g. `'Pickup'` or a place name. */
  label: string;
  /** Full address line. */
  address: string;
}

export interface RideRequestCardProps {
  /** Rider display name. */
  riderName: string;
  /** Optional rider avatar URL. */
  riderAvatarUrl?: string;
  /** Rider's historical star rating (0–5). */
  riderRating?: number;
  /** Pickup endpoint. */
  pickup: RideStop;
  /** Drop-off endpoint. */
  dropoff: RideStop;
  /** Estimated fare in integer minor units (cents). */
  fareCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Estimated distance to pickup, pre-formatted (e.g. `'1.2 mi'`). */
  distanceToPickup?: string;
  /** Estimated trip duration, pre-formatted (e.g. `'18 min'`). */
  tripDuration?: string;
  /** Scheduled time label (shown for `scheduled` variant). */
  scheduledFor?: string;
  /** Surge multiplier badge (e.g. `1.5` → "1.5x"). */
  surgeMultiplier?: number;
  /** Presentation variant. */
  variant?: RideRequestVariant;
  /** Fires when the driver accepts the request. */
  onAccept?: () => void;
  /** Fires when the driver declines the request. */
  onDecline?: () => void;
  /** Placeholder skeleton while the request loads. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

function formatMoney(cents: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
  } catch {
    return `$${(cents / 100).toFixed(2)}`;
  }
}

/**
 * An inbound ride request for a driver to accept or decline — rider identity and
 * rating, the pickup→drop-off route, an optional fare estimate, plus trip
 * distance/duration and an optional surge badge. Data + `onAccept`/`onDecline`
 * only; nothing fetches. Endpoints are marked with text-labelled glyphs (not
 * color alone) and the surge state is spelled out. Colors come from semantic
 * tokens and `withAlpha` tints — no literal colors. `variant="scheduled"` swaps
 * the header for a scheduled-time line; `variant="compact"` tightens spacing.
 */
export function RideRequestCard({
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
}: RideRequestCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const scheduled = variant === 'scheduled';
  const pad = compact ? tokens.spacing.md : tokens.spacing.lg;

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading ride request"
        style={[
          {
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: pad,
            gap: tokens.spacing.sm,
          },
          style,
        ]}
      >
        <View style={{ height: 18, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ height: 14, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
        <View style={{ height: 14, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
      </View>
    );
  }

  const hasSurge = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;

  const stopRow = (glyph: string, tone: 'primary' | 'success', stop: RideStop) => (
    <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'flex-start' }}>
      <View
        style={{
          width: 22,
          height: 22,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(colors[tone], 0.18),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: colors[tone], fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{glyph}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{stop.label}</Text>
        <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
          {stop.address}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      accessible
      accessibilityLabel={`Ride request from ${riderName}, pickup ${pickup.address}, drop off ${dropoff.address}${
        hasSurge ? `, ${surgeMultiplier}x surge` : ''
      }`}
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: pad,
          gap: compact ? tokens.spacing.sm : tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Avatar src={riderAvatarUrl} name={riderName} size={compact ? 'sm' : 'md'} />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {riderName}
          </Text>
          {typeof riderRating === 'number' ? (
            <Rating value={riderRating} size="sm" showValue />
          ) : null}
        </View>
        {hasSurge ? (
          <Badge tone="warn" variant="soft">{`${surgeMultiplier}x surge`}</Badge>
        ) : null}
      </View>

      {scheduled && scheduledFor ? (
        <View
          style={{
            flexDirection: 'row',
            gap: tokens.spacing.xs,
            alignItems: 'center',
            backgroundColor: withAlpha(colors.primary, 0.1),
            borderRadius: tokens.radius.sm,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
          }}
        >
          <Text style={{ fontSize: tokens.typography.scale.sm }}>🗓️</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            Scheduled for {scheduledFor}
          </Text>
        </View>
      ) : null}

      <View style={{ gap: tokens.spacing.sm }}>
        {stopRow('A', 'primary', pickup)}
        <View style={{ marginLeft: 10, width: 1, height: tokens.spacing.sm, backgroundColor: colors.border }} />
        {stopRow('B', 'success', dropoff)}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, alignItems: 'center' }}>
        {typeof fareCents === 'number' ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {formatMoney(fareCents, currency)}
          </Text>
        ) : null}
        {distanceToPickup ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>📍 {distanceToPickup} away</Text>
        ) : null}
        {tripDuration ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>⏱ {tripDuration} trip</Text>
        ) : null}
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
    </View>
  );
}
