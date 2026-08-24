import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { PriceTag } from '../commerce/PriceTag';
import type { MoneyFormatter } from '../commerce/money';

/** Lifecycle of a shoot booking. */
export type ShootBookingStatus = 'requested' | 'confirmed' | 'completed' | 'cancelled';

const STATUS: Record<ShootBookingStatus, { label: string; tone: BadgeTone }> = {
  requested: { label: 'Requested', tone: 'warn' },
  confirmed: { label: 'Confirmed', tone: 'success' },
  completed: { label: 'Completed', tone: 'primary' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
};

export interface ShootBookingCardProps {
  /** Client name. */
  clientName: string;
  /** Shoot type (e.g. "Wedding", "Portrait session"). */
  shootType?: string;
  /** Human date line (e.g. "Sat, Aug 30"). */
  dateText?: string;
  /** Human time line (e.g. "2:00 PM – 5:00 PM"). */
  timeText?: string;
  /** Location / venue. */
  location?: string;
  /** Booking status (default `requested`). */
  status?: ShootBookingStatus;
  /** Quoted price in integer cents. */
  priceCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Confirm handler; renders a confirm button when provided and pending. */
  onConfirm?: () => void;
  /** Confirm button label (default `Confirm`). */
  confirmLabel?: string;
  /** Press handler for the whole card. */
  onPress?: () => void;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * A photo-shoot booking summary — client, shoot type, a date/time/location
 * block, a status `Badge`, an optional quoted {@link PriceTag}, and a confirm
 * action for pending requests. Composes `Card`, `Badge`, `Button`, `Icon`, and
 * `PriceTag`. Status is conveyed with a labelled badge (not color alone).
 * Token-only colors.
 */
export function ShootBookingCard({
  clientName,
  shootType,
  dateText,
  timeText,
  location,
  status = 'requested',
  priceCents,
  currency = 'USD',
  onConfirm,
  confirmLabel = 'Confirm',
  onPress,
  formatMoney,
  style,
}: ShootBookingCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS[status];

  const line = (glyph: string, text?: string) =>
    text ? (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph={glyph} size="sm" color="muted" />
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{text}</Text>
      </View>
    ) : null;

  return (
    <Card
      variant={onPress ? 'interactive' : 'outlined'}
      padding="md"
      onTouchEnd={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={onPress ? `${clientName}, ${meta.label}` : undefined}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {clientName}
          </Text>
          {shootType ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {shootType}
            </Text>
          ) : null}
        </View>
        <Badge tone={meta.tone} variant="soft">
          {meta.label}
        </Badge>
      </View>

      <View style={{ gap: tokens.spacing.xs }}>
        {line('📅', dateText)}
        {line('🕐', timeText)}
        {line('📍', location)}
      </View>

      {typeof priceCents === 'number' || (onConfirm && status === 'requested') ? (
        <View
          style={{
            marginTop: tokens.spacing.xs,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
          }}
        >
          {typeof priceCents === 'number' ? (
            <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} />
          ) : (
            <View />
          )}
          {onConfirm && status === 'requested' ? (
            <Button size="sm" tone="success" onPress={onConfirm}>
              {confirmLabel}
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
