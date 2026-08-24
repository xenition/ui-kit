import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Avatar, Badge, formatMoney } from '../primitives';
import { withAlpha } from './internal';

export interface BidRowProps {
  /** Bidder display name (or masked handle, e.g. "b***7"). */
  bidder: string;
  /** Bid amount in integer minor units (cents). */
  amountCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Optional avatar image URI. */
  avatarUrl?: string;
  /** Relative time label (e.g. "1m ago"). */
  timeLabel?: string;
  /** Highlights the row as the current highest bid. */
  leading?: boolean;
  /** Marks the bid as placed by the current user ("You"). */
  isYou?: boolean;
  /** Optional 1-based rank shown at the start of the row. */
  rank?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single bid in an auction's bid history — optional rank, bidder, amount, and
 * time, with a `leading` highlight for the current top bid and a "You" marker.
 * Presentational: shaped data only, no callbacks. The leading state is conveyed
 * by a badge and a token-tinted surface (never color alone). Reuses `Avatar`,
 * `Badge`, and the shared `formatMoney`; token-only colors via
 * `useXenitionTheme()`.
 */
export function BidRow({
  bidder,
  amountCents,
  currency = 'USD',
  avatarUrl,
  timeLabel,
  leading = false,
  isYou = false,
  rank,
  style,
}: BidRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const name = isYou ? 'You' : bidder;

  return (
    <View
      accessibilityLabel={`${leading ? 'Leading bid, ' : ''}${name}, ${formatMoney(amountCents, currency)}`}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: leading ? colors.success : colors.border,
          backgroundColor: leading ? withAlpha(colors.success, 0.1) : colors.surface,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
      {typeof rank === 'number' ? (
        <Text style={{ width: 20, color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {rank}
        </Text>
      ) : null}
      <Avatar src={avatarUrl} name={name} size="xs" />
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={1}
            style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
          >
            {name}
          </Text>
          {leading ? (
            <Badge tone="success" variant="soft" size="sm">
              Leading
            </Badge>
          ) : null}
        </View>
        {timeLabel ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{timeLabel}</Text>
        ) : null}
      </View>
      <Text
        style={{
          color: leading ? colors.success : colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: '700',
        }}
      >
        {formatMoney(amountCents, currency)}
      </Text>
    </View>
  );
}
