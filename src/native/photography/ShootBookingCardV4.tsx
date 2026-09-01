import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { PriceTag } from '../commerce/PriceTag';
import type { ShootBookingCardProps, ShootBookingStatus } from './ShootBookingCard';

/** Drop-in for {@link ShootBookingCardProps} — same props, the V4 "studio" design. */
export type ShootBookingCardV4Props = ShootBookingCardProps;

const STATUS: Record<ShootBookingStatus, { label: string; tone: BadgeTone }> = {
  requested: { label: 'Requested', tone: 'warn' },
  confirmed: { label: 'Confirmed', tone: 'success' },
  completed: { label: 'Completed', tone: 'primary' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
};

/**
 * ShootBookingCard — **V4** "studio" design. A booking summary on a clean,
 * elevated studio surface: an elevated card (soft shadow, hairline border), a
 * bold client name, muted shoot type, and a date/time/location block with muted
 * glyphs. The lifecycle `status` is a labelled `Badge` with the correct tone per
 * status — `requested` (warn), `confirmed` (success), `completed` (primary),
 * `cancelled` (danger) — never color alone. The confirm `Button` only shows for
 * `requested`; its `onPress` stops propagation so it never fires the card press.
 * Optional quoted price via {@link PriceTag}. Identical props/behavior to
 * {@link ShootBookingCardProps}; `onPress` makes the whole card a button.
 * Token-only colors via `useXenitionTheme()`.
 */
export function ShootBookingCardV4({
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
}: ShootBookingCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS[status];

  const containerStyle: StyleProp<ViewStyle> = [
    {
      gap: tokens.spacing.sm,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      padding: tokens.spacing.md,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  const line = (glyph: string, text?: string) =>
    text ? (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Icon glyph={glyph} size="sm" color="muted" />
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{text}</Text>
      </View>
    ) : null;

  const showFooter = typeof priceCents === 'number' || (onConfirm && status === 'requested');

  const inner = (
    <>
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
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
      </View>

      <View style={{ gap: tokens.spacing.xs }}>
        {line('📅', dateText)}
        {line('🕐', timeText)}
        {line('📍', location)}
      </View>

      {showFooter ? (
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
            <Button
              size="sm"
              tone="success"
              onPress={onConfirm}
              style={{ minHeight: 44, justifyContent: 'center' }}
            >
              {confirmLabel}
            </Button>
          ) : null}
        </View>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${clientName}, ${meta.label}`}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={containerStyle}>{inner}</View>;
}
