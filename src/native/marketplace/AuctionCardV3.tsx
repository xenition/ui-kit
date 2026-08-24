import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, formatMoney } from '../primitives';
import { withAlpha } from './internal';
import type { AuctionCardProps } from './AuctionCard';

/** Drop-in alternate of {@link AuctionCardProps} — identical prop contract. */
export type AuctionCardV3Props = AuctionCardProps;

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
 * AuctionCard — Design V3: **minimal, with the bid figures laid out inline**. No
 * hero media and no filled band — a leading accent rule, the lot title, and an
 * inline "ledger" row that sets the current bid against the bid count and the
 * time remaining, each separated by a hairline divider. The bid action is a
 * compact text-style pressable on the trailing edge (disabled once ended). The
 * countdown derives from `endsAtMs` against the injectable `nowMs` (no
 * self-tick); ended state reads in text ("Ended") + a danger tone. Same props
 * as `AuctionCard`; token-pure with `withAlpha` tints; borderless and airy.
 */
export function AuctionCardV3({
  title,
  currentBidCents,
  currency = 'USD',
  bidCount = 0,
  endsAtMs,
  nowMs,
  actionLabel = 'Place bid',
  onPlaceBid,
  style,
}: AuctionCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const now = nowMs ?? Date.now();
  const remaining = endsAtMs - now;
  const ended = remaining <= 0;

  const divider = (
    <View style={{ width: 1, alignSelf: 'stretch', backgroundColor: withAlpha(colors.border, 0.8) }} />
  );

  const ledgerCell = (label: string, value: string, tone: string): React.ReactElement => (
    <View style={{ gap: 2, paddingHorizontal: tokens.spacing.md }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{label}</Text>
      <Text style={{ color: tone, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{value}</Text>
    </View>
  );

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
          paddingRight: tokens.spacing.md,
          borderLeftWidth: 3,
          borderLeftColor: ended ? colors.danger : colors.primary,
          paddingLeft: tokens.spacing.md,
          backgroundColor: 'transparent',
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>
        {/* Inline bid ledger. */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: -tokens.spacing.md }}>
          {ledgerCell('Current', formatMoney(currentBidCents, currency), colors.onSurface)}
          {divider}
          {ledgerCell('Bids', bidCount.toLocaleString(), colors.onSurface)}
          {divider}
          {ledgerCell(ended ? 'Status' : 'Ends in', ended ? 'Ended' : formatRemaining(remaining), ended ? colors.dangerText : colors.warnText)}
        </View>
      </View>

      {onPlaceBid ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={ended ? 'Auction ended' : actionLabel}
          accessibilityState={{ disabled: ended }}
          disabled={ended}
          onPress={onPlaceBid}
          hitSlop={8}
          style={({ pressed }) => ({
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            backgroundColor: ended ? 'transparent' : withAlpha(colors.primary, 0.12),
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={{ color: ended ? colors.muted : colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {ended ? 'Ended' : actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
