import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Badge } from '../primitives';
import { CarrierBadge } from './CarrierBadge';
import {
  SHIPMENT_META,
  toneColor,
  type ShipmentStatus,
  type CarrierCode,
} from './internal';

export type ShipmentCardVariant = 'default' | 'compact';

export interface ShipmentCardProps {
  /** Tracking number / shipment id (rendered as the headline). */
  trackingNumber: string;
  /** Human recipient / customer name. */
  recipient?: string;
  /** Origin location label. */
  origin?: string;
  /** Destination location label. */
  destination?: string;
  /** Lifecycle status — carried by glyph + word, never color alone. */
  status: ShipmentStatus;
  /** Carrier code for the inline `CarrierBadge`. */
  carrier?: CarrierCode;
  /** Carrier service level (e.g. `Ground`, `2-Day`). */
  service?: string;
  /** Human ETA line (e.g. `Tomorrow by 8 PM`). */
  eta?: string;
  /** Package count for a multi-piece shipment. */
  pieces?: number;
  /** Layout density. `compact` drops the origin→destination row. */
  variant?: ShipmentCardVariant;
  /** Loading skeleton (no data yet). */
  loading?: boolean;
  /** Makes the whole card tappable. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Summary card for one shipment: tracking number headline, a glyph + word
 * status badge, an inline `CarrierBadge`, origin→destination, ETA and piece
 * count. Status meaning is text-first (badge label + glyph), with tone as
 * reinforcement only. Tappable when `onPress` is set (button role + label);
 * otherwise a static summary. Loading renders a muted skeleton. All colors are
 * theme tokens.
 */
export function ShipmentCard({
  trackingNumber,
  recipient,
  origin,
  destination,
  status,
  carrier,
  service,
  eta,
  pieces,
  variant = 'default',
  loading = false,
  onPress,
  testID,
  style,
}: ShipmentCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SHIPMENT_META[status] ?? SHIPMENT_META.draft;

  if (loading) {
    return (
      <Card variant="outlined" style={style}>
        <View accessibilityLabel="Loading shipment" style={{ gap: tokens.spacing.sm }}>
          <View style={{ height: 16, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
          <View style={{ height: 12, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
          <View style={{ height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </Card>
    );
  }

  const content = (
    <View style={{ gap: tokens.spacing.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface }}>
            {trackingNumber}
          </Text>
          {recipient ? (
            <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
              {recipient}
            </Text>
          ) : null}
        </View>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
        <CarrierBadge carrier={carrier} service={service} size="sm" />
        {pieces != null ? (
          <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
            {`${pieces} ${pieces === 1 ? 'piece' : 'pieces'}`}
          </Text>
        ) : null}
      </View>

      {variant === 'default' && (origin || destination) ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.sm, color: colors.onSurface }}>
            {origin ?? '—'}
          </Text>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: toneColor(colors, meta.tone) }}>
            →
          </Text>
          <Text numberOfLines={1} style={{ flex: 1, textAlign: 'right', fontSize: tokens.typography.scale.sm, color: colors.onSurface }}>
            {destination ?? '—'}
          </Text>
        </View>
      ) : null}

      {eta ? (
        <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
          {`ETA · ${eta}`}
        </Text>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Shipment ${trackingNumber}, ${meta.label}`}
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }, style]}
      >
        <Card variant="interactive">{content}</Card>
      </Pressable>
    );
  }

  return (
    <Card variant="outlined" testID={testID} style={style}>
      {content}
    </Card>
  );
}
