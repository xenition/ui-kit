import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import { formatMoney } from '../commerce/money';
import { metaLine, skeletonFill } from './internal/fleet-v4';
import type { RideRequestCardProps, RideStop } from './RideRequestCard';

export interface RideRequestCardV4Props extends RideRequestCardProps {
  /** CTA copy. Defaults `'Accept'` / `'Decline'`. */
  acceptLabel?: string;
  declineLabel?: string;
  /** Build the surge chip. Default `'1.8× surge'`. */
  formatSurge?: (multiplier: number) => string;
  /** Labels on the two stops. Defaults `'Pickup'` / `'Dropoff'`. */
  pickupLabel?: string;
  dropoffLabel?: string;
}

/** The stop rail's dot, as a fraction of the spacing scale. */
const DOT_STEP = 0.75;

/**
 * **V4 ride request card** — same props as {@link RideRequestCard} plus five
 * copy hooks.
 *
 * ## Five changes
 *
 * 1. **The two stops are joined by a rail.** The base stacked pickup and
 *    dropoff as two independent rows, so nothing on the card said they were
 *    one journey — which is the single fact a driver reads first.
 * 2. **Accept and decline are not the same weight.** The base drew two equal
 *    buttons side by side; §5 of the design spec is explicit that a declined
 *    choice never competes with the primary one.
 * 3. **The fare is tabular and in the display face**, because it is the number
 *    the decision turns on.
 * 4. **Surge is a labelled chip**, not a tinted fare — a higher price is a
 *    condition, not an error (§35.4).
 * 5. **The rider's rating carries its number**, via `RatingV4 showValue`.
 *
 * **Renders nothing without a `riderName`** (§4.5).
 */
export function RideRequestCardV4({
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
  acceptLabel = 'Accept',
  declineLabel = 'Decline',
  formatSurge,
  pickupLabel = 'Pickup',
  dropoffLabel = 'Dropoff',
  onAccept,
  onDecline,
  loading = false,
  style,
}: RideRequestCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  if (loading) {
    return (
      <CardV4 style={[{ gap: tokens.spacing.sm }, style]}>
        {[50, 80, 65].map((w) => (
          <View
            key={w}
            style={{
              height: tokens.typography.scale.sm,
              width: `${w}%`,
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
        ))}
      </CardV4>
    );
  }

  if (!riderName) return null;

  const compact = variant === 'compact';
  const dot = tokens.spacing.md * DOT_STEP;
  const surging = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
  const caption = metaLine([distanceToPickup, tripDuration, scheduledFor]);

  /* One rail joining the two stops — the base drew them as unrelated rows. */
  const stop = (label: string, value: RideStop, last: boolean): React.ReactElement => (
    <View key={label} style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: dot,
            height: dot,
            borderRadius: last ? tokens.radius.sm : tokens.radius.full,
            backgroundColor: last ? colors.primary : colors.successText,
          }}
        />
        {!last ? (
          <View
            style={{
              flex: 1,
              width: 1,
              marginVertical: tokens.spacing.xs,
              backgroundColor: colors.border,
            }}
          />
        ) : null}
      </View>
      <View style={{ flex: 1, paddingBottom: last ? 0 : tokens.spacing.sm }}>
        <TextV4 size="xs" tone="mutedText">
          {label}
        </TextV4>
        <TextV4 size="sm" weight="semibold" tone="onCard" numberOfLines={2}>
          {value.address}
        </TextV4>
      </View>
    </View>
  );

  return (
    <CardV4 style={[{ gap: tokens.spacing.md }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <AvatarV4 src={riderAvatarUrl} name={riderName} size="sm" />
        <View style={{ flex: 1 }}>
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" numberOfLines={1}>
            {riderName}
          </TextV4>
          {typeof riderRating === 'number' ? (
            <RatingV4 value={riderRating} size="sm" showValue />
          ) : null}
        </View>
        {surging ? (
          <BadgeV4 tone="warn" variant="soft" size="sm">
            {(formatSurge ?? ((m: number) => `${m}× surge`))(surgeMultiplier as number)}
          </BadgeV4>
        ) : null}
      </View>

      {!compact ? (
        <View>
          {stop(pickup.label || pickupLabel, pickup, false)}
          {stop(dropoff.label || dropoffLabel, dropoff, true)}
        </View>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        {caption ? (
          <TextV4 size="xs" tone="mutedText" style={{ flex: 1 }}>
            {caption}
          </TextV4>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        {typeof fareCents === 'number' ? (
          <TextV4 face="heading" size="xl" weight="bold" tone="onCard" numeric="tabular">
            {formatMoney(fareCents, currency)}
          </TextV4>
        ) : null}
      </View>

      {onAccept || onDecline ? (
        <View style={{ gap: tokens.spacing.sm }}>
          {onAccept ? (
            <ButtonV4 variant="primary" size="md" onPress={onAccept} accessibilityLabel={acceptLabel}>
              {acceptLabel}
            </ButtonV4>
          ) : null}
          {/*
            §5: the declined choice goes BELOW the primary one and never
            competes with it. The base drew two equal buttons side by side.
          */}
          {onDecline ? (
            <ButtonV4 variant="ghost" size="md" onPress={onDecline} accessibilityLabel={declineLabel}>
              {declineLabel}
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </CardV4>
  );
}
