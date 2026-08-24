import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Avatar, Badge, Button, formatMoney, type BadgeTone } from '../primitives';

/** Lifecycle state of an offer. */
export type OfferStatus = 'pending' | 'accepted' | 'declined' | 'countered' | 'expired';

export interface OfferRowProps {
  /** Buyer / party display name. */
  party: string;
  /** Offered amount in integer minor units (cents). */
  amountCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Optional avatar image URI. */
  avatarUrl?: string;
  /** Offer status. Default `pending`. */
  status?: OfferStatus;
  /** Relative time label (e.g. "2h ago"). */
  timeLabel?: string;
  /** Optional message/note attached to the offer. */
  note?: string;
  /** Fires when Accept is pressed (only shown for `pending` offers). */
  onAccept?: () => void;
  /** Fires when Decline is pressed (only shown for `pending` offers). */
  onDecline?: () => void;
  /** Fires when Counter is pressed (only shown for `pending` offers). */
  onCounter?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STATUS_TONE: Record<OfferStatus, BadgeTone> = {
  pending: 'warn',
  accepted: 'success',
  declined: 'danger',
  countered: 'primary',
  expired: 'neutral',
};

const STATUS_LABEL: Record<OfferStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  declined: 'Declined',
  countered: 'Countered',
  expired: 'Expired',
};

/**
 * A row in an offers list on a listing — buyer, offered amount, a status chip,
 * an optional note, and Accept / Counter / Decline actions (shown only while
 * the offer is `pending`). Presentational: shaped data + callbacks only. Status
 * is carried by both the chip label and tone, never color alone. Reuses
 * `Avatar`, `Badge`, `Button`, and the shared `formatMoney`; token-only colors.
 */
export function OfferRow({
  party,
  amountCents,
  currency = 'USD',
  avatarUrl,
  status = 'pending',
  timeLabel,
  note,
  onAccept,
  onDecline,
  onCounter,
  style,
}: OfferRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const tone = STATUS_TONE[status] ?? 'neutral';
  const statusLabel = STATUS_LABEL[status] ?? String(status);
  const showActions = status === 'pending' && (onAccept || onDecline || onCounter);

  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Avatar src={avatarUrl} name={party} size="sm" />
        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <Text
              numberOfLines={1}
              style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
            >
              {party}
            </Text>
            <Badge tone={tone} variant="soft" size="sm">
              {statusLabel}
            </Badge>
          </View>
          {timeLabel ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{timeLabel}</Text>
          ) : null}
        </View>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {formatMoney(amountCents, currency)}
        </Text>
      </View>
      {note ? (
        <Text numberOfLines={3} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {note}
        </Text>
      ) : null}
      {showActions ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {onAccept ? (
            <Button variant="primary" tone="success" size="sm" onPress={onAccept} style={{ flex: 1 }}>
              Accept
            </Button>
          ) : null}
          {onCounter ? (
            <Button variant="outline" size="sm" onPress={onCounter} style={{ flex: 1 }}>
              Counter
            </Button>
          ) : null}
          {onDecline ? (
            <Button variant="ghost" tone="danger" size="sm" onPress={onDecline} style={{ flex: 1 }}>
              Decline
            </Button>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
