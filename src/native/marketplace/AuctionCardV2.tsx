import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useXenitionTheme, Button, formatMoney } from '../primitives';
import { withAlpha } from './internal';
import { shadow } from '../primitives/internal/elevation';
import type { AuctionCardProps } from './AuctionCard';

/** Drop-in alternate of {@link AuctionCardProps} — identical prop contract. */
export type AuctionCardV2Props = AuctionCardProps;

/** Format a positive ms duration as the two most-significant units. */
function formatRemaining(ms: number): string {
  if (ms <= 0) return 'Ended';
  const totalSec = Math.floor(ms / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

/**
 * AuctionCard — Design V2: an **elevated card with a bold countdown band**. The
 * hero image sits up top; directly beneath it a full-width, tinted band makes
 * the time-remaining the loudest element on the card ("⏱ 2h 30m left" — or a
 * danger-toned "Auction ended" once closed). Price and bid count follow, then
 * the bid action. The countdown derives from `endsAtMs` against the injectable
 * `nowMs` (no self-tick, deterministic in tests); ended state is carried by
 * text + tone, not color alone. Same props as `AuctionCard`; token-pure with
 * `withAlpha` tints; elevated, borderless surface.
 */
export function AuctionCardV2({
  title,
  currentBidCents,
  currency = 'USD',
  bidCount = 0,
  endsAtMs,
  nowMs,
  imageUrl,
  actionLabel = 'Place bid',
  onPlaceBid,
  variant = 'card',
  style,
}: AuctionCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const now = nowMs ?? Date.now();
  const remaining = endsAtMs - now;
  const ended = remaining <= 0;
  const compact = variant === 'compact';

  const bandTint = ended ? withAlpha(colors.danger, 0.12) : withAlpha(colors.warn, 0.16);
  const bandText = ended ? colors.dangerText : colors.warnText;

  const band = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.spacing.xs,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
        backgroundColor: bandTint,
      }}
    >
      <Text style={{ color: bandText, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {ended ? 'Auction ended' : `⏱ ${formatRemaining(remaining)} left`}
      </Text>
    </View>
  );

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        },
        shadow('lg', tokens),
        style,
      ]}
    >
      {compact ? null : (
        <View style={{ height: 180, backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center' }}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          ) : (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No photo</Text>
          )}
        </View>
      )}

      {band}

      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={2}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <View style={{ gap: 2 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Current bid</Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
              {formatMoney(currentBidCents, currency)}
            </Text>
          </View>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {`${bidCount.toLocaleString()} ${bidCount === 1 ? 'bid' : 'bids'}`}
          </Text>
        </View>
        {onPlaceBid ? (
          <Button variant="primary" onPress={onPlaceBid} disabled={ended}>
            {ended ? 'Auction ended' : actionLabel}
          </Button>
        ) : null}
      </View>
    </View>
  );
}
