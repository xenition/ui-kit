import * as React from 'react';
import { Image, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Badge, Button, formatMoney } from '../primitives';

export type AuctionCardVariant = 'card' | 'compact';

export interface AuctionCardProps {
  /** Auction / lot title. */
  title: string;
  /** Current highest bid in integer minor units (cents). */
  currentBidCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Number of bids placed so far. */
  bidCount?: number;
  /** Epoch-ms timestamp when the auction closes. Drives the countdown. */
  endsAtMs: number;
  /**
   * Reference "now" in epoch-ms. Defaults to `Date.now()`; injectable so the
   * countdown is deterministic in tests (this component does not self-tick).
   */
  nowMs?: number;
  /** Hero image URI. Omit for a token-styled placeholder. */
  imageUrl?: string;
  /** Label for the primary action (default "Place bid"). */
  actionLabel?: string;
  /** Fires when the bid button is pressed. Omit to hide the button. */
  onPlaceBid?: () => void;
  /** Layout variant. Default `card`. */
  variant?: AuctionCardVariant;
  style?: StyleProp<ViewStyle>;
}

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
 * An auction lot summary — hero media, title, the live current bid with a bid
 * count, a countdown to close, and a place-bid action. The countdown is derived
 * from `endsAtMs` against an injectable `nowMs` (no internal timer, so it stays
 * deterministic in tests); once past close it reads "Ended", disables bidding,
 * and switches the timer chip to a danger tone (state carried by text + tone,
 * not color alone). Presentational: data + `onPlaceBid` only. Reuses `Badge`,
 * `Button`, and the shared `formatMoney`; token-only colors, tints via a
 * token-derived alpha.
 */
export function AuctionCard({
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
}: AuctionCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const now = nowMs ?? Date.now();
  const remaining = endsAtMs - now;
  const ended = remaining <= 0;
  const compact = variant === 'compact';

  const timer = (
    <Badge tone={ended ? 'danger' : 'warn'} variant="soft" size="sm">
      {ended ? 'Ended' : `⏱ ${formatRemaining(remaining)}`}
    </Badge>
  );

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {compact ? null : (
        <View
          style={{
            height: 180,
            backgroundColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          ) : (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No photo</Text>
          )}
          <View style={{ position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.sm }}>{timer}</View>
        </View>
      )}
      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={1}
            style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {title}
          </Text>
          {compact ? timer : null}
        </View>
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
