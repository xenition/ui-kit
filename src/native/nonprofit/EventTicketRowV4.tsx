import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from './internal';
import type { EventTicketRowProps } from './EventTicketRow';

/** Drop-in for {@link EventTicketRowProps} — same props, the V4 "rally" design. */
export type EventTicketRowV4Props = EventTicketRowProps;

/**
 * EventTicketRow — **V4** "rally" design. The warm, mission-driven take on a
 * selectable charity-event ticket row: an elevated rounded row (soft shadow,
 * clean surface — no gradient) with a leading ticket glyph in a soft-primary
 * well, a bold tier name, muted perks, an optional tax-deductible note, the
 * price rendered bold via `formatMoney`, and a radio indicator. Availability is
 * read via a glyph + a labelled Badge + token color (never color alone): sold
 * out gets a danger "Sold out" badge and disables the row; low stock gets a
 * warn "N left" badge. Selection is announced by `accessibilityState.selected`
 * (plus a filled dot and a bold primary border). Honors every prop of
 * {@link EventTicketRowProps}; token-only colors via `useXenitionTheme()`.
 */
export function EventTicketRowV4({
  name,
  priceCents,
  currency = 'USD',
  description,
  deductibleCents,
  remaining,
  soldOut,
  selected = false,
  onSelect,
  disabled = false,
  style,
}: EventTicketRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isSoldOut = soldOut === true || remaining === 0;
  const isDisabled = disabled || isSoldOut;
  const lowStock = !isSoldOut && typeof remaining === 'number' && remaining > 0 && remaining <= 10;
  const priceLabel = formatMoney(priceCents, currency);

  const containerStyle = ({ pressed }: { pressed: boolean }): StyleProp<ViewStyle> => [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      minHeight: 44,
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: selected ? 2 : 1,
      borderColor: selected ? colors.primary : colors.border,
      backgroundColor: pressed && !isDisabled ? tokens.ramps.neutral[50] : colors.card,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
      opacity: isDisabled ? 0.6 : 1,
    },
    style,
  ];

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: isDisabled }}
      accessibilityLabel={`${name}, ${priceLabel}${isSoldOut ? ', sold out' : ''}`}
      disabled={isDisabled}
      onPress={onSelect}
      style={containerStyle}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(colors.primary, 0.1),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon glyph="🎟️" size="lg" />
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{name}</Text>
          {isSoldOut ? <Badge tone="danger">Sold out</Badge> : lowStock ? <Badge tone="warn">{`${remaining} left`}</Badge> : null}
        </View>
        {description ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text> : null}
        {typeof deductibleCents === 'number' ? (
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs }}>
            {`${formatMoney(deductibleCents, currency)} tax-deductible`}
          </Text>
        ) : null}
      </View>

      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{priceLabel}</Text>

      <View
        style={{
          width: tokens.spacing.lg,
          height: tokens.spacing.lg,
          borderRadius: tokens.radius.full,
          borderWidth: 2,
          borderColor: selected ? colors.primary : colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected ? (
          <View style={{ width: tokens.spacing.sm, height: tokens.spacing.sm, borderRadius: tokens.radius.full, backgroundColor: colors.primary }} />
        ) : null}
      </View>
    </Pressable>
  );
}
